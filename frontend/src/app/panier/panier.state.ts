import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AjoutPanier, SupprPanier } from './panier.actions';
import { Produit } from '../models/produit';

export interface PanierStateModel {
    items: { produit: Produit, quantity: number }[];
}

@State<PanierStateModel>({
    name: 'panier',
    defaults: { items: [] }
})
export class PanierState {
    // Selector pour obtenir la liste des produits avec leurs quantités
    @Selector()
    static getItems(state: PanierStateModel): { produit: Produit, quantity: number }[] {
        return state.items;
    }

    // Selector pour obtenir le nombre total d'articles (y compris les quantités)
    @Selector()
    static getCount(state: PanierStateModel): number {
        return state.items.reduce((total, item) => total + item.quantity, 0); // Compte total avec les quantités
    }

    // Action pour ajouter un produit au panier
    @Action(AjoutPanier)
    add({ getState, patchState }: StateContext<PanierStateModel>, { payload }: AjoutPanier) {
        const state = getState();
        const items = [...state.items];

        // Vérifier si l'article existe déjà dans le panier
        const existingItem = items.find(item => item.produit.ref === payload.ref);

        if (existingItem) {
            // Si l'article existe, augmenter la quantité
            existingItem.quantity++;
        } else {
            // Sinon, ajouter le produit avec une quantité de 1
            items.push({ produit: payload, quantity: 1 });
        }

        patchState({
            items
        });
    }

    // Action pour supprimer un produit du panier
    @Action(SupprPanier)
    remove({ getState, patchState }: StateContext<PanierStateModel>, { payload }: SupprPanier) {
        const state = getState();
        const items = [...state.items];

        const itemIndex = items.findIndex(item => item.produit.ref === payload.ref);

        if (itemIndex !== -1) {
            const item = items[itemIndex];

            if (item.quantity > 1) {
                // Si la quantité est supérieure à 1, on la décrémente
                item.quantity--;
            } else {
                // Si la quantité est 1, on supprime l'article
                items.splice(itemIndex, 1);
            }
        }

        patchState({
            items
        });
    }
}
