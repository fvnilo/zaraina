import { Stream } from 'xstream';

import { Action } from '@root/App/intent';

export interface State {
  billTotal: number;
  tips: number;
  numberOfPerson: number;
  total: number;
  individualTotal: number;
}

export type CalculationTarget = 'billTotal' | 'tips' | 'numberOfPerson';

interface CalculationParams {
  billTotal: number;
  tips: number;
  numberOfPerson: number;
}

const defaultCalculationParams: CalculationParams = {
  billTotal: 0,
  numberOfPerson: 1,
  tips: 15,
};

function calculateTotal(calculationParams: CalculationParams): number {
  return calculationParams.billTotal * (1 + (calculationParams.tips / 100));
}

function calculateIndividualTotal(calculationParams: CalculationParams) {
  return calculateTotal(calculationParams) / calculationParams.numberOfPerson;
}

export default function model(action$: Stream<Action>): Stream<State> {
  const calculationParams$ =
    action$.fold((current: CalculationParams, action: Action) =>
      Object.assign({}, current, { [action.target]: action.data }),
      defaultCalculationParams);

  return calculationParams$.map((params: CalculationParams) => ({
    ...params,
    individualTotal: calculateIndividualTotal(params),
    total: calculateTotal(params),
  }));
}
