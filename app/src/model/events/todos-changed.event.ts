import { Todo } from '../domain';
import { IEvent } from '../../framework';
import { Events } from './events';

export class TodosChanged implements IEvent<Events, Todo[]> {
  public readonly type: Events = Events.TodosChanged;

  constructor(public readonly payload: Todo[]) {}
}
