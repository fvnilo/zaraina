import { DOMSource, makeDOMDriver, VNode } from '@cycle/dom';
import { run } from '@cycle/run';

import { Stream } from 'xstream';

import App from '@root/App';

import '@root/styles';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

export interface Sources {
  DOM: DOMSource;
}

interface Sinks {
  DOM: Stream<VNode>;
}

function main(sources: Sources): Sinks {
  return {
    DOM: App(sources),
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
