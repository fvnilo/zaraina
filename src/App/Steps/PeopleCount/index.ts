import { div, input, span, VNode, DOMSource } from '@cycle/dom';

import intent from '@/App/Steps/PeopleCount/intent';
import model from '@/App/Steps/Common/model';
import view from '@/App/Steps/PeopleCount/view';

import { Sources, Sinks } from '@/App/types';

export default function PeopleCount(sources: Sources<number>): Sinks {
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$);

  const state$ = sources.onion.state$;
  const view$ = view(state$);

  return {
    DOM: view$,
    onion: reducer$,
  };
}
