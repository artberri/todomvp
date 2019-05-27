import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { IHeaderView, Injector, HeaderMixin, HeaderPresenter } from '../core';

interface IHeaderState {
  input: string;
};

export default class Header extends HeaderMixin(Component)<{}, IHeaderState> implements IHeaderView {
  public readonly presenter: HeaderPresenter = Injector.resolve(HeaderPresenter);

  public get todoTitleInput(): string {
    return this.state ? this.state.input : '';
  }

  public emptyTodoInput(): void {
    this.setState({
      input: ''
    });
  }

  public onChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      input: event.target.value
    });
  }

  public onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      this.onAddTodo(this.state.input);
    }
  }

  public componentDidMount():void {
    this.presenter.attach(this);
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo"
               placeholder="What needs to be done?"
               onChange={event => this.onChange(event)}
               onKeyDown={event => this.onKeyDown(event)}
               value={this.todoTitleInput}
               autoFocus={true} />
      </header>
    )
  }
}
