export interface ICompleteAllUserActions {
  onCompleteAllClicked(): void;
}

export interface ICompleteAllView extends ICompleteAllUserActions {
  check(): void;
  uncheck(): void;
}
