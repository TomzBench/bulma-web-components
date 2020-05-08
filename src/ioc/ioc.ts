import { Container } from 'inversify';
import { makeDecorators } from '../components/shared/decorators';
import ioContainerModule from './service-container';
export const { bind, lazyInject } = makeDecorators(new Container());
