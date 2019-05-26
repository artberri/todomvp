export interface IFooterUserActions {
  onClearCompletedClicked(): void;
}

export interface IFooterView extends IFooterUserActions {
  setActiveTodoCount(count: number): void;
  showClearCompletedLink(): void;
  hideClearCompletedLink(): void;
}
