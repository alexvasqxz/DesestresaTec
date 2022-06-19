import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent{

  title = "Informacion de Usuario"

  fields = {
    Name: "Gus Vasquez",
    Email: "A00823326@tec.mx"
  }
}
