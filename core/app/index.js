import { createApp } from 'frint';

import RootComponent from '../components/Root';

export default createApp({
  name: 'TodoApp',
  providers: [
    {
      name: 'component',
      useValue: RootComponent
    },
  ],
});
