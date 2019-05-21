import { SimpleQueryHandler, Service } from '../../../../framework';
import { GetActiveTodosQuery } from '../../queries';
import { Todo, TodoRepository } from '../../../domain';

@Service()
export class GetActiveTodosQueryHandler extends SimpleQueryHandler<Todo[]> {
    constructor(private readonly repository: TodoRepository) {
        super(GetActiveTodosQuery);
    }

    public handle(): Todo[] {
        return this.repository.getActive();
    }
}
