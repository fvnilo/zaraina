import { DOMSource } from '@cycle/dom';

import xs, { Stream } from 'xstream';

import { CalculationTarget } from '@root/model';

export interface Action {
  target: CalculationTarget;
  data: number;
}

type Parser = (value: string) => number;

function createAction(
  domSources: DOMSource,
  selector: string,
  target: CalculationTarget,
  parser: Parser): Stream<Action> {
  return domSources.select(selector).events('input')
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

  return xs.merge(billTotal$, tipsAction$, numberOfPerson$);
}
