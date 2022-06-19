import { Component, OnInit } from '@angular/core';
import { Developer } from '../../classes/developer';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent  {

  title = "Sobre Nosotros";
  subtitle = "Nuestro Equipo";

  Gus : Developer = new Developer(
    "Gustavo Vasquez",
    "Desarrollador",
    "Estudiante en Ingeneiria en Tecnologias Computacionales, intern en Business Analyst en Amazon con intereses en Data Science y Data Engineering."
  );

  Javi : Developer = new Developer(
    "Javier Mendieta",
    "Desarrollador",
    "Estudiante en Ingenieria en Tecnologias Computacionales y aspirante a trabajar como Desarrollador de Videojuegos en un futuro."
  );

  bttnText = "Contactame";
}
