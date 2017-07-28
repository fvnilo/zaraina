import { DOMSource, makeDOMDriver, VNode } from '@cycle/dom';
import { run } from '@cycle/run';

import onionify from 'cycle-onionify';

import { Stream } from 'xstream';

import App from '@/App';

import '@/Stylesheets';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

type State = number;
type Reducer = (prev?: State) => State | undefined;

export interface Sinks {
  DOM: Stream<VNode>;
  onion: Stream<Reducer>;
}

const main = onionify(App);

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
