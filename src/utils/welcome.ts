import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

export const sleep = (ms: number = 2000) => new Promise(resolve => setTimeout(resolve, ms));

export async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to the Adventure Game CLI');
  await sleep();
  console.log(`
    ${chalk.bgBlue('The Haunted Mansion ')}
        You are a brave adventurer who has heard that a haunted mansion is filled with treasure. Your objective is to explore the mansion and collect as much treasure as possible while avoiding the ghosts and other dangers.
  `)
  rainbowTitle.stop();
  await sleep(1000);
}