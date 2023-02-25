#!/usr/bin/env node

import inquirer, { QuestionCollection } from 'inquirer';

class main {

  enemies: string[];
  maxEnemyHP: number;
  enemyAttackDamage: number;
  health: number;
  attackDamage: number;
  numHealthPotions: number;
  healthPotionHealAmount: number;
  healthPotionDropChance: number;
  running: boolean;
  enemyHealth: number;
  enemyName: string;

  constructor() {
    this.enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"]
    this.maxEnemyHP = 75;
    this.enemyAttackDamage = 25;
    this.health = 100;
    this.attackDamage = 50;
    this.numHealthPotions = 3;
    this.healthPotionHealAmount = 30;
    this.healthPotionDropChance = 50; // %
    this.running = true;
    this.enemyHealth = 0;
    this.enemyName = "";
  }

  async game() {

    console.log('Welcome to the Dungeon!');

    while (this.running) {

      this.formulateRandomEnemy();
      console.log(`# ${this.enemyName} appeared! #`);

      await this.reactToTheAttack();
      if (this.health < 1) {
        console.log('You limp out of the dungeon, weak from battle!');
        break;
      }

      console.log(`# ${this.enemyName} was defeated! #`);

      this.printPlayerHealthStatus();

      const { action } = await this.askPlayerToContinueFighting();
      if (action === "1") {
        console.log(`You continue on your adventure!`);
      } else if (action === "2") {
        console.log('You exit the dungeon, successful from your adventures!');
        break;
      }

    }

    console.log("######################");
    console.log("# THANKS FOR PLAYING #");
    console.log("######################");

  }

  async askPlayerToContinueFighting() {
    const { action } = await inquirer.prompt([{
      name: "action",
      message: "What would you like to do?",
      type: "list",
      filter: (val) => val.split('')[0],
      choices: ["1. Continue fighting", "2. Exit dungeon"]
    }] as QuestionCollection<{ action: string }>);
    return { action };
  }

  async reactToTheAttack() {

    while (this.enemyHealth > 0 && this.health > 0) {

      this.printHealthStatus();

      const { action } = await inquirer.prompt([{
        name: "action",
        message: "What would you like to do?",
        type: "list",
        filter: (val) => val.split('')[0],
        choices: [
          "1. Attack",
          "2. Drink health potion",
          "3. Run!"
        ]
      }] as QuestionCollection<{ action: string }>);

      if (action === "1") {
        let damageDealt = Math.floor(Math.random() * this.attackDamage);
        let damageTaken = Math.floor(Math.random() * this.enemyAttackDamage);
        this.enemyHealth -= damageDealt;
        this.health -= damageTaken;
        console.log(`> You strike the ${this.enemyName} for ${damageDealt} damage.`);
        console.log(`> You recieve ${damageTaken} in relatiation.`);
        if (this.health < 1) {
          console.log(`> You have taken too much damage, you are too weak to go on!`);
          break;
        }
      } else if (action === "2") {
        if (this.numHealthPotions > 0) {
          this.health += this.healthPotionHealAmount;
          this.numHealthPotions--;
          console.log(`> You drink a health potion, healing yourself for ${this.healthPotionHealAmount}. You now have ${this.health} HP. > You have ${this.numHealthPotions} health potions left.`)
        } else {
          console.log(`> You have no health potions left! Defeat enemies for a chance to get one!`);
        }
      } else if (action === "3") {
        console.log(`You run away from the ${this.enemyName}!`);
        continue;
      }

    }
  }

  printHealthStatus() {
    console.log(`Your HP: ${this.health}`);
    console.log(`${this.enemyName}'s HP: ${this.enemyHealth < 0 ? 0 : this.enemyHealth}`);
    console.log('')
  }

  printPlayerHealthStatus() {

    this.printHealthStatus();

    if (Math.floor(Math.random() * 100) < this.healthPotionDropChance) {
      this.numHealthPotions++;
      console.log(`# The ${this.enemyName} dropped a health potion! #`);
      console.log(`# You now have ${this.numHealthPotions} health potion(s). #`);
    }

  }

  formulateRandomEnemy() {
    this.enemyHealth = Math.floor(Math.random() * this.maxEnemyHP)
    this.enemyName = this.enemies[Math.floor(Math.random() * this.enemies.length)]
  }

}

(async () => await new main().game())();