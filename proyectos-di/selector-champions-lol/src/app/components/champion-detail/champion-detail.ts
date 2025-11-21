import { Component, Input } from '@angular/core';
import { Champion } from '../../models/Champion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-champion-detail',
  imports: [CommonModule],
  templateUrl: './champion-detail.html',
  styleUrl: './champion-detail.css',
  standalone: true,
})
export class ChampionDetailComponent {
  @Input() champion?: Champion;
  showSkins = false;

  getSkinImageUrl(championId: string, skinNum: number): string {
    console.log(championId, skinNum)
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skinNum}.jpg`;
  }
}