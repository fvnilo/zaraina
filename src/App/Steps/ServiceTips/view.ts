import { div, h1, input, select, option, span } from '@cycle/dom';

import { Stream } from 'xstream';

import { View } from '@/App/types';

export default function view(state$: Stream<number>): View {
  return state$.map(state =>
    div('.service-tips.step', [
      span('The service was '),
      select('.service', [
        option(['-']),
        option({ props: { value: 2 } }, ['bad']),
        option({ props: { value: 7 } }, ['meh']),
        option({ props: { value: 15 } }, ['good']),
        option({ props: { value: 20 } }, ['awesome']),
      ]),
      span(' and we will leave a '),
      input('.tips.input', { attrs: { type: 'number' }, props: { value: state * 100 } }),
      span(' % tip.'),
    ]));
}
