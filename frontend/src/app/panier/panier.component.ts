import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from './panier.state';
import { Produit } from '../models/produit';
import { AjoutPanier, SupprPanier } from './panier.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {

  panierItems$: Observable<Produit[]>;  // Liste des articles
  itemCount$: Observable<number>;  // Nombre d'articles dans le panier

  constructor(private store: Store) {
    // Récupère les articles du panier
    this.panierItems$ = this.store.select(PanierState.getItems);
    
    // Récupère le nombre d'articles dans le panier
    this.itemCount$ = this.store.select(PanierState.getCount);
  }

  AjoutPanier(produit: Produit) {
    this.store.dispatch(new AjoutPanier(produit));
  }

  SupprPanier(produit: Produit) {
    this.store.dispatch(new SupprPanier(produit));
  }

  getTotal(panierItems: Produit[] | null | undefined): number {
    if (!panierItems) {
      return 0;
    }
    return panierItems.reduce((total, item) => total + item.prix, 0);
  }
}
