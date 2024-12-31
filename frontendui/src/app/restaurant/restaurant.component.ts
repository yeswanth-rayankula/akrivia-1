import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = []; // Stores the restaurant data for the current page
  nextPageId: number | null = null; // Tracks the next page ID
  previousPageId: number | null = null; // Tracks the previous page ID
  pageSize: number = 30; // Number of items to fetch per request
  loading: boolean = false; // Tracks the loading state

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.fetchRestaurants(); // Fetch the first page of data
  }

  async fetchRestaurants(lastId: number = 0): Promise<void> {
    if (this.loading) return;

    this.loading = true;

    try {
      const response = await this.restaurantService.fetchRestaurants(lastId, this.pageSize);
      this.restaurants = response.data; // Update the current page data
      this.nextPageId = response.nextPage; // Set the next page ID
      this.previousPageId = response.previousPage; // Set the previous page ID
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      this.loading = false;
    }
  }

  goToNextPage(): void {
    if (this.nextPageId !== null) {
      this.fetchRestaurants(this.nextPageId); // Fetch the next page
    }
  }

  goToPreviousPage(): void {
    if (this.previousPageId !== null) {
      this.fetchRestaurants(this.previousPageId); // Fetch the previous page
    }
  }
}
