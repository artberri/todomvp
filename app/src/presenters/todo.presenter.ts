import { Service, BasePresenter } from '../framework';
import { ITodoView } from '../views';
import { AppState } from '../model';

@Service()
export class TodoPresenter extends BasePresenter<ITodoView> {
  constructor(
    private readonly state: AppState
  ) {
    super();
  }

  protected init(): void {

  }

  public editTodo(title: string): void {
    throw new Error('Method not implemented.');
  }

  public removeTodo(): void {
    throw new Error('Method not implemented.');
  }

  public toggleTodo(): void {
    throw new Error('Method not implemented.');
  }

  public setEditMode(): void {
    throw new Error('Method not implemented.');
  }
}
