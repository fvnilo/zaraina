import { VNode, div, DOMSource } from '@cycle/dom';
import isolate from '@cycle/isolate';

import { StateSource } from 'cycle-onionify';

import xs, { Stream } from 'xstream';

import PeopleCount from '@/App/Steps/PeopleCount';
import ServiceTips from '@/App/Steps/ServiceTips';
import BillTotal, { State as BillTotalState } from '@/App/Steps/BillTotal';
import IndividualTotal from '@/App/Steps/IndividualTotal';

import { StepOnion, Sinks, Sources } from '@/App/types';

interface AppState {
  billTotal: number;
  serviceTips: number;
  peopleCount: number;
}

const billTotalLense = {
  get: (state: AppState) => ({
    billTotal: state.billTotal,
    billTotalWithTips: state.billTotal * (1 + state.serviceTips),
  }),
  set: (state: AppState, childState: BillTotalState) =>
    ({ ...state, billTotal: childState }),
};

function calculateIndividualTotal(state: AppState) {
  if (!state.peopleCount) {
    return 0;
  }

  return (state.billTotal * (1 + state.serviceTips)) / state.peopleCount;
}

export default function main(sources: Sources<AppState>): Sinks {
  const state$ = sources.onion.state$;

  const individualTotal$ = state$
    .map(calculateIndividualTotal)
    .filter(individualTotal => !isNaN(individualTotal))
    .startWith(0);

  const peopleCountSinks = isolate(PeopleCount, 'peopleCount')(sources);
  const serviceTipsSinks = isolate(ServiceTips, 'serviceTips')(sources);
  const billTotalSinks = isolate(BillTotal, { onion: billTotalLense })(sources);
  const individualTotalSinks = IndividualTotal(individualTotal$);

  const DOMSinks = xs.combine(
    peopleCountSinks.DOM,
    serviceTipsSinks.DOM,
    billTotalSinks.DOM,
    individualTotalSinks.DOM,
  ).map(nodes => div('.zaraina', nodes));

  const onion = xs.merge(
    peopleCountSinks.onion as StepOnion,
    serviceTipsSinks.onion as StepOnion,
    billTotalSinks.onion as StepOnion,
  );

  return {
    DOM: DOMSinks,
    onion,
  };
}
