import { Component, OnInit } from '@angular/core';
import { Resource } from '../../classes/resource';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {

  title = "Recursos Adicionales";

  Outliers: Resource = new Resource(
    "Outliers: The Story of Success",
    "Malcolm Gladwell",
    "In this personal development read, Malcolm Gladwell highlights successful outliers, the best and brightest of our society — from the Beatles to Bill Gates — and what makes them so successful."
  );

  WeekHour: Resource = new Resource(
    "The 4-Hour Workweek",
    "Timothy Ferriss",
    "Aiming to help readers escape the confines of a 9-5 job, The 4-Hour Workweek encourages a restructuring of our lifestyle to find fulfillment now rather than once we retire."
  );

  Thinking: Resource = new Resource(
    "Thinking, Fast and Slow",
    "Daniel Kahneman",
    "This psychology book has helped readers understand the way we think by separating our thought processes into two systems: one that is intuitive and one that is deliberate."
  );

  Life: Resource = new Resource(
    "The Life-Changing Magic of Tidying Up",
    "Marie Kondo",
    "With a book and Netflix series that changed how we organize and stay tidy, Marie Kondo is a professional organizing consultant who presents the KonMari method of organizing."
  );

  bttnText = "Conseguir";

}
