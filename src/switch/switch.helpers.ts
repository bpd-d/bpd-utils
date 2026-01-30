import type { Case, CaseCondition } from "./switch.types";

export const byCondition = <T, V>(label: T) => {
  return (caseItem: Case<T, V>) => {
    return caseItem.condition(label);
  };
};

export const findOneOrDefault = <T, V>(
  cases: Case<T, V>[],
  label: T,
  defaultValue?: V,
) => {
  const foundCase = cases.find(byCondition(label));

  return foundCase?.value ?? defaultValue;
};

export const findAllOrDefault = <T, V>(
  cases: Case<T, V>[],
  label: T,
  defaultValue?: V[],
) => {
  const foundCases = cases.filter(byCondition(label)).map((item) => item.value);
  if (foundCases.length === 0 && defaultValue) {
    return defaultValue;
  }

  return foundCases;
};

export const copyAndAdd = <T>(items: T[], item: T) => {
  const newArray = Array.from(items);
  newArray.push(item);
  return newArray;
};

export const createCondition = <T, V>(
  callback: CaseCondition<T>,
  value: V,
): Case<T, V> => {
  return {
    condition: callback,
    value,
  };
};

export const eqCondition = <T, V>(eqValue: T, value: V) => {
  return createCondition((label) => label === eqValue, value);
};

export const notCondition = <T, V>(eqValue: T, value: V) => {
  return createCondition((label) => label !== eqValue, value);
};

export const anyCondition = <T, V>(eqValue: T[], value: V) => {
  return createCondition((label) => eqValue.some((v) => v === label), value);
};

export const noneCondition = <T, V>(eqValue: T[], value: V) => {
  return createCondition((label) => !eqValue.some((v) => v === label), value);
};
