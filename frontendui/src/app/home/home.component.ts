import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit {

 
  userName: string = '';
  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) { }
 
  ngOnInit(): void {
    
    const token = sessionStorage.getItem('jwt_token');
    
    if (token) {
    
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        
       
        this.userName = decodedToken.name;  
        this.userEmail = decodedToken.email; 
        
       
        console.log('User Name:', this.userName);
        console.log('User Email:', this.userEmail);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in sessionStorage');
     
      this.router.navigate(['/login']);
    }
   
  }
  
}
