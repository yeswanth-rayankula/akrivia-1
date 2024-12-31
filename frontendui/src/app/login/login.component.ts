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
  name = '';
  pass = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.name, this.pass).then((success) => {
      if (success) {
        
        this.router.navigate(['/restaurant']);
      } else {
       
        alert("Login failed. Please check your credentials.");
      }
    }).catch((error) => {
      
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    });
  }
}
