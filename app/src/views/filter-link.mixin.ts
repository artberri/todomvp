import { Type, Injector } from '../framework';
import { IFilterLinkUserActions } from './filter-link.view';
import { FilterLinkPresenter } from '../presenters';

// tslint:disable-next-line:typedef
export function FilterLinkMixin<TBase extends Type>(base: TBase) {
  return class extends base implements IFilterLinkUserActions {
    public presenter: FilterLinkPresenter = Injector.resolve(FilterLinkPresenter);

    public onLinkClicked(): void {
      this.presenter.applyFilter();
    }
  };
}
