import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder, SlashCommandMentionableOption } from "discord.js";
import Command from "$core/commands/Command";
import { chatWithAI } from "$core/utils/OpenAI";
import { addRequest } from "$core/utils/Request";
import dayjs from "dayjs";
import { clearLineBreaks, limit, toBase64 } from "$core/utils/Utils";
import { localChoices, locals, msg, replaces } from "$core/utils/Message";
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
      .addChoices(
        { 
          name: "🧮 Math problem, question, etc.", value: "Mathematic problem, question, etc.", name_localizations: {
            fr: "🧮 Problème mathématique, question, etc."
          }
        },
        { 
          name: "🪄 Programming problem, question, etc.", value: "Programming problem, question, etc.", name_localizations: {
            fr: "🪄 Problème de programmation, question, etc."
          }
        },
        { 
          name: "📝 Generate a story, a text, ect", value: "Generate a story", name_localizations: {
            fr: "📝 Générer une histoire, un texte, etc."
          }
        },
        { 
          name: "🪡 Translate a text", value: "Translate a text", name_localizations: {
            fr: "🪡 Traduire un texte"
          }
        },
        { 
          name: "🧬 Code generation, completion, correction, etc.", value: "Code generation", name_localizations: {
            fr: "🧬 Génération de code, complétion, correction, etc."
          }
        },
        { 
          name: "🔎 Solve a problem", value: "Solving a problem", name_localizations: {
            fr: "🔎 Résoudre un problème"
          }
        },
        { 
          name: "🌐 Find information, response", value: "Find information or response", name_localizations: {
            fr: "🌐 Trouver de l'information"
          }
        },
        {
          name: "🧩 Generation", value: "Generation of something", name_localizations: {
            fr: "🧩 Génération"
          }
        }
      ))
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
			await command.editReply({
				content: "You must provide a question"
			});
			return;
		}

    let context = command.options.getString("context", false) ?? "General";
    console.log(command.locale);
    let contextLang = locals[command.options.getString("lang", false) ?? command.locale];
    console.log(contextLang);

    let que = replaces(responsePattern, [
      contextLang, context, question
    ]);
    
    console.log(que);
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
        guildName: guildName,
        options: {
          context: context,
          lang: contextLang
        }
      });
    });
  }
}