import { Type } from './types';

export interface IServiceData {
    implementation: Type<any>;
    tokens: any[];
}
