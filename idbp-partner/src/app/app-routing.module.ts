import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuicksignupComponent } from './quicksignup/quicksignup.component';
import { ApiproductsComponent } from './apiproducts/apiproducts.component';
import { GettingstartedComponent } from './gettingstarted/gettingstarted.component';
import { RegisterinterestComponent } from './registerinterest/registerinterest.component';
import { PartnerProfileResolverService } from './profile/profile-resolver.service';


const routes: Routes = [
  { path: 'home/:bankname', component: HomeComponent},
  // { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent, resolve : { partner_profile : PartnerProfileResolverService} },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'quickSignup', component: QuicksignupComponent},
  { path: 'apiproducts', component: ApiproductsComponent},
  { path: 'gettingstarted', component: GettingstartedComponent },
  { path: 'reginterest', component: RegisterinterestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
