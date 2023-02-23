#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { map } from './constants/index.js';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

let row = 9;
let col = 1;
let previous = "";

function mutatePosition(input: string) {
  if (previous?.length < input.length) {
    switch (input.slice(-1)) {
      case "W":
        row--;
        break;
      case "A":
        col--;
        break;
      case "S":
        row++;
        break;
      case "D":
        col++;
        break;
    }
  } else if (previous?.length > input.length) {
    switch (previous.slice(-1)) {
      case "W":
        row++;
        break;
      case "A":
        col++;
        break;
      case "S":
        row--;
        break;
      case "D":
        col--;
        break;
    }
  }
  previous = input;
  return [row, col];
}

async function detectPosition(
  _: string[], input: string = ""
) {

  mutatePosition(input);

  const movement = map[row][col];
  const left = map[row][col - 1]?.[0][0] ?? "| ";
  const right = map[row][col + 1]?.[0][0] ?? " |";
  const btm = map[row + 1][col]?.[0][0] ?? "";
  const leftBtm = map[row + 1][col + 1]?.[0][0] ?? "|";
  const rightBtm = map[row + 1][col - 1]?.[0][0] ?? " |";
  const top = map[row - 1][col]?.[0][0] ?? "_";
  const leftTop = map[row - 1][col - 1]?.[0][0] ?? " |";
  const rightTop = map[row - 1][col + 1]?.[0][0] ?? "| ";

  const output = `
    ${leftTop} ${top} ${rightTop} 
    ${left} ${chalk.blue(movement[0])} ${right} 
    ${leftBtm} ${btm} ${rightBtm}
  `;

  return new Promise(res => res([
    output,
    movement + " " + row + "x" + col,
    "Show Map"
  ]));
}

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
    const copyMap = [...map];
    copyMap[row][col] = `You are here: ${copyMap[row][col]}`;
    console.table(copyMap);
    await main(detectPosition, text);
  }
}

await main(detectPosition);