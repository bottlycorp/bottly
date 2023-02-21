import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder } from "discord.js";
import Command from "$core/commands/Command";
import { chatWithAI } from "$core/utils/OpenAI";
import { addRequest } from "$core/utils/Request";
import dayjs from "dayjs";
import { toBase64 } from "$core/utils/Utils";

export let question: string;

export default class Ask extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask a question to the bot")
    .addStringOption(new SlashCommandStringOption()
      .setName("question")
      .setDescription("The question to ask")
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    command.deferReply();

    question = command.options.getString("question", true);

		if (!question) {
			await command.editReply({
				content: "You must provide a question"
			});
			return;
		}
		
		const answer = await chatWithAI(question);

    const embed = new EmbedBuilder()
      .setTitle("Response to your question")
      .setDescription("Q: **" + question + "**" + answer)
      .setColor("#4353fc")
      .setTimestamp()
      .setFooter({ text: command.user.tag, iconURL: command.user.avatarURL() as string })

    let buttons = [{
      type: 2,
      style: 1,
      label: "Open a thread",
      custom_id: "open_thread"
    }];

		await command.editReply({ embeds: [embed], components: [{ type: 1, components: buttons }] }).then(async (msg) => {
      addRequest(command.user.id, {
        question: question,
        answer: toBase64(answer),
        messageLink: msg.url,
        createdAt: dayjs().unix()
      });
    });
  }
}