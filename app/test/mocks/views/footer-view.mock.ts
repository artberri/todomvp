import { IFooterView } from '../../../src';

export const setActiveTodoCount = jest.fn();

export class FooterViewMock implements IFooterView {
  public setActiveTodoCount: (count: number) => void = setActiveTodoCount;
}
