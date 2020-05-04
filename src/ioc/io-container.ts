import { ContainerModule } from 'inversify';
import { IoService } from '../io/io.service';
import { SYMBOLS } from './constants.root';
const ioContainerModule = new ContainerModule(bind => {
  bind<IoService>(SYMBOLS.IO_SERVICE)
    .toDynamicValue(() => new IoService(fetch.bind(window)))
    .inSingletonScope();
});
export default ioContainerModule;
