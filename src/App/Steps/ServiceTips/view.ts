import { div, h1, input, select, option, span } from '@cycle/dom';

import { Stream } from 'xstream';

import { View } from '@/App/types';

export default function view(state$: Stream<number>): View {
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
