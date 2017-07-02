import { VNode } from '@cycle/dom';

import { Stream } from 'xstream';

import { Sources } from '@root';

import intent, { Action } from '@root/App/intent';
import model, { State } from '@root/App/model';
import view from '@root/App/view';

type View = Stream<VNode>;

export default function main(sources: Sources): Stream<VNode> {
  const action$: Stream<Action> = intent(sources.DOM);
  const state$: Stream<State> = model(action$);
  const view$: View = view(state$);

  return view$;
}
