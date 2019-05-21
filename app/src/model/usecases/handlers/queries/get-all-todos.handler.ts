import { SimpleQueryHandler, Service } from '../../../../framework';
import { GetAllTodosQuery } from '../../queries';
import { Todo, TodoRepository } from '../../../domain';

@Service()
export class GetAllTodosQueryHandler extends SimpleQueryHandler<Todo[]> {
    constructor(private readonly repository: TodoRepository) {
        super(GetAllTodosQuery);
    }

    public handle(): Todo[] {
        return this.repository.getAll();
    }
}
