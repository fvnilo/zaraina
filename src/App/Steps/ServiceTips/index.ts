import { div, h1, input, select, option, span, VNode, DOMSource } from '@cycle/dom';

import xs, { Stream } from 'xstream';

import { StateSource } from 'cycle-onionify';

import intent from '@/App/Steps/ServiceTips/intent';
import model from '@/App/Steps/Common/model';
import view from '@/App/Steps/ServiceTips/view';

import { Sources, Sinks } from '@/App/types';

const transformInputValue = (value: number) => value / 100;

export default function ServiceTips(sources: Sources<number>): Sinks {
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$, transformInputValue);

  const state$ = sources.onion.state$;
  const view$ = view(state$);

  return {
    DOM: view$,
    onion: reducer$,
  };
}
