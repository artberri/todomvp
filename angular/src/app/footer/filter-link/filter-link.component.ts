import { Component, OnInit, Input } from '@angular/core';
import { Injector, FilterLinkMixin, IFilterLinkView, FilterLinkPresenter, TodoFilterType } from '../../../../../app/src';
import { BaseView } from '../../base.view';

@Component({
  selector: '[app-filter-link]',
  templateUrl: 'filter-link.template.html',
  styles: []
})
export class FilterLinkComponent extends FilterLinkMixin(BaseView) implements IFilterLinkView, OnInit {
  @Input()
  public filter: TodoFilterType;

  public isSelected: boolean = false;

  public readonly presenter: FilterLinkPresenter = Injector.resolve(FilterLinkPresenter);

  public ngOnInit(): void {
    this.presenter.attach(this);
  }

  public select(): void {
    this.isSelected = true;
  }

  public unselect(): void {
    this.isSelected = false;
  }
}
