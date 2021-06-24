import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../Model/user.model';
import {Place} from '../places/place.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userIsAuthenticated = true;
    private url = 'user';
    private userId = undefined;
    private user = new Subject();

    constructor(private db: AngularFirestore) {
    }

    get userIsAuthenticated() {
        return this._userIsAuthenticated;
    }

    login(userId?: string) {
        this.userId = userId;
        this._userIsAuthenticated = true;
    }

    logout() {
        this.userId = undefined;
        this._userIsAuthenticated = false;
    }
    getUserIdLoggedIn(): string {
        return this.userId;
    }

    getUsers(): Observable<User[]> {
        return this.db.collection<User>(this.url)
            .snapshotChanges()
            .pipe(map(liste => {
                console.log('get users');
                    return liste.map(item => {
                        const data = item.payload.doc.data();
                        // console.log(data);
                        const user = new User().fromJSON(data);
                        const id = item.payload.doc.id;
                        user.id = id;
                        // console.log(id);
                        // console.log(place);
                        console.log(user);
                        return user;
                    });
                })
            );
    }

    getUser(id: string): Observable<User> {
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
    private getUserDocument(id?: string): AngularFirestoreDocument<Place> {
        // return document
        return this.db.doc<User>(this.url + `/` + id);
    }
}
