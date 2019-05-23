export interface IEvent<TEventType, TPayload> {
  type: TEventType;
  payload?: TPayload;
}
