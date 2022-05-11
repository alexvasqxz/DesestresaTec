import { Component, OnInit } from '@angular/core';
import { Professional } from '../../classes/professional';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {

  doctor1 : Professional = new Professional (
    "Dr. Gibray Aminjoab Hurtado Dorantes",
    "Psicologo",
    "Liverpool 89, Calle Liverpool 89, Piso 3. Colonia Juárez, Ciudad de México"
  );

}
