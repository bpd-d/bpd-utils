import {
  copyAndAdd,
  anyCondition,
  createCondition,
  eqCondition,
  noneCondition,
  notCondition,
  findOneOrDefault,
  findAllOrDefault,
} from "./switch.helpers";
import type { Case, CaseCondition } from "./switch.types";

const Switch = <T, V>(cases: Case<T, V>[]) => {
  return {
    one: (label: T, defaultValue?: V) => {
      return findOneOrDefault(cases, label, defaultValue);
    },
    all: (label: T, defaultValue?: V[]) => {
      return findAllOrDefault(cases, label, defaultValue);
    },
    add: (...labels: Case<T, V>[]) => {
      return Switch([...cases, ...labels]);
    },
    eq: (condition: T, value: V) => {
      return Switch(copyAndAdd(cases, eqCondition(condition, value)));
    },
    notEq: (condition: T, value: V) => {
      return Switch(copyAndAdd(cases, notCondition(condition, value)));
    },
    when: (condition: CaseCondition<T>, value: V) => {
      return Switch(copyAndAdd(cases, createCondition(condition, value)));
    },
    anyOf: (condition: T[], value: V) => {
      return Switch(copyAndAdd(cases, anyCondition(condition, value)));
    },
    noneOf: (condition: T[], value: V) => {
      return Switch(copyAndAdd(cases, noneCondition(condition, value)));
    },
  };
};

const createSwitch = <T, V>(...cases: Case<T, V>[]) => {
  return Switch(cases);
};

export default createSwitch;
