import Client from "$core/Client";
import Command from "$core/commands/Command";
import { getChatButton, getRevealButton, getUsageButton, simpleEmbed } from "$core/utils/Embed";
import { buildQuestion, AskContextOptions, Locales } from "$core/utils/Models";
import { checkUser, getUser, updateUser } from "$core/utils/User";
import { ask } from "$resources/messages.json";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, TextChannel } from "discord.js";

export default class Ask extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ask")
    .setDescription(ask.command.description["en-US"])
    .setDescriptionLocalizations({ fr: ask.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("question")
      .setDescription(ask.command.options.question["en-US"])
      .setDescriptionLocalizations({ fr: ask.command.options.question.fr })
      .setRequired(true))
    .addStringOption(new SlashCommandStringOption()
      .setName("context")
      .setDescription(ask.command.options.context["en-US"])
      .setDescriptionLocalizations({ fr: ask.command.options.context.fr })
      .addChoices(...AskContextOptions.map(c => ({ name: c.name, value: c.value }))))
    .addStringOption(new SlashCommandStringOption()
      .setName("language")
      .setDescription(ask.command.options.lang["en-US"])
      .setDescriptionLocalizations({ fr: ask.command.options.lang.fr })
      .addChoices(...Locales.map(l => ({ name: l.name, value: l.value }))));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });
    await checkUser(command.user.id);
    const user = await getUser(command.user.id);

    if ((await getUser(command.user.id)).monthly == 0) {
      command.editReply({ content: "Your free trial expired (wait next month)" });
      return;
    }

    const question = command.options.getString("question", true);
    const context = command.options.getString("context", false);
    const language = command.options.getString("language", false);

    const finalQuestion = buildQuestion(question, context ?? "default", language ?? command.locale);

    const response = await Client.instance.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1500,
      temperature: 0.9,
      messages: [{ content: finalQuestion, name: "User", role: "user" }]
    });

    const text = response.data.choices[0].message?.content ?? "I don't know what to say...";

    if (text !== "I don't know what to say...") {
      await updateUser(command.user.id, { monthly: user.monthly - 1 });
    }

    const embed = simpleEmbed(text, "normal", {
      text: command.user.username,
      timestamp: true,
      iconURL: command.user.displayAvatarURL()
    });

    const channel = await command.client.channels.fetch(command.channelId);
    if (!channel || !(channel instanceof TextChannel)) return;
    const collector = channel.createMessageComponentCollector({ time: 60000 });

    collector.on("collect", async i => {
      if (!i.isButton()) return;
      if (i.customId.startsWith("reveal")) {
        const usageRemaining: number = parseInt(i.customId.split("_")[1]);
        await i.update({ components: [{ type: 1, components: [
          getChatButton(),
          getUsageButton(usageRemaining)
        ] }] });
        await channel.send({ embeds: [embed.data], components: [{ type: 1, components: [
          getChatButton(),
          getUsageButton(usageRemaining)
        ] }] });
      }
    });

    collector.on("end", async() => {
      await command.editReply({ components: [{ type: 1, components: [
        getChatButton(),
        getUsageButton(user.monthly)
      ] }] });
    });

    await command.editReply({ embeds: [embed], components: [{ type: 1, components: [
      getChatButton(),
      getUsageButton(user.monthly),
      getRevealButton(user.monthly)
    ] }] });
  }

}