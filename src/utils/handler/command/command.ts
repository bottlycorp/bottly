import {
  Client,
  Collection,
  CommandInteraction,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  TextChannel,
  ThreadChannel
} from "discord.js";
import { CommandExecute, CommandsBuilderCollection, CommandsCollection, LoadedCommands } from "./command.type";
import { existsSync, readdirSync, statSync } from "fs";
import { sep } from "path";
import { isDevEnvironment, isKillerEnvironment } from "$core/utils/environment";
import { haveSubcommands, serializeCommandName } from "./command.util";
import { folderExist, interactionWithId, userWithId } from "$core/utils/function";
import { subCommandDirName, subCommandGroupDirNamePrefix } from "./command.const";
import { client, colors } from "$core/client";
import { simpleEmbed } from "$core/utils/embed";
import { translate } from "$core/utils/config/message/message.util";
import { global } from "$core/utils/config/message/command";
import { UserIncludeAll, getUser, updateUser } from "$core/utils/data/user";
import { toLocale, toPrismaLocale } from "$core/utils/locale";
import { privacy } from "prisma/privacy.config";
import { acceptPrivacy } from "$core/utils/config/buttons";
import { DayJS } from "$core/utils/day-js";

const limitedUsageCommands = ["ask", "chat"];

export const load = async(commandsFolder: string): Promise<LoadedCommands> => {
  const commands: CommandsCollection = new Collection();
  const commandsBuilders: CommandsBuilderCollection = new Collection();
  const folders = readdirSync(commandsFolder);

  if (isKillerEnvironment) {
    client.application?.commands.set([]);
    colors.info("Deleted all global commands");

    for (const guild of client.guilds.cache.values()) {
      const guildCommands = await guild.commands.fetch();
      guildCommands.forEach((command) => command.delete());
      colors.info(`Deleted all commands in ${guild.name}`);
    }
  }

  for (const folder of folders) {
    const path = `${commandsFolder}${sep}${folder}${sep}`;

    if (!statSync(path).isDirectory()) continue;

    const builderFileName = `${folder}.builder.ts`;

    if (!existsSync(`${path}${builderFileName}`)) throw new Error(`"${builderFileName}" file can't be found in \`${path}\``);

    const dynamicBuilderImport = await import(`${path}${builderFileName}`);
    const enableInDev = dynamicBuilderImport.enableInDev ?? false;

    if (!enableInDev && isDevEnvironment) continue;

    const builder = dynamicBuilderImport.slashCommand;

    if (!builder) throw new Error(`"${builderFileName}" doesn't have \`slashCommand\` export defined in \`${path}\``);

    if (folder !== builder.name) throw new Error(`Folder name and command name are different in ${path}`);

    commandsBuilders.set(builder.name, builder);

    if (!haveSubcommands(builder)) {
      const commandFileName = `${folder}.cmd.ts`;

      if (!existsSync(`${path}${builderFileName}`)) throw new Error(`"${commandFileName}" file can't be found in \`${path}\``);

      const dynamicCommandImport = await import(`${path}${commandFileName}`);
      const execute: CommandExecute = dynamicCommandImport.execute;

      if (!execute) throw new Error(`${commandFileName} doesn't have "execute" function`);

      commands.set(serializeCommandName(builder.name), execute);
      continue;
    }

    if (!folderExist(`${path}${subCommandDirName}`)) throw new Error(`${subCommandDirName} doesn't exist`);

    for (const commandOption of builder.options) {
      if (commandOption instanceof SlashCommandSubcommandGroupBuilder) {
        const subCommandGroupFolder = `${subCommandDirName}${sep}${subCommandGroupDirNamePrefix}${commandOption.name}${sep}`;

        if (!folderExist(`${path}${subCommandGroupFolder}`)) throw new Error(`"${commandOption.name}" SubCommandGroup folder doesn't exist`);

        for (const subCommandGroupOption of commandOption.options) {
          const subCommandFileName = `${commandOption.name}-${subCommandGroupOption.name}.cmd.ts`;

          if (!existsSync(`${path}${builderFileName}`)) {
            throw new Error(`"${subCommandFileName}" file can't be found in \`${subCommandGroupFolder}\``);
          }

          const dynamicCommandImport = await import(`${path}${subCommandGroupFolder}${subCommandFileName}`);
          const execute: CommandExecute = dynamicCommandImport.execute;

          if (!execute) throw new Error(`${subCommandFileName} doesn't have "execute" function`);

          commands.set(serializeCommandName(builder.name, subCommandGroupOption.name, commandOption.name), execute);
          continue;
        }
      } else if (commandOption instanceof SlashCommandSubcommandBuilder) {
        const subCommandFileName = `${commandOption.name}.cmd.ts`;

        if (!existsSync(`${path}${subCommandDirName}${sep}${subCommandFileName}`)) {
          throw new Error(`"${subCommandFileName}" file can't be found in \`${subCommandDirName}\``);
        }

        const dynamicCommandImport = await import(`${path}${subCommandDirName}${sep}${subCommandFileName}`);
        const execute: CommandExecute = dynamicCommandImport.execute;

        if (!execute) throw new Error(`${subCommandFileName} doesn't have "execute" function`);

        commands.set(serializeCommandName(builder.name, commandOption.name), execute);
      }
    }
  }

  return {
    commands,
    builders: commandsBuilders
  };
};

