import Event from '$core/events/Event';
import { simpleEmbed } from '$core/utils/Embed';
import { SelectMenuBuilder } from '@discordjs/builders';
import { ButtonInteraction, ChannelType } from 'discord.js';

export default class ThreadButtons extends Event {

	constructor() {
		super('interactionCreate', false);
	}

	public async execute(interaction: ButtonInteraction): Promise<void> {
    if (interaction.isButton()) {
      const channel = interaction.channel;

      if (interaction.customId.startsWith("open_thread_")) {
        const id = interaction.customId.replace("open_thread_", "");
        
        if (id !== interaction.user.id) {
          await interaction.reply({
            embeds: [ simpleEmbed("You can't open a thread for someone else", "error") ],
            ephemeral: true
          });
          return;
        }

        if (channel?.type !== ChannelType.GuildText) return;
        const message = await channel.messages.fetch(interaction.message.id);

        await interaction.message.edit({
          components: []
        });

        if (!message) return;

        const description = message.embeds[0].description ?? "";
        const startIndex = description.indexOf(":man: ") + ":man: ".length;
        const endIndex = description.indexOf("\n", startIndex);
        const extractedText = description.substring(startIndex, endIndex);

        await channel.threads.create({
          name: extractedText,
          autoArchiveDuration: 60,
          startMessage: message,
          reason: "Opened a thread with the bot"
        });

        await interaction.reply({
          embeds: [ simpleEmbed("Opened a thread with the bot", "normal") ],
          ephemeral: true
        });
      }
	  }
  }
}