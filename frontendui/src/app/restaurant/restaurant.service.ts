import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl = '/api/restaurants/keyset';

  async fetchRestaurants(lastId: number = 0, pageSize: number = 30): Promise<any> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          lastId,
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  }
}
