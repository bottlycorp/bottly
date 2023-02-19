import chalk from "chalk";

export default {
  info(message: string) {
    console.log(chalk.yellow("- ") + chalk.bold("Info ") + chalk.gray("» ") + chalk.reset(message));
  },

  success(message: string) {
    console.log(chalk.green("√ ") + chalk.bold("Success ") + chalk.gray("» ") + chalk.reset(message));
  },

  error(message: string) {
    console.log(chalk.red("x ") + chalk.bold("Error ") + chalk.gray("» ") + chalk.reset(message));
  }
};