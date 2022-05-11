import { Component, OnInit } from '@angular/core';
import { Resource } from '../../classes/resource';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {

  title = "Recursos Adicionales";

  ShallPass: Resource = new Resource(
    "This Too Shall Pass",
    "Julia Samuel",
    "A leading therapist shares memorable patient stories to explore the key crises in life and what we can learn from them."
  );

  bttnText = "Conseguir";

}
