import React, { Component } from 'react';
import { ITodosView, Injector, TodosPresenter, TodoFilterType, Todo } from '../core';
import TodoItem from './TodoItem';

interface ITodosProps {
  filter: TodoFilterType;
};

interface ITodosState {
  todos: Todo[];
};

export default class Todos extends Component<ITodosProps, ITodosState> implements ITodosView {
  public readonly presenter: TodosPresenter = Injector.resolve(TodosPresenter);
  private isUmounting: boolean = false;

  public get filter(): TodoFilterType {
    return this.props ? this.props.filter : 'none';
  }

  public get todos(): Todo[] {
    return this.state ? this.state.todos : [];
  }

  public setTodos(todos: Todo[]): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      todos
    });
  }

  public componentDidMount():void {
    this.presenter.attach(this);
  }

  public componentWillUnmount(): void {
    this.isUmounting = true;
  }

  render() {
    const listItems = this.todos.map((todo) =>
      <TodoItem key={todo.id} todo={todo} />
    );

    return (
      <ul className="todo-list">
        {listItems}
      </ul>
    )
  }
}
