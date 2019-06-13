import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuicksignupComponent } from './quicksignup/quicksignup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiproductsComponent } from './apiproducts/apiproducts.component';
import { GettingstartedComponent } from './gettingstarted/gettingstarted.component';
import { RegisterinterestComponent } from './registerinterest/registerinterest.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    QuicksignupComponent,
    ApiproductsComponent,
    GettingstartedComponent,
    RegisterinterestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
