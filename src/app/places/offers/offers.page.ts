import { Component, OnInit } from '@angular/core';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  places: Place[] = [];
  offers: Place[];

  constructor(
      private placesService: PlacesService,
      private authService: AuthService,
  ) { }

  ngOnInit() {
    // this.offers = this.placesService.myPlaces;
  }

  ionViewWillEnter(): void {
    this.offers = [];
    this.placesService.getPlaces().subscribe(place => {
      this.places = place;
      this.places.forEach(function(item, value) {
        if (item.userId === this.authService.getUserIdLoggedIn()){
          this.offers.push(item);
        }
      }.bind(this));
    });
  }

}
