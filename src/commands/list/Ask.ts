import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Command from "$core/commands/Command";
import { chatWithAI } from "$core/utils/OpenAI";
import { addRequest } from "$core/utils/Request";
import dayjs from "dayjs";
import { clearLineBreaks, limit, toBase64 } from "$core/utils/Utils";
import { contextChoices, localChoices, locals, msg, replaces } from "$core/utils/Message";
import Logger from "$core/utils/Logger";
import { simpleEmbed } from "$core/utils/Embed";

export let question: string;

export default class Ask extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ask")
    .setNameLocalizations({
      fr: "question"
    })
    .setDescription("Ask a question to the bot")
    .setDescriptionLocalizations({
      fr: "Posez une question au bot"
    })
    .addStringOption(new SlashCommandStringOption()
      .setName("question")
      .setNameLocalizations({
        fr: "demande"
      })
      .setDescription("The question you want to ask")
      .setDescriptionLocalizations({
        fr: "La question que vous voulez poser"
      })
      .setRequired(true))
    .addStringOption(new SlashCommandStringOption()
      .setName("context")
      .setNameLocalizations({
        fr: "contexte"
      })
      .setDescription("The context of the question, it will help the bot to answer better")
      .setDescriptionLocalizations({
        fr: "Le contexte de la question, cela va aider le bot à mieux répondre"
      })
      .setRequired(false)
      .addChoices(...contextChoices))
      .addStringOption(new SlashCommandStringOption()
        .setName("lang")
        .setNameLocalizations({
          fr: "langue"
        })
        .setDescription("The language of the answer")
        .setDescriptionLocalizations({
          fr: "La langue de la réponse"
        })
        .addChoices(...localChoices));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply();
    let responsePattern = "The response need to be in {lang}, and the context is {context}, here is the question: {question}";

    question = command.options.getString("question", true);

		if (!question) {
			await command.editReply({ embeds: [ simpleEmbed("You must provide a question", "error")] });
			return;
		}

    let context = command.options.getString("context", false) ?? "0";
    let contextLang = locals[command.options.getString("lang", false) ?? command.locale];

    let que = replaces(responsePattern, [
      contextLang, context, question
    ]);
    
    let answer = await chatWithAI(que);
    Logger.request(question)

    const embed = simpleEmbed(msg("ask_response_description", [question, context, contextLang, clearLineBreaks(limit(answer, 3080, "..."), 2)], command.locale), "normal", msg("ask_response_title", [], command.locale), {
      text: command.user.tag,
      iconURL: command.user.avatarURL() as string,
      timestamp: true
    });

    let buttons = [{
      type: 2,
      style: 1,
      label: "Open a thread",
      custom_id: "open_thread",
      disabled: command.channel?.isThread() ?? false
    }]

		await command.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] }).then(async (msg) => {
      let guildName = command.guild?.name;
      let channelName = command.guild?.channels.cache.get(command.channelId)?.name;
      
      addRequest(command.user.id, {
        question: question,
        answer: toBase64(answer),
        messageLink: msg.url,
        createdAt: dayjs().unix(),
        channelName: channelName ?? "Unknown",
        guildName: guildName ?? "Unknown",
        options: {
          context: context,
          lang: contextLang
        }
      });
    });
  }
}