import React, { Component, KeyboardEvent, ChangeEvent } from 'react';

import { ITodoView, Injector, TodoMixin, TodoPresenter, Todo } from '../core';

interface ITodoItemProps {
  todo: Todo;
};

interface ITodoItemState {
  isEditing: boolean;
  isCompleted: boolean;
  todoTitleInput: string;
};

export default class TodoItem extends TodoMixin(Component)<ITodoItemProps, ITodoItemState> implements ITodoView {
  public readonly presenter: TodoPresenter = Injector.resolve(TodoPresenter);
  private isUmounting: boolean = false;

  public get todo(): Todo {
    return this.props.todo;
  }

  public get todoTitleInput(): string {
    return this.state ? this.state.todoTitleInput : this.props.todo.title;
  }

  public get isEditing(): boolean {
    return this.state ? this.state.isEditing : false;
  }

  public get isCompleted(): boolean {
    return this.state ? this.state.isCompleted : false;
  }

  public setEditMode(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isEditing: true
    });
  }

  public setViewMode(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isEditing: false
    });
  }

  public completeTodo(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isCompleted: true
    });
  }

  public activateTodo(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isCompleted: false
    });
  }

  public onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      this.onInputBlur(this.todoTitleInput);
    }
  }

  public onChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      todoTitleInput: event.target.value
    });
  }

  public componentDidMount():void {
    this.presenter.attach(this);
    this.setState({
      todoTitleInput: this.props.todo.title
    });
  }

  public componentWillUnmount(): void {
    this.isUmounting = true;
  }

  render() {
    let liClasses = '';
    liClasses += this.isCompleted ? ' completed' : '';
    liClasses += this.isEditing ? ' editing' : '';

    return (
      <li className={liClasses}>
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={this.isCompleted}
                 onChange={() => {}}
                 onClick={() => this.onToggleCheckboxClicked()} />
          <label onDoubleClick={() => this.onDoubleClicked()}>{ this.todo.title }</label>
          <button className="destroy" onClick={() => this.onRemoveButtonClicked()}></button>
        </div>
        <input className="edit"
               value={this.todoTitleInput}
               onChange={event => this.onChange(event)}
               onBlur={() => this.onInputBlur(this.todoTitleInput)}
               onKeyDown={event => this.onKeyDown(event)} />
      </li>
    )
  }
}
