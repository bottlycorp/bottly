import { request } from "$resources/messages.json";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Command from "$core/commands/Command";

export default class Request extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("request")
    .setDescription(request.command.description["en-US"])
    .setDescriptionLocalizations({ fr: request.command.description.fr })
    .addStringOption(new SlashCommandStringOption()
      .setName("id")
      .setDescription(request.command.options.id["en-US"])
      .setDescriptionLocalizations({ fr: request.command.options.id.fr })
      .setRequired(true));

  public async execute(command: ChatInputCommandInteraction): Promise<void> {
    await command.deferReply({ ephemeral: true });
    await command.reply("Not implemented yet.");
  }

}