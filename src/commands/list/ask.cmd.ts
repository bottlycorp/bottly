import dayjs from "dayjs";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, TextChannel } from "discord.js";
import Command from "$core/commands/command";
import { ask } from "$resources/messages.json";
import { AskContextOptions, buildQuestion, BuildQuestionContext, BuildQuestionLanguage, Locales } from "$core/utils/models";
import { checkUser, getUser, isPremium, updateUser } from "$core/utils/user";
import { getRevealButton, getUsageButton, simpleEmbed } from "$core/utils/embed";
import { getLang } from "$core/utils/message";
import Client from "$core/client";
import { ButtonBuilder } from "@discordjs/builders";
import logger from "$core/utils/logger";
import { prisma } from "$core/utils/prisma";

export default class Ask extends Command {

  public readonly guildOnly = false;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ask")
    .setDescription(ask.command.description["en-US"])
    .setDescriptionLocalizations({ fr: ask.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("content")
      .setDescription(ask.command.options.question["en-US"])
      .setDescriptionLocalizations({ fr: ask.command.options.question.fr })
      .setRequired(true))
    .addStringOption(new SlashCommandStringOption()
      .setName("context")
      .setDescription(ask.command.options.context["en-US"])
      .setDescriptionLocalizations({ fr: ask.command.options.context.fr })
      .addChoices(...AskContextOptions.map(c => ({ name: c.name, value: c.value, name_localizations: { fr: c.name_localizations.fr } }))))
    .addStringOption(new SlashCommandStringOption()
      .setName("language")
      .setDescription(ask.command.options.lang["en-US"])
      .setDescriptionLocalizations({ fr: ask.command.options.lang.fr })
      .addChoices(...Locales.map(l => ({ name: l.name, value: l.value }))))
    .setDMPermission(false);

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });
    const askedAt = dayjs().toDate();
    await checkUser(command.user.id);
    const user = await getUser(command.user.id);
    const isPremiumUser = isPremium(user);

    if (!command.guild) {
      await command.reply({ embeds: [simpleEmbed(ask.errors.guildOnly[getLang(command.locale)], "error", { f: command.user })] });
      return;
    }

    const member = await command.guild?.members.fetch(process.env.CLIENT_ID ?? "010101");
    if (!member.permissions.has("SendMessages") || !member.permissions.has("ManageMessages") || !member.permissions.has("EmbedLinks")) {
      await command.reply({ embeds: [simpleEmbed(ask.errors.permissions[getLang(command.locale)], "error", { f: command.user })] });
      return;
    }

    if (!isPremiumUser) {
      if ((await getUser(command.user.id)).askUsage == 0) {
        command.editReply({ embeds: [simpleEmbed(ask.errors.trial[getLang(command.locale)], "error", { f: command.user })] });
        return;
      }
    }

    const question = command.options.getString("content", true);
    const context: BuildQuestionContext = command.options.getString("context", false) ?? "default";
    const language: BuildQuestionLanguage = command.options.getString("language", false) ?? command.locale;
    const finalQuestion = buildQuestion(question, context, language);

    const response = await Client.instance.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 2000,
      temperature: 0.9,
      messages: [{ content: finalQuestion, name: "User", role: "user" }]
    });

    const text = response.data.choices[0].message?.content ?? "I don't know what to say...";

    const embed = simpleEmbed(text, "normal", {
      text: command.user.username,
      timestamp: true,
      iconURL: command.user.displayAvatarURL()
    });

    const buttons: ButtonBuilder[] = [];
    if (!isPremiumUser) buttons.push(getUsageButton(user.askUsage - 1));
    buttons.push(getRevealButton(user.askUsage - 1));

    const channel = await command.client.channels.fetch(command.channelId);
    if (!channel || !(channel instanceof TextChannel)) return;
    const collector = channel.createMessageComponentCollector({ time: 20000 });

    collector.on("collect", async i => {
      if (!i.isButton()) return;
      if (i.customId.startsWith("reveal")) {
        if (isPremiumUser) {
          await i.update({ embeds: [embed], components: [] });
          channel.send({ embeds: [embed.data], components: [] });
          return;
        }

        const usageRemaining: number = parseInt(i.customId.split("_")[1]);
        await i.update({ components: [{ type: 1, components: [getUsageButton(usageRemaining)] }] });
        await channel.send({ embeds: [embed.data], components: [{ type: 1, components: [getUsageButton(usageRemaining)] }] });
      }
    });

    if (!isPremiumUser) {
      collector.on("end", async() => {
        await command.editReply({ components: [{ type: 1, components: [getUsageButton(user.askUsage)] }] });
      });
    }

    await command.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] }).then(async() => {
      logger.request(finalQuestion);

      await prisma.stats.create({
        data: {
          createdAt: dayjs().toDate(),
          guildId: command.guild?.id ?? "DM",
          userId: command.user.id,
          type: "ask"
        }
      });

      await prisma.requests.create({
        data: {
          userId: command.user.id,
          guildName: command.guild?.name ?? "DM",
          channelName: channel.name ?? "DM",
          question: question,
          answer: Buffer.from(text).toString("base64"),
          answeredAt: dayjs().toDate(),
          askedAt: askedAt,
          timestamp: dayjs().unix().toString(),
          options: {
            context: context ?? "default",
            language: language ?? command.locale
          }
        }
      });

      await updateUser(command.user.id, { lastAsked: dayjs().unix().toString(), askUsage: user.askUsage - 1 });

      if (!isPremiumUser) {
        if (text !== "I don't know what to say...") await updateUser(command.user.id, { askUsage: user.askUsage - 1 });
      }
    }).catch(async() => {
      await command.editReply({ embeds: [simpleEmbed(ask.errors.error[getLang(command.locale)], "error", { f: command.user })] });
    });
  }

}