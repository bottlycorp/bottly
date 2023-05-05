export const isDevEnvironment = process.argv.includes("dev");
export const isKillerEnvironment = process.argv.includes("killer");
export const isProdEnvironment = !isDevEnvironment && !isKillerEnvironment;