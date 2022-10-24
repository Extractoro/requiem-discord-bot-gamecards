import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import Game from "./db/gamesSchema.js";

const gameCard = async (interaction) => {
  const games = await Game.find();

  games.map((game) =>
    interaction.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0x0000)
          .setTitle(`${game.gameName}`)
          .setDescription(`${game.gameDescr}`)
          .addFields(
            {
              name: `Тип`,
              value: `\` ${game.gameType}      \``,
              inline: true,
            },
            {
              name: `Минимум игроков`,
              value: `\` ${game.gameMinPlayers}                \``,
              inline: true,
            },
            {
              name: `Максимум игроков`,
              value: `\` ${game.gameMaxPlayers}                 \``,
              inline: true,
            },
            {
              name: `Подписано`,
              value: `\` ${game.gameSubscr}                        \``,
              inline: true,
            },
            {
              name: `Платформа`,
              value: `\` ${game.gamePlatform}                           \``,
              inline: true,
            }
          )
          .setImage(`${game.gameImage}`),
      ],
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId(`${game.gameId}-subscribe`)
            .setLabel("Подписаться")
            .setStyle(ButtonStyle.Success)
            .setEmoji("📜")
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId(`${game.gameId}-unsubscribe`)
            .setLabel("Отписаться")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("⛔")
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId(`${game.gameId}-players`)
            .setLabel("Игроки")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("⚔")
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId(`${game.gameId}-create`)
            .setLabel("Создать")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("🔊")
            .setDisabled(false),
          new ButtonBuilder()
            .setLabel("Чат")
            .setStyle(ButtonStyle.Link)
            .setURL(
              `https://discordjs.guide/popular-topics/embeds.html#embed-preview`
            )
            .setEmoji("💬")
            .setDisabled(false)
        ),
      ],
    })
  );
};

export default gameCard;
