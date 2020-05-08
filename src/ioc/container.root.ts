import { Container } from 'inversify';
import { makeDecorators } from '../components/shared/decorators';
import ioContainerModule from './service-container';

let container = new Container();
container.load(ioContainerModule);

export const { bind, lazyInject } = makeDecorators(container);
