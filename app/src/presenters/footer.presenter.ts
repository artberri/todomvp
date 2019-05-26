import { Service, BasePresenter, Mediator } from '../framework';
import { IFooterView } from '../views';
import { AppState, ClearCompletedCommand } from '../model';

@Service()
export class FooterPresenter extends BasePresenter<IFooterView> {
  constructor(
    private readonly state: AppState,
    private readonly mediator: Mediator
  ) {
    super();
  }

  protected init(): void {
    this.state.subscribe(() => {
      this.view.setActiveTodoCount(this.state.activeTodoCount);
      this.state.anyCompletedTodos ? this.view.showClearCompletedLink() : this.view.hideClearCompletedLink();
    });
  }

  public clearCompleted(): void {
    this.mediator.send(new ClearCompletedCommand());
  }
}
