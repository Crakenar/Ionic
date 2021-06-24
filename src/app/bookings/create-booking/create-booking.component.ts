import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';
import * as moment from 'moment';
import {Reservation} from '../../Model/reservation.model';
import {BookingService} from '../Service/booking.service';
import {UserService} from '../../Service/user.service';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../Model/user.model';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places/places.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  myDateDepart: any;
  myDateFin: any;
  user?: User;
  place?: Place;
  booking?: string;
  resas?: Place[] = [];
  reservations?: string[] = [];
  idResa?: string;
  confirm = false;
  private res: Reservation;

  constructor(private modalCtrl: ModalController,
              private placeService: PlacesService,
              private bookingService: BookingService,
              private userService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute
              ) {}

  ngOnInit() {}

  ionicViewWillEnter(): void {
   // this.getPlace();
    this.bookingService.getReservations().subscribe(resa => {
      this.resas = resa;
      console.log(this.resas);
    });
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    // Creation d'une reservation et sauvegarde en BDD
    const diff = moment(this.myDateFin).diff(moment(this.myDateDepart), 'days');
    console.log(diff);

    this.res = new Reservation();
    this.res.dateDebut = this.myDateDepart;
    this.res.dateFin = this.myDateFin;

    const myDateResa = Date.now().toString();
    this.res.dateResa = myDateResa //new Date(myDateResa).toISOString();
    this.res.nbJours = diff.toString();
    this.res.price = this.selectedPlace.price;
    this.res.nomPlace = this.selectedPlace.title;
    this.res.idPlace = this.selectedPlace.id;
    this.res.idUser = this.authService.getUserIdLoggedIn();
    // Creation id reservation
    this.idResa = this.res.idPlace + this.res.idUser + this.res.dateResa;
    this.res.id = this.idResa;
    this.bookingService.addReservation(this.res);

    // On veut maintenant ajouter la reservation (son id) dans le user qui est connecte
    this.authService.getUser(this.authService.getUserIdLoggedIn()).subscribe(user => {
      this.user = user;
      if (this.user) {
        this.reservations = this.user.reservations;
        this.confirm = true;
      }
    });
  }
  confirmer(): void {
    this.reservations.push(this.idResa);
    this.user.reservations = this.reservations;
    this.userService.updateUser(this.user);
    console.log('add resa');
    this.confirm = false;
    this.modalCtrl.dismiss(null, 'cancel');
  }
  // getPlace(): void {
  //   const idString = this.route.snapshot.paramMap.get('placeId');
  //   if (idString) {
  //     this.placeService.getPlace(idString)
  //         .subscribe(place => {
  //           this.place = place;
  //           console.log(this.place.id);
  //           this.bookingService.getReservation(this.).subscribe(booking => {
  //           //  this.booking = booking;
  //           });
  //         });
  //   }
  // }
}
