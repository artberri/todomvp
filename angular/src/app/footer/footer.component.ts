import { Component, OnInit } from '@angular/core';
import { Injector, IFooterView, FooterPresenter, TodoFilterType } from '../../../../app/src';

@Component({
  selector: '[app-footer]',
  templateUrl: 'footer.template.html',
  styles: []
})
export class FooterComponent implements IFooterView, OnInit {

  public activeTodoCount: number = 0;
  public noneFilter: TodoFilterType = 'none';
  public activeFilter: TodoFilterType = 'active';
  public completedFilter: TodoFilterType = 'completed';

  protected readonly presenter: FooterPresenter = Injector.resolve(FooterPresenter);

  public ngOnInit(): void {
    this.presenter.attach(this);
  }

  public setActiveTodoCount(count: number): void {
    this.activeTodoCount = count;
  }
}
