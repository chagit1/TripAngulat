import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

debugger
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
