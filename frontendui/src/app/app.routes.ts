import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Header } from './header/header.component';

import { authGuard } from './auth.guard';
import { RestaurantListComponent } from './restaurant/restaurant.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: Header },
  { path: 'restaurant', component: RestaurantListComponent ,canActivate: [authGuard]},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
