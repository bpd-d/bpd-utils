export type DataSource<T, TArgs extends unknown[]> = {
  getData: (...args: TArgs) => Promise<T>;
  invalidate: () => void;
};

export type KeyGetter<TArgs extends unknown[]> = (...args: TArgs) => string;

export type DataSourceCacheArgs<T, TArgs extends unknown[]> = {
  getKey?: KeyGetter<TArgs>;
  getData: (...args: TArgs) => Promise<T>;
  timeToLive: number;
};

export type DataSourceCacheEntry<T> = {
  data: T;
  timestamp: number;
};
