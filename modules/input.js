import { variables } from "./initVariables.js";

function checkIfIsPositionMarked(position) {
  let isMarked = false;
  variables.positionMarkeds.forEach((pos) => {
    if (pos[0] == position[0] && pos[1] == position[1]) isMarked = true;
  });

  return isMarked;
}

const checkInput = function checkInput(message) {
  let position = [];
  let isRight = false;
  let errorMessage = "";

  isRight = true;

  position = message.split(",").map((numberStr) => {
    return parseInt(numberStr, 10);
  });

  if (checkIfIsPositionMarked(position)) {
    isRight = false;
    errorMessage = "Already marked";
  }

  variables.positionMarkeds.push(position);
  return { isRight, position, errorMessage };
};

export default checkInput;