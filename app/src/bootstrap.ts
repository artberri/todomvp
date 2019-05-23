import { Injector, Type, Mediator, Observable } from './framework';
import {
    GetAllTodosQueryHandler,
    TodoRepository,
    StoragePort,
    GetActiveTodosQueryHandler,
    GetCompletedTodosQueryHandler,
    AddTodoCommandHandler,
    Notifier,
    Events
} from './model';
import { AppPresenter } from './presenters';

export const bootstrap = (storageImplementation: Type<StoragePort>) => {
    Injector.registerSingleton(Notifier);
    Injector.registerSingleton(TodoRepository);
    Injector.register(storageImplementation, StoragePort);

    const notifier = Injector.resolve<Notifier>(Notifier);
    notifier.addObservable(new Observable(Events.TodosChanged));

    const mediator = new Mediator();
    mediator.registerHandler(GetAllTodosQueryHandler);
    mediator.registerHandler(GetActiveTodosQueryHandler);
    mediator.registerHandler(GetCompletedTodosQueryHandler);
    mediator.registerHandler(AddTodoCommandHandler);

    Injector.registerInstance(mediator, Mediator);
    Injector.register(AppPresenter);
};
