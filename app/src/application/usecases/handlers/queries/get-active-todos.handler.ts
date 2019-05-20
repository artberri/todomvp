import { QueryHandler, Service } from '../../../../framework';
import { GetActiveTodosQuery } from '../../queries';
import { Todo, TodoRepository } from '../../../domain';

@Service()
export class GetActiveTodosQueryHandler extends QueryHandler<void, Todo[]> {
    constructor(private readonly repository: TodoRepository) {
        super(GetActiveTodosQuery);
    }

    public handle(): Todo[] {
        return this.repository.getActive();
    }
}
