import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { simpleEmbed } from "$core/utils/Embed";

export let question: string;

export default class Ask extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("list")
    .setNameLocalizations({
      fr: "liste",
      "en-US": "list"
    })
    .setDescription("List for your questions")
      .setDescriptionLocalizations({
        fr: "Liste pour vos questions",
        "en-US": "List for your questions"
      })
      .addSubcommand(subcommand =>
        subcommand
          .setName("create")
          .setNameLocalizations({
            fr: "nouvelle",
            "en-US": "create"
          })
          .setDescription("Create a list")
          .setDescriptionLocalizations({
            fr: "Créer une liste",
            "en-US": "Create a list"
          })
          .addStringOption(option =>
            option.setName("name")
              .setNameLocalizations({
                fr: "nom",
                "en-US": "name"
              })
              .setDescription("The name of the list")
              .setRequired(true)
              .setDescriptionLocalizations({
                fr: "Le nom de la liste",
                "en-US": "The name of the list"
              })
          )
          .addStringOption(option =>
            option.setName("emoji")
              .setDescription("The emoji of the list")
              .setRequired(false)
              .setDescriptionLocalizations({
                fr: "L'emoji de la liste",
                "en-US": "An emoji for the icon list"
              })
          )
          .addStringOption(option =>
            option.setName("description")
              .setDescription("The description of the list")
              .setRequired(false)
              .setDescriptionLocalizations({
                fr: "La description de la liste",
                "en-US": "A description for the list"
              })
          )
      );

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    await command.deferReply();

    question = command.options.getString("question", true);

		if (!question) {
			await command.editReply({
				content: "You must provide a question"
			});
			return;
		}

		await command.editReply({ embeds: [ simpleEmbed("La liste a été créée avec succès 👍") ]});
  }
}