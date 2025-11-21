import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Champion } from '../../models/Champion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-champion-list',
  imports: [CommonModule],
  templateUrl: './champion-list.html',
  styleUrl: './champion-list.css',
  standalone: true,
})
export class ChampionListComponent {
  @Input() champions: Champion[] = [];
  @Output() selectChampion = new EventEmitter<Champion>();

  onSelect(champion: Champion) {
    this.selectChampion.emit(champion);
  }
}
