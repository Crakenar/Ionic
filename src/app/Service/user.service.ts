import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../Model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private static url = 'user';

    constructor(private db: AngularFirestore) {
    }

    // Récupération des héros
    getReservations(): Observable<User[]> {
        return this.db.collection<User>(UserService.url)
            .snapshotChanges()
            .pipe(map(liste => {
                    // console.log('getBosses()');
                    return liste.map(item => {
                        const data = item.payload.doc.data();
                        // console.log(data);
                        const user = new User().fromJSON(data);
                        const id = item.payload.doc.id;
                        user.id = id;
                        // console.log(id);
                        // console.log(place);
                        return user;
                    });
                })
            );
    }
    // Récupération d'un héro en fonction de son id
    getReservation(id: string): Observable<User> {
        return this.getUserDocument(id).snapshotChanges()
            .pipe(
                map(item => {
                    const data = item.payload.data();
                    const user = new User().fromJSON(data);
                    user.id = id;
                    console.log(user);
                    return user;
                })
            );
    }

    // Ajout d'une reservation
    addReservation(user?: User): void {
        this.db.collection<User>(UserService.url).add(Object.assign({}, user));
    }

    // Modification d'un héro
    updateUser(user?: User | undefined): void {
        // Update document
        // @ts-ignore
        return this.getUserDocument(user.id).update(Object.assign({}, user));
        //  return Promise.resolve();
    }

    deleteReservation(id?: string): void {
        this.getUserDocument(id).delete();
    }


    // Création du service Firebase en fonction de l'id du héro
    private getUserDocument(id?: string): AngularFirestoreDocument<User> {
        // return document
        return this.db.doc<User>(UserService.url + `/` + id);
    }
}
