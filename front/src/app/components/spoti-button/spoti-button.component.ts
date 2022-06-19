import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-spoti-button',
  templateUrl: './spoti-button.component.html',
  styleUrls: ['./spoti-button.component.scss']
})
export class SpotiButtonComponent implements OnInit {

  title = "Google Maps"

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyD8HEfpjxJRuAPMt4j1SmIxdzXO3Gk5BWw'
    })

    loader.load().then(() => {

      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: {
          lat: 19.4326,
          lng: -99.1332
        },
        zoom: 10
      })

      const marker1 = new google.maps.Marker({
        position: {
          lat: 19.297605180120453, 
          lng: -99.1615793370536
        },
        map: map,
      })
      const marker2 = new google.maps.Marker({
        position: {
          lat: 19.37931833799255, 
          lng: -99.16423231349364
        },
        map: map,
      })
      const marker3 = new google.maps.Marker({
        position: {
          lat: 19.38009065803589, 
          lng: -99.19084612883562
        },
        map: map,
      })
      const marker4 = new google.maps.Marker({
        position: {
          lat: 19.490304538192806, 
          lng: -99.1273485
        },
        map: map,
      })
      const marker5 = new google.maps.Marker({
        position: {
          lat: 19.43638194202254, 
          lng: -99.17765222698635
        },
        map: map,
      })
      const marker6 = new google.maps.Marker({
        position: {
          lat: 19.433282486564654, 
          lng: -99.1867305220578
        },
        map: map,
      })
    })
    
  }
}