import { Type, Injector } from '../framework';
import { ITodoUserActions } from './todo.view';
import { TodoPresenter } from '../presenters';

// tslint:disable-next-line:typedef
export function TodoMixin<TBase extends Type>(base: TBase) {
  return class extends base implements ITodoUserActions {
    public presenter: TodoPresenter = Injector.resolve(TodoPresenter);

    public onDoubleClicked(): void {
      this.presenter.setEditMode();
    }

    public onToggleCheckboxClicked(): void {
      this.presenter.toggleTodo();
    }

    public onRemoveButtonClicked(): void {
      this.presenter.removeTodo();
    }

    public onInputBlur(inputContent: string): void {
      this.presenter.editTodo(inputContent);
    }
  };
}
