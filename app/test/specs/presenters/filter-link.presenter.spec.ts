import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { FilterLinkPresenter } from '../../../src/presenters';
import { IFilterLinkView } from '../../../src/views';
import { FilterState, AppState } from '../../../src/model';

import * as filterLinkViewMock from '../../mocks/views/filter-link-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('FilterLinkPresenter', () => {
  let presenter: FilterLinkPresenter;
  let view: IFilterLinkView;

  beforeEach(() => {
    storageMock.getTodos.mockReturnValue([]);
    bootstrap(storageMock.TodoStorageMock);
    view = new filterLinkViewMock.FilterLinkViewMock();
    presenter = Injector.resolve<FilterLinkPresenter>(FilterLinkPresenter);
  });

  afterEach(() => {
    jest.clearAllMocks();
    Injector.reset();
  });

  describe('On load', () => {
    let filterState: FilterState;

    test.each`
      visibilityFilter | filter
      ${'none'}        | ${'none'}
      ${'active'}      | ${'active'}
      ${'completed'}   | ${'completed'}
    `('mark link as selected when visibilityFilter is "$visibilityFilter" and filter link is "$filter"', ({ visibilityFilter, filter }) => {
      filterState = Injector.resolve<FilterState>(FilterState);
      filterState.setVisibilityFilter(visibilityFilter);
      view.filter = filter;

      presenter.attach(view);

      expect(view.select).toHaveBeenCalled();
    });

    test.each`
      visibilityFilter | filter
      ${'none'}        | ${'active'}
      ${'none'}        | ${'completed'}
      ${'active'}      | ${'none'}
      ${'active'}      | ${'completed'}
      ${'completed'}   | ${'none'}
      ${'completed'}   | ${'active'}
    `('mark link as not selected when visibilityFilter is "$visibilityFilter" and filter link is "$filter"',
        ({ visibilityFilter, filter }) => {
      filterState = Injector.resolve<FilterState>(FilterState);
      filterState.setVisibilityFilter(visibilityFilter);
      view.filter = filter;

      presenter.attach(view);

      expect(view.unselect).toHaveBeenCalled();
    });
  });

  describe('On state change', () => {
    let filterState: FilterState;

    beforeEach(() => {
      presenter.attach(view);
    });

    test.each`
      visibilityFilter | filter
      ${'none'}        | ${'none'}
      ${'active'}      | ${'active'}
      ${'completed'}   | ${'completed'}
    `('mark link as selected when visibilityFilter is "$visibilityFilter" and filter link is "$filter"', ({ visibilityFilter, filter }) => {
      view.filter = filter;

      filterState = Injector.resolve<FilterState>(FilterState);
      filterState.setVisibilityFilter(visibilityFilter);

      expect(view.select).toHaveBeenCalled();
    });

    test.each`
      visibilityFilter | filter
      ${'none'}        | ${'active'}
      ${'none'}        | ${'completed'}
      ${'active'}      | ${'none'}
      ${'active'}      | ${'completed'}
      ${'completed'}   | ${'none'}
      ${'completed'}   | ${'active'}
    `('mark link as not selected when visibilityFilter is "$visibilityFilter" and filter link is "$filter"',
        ({ visibilityFilter, filter }) => {
      view.filter = filter;
      filterState = Injector.resolve<FilterState>(FilterState);
      filterState.setVisibilityFilter(visibilityFilter);

      expect(view.unselect).toHaveBeenCalled();
    });
  });

  describe('User actions', () => {
    let appState: AppState;

    beforeEach(() => {
      presenter.attach(view);
      appState = Injector.resolve<AppState>(AppState);
    });

    describe('On click filter link', () => {
      test.each`
        filter           | expectedResult
        ${'none'}        | ${'none'}
        ${'active'}      | ${'active'}
        ${'completed'}   | ${'completed'}
      `('when filter is "$filter" sets app state to "$expectedResult"', ({ filter, expectedResult }) => {
        view.filter = filter;

        presenter.applyFilter();

        expect(appState.filter).toBe(expectedResult);
      });
    });
  });
});
