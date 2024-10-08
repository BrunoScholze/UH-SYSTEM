import { Routes } from '@angular/router';
import { AppMainComponent } from './app.main.component';

export const routes: Routes = [
    {
        path: '',
        component: AppMainComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('@pages/home/home.module').then((m) => m.HomeModule) },
            { path: 'map', loadChildren: () => import('@pages/map/map.module').then((m) => m.MaptModule) },
            { path: 'reservation', loadChildren: () => import('@pages/reservation/reservation.module').then((m) => m.ReservationModule) },
            { path: 'roomForm', loadChildren: () => import('@pages/room/room-form/room-form.module').then((m) => m.RoomFormModule) },
            { path: 'room', loadChildren: () => import('@pages/room/room.module').then((m) => m.RoomModule) },
            { path: 'guest', loadChildren: () => import('@pages/guest/guest.module').then((m) => m.GuestModule) },
            { path: 'monitor', loadChildren: () => import('@pages/monitor/monitor.module').then((m) => m.MonitortModule) },
            { path: 'dayUse', loadChildren: () => import('@pages/day-use/day-use.module').then((m) => m.DayUseModule) },
            { path: 'dayUseForm', loadChildren: () => import('@pages/day-use/day-use-form/day-use-form.module').then((m) => m.DayUseFormModule)},
            { path: 'category', loadChildren: () => import('@pages/category/category.module').then((m) => m.CategoryModule) },
            { path: 'dynamicdialog', loadChildren: () => import('@pages/dynamicdialog/dynamicdialogdemo.module').then((m) => m.DynamicDialogDemoModule) },
            { path: 'guestEdit/:id', loadChildren: () => import('@pages/guest/guest-form/guest-form.module').then((m) => m.GuestEditModule) },
            {path: 'reservationDetail/:id',  loadChildren: () => import('@pages/reservation/reservation-form/reservation-form.module').then((m) => m.ReservationDetailModule) },
        ]
    },
    { path: 'notfound', loadChildren: () => import('@pages/notfound/notfound.module').then((m) => m.NotFoundModule) },
    { path: '**', redirectTo: '/notfound' }
];
