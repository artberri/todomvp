import { IHeaderView, HeaderMixin } from '../../../src/views';
import { BaseView } from './base.view';

export const emptyTodoInput = jest.fn();

export class HeaderViewMock extends HeaderMixin(BaseView) implements IHeaderView {
  public emptyTodoInput: () => void = emptyTodoInput;
}
