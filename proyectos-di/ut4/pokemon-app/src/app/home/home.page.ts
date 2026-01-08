import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar,
  IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonRow,
  IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonBadge, InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';
import { PokeService, PokemonListItem } from '../services/poke.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar,
    IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonRow,
    IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonBadge
  ],
})
export class HomePage implements OnInit {
  pokemonList: any[] = [];
  filteredPokemon: any[] = [];
  offset = 0;
  searchText = '';

  constructor(private pokeService: PokeService) { }

  async ngOnInit() {
    await this.loadPokemon();
  }

  async loadPokemon(event?: InfiniteScrollCustomEvent) {
    const newPokemon = await this.pokeService.getPokemonList(this.offset);
    this.pokemonList = [...this.pokemonList, ...newPokemon];
    this.filterPokemon();
    this.offset += 20;

    if (event) {
      event.target.complete();
    }
  }

  filterPokemon() {
    if (this.searchText.trim() === '') {
      this.filteredPokemon = this.pokemonList;
    } else {
      this.filteredPokemon = this.pokemonList.filter(p =>
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  getPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  getTypeClass(type: string): string {
    return `type-badge-${type.toLowerCase()}`;
  }
}
