import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { ShareModule } from './share/share.module';

import { AppComponent } from './app.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ShareModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
