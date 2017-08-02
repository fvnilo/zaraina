import { div, input, span } from '@cycle/dom';

import { Stream } from 'xstream';

import { View } from '@/App/types';

import { State } from '@/App/Steps/BillTotal';

export default function view(state$: Stream<State>): View {
  return state$.map(state =>
    div('.bill-total.step', [
      span('Our bill amount is '),
      input('.bill-total', { attrs: { type: 'number' }, props: { value: state.billTotal } }),
      span(' $ which gives '),
      span('.with-tips', `${state.billTotalWithTips.toFixed(2)}$`),
      span(' with the tips.'),
    ]));
}
