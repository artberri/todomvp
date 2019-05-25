import { Injector, Type, Mediator } from './framework';
import {
    AddTodoCommandHandler,
    TodoStorageService,
    TodosState,
    FilterState,
    AppState,
    SaveTodosCommandHandler,
    LoadTodosCommandHandler,
    SetFilterCommandHandler,
} from './model';
import {
  AppPresenter,
  FilterLinkPresenter,
  TodosPresenter,
  HeaderPresenter,
  FooterPresenter
} from './presenters';

export const bootstrap = (storageServiceImplementation: Type<TodoStorageService>) => {
  // Infrastructure
  Injector.register(storageServiceImplementation, TodoStorageService);

  // State
  Injector.registerSingleton(TodosState);
  Injector.registerSingleton(FilterState);
  Injector.registerSingleton(AppState);

  // Command handlers
  const mediator = new Mediator();
  mediator.registerHandler(AddTodoCommandHandler);
  mediator.registerHandler(SaveTodosCommandHandler);
  mediator.registerHandler(LoadTodosCommandHandler);
  mediator.registerHandler(SetFilterCommandHandler);
  Injector.registerInstance(mediator, Mediator);

  // Presenters
  Injector.register(AppPresenter);
  Injector.register(FilterLinkPresenter);
  Injector.register(TodosPresenter);
  Injector.register(HeaderPresenter);
  Injector.register(FooterPresenter);
};
