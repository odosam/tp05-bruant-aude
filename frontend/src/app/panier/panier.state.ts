import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AjoutPanier, SupprPanier } from './panier.actions';
import { Produit } from '../models/produit';

export interface PanierStateModel{
    items : Produit[]
}

@State<PanierStateModel>({
    name : "panier",
    defaults : { items : []} 
}) 


export class PanierState {
    @Selector()
    static getItems(state: PanierStateModel): Produit[]  {
        return state.items;
    }

    @Selector()
    static getCount(state: PanierStateModel) {
        return state.items.length;
    }

    @Action(AjoutPanier)
    add({ getState, patchState }: StateContext<PanierStateModel>, { payload }: AjoutPanier) {
        
        const state = getState();
        
        patchState({
            items: [...state.items, payload]
        });
    }

    @Action(SupprPanier)
remove({ getState, patchState }: StateContext<PanierStateModel>, { payload }: SupprPanier) {
    const state = getState();

    patchState({
        items: state.items.filter(item => item.ref !== payload.ref)
    });
}

}