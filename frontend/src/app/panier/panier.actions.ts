import { Produit } from "../models/produit";

export class AjoutPanier {
    static readonly type = '[Panier] Ajouter'; 
    constructor(public payload: Produit) {}
}

export class SupprPanier {
    static readonly type = '[Panier] Supprimer';
    constructor(public payload: Produit) {}
}