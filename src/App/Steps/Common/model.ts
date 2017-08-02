import xs, { Stream } from 'xstream';

export type Reducer = () => number | undefined;
export type Action = Stream<number>;
export type TransformOp = (value: number) => number;

const defaultTransformOp = (value: number) => value;

export default function model(
  action$: Action,
  transform: TransformOp = defaultTransformOp): Stream<Reducer> {
  const initReducer$ = xs.of(function initReducer$() {
    return 0;
  });

  const reducer$ = action$.map(value => function reducer() {
    return transform(value);
  });

  return xs.merge(initReducer$, reducer$);
}
