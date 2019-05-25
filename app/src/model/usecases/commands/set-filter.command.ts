import { Command } from '../../../framework';
import { TodoFilterType } from '../../state';

export class SetFilterCommand extends Command<TodoFilterType> {
  public readonly payload: TodoFilterType;

  constructor(filter: TodoFilterType) {
    super();
    this.payload = filter;
  }
}
