import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.scss']
})
export class FormularyComponent {


  options = [
    "Nunca",
    "Varios dias",
    "Mas de la mitad de los dias",
    "Casi todos los dias"
  ];

  bttnText = "Finalizar";
  
}
