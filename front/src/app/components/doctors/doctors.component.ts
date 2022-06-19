import { Component, OnInit } from '@angular/core';
import { Professional } from '../../classes/professional';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {

  doctor1 : Professional = new Professional (
    "Mtra. Alejandra Quintos Alonso",
    "Psicólogo (Depresión, Psicología clínica, Psicoterapia familiar sistémica, Psicoterapia individual)",
    "Puente de Piedra 150, Toriello Guerra, Ciudad de Mexico"
  );

  doctor2 : Professional = new Professional (
    "Mtro. Francisco Ortega Hernández ",
    "Psicólogo (Psicoterapia individual, Psicoterapia de pareja, Psicologia clínica en adolescentes)",
    "Nicolás San Juan 1222 Colonia del Valle, Ciudad de Mexico"
  );

  doctor3 : Professional = new Professional (
    "Lic. María Verónica Martínez Tejeda",
    "Psicólogo (Trastornos de ansiedad, Psicoterapia individual, Psicología de la alimentación)",
    "Bartolomé Esteban Murillo no. 78 Santa María Nonoalco, Ciudad de Mexico"
  );

  doctor4 : Professional = new Professional (
    "Dra. Marlene Salazar Mendoza",
    "Psiquiatra (Depresión, Trastornos de ansiedad, Psicoterapia, Medicina del sueño)",
    "Riobamba No. 745, Colonia Lindavista, Delegación Gustavo A. Madero, CDMX"
  );

  doctor5 : Professional = new Professional (
    "Dra. Elena Salmerón Toro",
    "Psiquiatra (Psicoterapia)",
    "Bahia de Ballenas 74, Colonia Verónica Anzures, Alcaldía Miguel Hidalgo, Ciudad de Mexico"
  );

  doctor6 : Professional = new Professional (
    "Dr. Omar Minaya Hernánde",
    "Psiquiatra (Psicogeriatría), Psicoanalista",
    "Polanco V Sección, Polanco V Sección, Ciudad de México"
  );

}
