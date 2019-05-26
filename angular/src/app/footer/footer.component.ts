import { Component, OnInit } from '@angular/core';
import { Injector, IFooterView, FooterPresenter, TodoFilterType, FooterMixin } from '../../../../app/src';
import { BaseView } from '../base.view';

@Component({
  selector: '[app-footer]',
  templateUrl: 'footer.template.html',
  styles: []
})
export class FooterComponent extends FooterMixin(BaseView) implements IFooterView, OnInit {
  public activeTodoCount: number = 0;
  public noneFilter: TodoFilterType = 'none';
  public activeFilter: TodoFilterType = 'active';
  public completedFilter: TodoFilterType = 'completed';
  public isClearCompletedLinkShown: boolean = false;

  public readonly presenter: FooterPresenter = Injector.resolve(FooterPresenter);

  public itemsMapping:
      {[k: string]: string} = {
        '=0': 'items',
        '=1': 'item',
        'other': 'items'
      };

  public ngOnInit(): void {
    this.presenter.attach(this);
  }

  public setActiveTodoCount(count: number): void {
    this.activeTodoCount = count;
  }

  public showClearCompletedLink(): void {
    this.isClearCompletedLinkShown = true;
  }

  public hideClearCompletedLink(): void {
    this.isClearCompletedLinkShown = false;
  }
}
