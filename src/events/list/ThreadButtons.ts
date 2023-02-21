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
        case "open_thread":
          if (channel?.type !== ChannelType.GuildText) return;
          const message = await channel.messages.fetch(interaction.message.id);

          await interaction.message.edit({
            components: []
          });

          if (!message) return;
 
          const question = message.embeds[0].description?.match(/(?<=Q: \*\*)(.*)(?=\*\*)/)?.[0];
          console.log(question); 

          await channel.threads.create({
            name: question || "Thread",
            autoArchiveDuration: 60,
            startMessage: message,
            reason: "Opened a thread with the bot"
          });
  
          await interaction.reply({
            embeds: [ simpleEmbed("Opened a thread with the bot", "normal") ],
            ephemeral: true
          });
          break;
      }
	  }
  }
}