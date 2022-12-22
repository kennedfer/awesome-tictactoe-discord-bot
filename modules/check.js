import {
  getCurrentUser,
  variables,
  getCurrentPlayerIndex,
} from "./initVariables.js";

const checkBoard = function checkBoard(boardMatrix, position) {
  let isFinished = false;
  let msg = "a";

  let sla = getCurrentPlayerIndex() === 0 ? -1 : 1;
  let [row, collum] = position;
  boardMatrix[collum][row] = sla;

  for (var i = 0; i < 3; i++) {
    let horizontal = boardMatrix[i][0] + boardMatrix[i][1] + boardMatrix[i][2];
    let vertical = boardMatrix[0][i] + boardMatrix[1][i] + boardMatrix[2][i];

    if (
      horizontal === 3 ||
      vertical === 3 ||
      horizontal === -3 ||
      vertical === -3
    ) {
      isFinished = true;
    }
  }

  let diagonal_top = boardMatrix[0][0] + boardMatrix[1][1] + boardMatrix[2][2];
  let diagonal_bottom =
    boardMatrix[0][2] + boardMatrix[1][1] + boardMatrix[2][0];

  if (
    diagonal_top === 3 ||
    diagonal_bottom === 3 ||
    diagonal_top === -3 ||
    diagonal_bottom === -3
  ) {
    isFinished = true;
  }

  msg = isFinished ? `${getCurrentUser()} WON!!!!` : "";
  if (!isFinished && variables.currentTurn == 8) {
    isFinished = true;
    msg = "Is a DRAW!";
  }
  return { msg: msg, isFinished: isFinished };
};

export default checkBoard;