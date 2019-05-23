// tslint:disable:max-classes-per-file

import { Type } from '../framework';

export const baseViewMixin = <TBase extends Type>(base: TBase) => {

  return class extends base {};
};
