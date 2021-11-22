import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiService } from 'src/app/shared/services/dragon-service';

@Injectable({
  providedIn: 'root'
})
export class DragonService {

  private readonly API: string = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

  constructor(
    private apiService: apiService,
  ) { }

  getDragons() {
    return this.apiService.get(this.API);
  }

  getDragon(dragonId: string) {
    return this.apiService.get(`${this.API}/${dragonId}`);
  }

  createDragon(dragon: Object) {
    return this.apiService.post(this.API, dragon);
  }

  editDragon(dragonId: string, dragon: Object) {
    return this.apiService.put(`${this.API}/${dragonId}`, dragon);
  }

  deleteDragon(DragonId: string) {
    return this.apiService.delete(`${this.API}/${DragonId}`);
  }


}
