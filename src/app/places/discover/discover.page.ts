import { Component, OnInit } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../Model/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit {
  loadedPlaces?: Place[] = [];
  user?: User;
  userId?: string;
  constructor(
    private placesService: PlacesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {}
  ngOnInit() {
    this.getPlaces();
    console.log(this.loadedPlaces);
    this.userId = this.authService.getUserIdLoggedIn();
   // this.loadedPlaces = this.placesService.otherPlaces;
  }
  // Pour ouvrir/fermer un menu programmatiquement
  // onOpenMenu() {
  //   this.menuCtrl.toggle();
  // }

  getPlaces(): void {
    this.placesService.getPlaces().subscribe(
        places => {
          this.loadedPlaces =  places;
          console.log(this.loadedPlaces);
        }
    );
  }

  getUser(id?: string): void {
    this.authService.getUser(id).subscribe(
        user => {
          this.user = user;
          console.log(this.user);
        }
    );
  }

}
