import { TodoFilterType } from '../model';

export interface IFilterLinkUserActions {
  onLinkClicked(): void;
}

export interface IFilterLinkView extends IFilterLinkUserActions {
  filter: TodoFilterType;
  select(): void;
  unselect(): void;
}
