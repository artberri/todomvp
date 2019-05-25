import { Service, BasePresenter } from '../framework';
import { IFooterView } from '../views';
import { AppState } from '../model';

@Service()
export class FooterPresenter extends BasePresenter<IFooterView> {
  constructor(
    private readonly state: AppState
  ) {
    super();
  }

  protected init(): void {
    this.state.subscribe(() => this.view.setActiveTodoCount(this.state.activeTodoCount));
  }
}