export const listener = async(client: Client<true>, commands: CommandsCollection): Promise<void> => {
  client.on("interactionCreate", async(interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const commandExecute = commands.get(serializeCommandName(
      interaction.commandName,
      interaction.options.getSubcommand(false) ?? undefined,
      interaction.options.getSubcommandGroup() ?? undefined
    ));

    if (!interaction.guild) {
      interaction.reply({
        embeds: [simpleEmbed(translate(interaction.locale, global.config.exec.error, {
          error: translate(interaction.locale, global.config.exec.notInAGuild)
        }), "error")], ephemeral: true
      });

      colors.error(`${userWithId(interaction.user)} tried to use the command ${interactionWithId(interaction)} in DM`);
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const member = await interaction.guild.members.fetch(client.user.id);
    const missingPermissions = member.permissions.missing([
      "SendMessages",
      "EmbedLinks",
      "ManageThreads",
      "SendMessagesInThreads",
      "CreatePrivateThreads",
      "CreatePublicThreads",
      "AddReactions",
      "UseApplicationCommands",
      "AddReactions",
      "AttachFiles"
    ]);

    if (missingPermissions && missingPermissions.length > 0) {
      interaction.editReply({
        embeds: [
          simpleEmbed(translate(interaction.locale, global.config.exec.botPermissionsNotFound, {
            permissions: missingPermissions.map((permission) => `\`${permission}\``).join(", ")
          }), "error")
        ]
      });

      colors.error([
        `${userWithId(interaction.user)} tried to use the command ${interactionWithId(interaction)}`,
        " but the bot doesn't have the permissions: " + missingPermissions.map((permission) => `\`${permission}\``).join(", ")
      ].join(""));
      return;
    }

    if (!commandExecute) return;

    const channel = await interaction.guild.channels.fetch(interaction.channelId).catch((error: Error) => {
      interaction.editReply({ embeds: [simpleEmbed(translate(interaction.locale, global.config.exec.error, { error: error.message }), "error")] });
      colors.error(`${userWithId(interaction.user)} tried to use the command ${interactionWithId(interaction)} in a non-existent/not access`);
      return;
    });

    if (!(channel instanceof TextChannel) && !(channel instanceof ThreadChannel)) {
      interaction.editReply({
        embeds: [
          simpleEmbed(translate(interaction.locale, global.config.exec.error, {
            error: translate(interaction.locale, global.config.exec.notInATextChannel)
          }), "error")
        ]
      });

      colors.error(`${userWithId(interaction.user)} tried to use the command ${interactionWithId(interaction)} in a non-text channel`);
      return;
    }

    const user = await getUser(interaction.user);
    if (user.username !== interaction.user.username) await updateUser(interaction.user.id, { username: interaction.user.username });
    if (toLocale(user.locale) !== interaction.locale) await updateUser(interaction.user.id, { locale: toPrismaLocale(interaction.locale) });

    let accepted = user.privacy?.accepted ?? false;

    if (!user.privacy?.accepted) {
      const message = await interaction.editReply({
        embeds: [
          simpleEmbed(translate(interaction.locale, privacy.config.exec.privacyPolicy, {
            cmdHistory: await findCommand("history"),
            cmdRoadmap: await findCommand("roadmap"),
            cmdPrivacy: await findCommand("privacy"),
            cmdPrivacyDeletion: await findCommand("privacy")
          }), "error"),
          simpleEmbed(translate(interaction.locale, privacy.config.exec.doYouAccept), "info")
        ],
        components: [{
          type: 1,
          components: [acceptPrivacy(interaction)]
        }]
      });

      const collector = message.createMessageComponentCollector({
        filter: (collectorInteraction) => collectorInteraction.user.id === interaction.user.id,
        time: 60000
      });

      collector.on("collect", async(buttonInteraction) => {
        await buttonInteraction.deferUpdate();

        if (buttonInteraction.customId === "acceptPrivacy") {
          await updateUser(interaction.user.id, { privacy: { update: { accepted: true, collectChat: true, failed: false } } });
          buttonInteraction.editReply({ embeds: [
            simpleEmbed(translate(interaction.locale, privacy.config.exec.accepted), "info"),
            simpleEmbed(translate(interaction.locale, privacy.config.exec.acceptedNotifyExecuted), "success")
          ], components: [] });
          accepted = true;
          colors.info(`${userWithId(interaction.user)} accepted the privacy policy`);
          collector.stop();
          return;
        }
      });

      colors.error(`${userWithId(interaction.user)} tried to use the command ${interactionWithId(interaction)} but he didn't accept the privacy`);
    }

    if (accepted) {
      decrement(interaction, user);
      colors.info(`${userWithId(interaction.user)} used the command ${interactionWithId(interaction)}`);
      commandExecute(interaction, user);
      return;
    } else {
      const interval = setInterval(async() => {
        if (accepted) {
          decrement(interaction, user);
          colors.info(`${userWithId(interaction.user)} used the command ${interactionWithId(interaction)}`);
          commandExecute(interaction, user);
          clearInterval(interval);
        }
      }, 2000);
    }
  });
};

export const decrement = async(interaction: CommandInteraction, user: UserIncludeAll): Promise<void> => {
  if (limitedUsageCommands.includes(interaction.commandName) && (user?.usages?.usage ?? 0) <= 0) {
    interaction.editReply({
      embeds: [
        simpleEmbed(translate(interaction.locale, global.config.exec.noMoreUsages, {
          unix: DayJS().endOf("day").unix()
        }), "error")
      ]
    });

    colors.error(`${userWithId(interaction.user)} tried to use the command ${interactionWithId(interaction)} but he has no more usages`);
    return;
  }
};

export const register = async(client: Client, commandsBuilder: CommandsBuilderCollection): Promise<void> => {
  for (const commandBuilder of commandsBuilder.values()) {
    await client.application?.commands.create(commandBuilder);
  }
};

export type Commands = "ask" | "chat" | "history" | "roadmap" | "request" | "privacy" | "support";
export type SubCommands = "stop" | "talk" | "download";

export const findCommand = async(cmd: Commands, subCommand?: SubCommands): Promise<string> => {
  const commands = await client.application?.commands.fetch();
  const command = commands?.find((command) => command.name === cmd);
  if (!command) return "cmdNotFound";

  if (!subCommand) return "</" + command.name + ":" + command.id + ">";

  const subCommandGroup = command.options.find((option) => option.name === subCommand);
  if (!subCommandGroup) return "subCommandGroupNotFound";

  return "</" + command.name + " " + subCommandGroup.name + ":" + command.id + ">";
};