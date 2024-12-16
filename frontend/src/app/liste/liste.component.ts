import { Component, Input } from '@angular/core';
import { Produit } from '../models/produit';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-liste',
    imports: [CommonModule],
    templateUrl: './liste.component.html',
    styleUrl: './liste.component.css'
})
export class ListeComponent {

  @Input() produits : Produit[] = [];

}
