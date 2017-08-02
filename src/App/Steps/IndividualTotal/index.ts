import { div, span } from '@cycle/dom';

import xs, { Stream } from 'xstream';

import { View } from '@/App/types';

interface Sinks {
  DOM: View;
}

type State = Stream<number>;

export default function IndividualTotal(state$: State): Sinks {
  const vdom$ = state$.map(state =>
    div('.individual-total.step', [
      span('This means that everybody has to pay '),
      span('.individual-total-amount', ` ${state.toFixed(2)}$`),
    ]),
  );

  return {
    DOM: vdom$,
  };
}
