import { DOMSource, VNode } from '@cycle/dom';

import { StateSource } from 'cycle-onionify';

import { Stream } from 'xstream';

export type Reducer = () => number | undefined;

export type StepOnion = Stream<Reducer>;

export type View = Stream<VNode>;

export interface Sources<T> {
  DOM: DOMSource;
  onion: StateSource<T>;
}

export interface Sinks {
  DOM: View;
  onion: StepOnion;
}
