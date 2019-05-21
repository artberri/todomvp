import { TodoStorageService } from "./todo-storage.service";
import { Mediator, bootstrap } from '../../../app/src';

export const mediatorFactory: () => Mediator = () => {
  return bootstrap(TodoStorageService);
};
