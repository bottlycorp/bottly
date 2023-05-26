const cache = new Map<string, boolean>();
const askCooldown = new Map<string, number>();

export const setCache = (key: string, value: boolean): void => {
  cache.set(key, value);
};

export const setAskCooldown = (key: string, value: number): void => {
  askCooldown.set(key, value);

  setTimeout(() => {
    askCooldown.delete(key);
  }, value);
};

export const getCache = (key: string): boolean | undefined => {
  return cache.get(key);
};

export const deleteCache = (key: string): boolean => {
  cache.delete(key);
  return true;
};

export const existCache = (key: string): boolean => {
  return cache.has(key);
};

export const existAskCooldown = (key: string): boolean => {
  return askCooldown.has(key);
};