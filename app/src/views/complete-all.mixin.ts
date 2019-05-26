import { Type, Injector } from '../framework';
import { ICompleteAllUserActions } from './complete-all.view';
import { CompleteAllPresenter } from '../presenters';

// tslint:disable-next-line:typedef
export function CompleteAllMixin<TBase extends Type>(base: TBase) {
  return class extends base implements ICompleteAllUserActions {
    public onCompleteAllClicked(): void {
      const presenter: CompleteAllPresenter = Injector.resolve(CompleteAllPresenter);
      presenter.completeAll();
    }
  };
}
