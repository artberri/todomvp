import { TodosState } from './todos-state';
import { FilterState } from './filter-state';
import { Service, StateAggregator } from '../../framework';

@Service()
export class AppState extends StateAggregator {
  constructor(
    todosState: TodosState,
    filterState: FilterState
  ) {
    super([todosState, filterState]);
    this.setState();
  }
}
