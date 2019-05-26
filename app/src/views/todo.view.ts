import { Todo } from '../model';

export interface ITodoUserActions {
  onDoubleClicked(): void;
  onToggleCheckboxClicked(): void;
  onRemoveButtonClicked(): void;
  onInputBlur(inputContent: string): void;
}

export interface ITodoView extends ITodoUserActions {
  todo: Todo;
  setEditMode(): void;
  setViewMode(): void;
  completeTodo(): void;
  activateTodo(): void;
}
