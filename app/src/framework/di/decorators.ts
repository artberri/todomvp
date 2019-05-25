// tslint:disable:variable-name
// tslint:disable:ban-types
import { Type } from './types';
import { Injector } from './injector';

type GenericClassDecorator<T> = (target: T) => void;

export const Service = (): GenericClassDecorator<Type<object>> => {
  return (_target: Type<object>) => {};
};

export const Inject = (abstraction: Function) => {
  return (target: any, property: string) => {
    target[property] = Injector.resolve(abstraction);
  };
};
