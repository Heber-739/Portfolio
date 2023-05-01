import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RoutingAppModule } from './routing-app.module';
import { interceptorProvider } from './service/spinner-interceptor/headers.interceptor';
import { FooterComponent } from './footer/footer.component';
import { SpinnerInterceptorComponent } from './service/spinner-interceptor/spinner-interceptor.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerInterceptorComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, RoutingAppModule],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
