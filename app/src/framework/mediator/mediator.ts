import { QueryHandler, Query } from './base-classes';
import { Injector } from '../di';

export class Mediator {
    private readonly _handlers: Map<string, QueryHandler<any, any>> = new Map<string, QueryHandler<any, any>>();

    constructor(private readonly injector: Injector) {}

    public registerHandler(handler: new (...args: any[]) => QueryHandler<any, any>): void {
        if (this._handlers.has(handler.name)) {
            throw new Error('Handler already registered for: ' + handler.name);
        }
        this.injector.register(handler);
        const handlerInstance: QueryHandler<any, any> = this.injector.resolve(handler);
        this._handlers.set(handlerInstance.queryName, handlerInstance);
    }

    public send<TInput, TOutput>(message: Query<TInput>): TOutput {
        const handler = this.resolveQueryHandler<TInput, TOutput>(message);

        return handler.handle(message.payload);
    }

    private resolveQueryHandler<TInput, TOutput>(message: Query<TInput>): QueryHandler<TInput, TOutput> {
        const handler = this._handlers.get(message.constructor.name);

        if (handler) {
            return handler;
        }

        throw new Error('Can not resolve: ' + message.constructor.name);
    }
}
