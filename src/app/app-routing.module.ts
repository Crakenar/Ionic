import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';

import { AuthGuard } from './auth/auth.guard';
import {environment} from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule) },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'new-offer',
    loadChildren: () => import('./new-offer/new-offer.module').then(m => m.NewOfferPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
      AngularFireModule,
      AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
