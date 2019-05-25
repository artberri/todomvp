import { Service, StateContainer } from '../../framework';

export type TodoFilterType = 'none' | 'completed' | 'active';

@Service()
export class FilterState extends StateContainer<TodoFilterType> {
  constructor() {
    super('none');
  }

  public setVisibilityFilter(filter: TodoFilterType): void {
    this.setState(filter);
  }
}
