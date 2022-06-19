import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {
  currYear = "2022";
  elements = [
    ["Sobre Nosotros", "DesestresaTec Como Idea", "Gustavo Vasquez", "Javier Mendieta"],
    ["Recursos Adicionales", "Bibliografia", "Online"],
    ["Usuario", "Formulario", "Profesionales", "Perfil"]
  ]

}
