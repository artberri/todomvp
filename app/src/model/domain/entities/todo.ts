export class Todo {
  private _id: number;
  private _title: string;
  private _completed: boolean = false;

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get isCompleted(): boolean {
    return this._completed;
  }

  constructor(id: number, title: string) {
    this._id = id;
    this._title = title;
  }

  public setTitle(newTitle: string): void {
    this._title = newTitle;
  }

  public complete(): void {
    this._completed = true;
  }

  public activate(): void {
    this._completed = false;
  }
}
