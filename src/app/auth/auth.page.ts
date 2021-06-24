import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoadingController} from '@ionic/angular';

import {AuthService} from './auth.service';
import {Place} from '../places/place.model';
import {User} from '../Model/user.model';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
    isLoading = false;
    isLogin = true;
    users?: User[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingCtrl: LoadingController
    ) {
    }

    ngOnInit() {
        this.getUsers();
    }

    onLogin(): void {
        this.isLoading = true;
        this.authService.login();
        this.loadingCtrl
            .create({keyboardClose: true, message: 'Authentification en cours...'})
            .then(loadingEl => {
                loadingEl.present();
                setTimeout(() => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    this.router.navigateByUrl('/places/tabs/discover');
                }, 1500);
            });
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }

    onSubmit = (form: NgForm) => {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        console.log(email, password);
        if (this.isLogin) {
            this.users.forEach(function (index, value) {
                if (email === index.email && password === index.password) {
                    this.isLoading = true;
                    this.authService.login(index.id);
                    this.loadingCtrl
                        .create({keyboardClose: true, message: 'Authentification en cours...'})
                        .then(loadingEl => {
                            loadingEl.present();
                            setTimeout(() => {
                                this.isLoading = false;
                                loadingEl.dismiss();
                                this.router.navigateByUrl('/places/tabs/discover');
                            }, 1500);
                        });
                }
            }.bind(this));
            // Send a request to login servers
        } else {
            this.loadingCtrl
                .create({keyboardClose: true, message: "Echec de l'authentification, verifier email et password"})
                .then(loadingEl => {
                    loadingEl.present();
                    setTimeout(() => {
                        this.router.navigateByUrl('/auth');
                    }, 1500);
                });
            // Send a request to signup servers
        }
    }

    getUsers(): void {
        this.authService.getUsers().subscribe(
            users => {
                this.users = users;
                console.log(this.users);
            }
        );
    }
}
