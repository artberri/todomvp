import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { IFooterView, Injector, FooterMixin, FooterPresenter } from '../core';

interface IFooterState {
  activeTodoCount: number;
  isClearCompletedLinkShown: boolean;
};

export default class Footer extends FooterMixin(Component)<{}, IFooterState> implements IFooterView {
  public readonly presenter: FooterPresenter = Injector.resolve(FooterPresenter);
  private isUmounting: boolean = false;

  public get activeTodoCount(): number {
    return this.state ? this.state.activeTodoCount : 0;
  }

  public get isClearCompletedLinkShown(): boolean {
    return this.state ? this.state.isClearCompletedLinkShown : false;
  }

  public setActiveTodoCount(count: number): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      activeTodoCount: count
    });
  }

  public showClearCompletedLink(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isClearCompletedLinkShown: true
    });
  }

  public hideClearCompletedLink(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isClearCompletedLinkShown: false
    });
  }

  public componentDidMount():void {
    this.presenter.attach(this);
  }

  public componentWillUnmount(): void {
    this.isUmounting = true;
  }

  render() {
    const clearButton = this.isClearCompletedLinkShown
      ? (<button onClick={() => this.onClearCompletedClicked()} className="clear-completed">Clear completed</button>)
      : '';
    const itemWord = this.activeTodoCount === 1 ? 'item' : 'items';
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{ this.activeTodoCount }</strong> {itemWord} left</span>
        <ul className="filters">
          <li>
            <NavLink exact={true} activeClassName="selected" to="/">All</NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="selected" to="/active">Active</NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="selected" to="/completed">Completed</NavLink>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}
