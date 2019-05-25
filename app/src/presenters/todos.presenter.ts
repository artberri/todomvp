import { Service, BasePresenter } from '../framework';
import { ITodosView } from '../views';
import { AppState } from '../model';

@Service()
export class TodosPresenter extends BasePresenter<ITodosView> {
  constructor(
    private readonly state: AppState
  ) {
    super();
  }

  protected init(): void {
    this.state.subscribe(() => this.view.setTodos(this.state.visibleTodos));
  }
}
