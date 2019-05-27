// tslint:disable:ban-types
import 'reflect-metadata';

export type Type<T = {}> = new(...args: any[]) => T;

export interface IServiceData {
  implementation?: Type<any>;
  tokens?: any[];
  instance?: any;
  isSingleton: boolean;
}

export class Injector {
  private static readonly _container: Map<string, IServiceData> = new Map<string, IServiceData>();

  public static register<T>(implementation: Type<T>, abstraction?: Function, isSingleton: boolean = false): void {
    const registerKey = abstraction ? abstraction.name : implementation.name;

    if (this._container.has(registerKey)) {
      throw new Error('Class already registered for: ' + registerKey);
    }

    const tokens = Reflect.getMetadata('design:paramtypes', implementation) || [];
    this._container.set(registerKey, {
      implementation,
      tokens,
      isSingleton
    });
  }

  public static registerSingleton<T>(implementation: Type<T>, abstraction?: Function): void {
    this.register(implementation, abstraction, true);
  }

  public static registerInstance<T>(instance: T, abstraction: Function): void {
    const registerKey = abstraction.name;

    if (this._container.has(registerKey)) {
      throw new Error('Class already registered for: ' + registerKey);
    }

    this._container.set(registerKey, {
      instance,
      isSingleton: true
    });
  }

  public static resolve<T>(abstraction: Function): T {
    const registerKey = abstraction.name;
    const serviceData = this._container.get(registerKey);

    if (!serviceData) {
      throw new Error('Class not registered for: ' + registerKey);
    }

    if (serviceData.instance) {
      return serviceData.instance;
    }

    if (!serviceData.tokens || !serviceData.implementation) {
      throw new Error('Class for: ' + registerKey + ' is not properly registered');
    }

    const injections = serviceData.tokens.map((token: Type<any>) => this.resolve<any>(token));
    const newClassInstance = new serviceData.implementation(...injections);

    if (serviceData.isSingleton) {
      serviceData.instance = newClassInstance;
    }

    return newClassInstance;
  }

  public static reset(): void {
    this._container.clear();
  }
}
