import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Header } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: Header },
  { path: 'home', component: HomeComponent ,canActivate: [authGuard]},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
