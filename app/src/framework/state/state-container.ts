import { Observable, Subscription } from './observable';

export abstract class StateContainer<T> extends Observable<T> {

  constructor(private _state: T) {
    super();
  }

  public subscribe(callback: (value: T) => void, runInmediately: boolean = true): Subscription {
    if (runInmediately) {
      callback(this.state);
    }
    return super.subscribe(callback);
  }

  public get state(): T {
    return this._state;
  }

  protected setState(newState: T): void {
    this._state = newState;
    this.emit(newState);
  }
}
