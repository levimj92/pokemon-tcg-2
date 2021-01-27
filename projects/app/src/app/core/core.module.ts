import {ModuleWithProviders, NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

const SINGLETON_PROVIDERS: Provider[] = [
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: SINGLETON_PROVIDERS
    };
  }

  constructor(@SkipSelf() @Optional() self: CoreModule) {
    if (self) {
      throw new Error('Can not create another instance of CoreModule, it is a singleton.');
    }
  }
}
