import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder, SlashCommandMentionableOption } from "discord.js";
import Command from "$core/commands/Command";
import { chatWithAI } from "$core/utils/OpenAI";
import { addRequest } from "$core/utils/Request";
import dayjs from "dayjs";
import { clearLineBreaks, limit, toBase64 } from "$core/utils/Utils";
import { langs, msg, replaces } from "$core/utils/Message";
import { Lang } from "$core/utils/types";
import Logger from "$core/utils/Logger";

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
          name: "🧬 Code generation, completion, correction, etc.", value: "code_generation", name_localizations: {
            fr: "🧬 Génération de code, complétion, correction, etc."
          }
        },
        { 
          name: "🧑‍🏭 Solve a problem", value: "problem_solving", name_localizations: {
            fr: "🧑‍🏭 Résoudre un problème"
          }
        },
        { 
          name: "🌐 Find information, response", value: "find_information", name_localizations: {
            fr: "🌐 Trouver de l'information"
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
        .addChoices(
          { name: "🇫🇷 French", value: "fr_FR", name_localizations: { fr: "🇫🇷 Français" } },
          { name: "🇩🇪 German", value: "de_DE", name_localizations: { fr: "🇩🇪 Allemand" } },
          { name: "🇺🇸 English", value: "en_US", name_localizations: { fr: "🇺🇸 Anglais" } },
          { name: "🇬🇧 English (GB)", value: "en_GB", name_localizations: { fr: "🇬🇧 Anglais (GB)" } },
          { name: "🇧🇬 Bulgarian", value: "bg_BG", name_localizations: { fr: "🇧🇬 Bulgare" } },
          { name: "🇨🇳 Chinese", value: "zh_CN", name_localizations: { fr: "🇨🇳 Chinois" } },
          { name: "🇰🇷 Korean", value: "ko_KR", name_localizations: { fr: "🇰🇷 Coréen" } },
          { name: "🇩🇰 Danish", value: "da_DK", name_localizations: { fr: "🇩🇰 Danois" } },
          { name: "🇪🇸 Spanish", value: "es_ES", name_localizations: { fr: "🇪🇸 Espagnol" } },
          { name: "🇪🇪 Estonian", value: "et_EE", name_localizations: { fr: "🇪🇪 Estonien" } },
          { name: "🇫🇮 Finnish", value: "fi_FI", name_localizations: { fr: "🇫🇮 Finiois" } },
          { name: "🇬🇷 Greek", value: "el_GR", name_localizations: { fr: "🇬🇷 Grec" } },
          { name: "🇭🇺 Hungarian", value: "hu_HU", name_localizations: { fr: "🇭🇺 Hongrois" } },
          { name: "🇮🇩 Indonesian", value: "id_ID", name_localizations: { fr: "🇮🇩 Indonéisien" } },
          { name: "🇮🇹 Italian", value: "it_IT", name_localizations: { fr: "🇮🇹 Italien" } },
          { name: "🇯🇵 Japanese", value: "ja_JP", name_localizations: { fr: "🇯🇵 Japonais" } },
          { name: "🇱🇻 Latvian", value: "lv_LV", name_localizations: { fr: "🇱🇻 Lettron" } },
          { name: "🇱🇹 Lithuanian", value: "lt_LT", name_localizations: { fr: "🇱🇹 Lituanien" } },
          { name: "🇳🇱 Dutch", value: "nl_NL", name_localizations: { fr: "🇳🇱 Néerlandais" } },
          { name: "🇳🇴 Norwegian", value: "no_NO", name_localizations: { fr: "🇳🇴 Norvégien" } },
          { name: "🇵🇱 Polish", value: "pl_PL", name_localizations: { fr: "🇵🇱 Polonais" } },
          { name: "🇵🇹 Portuguese", value: "pt_PT", name_localizations: { fr: "🇵🇹 Portugais" } },
          { name: "🇷🇴 Romanian", value: "ro_RO", name_localizations: { fr: "🇷🇴 Roumain" } },
          { name: "🇷🇺 Russian", value: "ru_RU", name_localizations: { fr: "🇷🇺 Russe" } },
          { name: "🇺🇦 Ukrainian", value: "uk_UA", name_localizations: { fr: "🇺🇦 Ukrainien" } }
        )
      );

  public async execute(command: ChatInputCommandInteraction, lang: Lang): Promise<void> {
    await command.deferReply();
    let responsePattern = "The response need to be in {lang}, and the context is {context}, here is the question: {question}";

    question = command.options.getString("question", true);

		if (!question) {
			await command.editReply({
				content: "You must provide a question"
			});
			return;
		}

    let que = replaces(responsePattern, [
      langs[command.options.getString("lang", false) ?? lang], command.options.getString("context", false) ?? "general", question
    ]);
    console.log(que);
    
    let answer = await chatWithAI(que);

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