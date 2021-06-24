import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PlacesService} from '../../places.service';
import {AuthService} from '../../../auth/auth.service';
import {Place} from '../../place.model';

@Component({
    selector: 'app-new-offer',
    templateUrl: './new-offer.page.html',
    styleUrls: ['./new-offer.page.scss']
})
export class NewOfferPage implements OnInit {
    offerForm: FormGroup;

    constructor(
        private placeService: PlacesService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.offerForm = new FormGroup({
            title: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            description: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
            }),
            price: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)]
            }),
            dateFrom: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            dateTo: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            })
        });
    }

    onCreateOffer() {
        if (!this.offerForm.valid) {
            return;
        } else {
            console.log(this.offerForm.value);
            const id = this.authService.getUserIdLoggedIn() +  Date.now().toString() + this.offerForm.value.dateTo
                + this.offerForm.value.dateFrom;
            const place = this.offerForm.value;
            place.id = id;
            place.userId = this.authService.getUserIdLoggedIn();
            console.log(place);
            this.placeService.addPlace(place);
        }
        console.log(this.offerForm);
    }
}
