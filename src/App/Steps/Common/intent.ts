import { DOMSource } from '@cycle/dom';

import xs, { Stream } from 'xstream';

import { Action } from '@/App/Steps/Common/model';

export function commonIntent(DOM: DOMSource, selector: string): Action {
  return DOM
    .select(selector)
    .events('input')
    .map(event => parseInt((event.target as HTMLInputElement).value, 10))
    .filter(value => !isNaN(value));
}
