import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  

@Injectable({
  providedIn: 'root'  
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }
  
}
