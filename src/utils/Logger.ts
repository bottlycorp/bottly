import chalk from "chalk";

export default {
  info(message: string) {
    console.log(chalk.yellow("[INFO]") + chalk.gray(": ") + chalk.reset(message));
  },

  success(message: string) {
    console.log(chalk.green("[OK]") + chalk.gray(": ") + chalk.reset(message));
  },

  error(message: string) {
    console.log(chalk.red("[ERROR] ") + chalk.gray(": ") + chalk.reset(message));
  }
};