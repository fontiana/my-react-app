import { createApp } from 'frint';

import RootComponent from '../components/Root';
import logger from '../services/logger';

export default createApp({
  name: 'KitchensinkApp',
  providers: [
    {
      name: 'component',
      useValue: RootComponent
    },
    {
      name: 'logger',
      useFactory: function () {
        return logger
      },
      cascade: true,
      deps: ['app'],
    },
  ],
});
