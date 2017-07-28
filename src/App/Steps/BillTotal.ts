import { div, input, span, VNode, DOMSource } from '@cycle/dom';

import xs, { Stream } from 'xstream';

import { StateSource } from 'cycle-onionify';

export type Reducer = () => number | undefined;

export interface Sources {
  DOM: DOMSource;
  onion: StateSource<State>;
}

export interface Sinks {
  DOM: Stream<VNode>;
  onion: Stream<Reducer>;
}

export interface State {
  billTotal: number;
  billTotalWithTips: number;
}

function intent(DOM: DOMSource) {
  return DOM
    .select('.bill-total')
    .events('input')
    .map(event => parseInt((event.target as HTMLInputElement).value, 10))
    .filter(value => !isNaN(value));
}

function model(action$: Stream<number>): Stream<Reducer> {
  const initReducer$ = xs.of(function initReducer$() {
    return 0;
  });

  const reducer$ = action$.map(value => function reducer() {
    return value;
  });

  return xs.merge(initReducer$, reducer$);
}

function view(state$: Stream<State>) {
  return state$.map(state =>
    div([
      span('Our bill amount is '),
      input('.bill-total', { attrs: { type: 'number' }, props: { value: state.billTotal } }),
      span(` $ which gives ${state.billTotalWithTips.toFixed(2)}$ with the tips.`),
    ]));
}

export default function BillTotal(sources: Sources): Sinks {
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$);

  const state$ = sources.onion.state$;
  const view$ = view(state$);

  return {
    DOM: view$,
    onion: reducer$,
  };
}
