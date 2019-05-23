import { IEvent } from './event';
import { Observable } from './observable';

export abstract class Emitter<TEventType> {
  private readonly _observables: Array<Observable<TEventType, any>> = [];

  public addObservable<T>(observable: Observable<TEventType, T>): void {
    this._observables.push(observable);
  }

  public emit<T>(event: IEvent<TEventType, T>): void {
    this._observables
      .filter(o => o.eventType === event.type)
      .map(o => o.emit(event.payload));
  }

  public subscribe<T>(type: TEventType, callback: (value: T) => void): void {
    const observable = this._observables.find(o => o.eventType === type);
    if (!observable) {
      throw new Error('Can not find observable of type ' + type);
    }
    observable.subscribe(callback);
  }
}
