import Event from '$core/events/Event';
import { simpleEmbed } from '$core/utils/Embed';
import { Lang } from '$core/utils/types';
import { SelectMenuBuilder } from '@discordjs/builders';
import { ButtonInteraction, ChannelType } from 'discord.js';

export default class ThreadButtons extends Event {

	constructor() {
		super('interactionCreate', false);
	}

	public async execute(lang: Lang, interaction: ButtonInteraction): Promise<void> {
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
        case "add_list":
          let lists = ["Recettes", "Courses", "Autres"];
          let embed = null;
          if (lists.length === 0) {
            await interaction.reply({ embeds: [simpleEmbed("Vous n'avez pas encore créé de liste", "normal")] });
          } else {
            let select = new SelectMenuBuilder()
              .setCustomId("select_list")
              .setPlaceholder("Choisissez une liste")
              .addOptions([
                { label: "Recettes", value: "recettes" },
                { label: "Courses", value: "courses" },
                { label: "Autres", value: "autres"}
              ]);

            // Reply with text (No embed)
            await interaction.reply({ content: "Choisissez une liste, créer en une avec la commande", components: [{ type: 1, components: [select] }], ephemeral: true });
          }
          break;
        case "cancel":
          // Delete a ephemeral message (only the user can see it)
          await interaction.deleteReply();
          break;
      }
	  }
  }
}