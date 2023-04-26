const cache = new Map<string, boolean>();

export const setCache = (key: string, value: boolean): void => {
  cache.set(key, value);
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

export const getCacheSize = (): number => {
  return cache.size;
};