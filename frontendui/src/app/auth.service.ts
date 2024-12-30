import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/v1/user/dashboard'; 

  constructor(private cookieService: CookieService, private router: Router) {}

  login(name: string, pass: string): Promise<boolean> {
    const loginData = { name, pass };

    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:4000/api/v1/user/login`, loginData)
        .then((response) => {
         
          this.cookieService.set('jwt_token', response.data.token);
          console.log('Token saved to cookies:', response.data.token); 
          resolve(true); 
        })
        .catch((error) => {
          alert('Login failed. Please check your credentials.');
          console.error('Login failed', error);
          resolve(false);
        });
    });
  }

  logout() {
    this.cookieService.delete('jwt_token'); 
    this.router.navigate(['/login']); 
  }
  checkAuth() {
    const toke= this.cookieService.get('jwt_token');
    console.log('Token from cookies:', toke);  

    const token = this.cookieService.get('jwt_token');  
    console.log('Checking authentication, token found:', token); 

    if (!token) {
      console.log('No token found, redirecting to login'); 
      this.router.navigate(['/header']);
      return;
    }

    axios
      .get(`http://localhost:4000/api/v1/user/dashboard`,  { withCredentials: true })
      .then((response) => {
        console.log('Token is valid', response.data); 
        this.router.navigate(['/home']);  
      })
      .catch((error) => {
        console.log('Token verification failed', error); 
        if (error.response && error.response.status === 401) {
          console.log('Invalid or expired token, redirecting to login');
          this.router.navigate(['/header']); 
        } else {
          console.error('Unexpected error during token verification', error);
          this.router.navigate(['/header']); 
        }
      });
  }

 
  isAuthenticated(): boolean {
    const token = this.cookieService.get('jwt_token');
    return token ? true : false;  
  }
}
