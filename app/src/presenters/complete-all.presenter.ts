import { Mediator, Service, BasePresenter } from '../framework';
import { ICompleteAllView } from '../views';
import { AppState, CompleteAllCommand } from '../model';

@Service()
export class CompleteAllPresenter extends BasePresenter<ICompleteAllView> {
  constructor(
    private readonly state: AppState,
    private readonly mediator: Mediator
  ) {
    super();
  }

  protected init(): void {
    this.state.subscribe(() => {
      this.state.areAllCompleted ? this.view.check() : this.view.uncheck();
    });
  }

  public completeAll(): void {
    this.mediator.send(new CompleteAllCommand());
  }
}
