export class Todo {
  private _title: string;
  private _completed: boolean = false;
  private _editing: boolean = false;

  get title(): string {
    return this._title;
  }

  get isCompleted(): boolean {
    return this._completed;
  }

  constructor(title: string) {
    this._title = title.trim();
  }

  public complete(): void {
    this._completed = true;
  }

  public activate(): void {
    this._completed = false;
  }
}
