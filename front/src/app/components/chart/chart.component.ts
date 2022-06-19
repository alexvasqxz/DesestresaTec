import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  view: [number, number] = [1200, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  total: number = 128900000;

  single = [
    {
      name: 'Depresion',
      value: 38541100,
    },
    {
      name: 'Ansiedad',
      value: 18432700,
    },
    {
      name: 'Depresion Grave',
      value: 15983600,
    },
    {
      name: 'Suicidios',
      value: 500000,
    },
  ];

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {
    // Object.assign(this, { single });
  }

  onSelect(event: any) {
    console.log(event);
  }
}
