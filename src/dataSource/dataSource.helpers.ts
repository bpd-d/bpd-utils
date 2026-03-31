import { DATA_SOURCE_DEFAULT_CACHE_KEY } from "./dataSource.constants";
import type { DataSourceCacheEntry } from "./dataSource.types";

export const createDataSourceEntry = <T>(data: T): DataSourceCacheEntry<T> => ({
  data,
  timestamp: Date.now(),
});

export const isCacheEntryValid = <T>(
  entry: DataSourceCacheEntry<T>,
  timeToLive: number,
): boolean => {
  const now = Date.now();
  return now - entry.timestamp < timeToLive;
};

export const defaultKeyGetter = <TArgs extends unknown[]>(
  ...args: TArgs
): string => {
  if (args.length === 0) {
    return DATA_SOURCE_DEFAULT_CACHE_KEY;
  }

  return JSON.stringify(args);
};
