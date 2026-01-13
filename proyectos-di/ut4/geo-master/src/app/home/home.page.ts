import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../services/geolocation.service';
import { Position } from '@capacitor/geolocation';
import * as L from 'leaflet';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonList, IonItem,
  IonLabel, IonBadge, IonFab, IonFabButton, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { location, refresh, navigate, flag, recording } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonList, IonItem,
    IonLabel, IonBadge, IonFab, IonFabButton, IonButtons
  ],
})
export class HomePage implements OnInit, OnDestroy {
  currentPos: Position | null = null;
  map: L.Map | null = null;
  marker: L.Marker | null = null;
  watchId: string | null = null;
  history: Position[] = [];

  constructor(private geoService: GeolocationService) {
    addIcons({ location, refresh, navigate, flag, recording });
  }

  ngOnInit() {
    this.initMap();
    this.getLocation();
  }

  // Ciclo de vida de Ionic: se ejecuta cuando la página entra en foco
  ionViewDidEnter() {
    if (this.map) {
      setTimeout(() => {
        this.map?.invalidateSize();
      }, 500);
    }
  }

  ngOnDestroy() {
    if (this.watchId) {
      // Geolocation.clearWatch({ id: this.watchId });
    }
  }

  initMap() {
    // Fix for Leaflet marker images in Angular/Vite
    const iconDefault = L.icon({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  async getLocation() {
    try {
      const position = await this.geoService.getCurrentPosition();
      this.updatePosition(position);
    } catch (e) {
      console.error('Error getting location', e);
    }
  }

  updatePosition(position: Position) {
    this.currentPos = position;
    this.history.push(position);
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    if (this.map) {
      this.map.setView([lat, lng], 15);
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }
    }
  }

  async startTracking() {
    this.watchId = await this.geoService.watchPosition((pos) => {
      if (pos) {
        this.updatePosition(pos);
      }
    });
  }

  getDistanceToStart(): string {
    if (this.history.length < 2) return '0';
    const start = this.history[0];
    const current = this.history[this.history.length - 1];
    const dist = this.geoService.calculateDistance(
      start.coords.latitude, start.coords.longitude,
      current.coords.latitude, current.coords.longitude
    );
    return dist.toFixed(2);
  }
}
