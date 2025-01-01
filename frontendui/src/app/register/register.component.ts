import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
   imports: [CommonModule, FormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username='';
  mail= '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  register() {
    if (!this.username || this.username.length < 3) {
      alert('Name must be at least 3 characters long!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.mail || !emailRegex.test(this.mail)) {
      alert('Please enter a valid email address!');
      return;
    }
    if (!this.password || this.password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const registerData = {
      name:this.username,
      mail: this.mail,

      pass: this.password
    };

    axios.post('http://localhost:4000/api/v1/user/register', registerData)
      .then((response) => {
        alert('Registration successful!');
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        
        alert(error.response.data);
      });
  }
}
