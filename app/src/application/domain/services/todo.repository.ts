import { Todo } from '../entities';
import { StoragePort } from '../ports';
import { Service } from '../../../framework';

@Service()
export class TodoRepository {
  private _todos: Todo[];

  constructor(private readonly storage: StoragePort) {
    this._todos = this.storage.getTodos();
    /*let persistedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    // Normalize back into classes
    this._todos = persistedTodos.map( (todo: {_title: String, completed: Boolean}) => {
      let ret = new Todo(todo._title);
      ret.completed = todo.completed;
      return ret;
    });*/
  }

  public getAll(): Todo[] {
    return this._todos;
  }

  public getActive(): Todo[] {
    return this.getWithCompleted(false);
  }

  public getCompleted(): Todo[] {
    return this.getWithCompleted(true);
  }

  public removeCompleted(): void {
    this._todos = this.getWithCompleted(false);
  }

  public remove(todo: Todo): void {
    this._todos.splice(this._todos.indexOf(todo), 1);
  }

  public add(todo: Todo): void {
    this._todos.push(todo);
  }

  public save(): void {
    this.storage.saveTodos(this._todos);
  }

  private getWithCompleted(completed: boolean): Todo[] {
    return this._todos.filter((todo: Todo) => todo.isCompleted === completed);
  }

  /*
  setAllTo(completed: Boolean) {
    this._todos.forEach((t: Todo) => t.completed = completed);
    this.updateStore();
  }

  private updateStore() {
    localStorage.setItem('angular2-todos', JSON.stringify(this._todos));
  }*/
}
