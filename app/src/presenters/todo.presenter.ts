import { Mediator } from '../framework';
import { GetAllTodosQuery, GetActiveTodosQuery, GetCompletedTodosQuery, Todo } from '../application';

export class TodoPresenter {
    public todos: Todo[] = [];

    constructor(private readonly mediator: Mediator) {}

    public onLoad(): void {
        this.todos = this.mediator.send(new GetAllTodosQuery());
    }

    public onClickAllButton(): void {
        this.todos = this.mediator.send(new GetAllTodosQuery());
    }

    public onClickActiveButton(): void {
        this.todos = this.mediator.send(new GetActiveTodosQuery());
    }

    public onClickCompletedButton(): void {
        this.todos = this.mediator.send(new GetCompletedTodosQuery());
    }
}
