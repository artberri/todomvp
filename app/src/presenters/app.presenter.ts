import { Service, BasePresenter, Mediator } from '../framework';
import { AppState, LoadTodosCommand, SaveTodosCommand } from '../model';
import { IAppView } from '../views';

@Service()
export class AppPresenter extends BasePresenter<IAppView> {
  constructor(
    private readonly mediator: Mediator,
    private readonly state: AppState
  ) {
    super();
  }

  protected init(): void {
    this.mediator.send(new LoadTodosCommand());
    this.state.subscribe(() => {
      this.mediator.send(new SaveTodosCommand(this.state.todos));
      this.state.anyTodos ? this.view.showList() : this.view.hideList();
    });
  }
}
