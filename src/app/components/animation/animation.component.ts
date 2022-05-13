import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('aniBoton', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#ffd1dc',
        transform: 'scale(0.5)'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out')),
    ])
  ]
})

export class AnimationComponent {

  bttnText = "Animame"

  public state:string = "inactive";

  toggleButton(){
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

}
