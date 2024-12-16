import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { from, Observable, of } from 'rxjs';
import { Produit } from '../models/produit';
import { PanierState } from './panier.state';
import {AjoutPanier, SupprPanier} from './panier.actions';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})

export class PanierComponent {

  panierItems$: Observable<Produit[]>;

    constructor(private store: Store) {
    this.panierItems$ = this.store.select(PanierState.getItems);
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
