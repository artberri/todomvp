import { ICompleteAllView, CompleteAllMixin } from '../../../src/views';
import { BaseView } from './base.view';

export const check = jest.fn();
export const uncheck = jest.fn();

export class CompleteAllViewMock extends CompleteAllMixin(BaseView) implements ICompleteAllView {
  public check: () => void = check;
  public uncheck: () => void = uncheck;
}
