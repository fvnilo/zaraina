import { DOMSource } from '@cycle/dom';

import xs from 'xstream';

import { commonIntent } from '@/App/Steps/Common/Intent'

export default function intent(DOM: DOMSource) {
  const input$ = commonIntent(DOM, '.tips');

  const selectService$ = DOM
    .select('.service')
    .events('change')
    .map(event => parseInt((event.target as HTMLInputElement).value, 10))
    .filter(value => !isNaN(value));

  return xs.merge(input$, selectService$);
}