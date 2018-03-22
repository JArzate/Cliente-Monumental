import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modullos externos


//Servicios
import { FacebookModule } from 'ngx-facebook';

//Rutas
import { appRouting } from './app.routes';

//Componentes
import { AppComponent } from './app.component';
import { GaleriaComponent } from '../components/galeria/galeria.component';
import { InicialComponent } from '../components/inicial/inicial.component';
import { MenuComponent } from '../components/menu/menu.component';
import { LineaTiempoComponent } from './../components/linea-tiempo/linea-tiempo.component';
import {VerticalTimelineModule} from 'angular-vertical-timeline'; 


@NgModule({
  declarations: [
    AppComponent,
    GaleriaComponent,
    InicialComponent,
    MenuComponent,
    LineaTiempoComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FacebookModule.forRoot(),
    VerticalTimelineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
