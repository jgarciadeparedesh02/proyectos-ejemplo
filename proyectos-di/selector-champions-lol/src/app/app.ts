import { Component, OnInit } from '@angular/core';
import { Champion } from './models/Champion';
import { ChampionListComponent } from './components/champion-list/champion-list';
import { ChampionDetailComponent } from './components/champion-detail/champion-detail';

@Component({
  selector: 'app-root',
  imports: [ChampionListComponent, ChampionDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App implements OnInit {
  champions: Champion[] = [];
  selectedChampion?: Champion;


  async ngOnInit() {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.22.1/data/en_US/champion.json');
    const data = await response.json();
    const champions = Object.values(data.data) as Champion[];

    this.champions = champions.map(champion => ({
      ...champion,
      image: {
        ...champion.image,
        full: `https://ddragon.leagueoflegends.com/cdn/15.22.1/img/champion/${champion.image.full}`
      }
    }));
  }

  async onChampionSelected(champion: Champion) {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/15.22.1/data/en_US/champion/${champion.id}.json`);
    const data = await response.json();
    this.selectedChampion = Object.values(data.data)[0] as Champion;
    this.selectedChampion.image.full = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;
  }
}