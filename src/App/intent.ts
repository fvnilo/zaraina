import { DOMSource } from '@cycle/dom';

import xs, { Stream } from 'xstream';

import { CalculationTarget } from '@root/App/model';

export interface Action {
  target: CalculationTarget;
  data: number;
}

type Parser = (value: string) => number;

function createAction(
  domSources: DOMSource,
  selector: string,
  target: CalculationTarget,
  parser: Parser,
  event: string = 'input'): Stream<Action> {
  return domSources.select(selector).events(event)
    .map(ev => parser((ev.target as HTMLInputElement).value))
    .filter(value => !isNaN(value))
    .map(value => ({
      data: value,
      target,
    }));
}

export default function intent(domSources: DOMSource): Stream<Action> {
  const billTotal$ = createAction(domSources, '.bill-total', 'billTotal', parseFloat);
  const tipsAction$ = createAction(domSources, '.tips', 'tips', parseFloat);
  const numberOfPerson$ = createAction(domSources, '.number-of-person', 'numberOfPerson', parseInt);
  const serviceRating$ =
    createAction(domSources, '.service-rating', 'tips', parseFloat, 'change');

  return xs.merge(billTotal$, tipsAction$, numberOfPerson$, serviceRating$);
}
