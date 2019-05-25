export type Subscription = {
  unsubscribe: () => void;
};

export abstract class Observable<T> {
  private readonly _subscribers: Array<(value: T) => void> = [];

  protected emit(value: T): void {
    this._subscribers.map((callback) => callback(value));
  }

  public subscribe(callback: (value: T) => void): Subscription {
    this._subscribers.push(callback);
    return {
      unsubscribe: () => {
        const index = this._subscribers.indexOf(callback);
        if (index >= 0) {
          this._subscribers.splice(index, 1);
        }
      }
    };
  }
}
