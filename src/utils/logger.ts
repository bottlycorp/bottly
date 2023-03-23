import { blue, gray, green, red, reset, yellow } from "colors";

export default {
  info(message: string) {
    console.log(yellow("[INFO]") + gray("         ") + reset(message));
  },

  success(message: string) {
    console.log(green("[SUCCESS]") + gray("      ") + reset(message));
  },

  error(message: string) {
    console.log(red("[ERROR]") + gray("        ") + reset(message));
  },

  request(message: string) {
    console.log(blue("[REQUEST]") + gray("      ") + reset(message));
  },

  chat(message: string) {
    console.log(blue("[CHAT]") + gray("      ") + reset(message));
  },

  context(message: string) {
    console.log(blue("[CONTEXT]") + gray("      ") + reset(message));
  },

  where(message: string) {
    console.log(blue("[WHERE I AM]") + gray("   ") + reset(message));
  }
};