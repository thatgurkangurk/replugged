import { filters, getExportsForProps, waitForModule } from "..";
import type { Guild } from "discord-types/general";
import type { Store } from "./flux";

export interface State {
  selectedGuildTimestampMillis: number;
  selectedGuildId: string;
  lastSelectedGuildId: string;
}

export interface Guilds extends Store {
  getGuild: (guildId?: string) => Guild | undefined;
  getGuildCount: () => number;
  getGuildId: () => string | undefined;
  getGuilds: () => Record<string, Guild>;
  getLastSelectedGuildId: () => string | undefined;
  getLastSelectedTimeout: (guildId: string) => number;
  getState: () => State;
  getTabsV2SelectedGuildId: () => string | undefined;
  isLoaded: () => boolean;
}

export default {
  ...(await waitForModule(filters.byProps("getGuild", "getGuilds")).then(Object.getPrototypeOf)),
  ...(await waitForModule(filters.byProps("getGuildId", "getLastSelectedGuildId")).then((mod) =>
    Object.getPrototypeOf(getExportsForProps(mod, ["getGuildId", "getLastSelectedGuildId"])),
  )),
} as Guilds;
