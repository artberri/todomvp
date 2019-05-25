import { Type, Injector } from '../framework';
import { IHeaderUserActions } from './header.view';
import { HeaderPresenter } from '../presenters';

// tslint:disable-next-line:typedef
export function HeaderMixin<TBase extends Type<{}>>(base: TBase) {
  return class extends base implements IHeaderUserActions {
    public presenter: HeaderPresenter = Injector.resolve(HeaderPresenter);

    public onAddTodo(title: string): void {
      this.presenter.addTodo(title);
    }
  };
}
