import { Command } from '../../../framework';
import { Todo } from '../../domain';

export interface IEditTodoPayload {
  todo: Todo;
  title: string;
}

export class EditTodoCommand extends Command<IEditTodoPayload> {
  public payload: IEditTodoPayload;

  constructor(editTodoPayload: IEditTodoPayload) {
    super();
    this.payload = editTodoPayload;
  }
}
