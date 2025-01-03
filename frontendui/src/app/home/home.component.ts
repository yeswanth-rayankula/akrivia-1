import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  restaurants: any[] = [];
  pagination = {
    page: 1,
    pageSize: 10,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false,
  };
  userName: string = '';  
  searchQuery: string = '';  
  sortOrder: string = 'none'; // Default is no sorting
  isLoading: boolean = false; // For showing loading spinner

  constructor() {}

  ngOnInit(): void {
    this.decodeJWT();
    this.fetchRestaurants();
  }

  decodeJWT(): void {
    const jwt_token = sessionStorage.getItem('jwt_token');
    if (jwt_token) {
      try {
        const decoded = JSON.parse(atob(jwt_token.split('.')[1]));
        this.userName = decoded.name;  
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.error('No JWT token found in session storage');
    }
  }

  fetchRestaurants(): void {
    const jwt_token = sessionStorage.getItem('jwt_token');
    if (!jwt_token) {
      console.error('No JWT token found in session storage');
      return;
    }

    const params = {
      jwt_token: jwt_token,
      page: this.pagination.page,
      pageSize: this.pagination.pageSize,
      search: this.searchQuery,
      sortOrder: this.sortOrder,  // Include sortOrder in the request params
    };

    this.isLoading = true; // Set loading to true while fetching data

    axios
      .get('http://localhost:4000/api/v1/user/restaurants', { params })
      .then((response) => {
        const data = response.data;
        this.restaurants = data.data;
        this.pagination.totalPages = data.totalPages;
        this.pagination.hasPrevious = data.page > 1;
        this.pagination.hasNext = data.page < data.totalPages;
        this.isLoading = false; // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
        this.isLoading = false;
      });
  }

  handlePrevious(): void {
    if (this.pagination.page > 1) {
      this.pagination.page -= 1;
      this.fetchRestaurants();
    }
  }

  handleNext(): void {
    if (this.pagination.page < this.pagination.totalPages) {
      this.pagination.page += 1;
      this.fetchRestaurants();
    }
  }

  onSearchChange(): void {
    this.pagination.page = 1;  
    this.fetchRestaurants();
  }

  onSortChange(): void {
    this.pagination.page = 1;  // Reset to the first page when sorting changes
    this.fetchRestaurants();   // Refetch the data with the new sorting
  }
}
