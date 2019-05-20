import { Type } from './types';

type GenericClassDecorator<T> = (target: T) => void;

// tslint:disable-next-line:variable-name
export const Service = (): GenericClassDecorator<Type<object>> => {
  return (_target: Type<object>) => {};
};
