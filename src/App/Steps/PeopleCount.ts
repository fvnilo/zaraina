import { div, input, span, VNode, DOMSource } from '@cycle/dom';

import xs, { Stream } from 'xstream';

import { StateSource } from 'cycle-onionify';

export type Reducer = () => number | undefined;

export interface Sources {
  DOM: DOMSource;
  onion: StateSource<number>;
}

export interface Sinks {
  DOM: Stream<VNode>;
  onion: Stream<Reducer>;
}

function intent(DOM: DOMSource) {
  return DOM
    .select('.people-count')
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

function view(state$: Stream<number>) {
  return state$.map(state =>
    div([
      span('We are '),
      input('.people-count', { attrs: { type: 'number' }, props: { value: state } }),
      span(` people at the restaurant `),
    ]));
}

export default function PeopleCount(sources: Sources): Sinks {
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$);

  const state$ = sources.onion.state$;
  const view$ = view(state$);

  return {
    DOM: view$,
    onion: reducer$,
  };
}
