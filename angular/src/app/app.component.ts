import { Component, OnInit } from '@angular/core';
import { AppPresenter, IAppView, Injector } from '../../../app/src';

@Component({
  selector: 'app-root',
  templateUrl: 'app.template.html',
  styles: []
})
export class AppComponent implements IAppView, OnInit {
  public isListVisible: boolean;

  protected readonly presenter: AppPresenter = Injector.resolve(AppPresenter);

  public ngOnInit(): void {
    this.presenter.attach(this);
  }

  public showList(): void {
    this.isListVisible = true;
  }

  public hideList(): void {
    this.isListVisible = false;
  }
}
