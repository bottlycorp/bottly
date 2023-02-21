import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder, SlashCommandMentionableOption } from "discord.js";
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
      .setRequired(true))
    .addStringOption(new SlashCommandStringOption()
      .setName("context")
      .setNameLocalizations({
        fr: "contexte",
        "en-US": "context"
      })
      .setDescription("The context of the question")
      .setDescriptionLocalizations({
        fr: "Le contexte de la question, cela va aider le bot à mieux répondre",
        "en-US": "The context of the question, it will help the bot to answer better"
      })
      .setRequired(false)
      .addChoices(
        { 
          name: "🧮 Problème mathématique, question, etc.", 
          value: "math", 
          name_localizations: {
            fr: "🧮 Problème mathématique, question, etc.",
            "en-US": "🧮 Math problem, question, etc."
          }
        },
        { 
          name: "🪄 Problème de programmation, question, etc.", 
          value: "code", 
          name_localizations: {
            fr: "🪄 Problème de programmation, question, etc.",
            "en-US": "🪄 Programming problem, question, etc."
          }
        },
        { 
          name: "📝 Générer une histoire", 
          value: "story", 
          name_localizations: {
            fr: "📝 Générer une histoire",
            "en-US": "📝 Generate a story"
          }
        },
        { 
          name: "🪡 Traduire un texte", 
          value: "translate", 
          name_localizations: {
            fr: "🪡 Traduire un texte",
            "en-US": "🪡 Translate a text"
          }
        },
        { 
          name: "📖 Comprendre un texte", 
          value: "understand_text", 
          name_localizations: {
            fr: "📖 Comprendre un texte",
            "en-US": "📖 Understand a text"
          }
        },
        { 
          name: "🧬 Génération de code, complétion, correction, etc.", 
          value: "code_generation", 
          name_localizations: {
            fr: "🧬 Génération de code, complétion, correction, etc.",
            "en-US": "🧬 Code generation, completion, correction, etc."
          }
        },
        { 
          name: "🧑‍🏭 Résoudre un problème", 
          value: "problem_solving", 
          name_localizations: {
            fr: "🧑‍🏭 Résoudre un problème",
            "en-US": "🧑‍🏭 Solve a problem"
          }
        },
        { 
          name: "🌐 Trouver de l'information", 
          value: "find_information", 
          name_localizations: {
            fr: "🌐 Trouver de l'information",
            "en-US": "🌐 Find information"
          }
        },
        { 
          name: "📚 Trouver une réponse", 
          value: "find_answer", 
          name_localizations: {
            fr: "📚 Trouver une réponse",
            "en-US": "📚 Find an answer"
          }
        },
        { 
          name: "📝 Générer une histoire", 
          value: "generate_story", 
          name_localizations: {
            fr: "📝 Générer une histoire",
            "en-US": "📝 Generate a story"
          }
        },
        { 
          name: "📖 Comprendre un texte", 
          value: "understand_text", 
          name_localizations: {
            fr: "📖 Comprendre un texte",
            "en-US": "📖 Understand a text"
          }
        },
        {
          name: "⚡ Générer une citation",
          value: "generate_quote",
          name_localizations: {
            fr: "⚡ Générer une citation",
            "en-US": "⚡ Generate a quote"
          }
        }
      ))
      .addStringOption(new SlashCommandStringOption()
        .setName("language")
        .setNameLocalizations({
          fr: "langue",
          "en-US": "language"
        })
        .setDescription("The language of the question")
        .setDescriptionLocalizations({
          fr: "La langue de la réponse",
          "en-US": "The language of the answer"
        })
        .addChoices(
          { name: "🇫🇷 Français", value: "Français" },
          { name: "🇬🇧 English", value: "English" },
          { name: "🇩🇪 Deutsch", value: "Allemand" },
          { name: "🇪🇸 Español", value: "Espagnol" },
          { name: "🇮🇹 Italiano", value: "Italiano" },
          { name: "🇯🇵 日本語", value: "日本語" },
          { name: "🇰🇷 한국어", value: "한국어" },
          { name: "🇳🇱 Nederlands", value: "Nederlands" },
          { name: "🇵🇱 Polski", value: "Polski" },
          { name: "🇧🇷 Português", value: "Português" },
          { name: "🇷🇺 Русский", value: "Русский" },
          { name: "🇨🇳 中文", value: "中文" },
        )
      );

  public async execute(command: ChatInputCommandInteraction, lang: Lang): Promise<void> {
    await command.deferReply();

    question = command.options.getString("question", true);

		if (!question) {
			await command.editReply({
				content: "You must provide a question"
			});
			return;
		}

    const context = command.options.getString("context", false);
    const answerLanguage = command.options.getString("language", false) || lang;

    if (context) {
      question += `\nContext: ${context}`;
    }

    question += `\nRequested language of the answer: ${answerLanguage}`;

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