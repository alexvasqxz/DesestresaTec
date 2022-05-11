import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  {

  title = "Creacion de Usuario";

  form = [
    "Nombre",
    "Apellido",
    "E-Mail",
    "Contraseña",
    "Subir foto de Perfil"
  ];

  bttnText = "Crear Usuario";
}
