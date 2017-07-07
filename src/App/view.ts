import { div, h1, input, label, makeDOMDriver, span, VNode } from '@cycle/dom';

import { Stream } from 'xstream';

import { State } from '@root/App/model';

function roundAmount(amount: number) {
  return amount.toFixed(2);
}

function renderServiceRating(selector, ratingLabel, value) {
  return label([
    input(selector, { attrs: { name: 'service-rating', type: 'radio', value } }),
    span(ratingLabel),
  ]);
}

export default function view(state$: Stream<State>): Stream<VNode> {
  return state$.map(state =>
    div('#zaraina-app', [
      div('.field', [
        label('Total: '),
        input('.bill-total', { attrs: { type: 'number', value: state.billTotal } }),
      ]),
      div([
        renderServiceRating('.service-rating', 'Bad', 0),
        renderServiceRating('.service-rating', 'Meh', 7),
        renderServiceRating('.service-rating', 'Good', 15),
        renderServiceRating('.service-rating', 'Awesome', 20),
      ]),
      div('.field', [
        label('Tips %: '),
        input('.tips', {
          attrs: { type: 'number' },
          props: { value: state.tips },
        }),
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
