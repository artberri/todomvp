import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Injector, CompleteAllPresenter, TodoFilterType, CompleteAllMixin, ICompleteAllView } from '../../../../app/src';
import { BaseView } from '../base.view';

@Component({
  selector: '[app-complete-all]',
  templateUrl: 'complete-all.template.html',
  styles: []
})
export class CompleteAllComponent extends CompleteAllMixin(BaseView) implements ICompleteAllView, OnInit {

  @HostBinding('checked')
  public isChecked: boolean = false;

  public readonly presenter: CompleteAllPresenter = Injector.resolve(CompleteAllPresenter);

  @HostListener('click')
  public onClick() {
    this.presenter.completeAll();
  }

  public ngOnInit(): void {
    this.presenter.attach(this);
  }

  public check(): void {
    this.isChecked = true;
  }

  public uncheck(): void {
    this.isChecked = false;
  }
}
