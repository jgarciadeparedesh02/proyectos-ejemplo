import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: {
    type: {
      name: string;
    }
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  async getPokemonList(offset: number = 0, limit: number = 20): Promise<any[]> {
    const res = await firstValueFrom(
      this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
    );

    // Fetch details for each pokemon in the list to get types
    const pokemonDetailedList = await Promise.all(
      res.results.map(async (p) => {
        const details = await this.getPokemonDetails(p.name);
        return {
          name: p.name,
          url: p.url,
          types: details.types,
          id: details.id
        };
      })
    );

    return pokemonDetailedList;
  }

  async getPokemonDetails(name: string): Promise<Pokemon> {
    return firstValueFrom(
      this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`)
    );
  }
}
