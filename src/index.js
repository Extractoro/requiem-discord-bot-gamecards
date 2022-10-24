import { config } from "dotenv";
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { connect } from "mongoose";

import gameCard from "./gameCard.js";
import User from "./db/userSchema.js";
import Game from "./db/gamesSchema.js";

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const MONGODB_URL = process.env.MONGODB_URL;
const rest = new REST({ version: "10" }).setToken(TOKEN);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(TOKEN);

(async () => {
  await connect(MONGODB_URL, { dbName: "db" })
    .then(console.log("Connected!"))
    .catch(console.error);
})();

client.on("ready", () => {
  console.log(`${client.user.username} is ready!`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "card") {
      //   await interaction.channel.send({
      //     embeds: [
      //       new EmbedBuilder()
      //         .setColor(0x0000)
      //         .setTitle("Dota 2")
      //         .setURL("https://store.steampowered.com/app/570/Dota_2/")
      //         .setDescription(
      //           "Ежедневно миллионы игроков по всему миру сражаются от лица одного из более сотни героев Dota 2, и даже после тысячи часов в ней есть чему научиться. Благодаря регулярным обновлениям игра живёт своей жизнью: геймплей, возможности и герои постоянно преображаются."
      //         )
      //         .addFields(
      //           {
      //             name: `Тип`,
      //             value: `\` Мультиплеер      \``,
      //             inline: true,
      //           },
      //           {
      //             name: `Минимум игроков`,
      //             value: `\` 2                \``,
      //             inline: true,
      //           },
      //           {
      //             name: `Максимум игроков`,
      //             value: `\` 5                 \``,
      //             inline: true,
      //           },
      //           {
      //             name: `Подписано`,
      //             value: `\` 0                        \``,
      //             inline: true,
      //           },
      //           {
      //             name: `Платформа`,
      //             value: `\` PC                           \``,
      //             inline: true,
      //           }
      //         )
      //         .setImage(
      //           "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg"
      //         ),
      //     ],
      //     components: [
      //       new ActionRowBuilder().setComponents(
      //         new ButtonBuilder()
      //           .setCustomId("subscribe")
      //           .setLabel("Подписаться")
      //           .setStyle(ButtonStyle.Success)
      //           .setEmoji("📜")
      //           .setDisabled(false),
      //         new ButtonBuilder()
      //           .setCustomId("unsubscribe")
      //           .setLabel("Отписаться")
      //           .setStyle(ButtonStyle.Danger)
      //           .setEmoji("⛔")
      //           .setDisabled(false),
      //         new ButtonBuilder()
      //           .setCustomId("players")
      //           .setLabel("Игроки")
      //           .setStyle(ButtonStyle.Primary)
      //           .setEmoji("⚔")
      //           .setDisabled(false),
      //         new ButtonBuilder()
      //           .setCustomId("create")
      //           .setLabel("Создать")
      //           .setStyle(ButtonStyle.Secondary)
      //           .setEmoji("🔊")
      //           .setDisabled(false),
      //         new ButtonBuilder()
      //           .setLabel("Чат")
      //           .setStyle(ButtonStyle.Link)
      //           .setURL(`https://store.steampowered.com/app/570/Dota_2/`)
      //           .setEmoji("💬")
      //           .setDisabled(false)
      //       ),
      //     ],
      //   });
      await gameCard(interaction);
    }
  } else if (interaction.isButton()) {
    const gameIds = await Game.find();
    console.log(gameIds);

    if (interaction.customId === "dota2-subscribe") {
      console.log(interaction);
      interaction.channel.send("subscribe");
    }
    if (interaction.customId === "unsubscribe") {
      interaction.channel.send("unsubscribe");
    }
    if (interaction.customId === "players") {
      interaction.channel.send("players");
    }
    if (interaction.customId === "create") {
      interaction.channel.send("create");
    }
  }
});

async function main() {
  const commands = [
    {
      name: "card",
      description: "Create card",
    },
  ];

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (err) {
    console.log(err);
  }
}

main();
