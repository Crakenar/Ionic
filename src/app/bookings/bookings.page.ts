import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {PlacesService} from '../places/places.service';
import {User} from '../Model/user.model';
import {Place} from '../places/place.model';
import {BookingService} from './Service/booking.service';
import {Reservation} from '../Model/reservation.model';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    userId?: string;
    user?: User;
    places?: Place[] = [];
    reservations?: Reservation[] = [];

    constructor(
        private authService: AuthService,
        private bookingService: BookingService,
        private placeService: PlacesService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter(): void {
        this.userId = this.authService.getUserIdLoggedIn();
        this.getUser();
    }

    getUser(): void {
        this.authService.getUser(this.userId).subscribe(user => {
            this.user = user;
            if (this.user) {
                this.getPlacesForUser();
            }
        });
    }

    getPlacesForUser(): void {
        this.places = [];
        this.user.reservations.forEach(function (index, value) {
            console.log('index');
            console.log(index);
            this.bookingService.getReservation(index).subscribe(reservation => {
                console.log(reservation);
                this.reservations.push(reservation);
            });
        }.bind(this));
    }

}
