import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { chatWithAI } from "$core/utils/OpenAI";
import { addRequest } from "$core/utils/Request";
import dayjs from "dayjs";
import { clearLineBreaks, limit, toBase64 } from "$core/utils/Utils";
import { msg } from "$core/utils/Message";
import { Lang } from "$core/utils/types";
import Logger from "$core/utils/Logger";

export let question: string;

export default class Ask extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ask")
    .setNameLocalizations({
      fr: "question",
      "en-US": "ask"
    })
    .setDescription("Ask a question to the bot")
    .setDescriptionLocalizations({
      fr: "Posez une question au bot",
      "en-US": "Ask a question to the bot"
    })
    .addStringOption(new SlashCommandStringOption()
      .setName("question")
      .setNameLocalizations({
        fr: "demande",
        "en-US": "question"
      })
      .setDescription("The question you want to ask")
      .setDescriptionLocalizations({
        fr: "La question que vous voulez poser",
        "en-US": "The question you want to ask"
      })
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction, lang: Lang): Promise<void> {
    await command.deferReply();

    question = command.options.getString("question", true);

		if (!question) {
			await command.editReply({
				content: "You must provide a question"
			});
			return;
		}
		
		const answer = await chatWithAI(question);
    Logger.request(question)

    const embed = new EmbedBuilder()
      .setTitle(msg("ask_response_title", [], lang))
      .setDescription(msg("ask_response_description", [question, clearLineBreaks(limit(answer, 3080, "..."), 2)], lang))
      .setColor("#4353fc")
      .setTimestamp()
      .setFooter({ text: command.user.tag, iconURL: command.user.avatarURL() as string })

    let buttons = [{
      type: 2,
      style: 1,
      label: "Open a thread",
      custom_id: "open_thread"
    }];

    // , {
    //   type: 2,
    //   style: 1,
    //   label: "Add to favorites",
    //   custom_id: "add_favorite"
    // }, {
    //   type: 2,
    //   style: 1,
    //   label: "Add to a list",
    //   custom_id: "add_list"
    // }

		await command.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] }).then(async (msg) => {
      let guildName = command.guild?.name;
      let channelName = command.guild?.channels.cache.get(command.channelId)?.name;
      
      addRequest(command.user.id, {
        question: question,
        answer: toBase64(answer),
        messageLink: msg.url,
        createdAt: dayjs().unix(),
        channelName: channelName,
        guildName: guildName
      });
    });
  }
}