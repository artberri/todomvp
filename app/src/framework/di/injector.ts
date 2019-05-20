// tslint:disable:ban-types
import 'reflect-metadata';
import { Type } from './types';
import { IServiceData } from './interfaces';

export class Injector {
  private readonly _container: Map<string, IServiceData> = new Map<string, IServiceData>();
  private readonly _singletons: Map<string, any> = new Map<string, any>();

  public register<T>(implementation: Type<T>, abstraction?: Function): void {
    const registerKey = abstraction ? abstraction.name : implementation.name;

    if (this._container.has(registerKey)) {
      throw new Error('Class already registered for: ' + registerKey);
    }

    const tokens = Reflect.getMetadata('design:paramtypes', implementation) || [];
    this._container.set(registerKey, {
      implementation,
      tokens
    });
  }

  public resolve<T>(target: Function): T {
    const registerKey = target.name;

    const registeredInstance = this._singletons.get(registerKey);
    if (registeredInstance) {
      return registeredInstance;
    }

    const serviceData = this._container.get(registerKey);
    if (!serviceData) {
      throw new Error('Class not registered for: ' + registerKey);
    }

    const injections = serviceData.tokens.map((token: Type<any>) => this.resolve<any>(token));
    const newClassInstance = new serviceData.implementation(...injections);
    this._singletons.set(registerKey, newClassInstance);

    return newClassInstance;
  }
}
