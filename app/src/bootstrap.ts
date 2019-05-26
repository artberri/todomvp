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
  ClearCompletedCommandHandler,
  CompleteAllCommandHandler,
  ToggleTodoCommandHandler,
  RemoveTodoCommandHandler,
  EditTodoCommandHandler
} from './model';
import {
  AppPresenter,
  TodosPresenter,
  HeaderPresenter,
  FooterPresenter,
  CompleteAllPresenter,
  TodoPresenter
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
  mediator.registerHandler(ClearCompletedCommandHandler);
  mediator.registerHandler(CompleteAllCommandHandler);
  mediator.registerHandler(ToggleTodoCommandHandler);
  mediator.registerHandler(RemoveTodoCommandHandler);
  mediator.registerHandler(EditTodoCommandHandler);
  Injector.registerInstance(mediator, Mediator);

  // Presenters
  Injector.register(AppPresenter);
  Injector.register(TodosPresenter);
  Injector.register(HeaderPresenter);
  Injector.register(FooterPresenter);
  Injector.register(CompleteAllPresenter);
  Injector.register(TodoPresenter);
};
