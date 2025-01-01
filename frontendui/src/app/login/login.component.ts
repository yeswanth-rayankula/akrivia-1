import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  email = '';
  pass = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.pass.length<8) {
      alert('password must be at least 8 characters long!');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email || !emailRegex.test(this.email)) {
      alert('Please enter a valid email address!');
      return;
    }
    this.authService.login(this.email, this.pass).then((success) => {
      if (success) {
        
        this.router.navigate(['/home']);
      } else {
       
        alert("Login failed. Please check your credentials.");
      }
    }).catch((error) => {
      
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    });
  }
}
