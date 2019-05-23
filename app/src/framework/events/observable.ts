export class Observable<TEventType, TValue> {
  private readonly _subscribers: Array<(value?: TValue) => void> = [];

  constructor(public readonly eventType: TEventType) {}

  public subscribe(callback: (value?: TValue) => void): void {
    this._subscribers.push(callback);
  }

  public emit(value?: TValue): void {
    this._subscribers.map((observer) => observer(value));
  }
}
