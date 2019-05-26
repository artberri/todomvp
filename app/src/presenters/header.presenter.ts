import { Mediator, Service, BasePresenter } from '../framework';
import { IHeaderView } from '../views';
import { AddTodoCommand } from '../model';

@Service()
export class HeaderPresenter extends BasePresenter<IHeaderView> {
  constructor(
    private readonly mediator: Mediator
  ) {
    super();
  }

  protected init(): void {
    this.view.emptyTodoInput();
  }

  public addTodo(newTodoTitle: string): void {
    newTodoTitle.trim();
    if (newTodoTitle) {
      this.view.emptyTodoInput();
      this.mediator.send(new AddTodoCommand(newTodoTitle));
    }
  }
}
