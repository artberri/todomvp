import { QueryHandler, Service } from '../../../../framework';
import { GetCompletedTodosQuery } from '../../queries';
import { Todo, TodoRepository } from '../../../domain';

@Service()
export class GetCompletedTodosQueryHandler extends QueryHandler<void, Todo[]> {
    constructor(private readonly repository: TodoRepository) {
        super(GetCompletedTodosQuery);
    }

    public handle(): Todo[] {
        return this.repository.getCompleted();
    }
}
