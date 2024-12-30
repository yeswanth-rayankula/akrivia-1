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
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const registerData = {
      name: this.username,
      pass: this.password
    };

    axios.post('http://localhost:4000/api/v1/user/register', registerData)
      .then((response) => {
        alert('Registration successful!');
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      });
  }
}
