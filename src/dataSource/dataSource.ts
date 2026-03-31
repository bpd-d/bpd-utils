import {
  createDataSourceEntry,
  defaultKeyGetter,
  isCacheEntryValid,
} from "./dataSource.helpers";
import type {
  DataSource,
  DataSourceCacheArgs,
  DataSourceCacheEntry,
} from "./dataSource.types";

export const createDataSource = <T, TArgs extends unknown[]>(
  props: DataSourceCacheArgs<T, TArgs>,
): DataSource<T, TArgs> => {
  const store = new Map<string, DataSourceCacheEntry<T>>();

  return {
    getData: async (...args: TArgs) => {
      const key = props.getKey?.(...args) ?? defaultKeyGetter(...args);

      if (store.has(key)) {
        const cached = store.get(key);

        if (cached && isCacheEntryValid(cached, props.timeToLive)) {
          return cached.data;
        }

        store.delete(key);
      }

      try {
        const data = await props.getData(...args);
        store.set(key, createDataSourceEntry(data));
        return data;
      } catch (error) {
        throw error;
      }
    },
    invalidate: (key?: string) => {
      if (key) {
        store.delete(key);
      } else {
        store.clear();
      }
    },
  };
};
