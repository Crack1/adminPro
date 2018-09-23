import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//MODULES
import { PagesModule } from './pages/pages.module';

//ROUTES
import { APP_ROUTES } from './app.routes';

//SERVICES
import { ServiceModule } from './services//service.module';
import { PagesComponent } from './pages/pages.component';
import { ShareModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent

  ],
  imports: [
    BrowserModule, APP_ROUTES, FormsModule, ReactiveFormsModule, ServiceModule, ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
