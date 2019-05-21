import { Injector, Type, Mediator } from './framework';
import {
    GetAllTodosQueryHandler,
    TodoRepository,
    StoragePort,
    GetActiveTodosQueryHandler,
    GetCompletedTodosQueryHandler,
    AddTodoCommandHandler
} from './model';

export const bootstrap = (storageImplementation: Type<StoragePort>): Mediator => {
    const injector = new Injector();
    injector.register(TodoRepository);
    injector.register(storageImplementation, StoragePort);

    const mediator = new Mediator(injector);
    mediator.registerHandler(GetAllTodosQueryHandler);
    mediator.registerHandler(GetActiveTodosQueryHandler);
    mediator.registerHandler(GetCompletedTodosQueryHandler);
    mediator.registerHandler(AddTodoCommandHandler);

    return mediator;
};
