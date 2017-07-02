import { div, h1, input, label, makeDOMDriver, span, VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom';
import { run } from '@cycle/run';

import { Stream } from 'xstream';

import intent, { Action } from '@root/intent';
import model, { State } from '@root/model';
import view from '@root/view';

type View = Stream<VNode>;

export interface Sources {
  DOM: DOMSource;
}

interface Sinks {
  DOM: Stream<VNode>;
}

function main(sources: Sources): Sinks {
  const action$: Stream<Action> = intent(sources.DOM);
  const state$: Stream<State> = model(action$);
  const view$: View = view(state$);

  return {
    DOM: view$,
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
