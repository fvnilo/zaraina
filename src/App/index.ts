import { VNode, div, DOMSource } from '@cycle/dom';
import isolate from '@cycle/isolate';

import { StateSource } from 'cycle-onionify';

import xs, { Stream } from 'xstream';

import { Sinks } from '@';

import PeopleCount from '@/App/Steps/PeopleCount';
import ServiceTips from '@/App/Steps/ServiceTips';
import BillTotal from '@/App/Steps/BillTotal';
import IndividualTotal from '@/App/Steps/IndividualTotal';

export type Reducer = () => number | undefined;

interface AppState {
  billTotal: number;
  serviceTips: number;
  peopleCount: number;
}

export interface Sources {
  DOM: DOMSource;
  onion: StateSource<AppState>;
}

function calculateIndividualTotal(state: AppState) {
  return (state.billTotal * (1 + state.serviceTips)) / state.peopleCount;
}

export default function main(sources: Sources): Sinks {
  const state$ = sources.onion.state$;
  const billTotalLense = {
    get: state => ({
      billTotal: state.billTotal,
      billTotalWithTips: state.billTotal * (1 + state.serviceTips),
    }),
    set: (state, childState) => ({ ...state, billTotal: childState }),
  };

  const indovidualTotal$ = state$
    .map(calculateIndividualTotal)
    .filter(individualTotal => !isNaN(individualTotal))
    .startWith(0);

  const peopleCountSinks = isolate(PeopleCount, 'peopleCount')(sources);
  const serviceTipsSinks = isolate(ServiceTips, 'serviceTips')(sources);
  const billTotalSinks = isolate(BillTotal, { onion: billTotalLense })(sources);
  const indovidualTotalSinks = IndividualTotal(indovidualTotal$);

  const DOMSinks = xs.combine(
    peopleCountSinks.DOM,
    serviceTipsSinks.DOM,
    billTotalSinks.DOM,
    indovidualTotalSinks.DOM,
  ).map(nodes => div(nodes));

  const onion = xs.merge(
    peopleCountSinks.onion as Stream<Reducer>,
    serviceTipsSinks.onion as Stream<Reducer>,
    billTotalSinks.onion as Stream<Reducer>,
  );

  return {
    DOM: DOMSinks,
    onion,
  };
}
