import { Subscription } from './observable';
import { StateContainer } from './state-container';

export abstract class StateAggregator extends StateContainer<void> {

  constructor(containers: Array<StateContainer<any>>) {
    super();
    containers.forEach((c) => c.subscribe(() => this.setState(), false));
    this.setState();
  }

  public subscribe(callback: (value?: void) => void, runInmediately: boolean = true): Subscription {
    if (runInmediately) {
      callback();
    }
    return super.subscribe(callback);
  }
}
