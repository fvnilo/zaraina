import { div, input, span, VNode, DOMSource } from '@cycle/dom';

import intent from '@/App/Steps/BillTotal/intent';
import model from '@/App/Steps/Common/model';
import view from '@/App/Steps/BillTotal/view';

import { Sources, Sinks } from '@/App/types';

export interface State {
  billTotal: number;
  billTotalWithTips: number;
}

export default function BillTotal(sources: Sources<State>): Sinks {
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$);

  const state$ = sources.onion.state$;
  const view$ = view(state$);

  return {
    DOM: view$,
    onion: reducer$,
  };
}
