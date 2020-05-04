import { Container } from 'inversify';
import { makeDecorators } from '../components/shared/decorators';
export const { bind, lazyInject } = makeDecorators(new Container());
