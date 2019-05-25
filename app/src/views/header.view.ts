export interface IHeaderUserActions {
  onAddTodo(title: string): void;
}

export interface IHeaderView extends IHeaderUserActions {
  emptyTodoInput(): void;
}
