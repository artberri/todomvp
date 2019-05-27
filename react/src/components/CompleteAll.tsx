import React, { Component } from 'react';
import { ICompleteAllView, Injector, CompleteAllMixin, CompleteAllPresenter } from '../core';

interface ICompleteAllState {
  isChecked: boolean;
};

export default class CompleteAll extends CompleteAllMixin(Component)<{}, ICompleteAllState> implements ICompleteAllView {
  public readonly presenter: CompleteAllPresenter = Injector.resolve(CompleteAllPresenter);
  private isUmounting: boolean = false;

  public get isChecked(): boolean {
    return this.state ? this.state.isChecked : false;
  }

  public check(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isChecked: true
    });
  }

  public uncheck(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isChecked: false
    });
  }

  public componentDidMount():void {
    this.presenter.attach(this);
  }

  public componentWillUnmount(): void {
    this.isUmounting = true;
  }

  render() {
    return (
      <input id="toggle-all"
             className="toggle-all"
             type="checkbox"
             onChange={() => {}}
             onClick={() => this.onCompleteAllClicked()}
             checked={this.isChecked} />
    )
  }
}
