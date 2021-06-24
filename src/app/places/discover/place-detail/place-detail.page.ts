import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place: Place = undefined;
  placeId?: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      } else {
        this.placeId = paramMap.get('placeId');
      }
      this.placesService.getPlace(this.placeId).subscribe(place => this.place = place);
      // this.place = this.placesService.getPlace(paramMap.get('placeId'));
     // this.getPlace();
    });
  }

  onBookPlace() {
    this.modalCtrl
      .create({
        component: CreateBookingComponent, // modale à créer
        componentProps: { selectedPlace: this.place } // données transmises à la modale
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss(); // listener qui renvoie une promesse
      })
      .then(resultData => { // resultData : données transmises par la modale
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('BOOKED!');
        }
      });
  }

  getPlace(): void {

  }
}
