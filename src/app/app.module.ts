import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Estilos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatProgressBarModule,
  MatCardModule
} from '@angular/material';


//Modulos externos


//Servicios
import { FacebookModule } from 'ngx-facebook';
import { AgmCoreModule } from '@agm/core';     
import { AgmDirectionModule } from 'agm-direction';

//Rutas
import { appRouting } from './app.routes';

//Componentes
import { AppComponent } from './app.component';
import { GaleriaComponent } from '../components/galeria/galeria.component';
import { InicialComponent } from '../components/inicial/inicial.component';
import { MenuComponent } from '../components/menu/menu.component';
import { LineaTiempoComponent } from './../components/linea-tiempo/linea-tiempo.component';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { ComoLlegarComponent } from './../components/como-llegar/como-llegar.component';
import { ModalDialogComponent } from './../components/modal-dialog/modal-dialog.component';
import { ImprimirImagenComponent } from './../components/imprimir-imagen/imprimir-imagen.component';
import { EventosMenuComponent } from './../components/eventos-menu/eventos-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    GaleriaComponent,
    InicialComponent,
    MenuComponent,
    LineaTiempoComponent,
    ComoLlegarComponent,
    ModalDialogComponent,
    ImprimirImagenComponent,
    EventosMenuComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyDDDyV5ypJgFhT6YM4PEPT5mbdy8zCV9lA',
    }),
    AgmDirectionModule,
    FacebookModule.forRoot(),
    VerticalTimelineModule,
    BrowserAnimationsModule,
    //MaterialComponents
    MatProgressBarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
