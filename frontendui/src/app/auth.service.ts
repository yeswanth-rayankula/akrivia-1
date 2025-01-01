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

  login(email: string, pass: string): Promise<boolean> {
    const loginData = { email, pass };

    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:4000/api/v1/user/login`, loginData)
        .then((response) => {
         
           sessionStorage.setItem('jwt_token', response.data.token);
          console.log('Token saved to cookies:', response.data.message); 
          resolve(true); 
        })
        .catch((error) => {
          alert(error.response.data);
        
          resolve(false);
        });
    });
  }

 


 
  async isAuthenticated(): Promise<boolean> {
    const token = sessionStorage.getItem('jwt_token');
  
    if (!token) {
      return false;  
    }
  
    try {
      const response = await axios.get('http://localhost:4000/api/v1/user/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
  
      return true; 
    } catch (error) {
      return false; 
    }
  }
  
  
}
