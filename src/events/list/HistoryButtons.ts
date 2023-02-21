import Event from '$core/events/Event';
import { simpleEmbed } from '$core/utils/Embed';
import { deleteRequests } from '$core/utils/Request';
import { Lang } from '$core/utils/types';
import { ButtonInteraction, ChannelType } from 'discord.js';

export default class ThreadButtons extends Event {

	constructor() {
		super('interactionCreate', false);
	}

	public async execute(lang: Lang, interaction: ButtonInteraction): Promise<void> {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "clear_history":
          let confirmation = simpleEmbed("You are about to clear your history, are you sure?", "normal");

          let buttons = [{
            type: 2,
            style: 1,
            label: "Yes",
            custom_id: "clear_history_confirm"
          }, {
            type: 2,
            style: 4,
            label: "No, cancel",
            custom_id: "clear_history_cancel"
          }];

          await interaction.reply({
            embeds: [ confirmation ],
            components: [{ type: 1, components: buttons }],
            ephemeral: true
          });
          break;
        case "clear_history_confirm":
          await interaction.deferReply({ ephemeral: true });

          await deleteRequests(interaction.user.id);

          await interaction.editReply({
            embeds: [ simpleEmbed("History cleared", "normal") ],
            components: []
          });
          break;
        case "clear_history_cancel":
          await interaction.update({
            embeds: [ simpleEmbed("The history has not been cleared", "normal") ],
            components: []
          });
          break;
      }
	  }
  }
}