import { div, h1, input, select, option, span, VNode, DOMSource } from '@cycle/dom';

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
  const input$ = DOM
    .select('.tips')
    .events('input')
    .map(event => parseInt((event.target as HTMLInputElement).value, 10))
    .filter(value => !isNaN(value));

  const selectService$ = DOM
    .select('.service')
    .events('change')
    .map(event => parseInt((event.target as HTMLInputElement).value, 10))
    .filter(value => !isNaN(value));

  return xs.merge(input$, selectService$);
}

function model(action$: Stream<number>) {
  const initReducer$ = xs.of(function initReducer$() {
    return 0;
  });

  const reducer$ = action$.map(value => function reducer() {
    return value / 100;
  });

  return xs.merge(initReducer$, reducer$);
}

function view(state$: Stream<number>) {
  return state$.map(state =>
    div([
      span('The service was '),
      select('.service', [
        option(['-']),
        option({ props: { value: 2 } }, ['Bad']),
        option({ props: { value: 7 } }, ['Meh']),
        option({ props: { value: 15 } }, ['Good']),
        option({ props: { value: 20 } }, ['Awesome']),
      ]),
      span(' and we will leave a '),
      input('.tips', { attrs: { type: 'number' }, props: { value: state * 100 } }),
      span(' % tip.'),
    ]));
}

export default function ServiceTips(sources: Sources): Sinks {
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$);

  const state$ = sources.onion.state$;
  const view$ = view(state$);

  return {
    DOM: view$,
    onion: reducer$,
  };
}
