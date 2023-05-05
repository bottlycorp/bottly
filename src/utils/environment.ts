export const isDevEnvironment = process.argv.includes("dev");
export const isProdEnvironment = !isDevEnvironment;