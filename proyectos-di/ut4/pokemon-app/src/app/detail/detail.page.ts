import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonBadge, IonProgressBar, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { PokeService, Pokemon } from '../services/poke.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
    standalone: true,
    imports: [
        CommonModule, RouterModule,
        IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
        IonBackButton, IonCard, IonCardHeader, IonCardTitle,
        IonCardContent, IonBadge, IonProgressBar, IonGrid, IonRow, IonCol
    ]
})
export class DetailPage implements OnInit {
    pokemon: Pokemon | null = null;

    constructor(
        private route: ActivatedRoute,
        private pokeService: PokeService
    ) { }

    async ngOnInit() {
        const name = this.route.snapshot.paramMap.get('id');
        if (name) {
            this.pokemon = await this.pokeService.getPokemonDetails(name);
        }
    }

    getStatColor(stat: string): string {
        const colors: { [key: string]: string } = {
            hp: 'success',
            attack: 'danger',
            defense: 'primary',
            'special-attack': 'warning',
            'special-defense': 'tertiary',
            speed: 'secondary'
        };
        return colors[stat] || 'medium';
    }

    getTypeClass(type: string): string {
        return `type-badge-${type.toLowerCase()}`;
    }
}
