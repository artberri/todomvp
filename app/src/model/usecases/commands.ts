// tslint:disable:max-classes-per-file

import { Command } from '../../framework';

export class AddTodoCommand extends Command<string> {
  public readonly payload: string;

  constructor(title: string) {
    super();
    this.payload = title;
  }
}
