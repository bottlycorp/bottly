import { LocalizationMap } from "discord.js";

export type Command = Base & {
  groups?: Record<string, SubCommandGroup>;
  subcmds?: Record<string, SubCommand>;
  options?: Record<string, Base>;
  exec?: Record<string, LocalizationMap | Record<string, LocalizationMap>>;
  buttons?: Record<string, LocalizationMap>;
  imgs?: LocalizationMap;
};

export type SubCommandGroup = Base & {
  subcmds: Record<string, SubCommand>;
};

export type SubCommand = Base & {
  options?: Record<string, Base>;
};

export type Base = {
  name?: LocalizationMap;
  description?: LocalizationMap;
};