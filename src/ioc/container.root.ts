import { Container } from 'inversify';
import { makeDecorators } from '../components/shared/decorators';

export const container = new Container();

export const { bind, bindTo, lazyInject } = makeDecorators(container);
