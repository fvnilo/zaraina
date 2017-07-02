import { div, h1, input, label, makeDOMDriver, span, VNode } from '@cycle/dom';

import { Stream } from 'xstream';

import { State } from '@root/model';

function roundAmount(amount: number) {
  return amount.toFixed(2);
}

export default function view(state$: Stream<State>): Stream<VNode> {
  return state$.map(state =>
    div('#zaraina-app', [
      div('.field', [
        label('Total: '),
        input('.bill-total', { attrs: { type: 'number', value: state.billTotal } }),
      ]),
      div('.field', [
        label('Tips %: '),
        input('.tips', { attrs: { type: 'number', value: state.tips } }),
      ]),
      div('.field', [
        label('Number of person: '),
        input('.number-of-person', { attrs: { type: 'number', value: state.numberOfPerson } }),
      ]),
      div('.field--readonly', [
        span('Total: '),
        span(`${roundAmount(state.total)}$`),
      ]),
      div('.field--readonly', [
        span(`Everybody pays: ${roundAmount(state.individualTotal)}$`),
      ]),
    ]),
  );
}
