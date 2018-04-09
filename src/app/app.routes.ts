import { EventosMenuComponent } from './../components/eventos-menu/eventos-menu.component';
import { ComoLlegarComponent } from './../components/como-llegar/como-llegar.component';
import { Component } from '@angular/core';
//Aqui se guardan las rutas para que se puedan cambiar las vistas ( no recarga solo cambia la vista)
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { InicialComponent } from './../components/inicial/inicial.component';
import { MenuComponent } from '../components/menu/menu.component';
import { LineaTiempoComponent } from './../components/linea-tiempo/linea-tiempo.component';
import { GaleriaComponent } from './../components/galeria/galeria.component';


const routes: Routes = [
    { path: '', component: InicialComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'menu/llegar', component: ComoLlegarComponent },
    { path: 'menu/galeria', component: GaleriaComponent },
    { path: 'menu/eventos', component: EventosMenuComponent },
    { path: '**', pathMatch:'full', redirectTo: 'routePath' } //Cuando no encuentra alguna ruta de las especificadas
];

export const appRouting = RouterModule.forRoot(routes);
