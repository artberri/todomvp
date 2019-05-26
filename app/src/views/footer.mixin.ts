import { Type, Injector } from '../framework';
import { IFooterUserActions } from './footer.view';
import { FooterPresenter } from '../presenters';

// tslint:disable-next-line:typedef
export function FooterMixin<TBase extends Type>(base: TBase) {
  return class extends base implements IFooterUserActions {
    public presenter: FooterPresenter = Injector.resolve(FooterPresenter);

    public onClearCompletedClicked(): void {
      this.presenter.clearCompleted();
    }
  };
}
