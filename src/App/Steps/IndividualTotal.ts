import { div, span, VNode } from '@cycle/dom';

import xs, { Stream } from 'xstream';

interface Sinks {
  DOM: Stream<VNode>;
}

export default function IndividualTotal(state$: Stream<number>): Sinks {
  const vdom$ = state$.map(state =>
    div([
      span('This means that everybody has to pay '),
      span(` ${state.toFixed(2)}$`),
    ]),
  );

  return {
    DOM: vdom$,
  };
}
