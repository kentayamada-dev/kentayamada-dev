type ExtractEventHandlers<T> = Extract<keyof T, `on${string}`>;
type EventHandler<T extends keyof React.JSX.IntrinsicElements> = ExtractEventHandlers<React.JSX.IntrinsicElements[T]>;
type EventFor<
  TElement extends keyof React.JSX.IntrinsicElements,
  THandler extends EventHandler<TElement>
> = React.JSX.IntrinsicElements[TElement][THandler] extends ((e: infer TEvent) => unknown) | undefined ? TEvent : never;

export type SelectEvent = EventFor<'select', 'onChange'>;
