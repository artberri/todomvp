import { Mediator, Service, BasePresenter } from '../framework';
import { IFilterLinkView } from '../views';
import { AppState, SetFilterCommand } from '../model';

@Service()
export class FilterLinkPresenter extends BasePresenter<IFilterLinkView> {
  constructor(
    private readonly state: AppState,
    private readonly mediator: Mediator
  ) {
    super();
  }

  protected init(): void {
    this.state.subscribe(() => {
      this.state.filter === this.view.filter ? this.view.select() : this.view.unselect();
    });
  }

  public applyFilter(): void {
    this.mediator.send(new SetFilterCommand(this.view.filter));
  }
}
