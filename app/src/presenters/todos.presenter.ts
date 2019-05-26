import { Service, BasePresenter, Mediator } from '../framework';
import { ITodosView } from '../views';
import { AppState, SetFilterCommand } from '../model';

@Service()
export class TodosPresenter extends BasePresenter<ITodosView> {
  constructor(
    private readonly mediator: Mediator,
    private readonly state: AppState
  ) {
    super();
  }

  protected init(): void {
    this.mediator.send(new SetFilterCommand(this.view.filter));
    this.state.subscribe(() => this.view.setTodos(this.state.visibleTodos));
  }
}
