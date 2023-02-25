import { ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import Command from "$core/commands/Command";
import Client from "$core/Client";
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { simpleEmbed } from "$core/utils/Embed";

export default class HistoryCommand extends Command {

  public readonly slashCommand = new SlashCommandBuilder()
    .setName("pro")
    .setDescription("Get the pro version of the bot")

  public async execute(command: ChatInputCommandInteraction) : Promise<void> {
    let proMessage = `:wave: ${command.user.username} !\n\n`;
    proMessage += "Do you want to have an increase in the number of requests per month?\n";
    proMessage += "Subscribe to the Premium version of the bot to increase the limit\n\n";

    proMessage += "- 1000 </ask:1077289203441864805> requests per month\n";
    proMessage += "- 500 </imagine:1078848364722008145> requests per month\n";
    proMessage += "- Enlarge your images generated and don't get stuck in 1024x1024 !\n";
    proMessage += "- As many lists as you want to store your favorite answers\n";
    proMessage += "- Aquire the **Pro** role on the support server\n";

    proMessage += "\nWhat are you waiting for?\n";
    proMessage += "It's only **$7.99** per month with a 3 days **free trial** and can be **cancelled at any time**!";

    const subscribe = {
      type: 2,
      style: ButtonStyle.Link,
      label: "Subscribe now",
      url: "https://github.com/sponsors/Steellgold"
    }

    command.reply({
      embeds: [simpleEmbed(proMessage, "pro")],
      components: [{ type: 1, components: [subscribe] }]
    });
  }
}