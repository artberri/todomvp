import { IFilterLinkView, FilterLinkMixin } from '../../../src/views';
import { TodoFilterType } from '../../../src/model';
import { BaseView } from './base.view';

export const select = jest.fn();
export const unselect = jest.fn();

export class FilterLinkViewMock extends FilterLinkMixin(BaseView) implements IFilterLinkView {
  public filter: TodoFilterType = 'none';
  public select: () => void = select;
  public unselect: () => void = unselect;
}
