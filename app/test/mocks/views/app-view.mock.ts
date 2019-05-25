import { IAppView } from '../../../src';

export const showList = jest.fn();
export const hideList = jest.fn();

export class AppViewMock implements IAppView {
  public showList: () => void = showList;
  public hideList: () => void = hideList;
}
