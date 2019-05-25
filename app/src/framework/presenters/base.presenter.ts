export abstract class BasePresenter<V> {
  protected _view!: V;

  protected get view(): V {
    return this._view;
  }

  protected abstract init(): void;

  public attach(view: V): void {
    this._view = view;
    this.init();
  }
}
