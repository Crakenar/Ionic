import {Injectable} from '@angular/core';

import {Place} from './place.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private static url = 'places';

    constructor(private db: AngularFirestore) {
    }

    // Récupération des héros
    getPlaces(): Observable<Place[]> {
        return this.db.collection<Place>(PlacesService.url)
            .snapshotChanges()
            .pipe(map(liste => {
                    // console.log('getBosses()');
                    return liste.map(item => {
                        const data = item.payload.doc.data();
                        // console.log(data);
                        const place = new Place().fromJSON(data);
                        const id = item.payload.doc.id;
                        place.id = id;
                       // console.log(id);
                       // console.log(place);
                        return place;
                    });
                })
            );
    }
    // Récupération d'un héro en fonction de son id
    getPlace(id: string): Observable<Place> {
        return this.getPlaceDocument(id).snapshotChanges()
            .pipe(
                map(item => {
                    const data = item.payload.data();
                    const place = new Place().fromJSON(data);
                    place.id = id;
                    console.log(place);
                    return place;
                })
            );
    }

    // Ajout d'un héro
    addPlace(place?: Place): void {
       // this.db.collection<Place>(PlacesService.url).add(Object.assign({}, place));
        this.db.collection<Place>(PlacesService.url).doc(place.id).set(Object.assign({}, place));
    }

    // Modification d'un héro
    updatePlace(place?: Place | undefined): Promise<Place> {
        // Update document
        // @ts-ignore
        return this.getPlaceDocument(place.id).update(Object.assign({}, place));
        //  return Promise.resolve();
    }

    deletePlace(id?: string): void {
        this.getPlaceDocument(id).delete();
    }


    // Création du service Firebase en fonction de l'id du héro
    private getPlaceDocument(id?: string): AngularFirestoreDocument<Place> {
        // return document
        return this.db.doc<Place>(PlacesService.url + `/` + id);
    }
}
