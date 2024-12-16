import { Component, OnInit } from '@angular/core';
import { FiltreComponent } from '../filtre/filtre.component';
import { ListeComponent } from '../liste/liste.component'; 
import { Produit } from '../models/produit';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-boutique',
    imports: [FiltreComponent, ListeComponent],
    templateUrl: './boutique.component.html',
    styleUrl: './boutique.component.css'
})
export class BoutiqueComponent implements OnInit {
  produits : Produit[] = [];
  produitsList : Produit[] = [];
  subscriber : any;
  filtreNom : String = "";
  filtrePrixMax : number|null = null;

  constructor(private apiService : ApiService ){

  }

  ngOnInit(): void {
    this.subscriber = this.apiService.getProduits().subscribe((produits)=>{
      this.produits = produits;
      this.applyFilter();
    });
      
  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }

  updateFilter( objet : {nom : String ; prix : number|null;}){
    this.filtreNom = objet.nom;
    this.filtrePrixMax = objet.prix;
    this.applyFilter();
  }

  applyFilter(){
    this.produitsList = this.produits.filter((produit)=>{
      let testNom = this.filtreNom? produit.nom.toLowerCase().includes(this.filtreNom.toLowerCase()) : true;
      let testPrix = this.filtrePrixMax !== null ? produit.prix <= this.filtrePrixMax : true;
      
      return testNom && testPrix ; 
    });
  }



}
