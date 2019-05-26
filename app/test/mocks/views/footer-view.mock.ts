import { IFooterView, FooterMixin } from '../../../src/views';
import { BaseView } from './base.view';

export const setActiveTodoCount = jest.fn();
export const showClearCompletedLink = jest.fn();
export const hideClearCompletedLink = jest.fn();

export class FooterViewMock extends FooterMixin(BaseView)  implements IFooterView {
  public setActiveTodoCount: (count: number) => void = setActiveTodoCount;
  public showClearCompletedLink: () => void = showClearCompletedLink;
  public hideClearCompletedLink: () => void = hideClearCompletedLink;
}
