import { Component, OnInit } from '@angular/core';
import { IHeaderView, HeaderMixin, HeaderPresenter, Injector } from '../../../../app/src';
import { BaseView } from '../base.view';

@Component({
  selector: '[app-header]',
  templateUrl: 'header.template.html',
  styles: []
})
export class HeaderComponent extends HeaderMixin(BaseView) implements IHeaderView, OnInit {
  public todoTitleInput: string = '';

  public readonly presenter: HeaderPresenter = Injector.resolve(HeaderPresenter);

  public ngOnInit(): void {
    this.presenter.attach(this);
  }

  public emptyTodoInput(): void {
    this.todoTitleInput = '';
  }
}
