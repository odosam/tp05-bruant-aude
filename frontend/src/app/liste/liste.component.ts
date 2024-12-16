import { Component, Input } from '@angular/core';
import { Produit } from '../models/produit';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AjoutPanier } from '../panier/panier.actions';

@Component({
    selector: 'app-liste',
    imports: [CommonModule],
    templateUrl: './liste.component.html',
    styleUrl: './liste.component.css'
})
export class ListeComponent {

  @Input() produits : Produit[] = [];

  constructor(private store : Store) {}

  AjoutPanier(produit : Produit){
    this.store.dispatch(new AjoutPanier(produit));
  }

}
