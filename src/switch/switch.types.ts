export type CaseCondition<T> = (arg: T) => boolean;

export type Case<T, V> = {
  condition: CaseCondition<T>;
  value: V;
};
