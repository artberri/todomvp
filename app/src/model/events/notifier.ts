import { Emitter, Service } from '../../framework';
import { Events } from './events';

@Service()
export class Notifier extends Emitter<Events> {}
