import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export const disableAllButtons = () => {
  variables.boardRows.forEach((rows) => {
    rows.components.forEach((button) => button.setDisabled(true));
  });
};

function resetAllButtons() {
  variables.rowPlayAgain.components[0].setDisabled(false);
  variables.boardRows.forEach((rows) => {
    variables.rowInit.components.forEach((button) => {
      button.setDisabled(false);
    });

    rows.components.forEach((button) => {
      button.setDisabled(false);
      button.setLabel(" ");
    });
  });
}

export const resetVariables = () => {
  resetAllButtons();
  Object.assign(variables, initialVariables);
};

export const isValidMove = (id) => {
  return moves.find((item) => item == id) === undefined ? false : true;
};

export const getCurrentUser = () => {
  return variables.players[getCurrentPlayerIndex() == 0 ? 1 : 0];
};

export const getCurrentMark = () => {
  return variables.marks[getCurrentPlayerIndex() == 0 ? 1 : 0];
};

export const getCurrentPlayerIndex = () => {
  let p = variables.currentTurn % 2 === 0 ? 0 : 1;
  return variables.currentTurn % 2 === 0 ? 0 : 1;
};

let moves = ["0,0", "0,1", "0,2", "1,0", "1,1", "1,2", "2,0", "2,1", "2,2"];

let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let marks = ["⭕", "❌"];

let buttonStyle = 2;

const rowPlayAgain = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setLabel("PlayAgain!")
    .setCustomId("playAgain")
    .setStyle(1)
);

const rowInit = new ActionRowBuilder();
rowInit.addComponents(
  new ButtonBuilder().setLabel("1").setCustomId("firstPlayer").setStyle(1),
  new ButtonBuilder().setLabel("2").setCustomId("secondPlayer").setStyle(1)
);

const rowOne = new ActionRowBuilder();
rowOne.addComponents(
  new ButtonBuilder().setLabel(" ").setCustomId("0,0").setStyle(buttonStyle),
  new ButtonBuilder().setLabel(" ").setCustomId("0,1").setStyle(buttonStyle),
  new ButtonBuilder().setLabel(" ").setCustomId("0,2").setStyle(buttonStyle)
);

const rowTwo = new ActionRowBuilder();

rowTwo.addComponents(
  new ButtonBuilder().setLabel(" ").setCustomId("1,0").setStyle(buttonStyle),
  new ButtonBuilder().setLabel(" ").setCustomId("1,1").setStyle(buttonStyle),
  new ButtonBuilder().setLabel(" ").setCustomId("1,2").setStyle(buttonStyle)
);

const rowThree = new ActionRowBuilder();

rowThree.addComponents(
  new ButtonBuilder().setLabel(" ").setCustomId("2,0").setStyle(buttonStyle),
  new ButtonBuilder().setLabel(" ").setCustomId("2,1").setStyle(buttonStyle),
  new ButtonBuilder().setLabel(" ").setCustomId("2,2").setStyle(buttonStyle)
);

const boardRows = [rowOne, rowTwo, rowThree];

export let variables = {
  isGameRunning: false,
  board: board,
  marks: marks,
  currentTurn: 0,
  buttonHandler: 0,
  players: ["", ""],
  channel: "",
  rowPlayAgain: rowPlayAgain,
  rowInit: rowInit,
  rowOne: rowOne,
  rowTwo: rowTwo,
  rowThree: rowThree,
  boardRows: boardRows,
  lastMessageId: 0,
  positionMarkeds: [],
};

const initialVariables = {
  isGameRunning: false,
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  marks: marks,
  currentTurn: 0,
  buttonHandler: 0,
  players: ["", ""],
  channel: "",
  rowPlayAgain: rowPlayAgain,
  rowInit: rowInit,
  rowOne: rowOne,
  rowTwo: rowTwo,
  rowThree: rowThree,
  boardRows: boardRows,
  lastMessageId: 0,
  positionMarkeds: [],
};
