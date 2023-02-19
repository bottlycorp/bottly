import { ChatInputCommandInteraction, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Command from "$core/commands/command";
import { chatWithAI } from "$core/utils/OpenAI";

export default class Ask extends Command {

  public readonly enabledInDev = true;

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask a question to the bot")
    .addStringOption(new SlashCommandStringOption()
      .setName("question")
      .setDescription("The question to ask")
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    command.deferReply();
		let question = command.options.getString("question");

		if (!question) {
			await command.editReply({
				content: "You must provide a question"
			});
			return;
		}
		
		const answer = await chatWithAI(question);

		await command.editReply({
			content: answer
		});
  }

}