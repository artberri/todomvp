// tslint:disable:max-classes-per-file

export abstract class Query<TInput> {
    public readonly abstract payload?: TInput;
}
export abstract class SimpleQuery extends Query<void> {
    public readonly payload?: undefined;
}
export abstract class Command<TInput> extends Query<TInput> {}
export abstract class SimpleCommand extends SimpleQuery {}
export abstract class QueryHandler<TInput, TOutput> {
    public readonly queryName: string;

    constructor(query: new (payload: TInput) => Query<TInput>) {
        this.queryName = query.name;
    }

    public abstract handle(payload?: TInput): TOutput;
}
export abstract class SimpleQueryHandler<TOutput> extends QueryHandler<void, TOutput> {}
export abstract class CommandHandler<TInput> extends QueryHandler<TInput, void> {}
export abstract class SimpleCommandHandler extends SimpleQueryHandler<void> {}
