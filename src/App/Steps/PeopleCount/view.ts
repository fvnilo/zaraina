import { div, input, span } from '@cycle/dom';

import { Stream } from 'xstream';

import { View } from '@/App/types';

export default function view(state$: Stream<number>): View {
  return state$.map(state =>
    div([
      span('We are '),
      input('.people-count', { attrs: { type: 'number' }, props: { value: state } }),
      span(` people at the restaurant `),
    ]));
}
