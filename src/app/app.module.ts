import { ZonaService } from './../servicios/zona/zona.service';
import { ParticipanteService } from './../servicios/participante/participante.service';
import { EventoService } from './../servicios/evento/evento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


//Estilos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatProgressBarModule,
  MatCardModule,
  MatDialogModule
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
import { MapaInteractivoComponent } from './../components/mapa-interactivo/mapa-interactivo.component';
import { VisorComponent } from './../components/visor/visor.component';
import { ListaEventosComponent } from './../components/lista-eventos/lista-eventos.component';
import { FichaEventoComponent } from './../components/ficha-evento/ficha-evento.component';
import { HttpModule } from '@angular/http';
import { ProcesoCompraComponent } from './../components/proceso-compra/proceso-compra.component';
import { FormsModule } from '@angular/forms';
import { MensajeComponent } from './../components/mensaje/mensaje.component';
import { AsientoService } from '../servicios/asiento/asiento.service';


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
    EventosMenuComponent,
    MapaInteractivoComponent,
    VisorComponent,
    ListaEventosComponent,
    FichaEventoComponent,
    ProcesoCompraComponent,
    MensajeComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
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
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [
    VisorComponent,
    MensajeComponent
  ],
  providers: [
    EventoService,
    ParticipanteService,
    ZonaService,
    AsientoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
