#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
// import { welcome } from './utils/welcome.js';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

type MapElems = "WALL" | "SPACE" | "LIBRARY" | "DINING_ROOM" | "BALLROOM" | "STUDY" | "SECRET_ROOM" | "CRYPT" | "FOYER";
type FoyerElems = "GATE_ENTER" | "GATE_EXIT" | "LANTERN" | "SPACE" | "DARK";

const map: MapElems[][] | string[][] = [
  ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "LIBRARY", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DINING_ROOM", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "BALLROOM", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "STUDY", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SECRET_ROOM", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "CRYPT", "SPACE", "SPACE", "WALL"],
  ["WALL", "FOYER", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"]
];

const foyerMap: FoyerElems[][] = [
  ["DARK", "DARK", "DARK", "DARK", "GATE_ENTER", "DARK", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["GATE_EXIT", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "LANTERN", "DARK"],
  ["DARK", "DARK", "DARK", "DARK", "DARK", "DARK", "DARK"]
];


let currRow = 9;
let currCol = 1;
let previous = ""

function mutatePosition(input: string) {
  if (!previous) {
    if (input[input.length - 1] === "W") {
      currRow--;
    } else if (input[input.length - 1] === "A") {
      currCol--;
    } else if (input[input.length - 1] === "S") {
      currRow++;
    } else if (input[input.length - 1] === "D") {
      currCol++;
    }
  } else if (previous) {
    if (previous.length < input.length) {
      if (input[input.length - 1] === "W") {
        currRow--;
      } else if (input[input.length - 1] === "A") {
        currCol--;
      } else if (input[input.length - 1] === "S") {
        currRow++;
      } else if (input[input.length - 1] === "D") {
        currCol++;
      }
    } else if (previous.length > input.length) {
      if (previous[previous.length - 1] === "W") {
        currRow++;
      } else if (previous[previous.length - 1] === "A") {
        currCol++;
      } else if (previous[previous.length - 1] === "S") {
        currRow--;
      } else if (previous[previous.length - 1] === "D") {
        currCol--;
      }
    }
    previous = input;
  }
}

export async function detectPosition(
  _: string[],
  input: string = ""
) {

  let movement: MapElems | string = map[currRow][currCol];

  if (input === "") {
    movement = map[9][1];
  } else {
    mutatePosition(input);
    movement = map[currRow][currCol];
  }

  const left = map[currRow][currCol - 1] ?
    map[currRow][currCol - 1].split("_")[0][0] :
    "| ";
  const right = map[currRow][currCol + 1] ?
    map[currRow][currCol + 1].split("_")[0][0] :
    " |";
  const btm = map[currRow + 1][currCol] ?
    map[currRow + 1][currCol].split("_")[0][0] :
    "_";
  const leftBtm = map[currRow + 1][currCol + 1] ?
    map[currRow + 1][currCol + 1].split("_")[0][0] :
    "|";
  const rightBtm = map[currRow + 1][currCol - 1] ?
    map[currRow + 1][currCol - 1].split("_")[0][0] : " |";

  const top = map[currRow - 1][currCol] ?
    map[currRow - 1][currCol].split("_")[0][0] :
    "_";
  const leftTop = map[currRow - 1][currCol - 1] ?
    map[currRow - 1][currCol - 1].split("_")[0][0] :
    " |";
  const rightTop = map[currRow - 1][currCol + 1] ?
    map[currRow - 1][currCol + 1].split("_")[0][0] :
    "| ";

  return new Promise(res => res([
    `
      ${leftTop} ${top} ${rightTop}
      ${left} ${chalk.blue(movement[0])} ${right}
      ${leftBtm} ${btm} ${rightBtm}
    `,
    movement,
    "Show Map",
  ]));


}

// await welcome();

async function main(
  source: (_: string[], input?: string) => Promise<unknown>,
  text?: string
) {
  const { action } = await inquirer.prompt([{
    type: 'autocomplete',
    message: 'Move with the moving keys (Caps Lock + WASD):',
    name: 'action',
    source,
    searchText: 'Detecting position...',
    transformer: (val) => text ? text + val : val
  }]);
  if (action === "Show Map") {
    let copyMap = map;
    copyMap[currRow][currCol] = `You are here: ${copyMap[currRow][currCol]}`
    console.table(copyMap)
    main(detectPosition, text)
  }
}


await main(detectPosition);