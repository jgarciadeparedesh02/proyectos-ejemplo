import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getCurrentPosition(): Promise<Position> {
    return await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
  }

  watchPosition(callback: (position: Position | null, err?: any) => void) {
    return Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 10000
    }, callback);
  }

  async checkPermissions() {
    return await Geolocation.checkPermissions();
  }

  async requestPermissions() {
    return await Geolocation.requestPermissions();
  }

  // Distance calculation (Haversine formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }
}
