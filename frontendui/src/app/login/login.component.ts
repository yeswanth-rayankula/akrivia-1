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
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(?:2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]/;
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
