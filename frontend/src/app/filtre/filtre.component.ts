import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filtre',
    imports: [FormsModule],
    templateUrl: './filtre.component.html',
    styleUrl: './filtre.component.css'
})
export class FiltreComponent {

  filtreNom : String = "";
  filtrePrixMax : number|null = null;

  @Output() filterChange = new EventEmitter<{
    nom : String ;
    prix : number|null;
  }>()

  updateFilter(){

    this.filterChange.emit({
      nom : this.filtreNom,
      prix : this.filtrePrixMax
    });


  }

}
