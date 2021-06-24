import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Reservation} from '../../Model/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private static url = 'reservations';

    constructor(private db: AngularFirestore) {
    }

    // Récupération des reservations
    getReservations(): Observable<Reservation[]> {
        return this.db.collection<Reservation>(BookingService.url)
            .snapshotChanges()
            .pipe(map(liste => {
                    // console.log('getBosses()');
                    return liste.map(item => {
                        const data = item.payload.doc.data();
                        // console.log(data);
                        const reservation = new Reservation().fromJSON(data);
                        const id = item.payload.doc.id;
                        reservation.id = id;
                        // console.log(id);
                        // console.log(place);
                        console.log('get reservations');
                        console.log(reservation);
                        return reservation;
                    });
                })
            );
    }
    // Récupération d'un héro en fonction de son id
    getReservation(id: string): Observable<Reservation> {
        return this.getReservationDocument(id).snapshotChanges()
            .pipe(
                map(item => {
                    const data = item.payload.data();
                    const reservation = new Reservation().fromJSON(data);
                    reservation.id = id;
                    console.log('GET reservation');
                    console.log(reservation);
                    console.log('reservation id ');
                    console.log(reservation.id);

                    return reservation;
                })
            );
    }

    // Ajout d'une reservation
    addReservation(reservation?: Reservation): void {
        this.db.collection<Reservation>(BookingService.url).doc(reservation.id).set(Object.assign({}, reservation));
        // this.db.collection<Reservation>(BookingService.url).add(Object.assign({}, reservation));
    }

    // Modification d'un héro
    updateReservation(reservation?: Reservation | undefined): Promise<Reservation> {
        // Update document
        // @ts-ignore
        return this.getReservationDocument(reservation.id).update(Object.assign({}, boss));
        //  return Promise.resolve();
    }

    deleteReservation(id?: string): void {
        this.getReservationDocument(id).delete();
    }


    // Création du service Firebase en fonction de l'id du héro
    private getReservationDocument(id?: string): AngularFirestoreDocument<Reservation> {
        // return document
        return this.db.doc<Reservation>(BookingService.url + `/` + id);
    }
}
