import dontenv from "dotenv";
dontenv.config();
import checkBoard from "./modules/check.js";
import checkInput from "./modules/input.js";
import {
  variables,
  getCurrentUser,
  getCurrentMark,
  isValidMove,
  disableAllButtons,
  resetVariables,
} from "./modules/initVariables.js";
import { Client, GatewayIntentBits } from "discord.js";

function resetBot(interaction) {
  disableAllButtons();
  interaction.update({
    components: [variables.rowOne, variables.rowTwo, variables.rowThree],
  });
  variables.isGameRunning = false;
  resetVariables();
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("messageCreate", async (response) => {
  var message = response.content;
  if (!variables.isGameRunning) {
    if (message === "!play") {
      variables.channel = client.channels.cache.get(response.channelId);

      await response.reply({
        content: "Lets, Go!\nWho want to play?",
        components: [variables.rowInit],
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    let interactionId = interaction.customId;

    if (interactionId === "playAgain") {
      variables.rowPlayAgain.components[0].setDisabled(true);
      variables.channel = client.channels.cache.get(interaction.channelId);
      variables.channel.send({
        content: "Lets, Go!\nWho want to play?",
        components: [variables.rowInit],
      });
      interaction.update({ components: [variables.rowPlayAgain] });
      variables.rowPlayAgain.components[0].setDisabled(false);
    }

    if (!interaction.user == getCurrentUser() && variables.isGameRunning) {
      variables.channel.send("Not you turn");
    }

    if (isValidMove(interactionId)) {
      let [row, collum] = interactionId.split(",").map((numberStr) => {
        return parseInt(numberStr, 10);
      });

      let interactionButton = variables.boardRows[row].components[collum];

      let inputResponse = checkInput(interactionId);
      if (!inputResponse.isRight) {
        variables.channel.send(inputResponse.errorMessage);
        interaction.deferUpdate();
        return;
      }

      let checkResponse = checkBoard(variables.board, inputResponse.position);
      interactionButton.setLabel(getCurrentMark());
      if (!checkResponse.isFinished)
        interaction.update({
          components: [variables.rowOne, variables.rowTwo, variables.rowThree],
        });

      if (checkResponse.isFinished) {
        variables.channel.send(checkResponse.msg);

        variables.channel.send({
          content: "Want to play again?",
          components: [variables.rowPlayAgain],
        });
        resetBot(interaction);
        return;
      }

      variables.currentTurn++;
      variables.channel.send(
        `${getCurrentUser()} you turn '${getCurrentMark()}'`
      );
    }

    if (interaction.customId === "firstPlayer") {
      variables.buttonHandler++;
      await variables.rowInit.components[0].setDisabled(true);
      await interaction.update({ components: [variables.rowInit] });

      variables.players[1] = interaction.user;
    }

    
    if (interaction.customId === "secondPlayer") {
      variables.buttonHandler++;
      await variables.rowInit.components[1].setDisabled(true);
      await interaction.update({ components: [variables.rowInit] });

      variables.players[0] = interaction.user;
    }

    if (variables.buttonHandler == 2 && !variables.isGameRunning) {
      variables.isGameRunning = true;
      variables.channel.send({
        content: "Lets Begin!",
        components: [variables.rowOne, variables.rowTwo, variables.rowThree],
      });
      variables.channel.send(
        `${getCurrentUser()} you turn '${getCurrentMark()}'`
      );
    }
  }
});

client.login(process.env.CLIENT_TOKEN);