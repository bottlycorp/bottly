import Event from '$core/events/Event';
import { simpleEmbed } from '$core/utils/Embed';
import { ButtonInteraction, ChannelType } from 'discord.js';

export default class ThreadButtons extends Event {

	constructor() {
		super('interactionCreate', false);
	}

	public async execute(interaction: ButtonInteraction): Promise<void> {
    if (interaction.isButton()) {
      const channel = interaction.channel;

      switch (interaction.customId) {
        case "previous_page":
          interaction.message.edit({
            embeds: [ simpleEmbed("Previous page", "normal") ]
          });
          break;
        case "next_page":
          interaction.message.edit({
            embeds: [ simpleEmbed("Next page", "normal") ]
          });
          break;
      }
	  }
  }
}