import { element } from 'protractor';
import { MensajeComponent } from './../../components/mensaje/mensaje.component';
import { MatDialog } from '@angular/material';
import { Zona } from './../../modelos/zona.model';
import { Participante } from './../../modelos/participante.model';
import { ZonaService } from './../../servicios/zona/zona.service';
import { ParticipanteService } from './../../servicios/participante/participante.service';
import { EventoService } from './../../servicios/evento/evento.service';
import { Evento } from './../../modelos/evento.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from '../../modelos/ticket.model';
import { Plaza } from '../../modelos/plaza.model';
import { Asiento } from '../../modelos/asiento.model';

@Component({
  selector: 'app-proceso-compra',
  templateUrl: './proceso-compra.component.html',
  styleUrls: ['./proceso-compra.component.scss']
})
export class ProcesoCompraComponent implements OnInit {
  listaCantidad: number[] = [1, 2, 3, 4, 5];
  evento: Evento;
  asiento: Asiento;
  nuevoTicket: Ticket;
  cantidadTickets: number = 0;
  pasoCompra: number = 1;
  estado: number = 1;
  titulo_paso: string = 'Selecciona zona';
  tipo_zona: number = 0;
  sombra: boolean = true;
  zonasTxt: string[] = ["Palcos", "Barrera", "Tendido", "Platea", "General"];
  zonas: Zona[] = [];
  regresarBool: boolean;
  hide : boolean = false;
  constructor(public dialog: MatDialog, public _route: ActivatedRoute, public _router: Router, public _eventoService: EventoService, public _participanteService: ParticipanteService, public _zonaService: ZonaService) {
    this.nuevoTicket = new Ticket();
    this.asiento = new Asiento();
  }

  ngOnInit() {
    this._route.params.forEach(
      (parametro) => {
        let evento_id: string = parametro['evento_id'];
        if (evento_id) {
          this._eventoService.getEventoPorId(evento_id)
            .subscribe(
              (respuesta: any) => {
                let evento = respuesta.evento;
                console.log(evento, "evento")
                this.evento = new Evento({
                  evento_id: evento._id,
                  titulo: evento.titulo,
                  fecha: evento.fecha,
                  imagen: evento.imagen,
                  tipo: evento.tipo,
                  plaza: new Plaza({
                    plaza_id: evento.plaza._id,
                    num_lugares: evento.plaza.num_lugares
                  }),
                });

                //Se obtienen los precios del evento por zona
                this._zonaService.getZonasPorPlaza(evento.plaza._id)
                  .subscribe(
                    (respuesta) => {
                      let zonas = respuesta.zonas;
                      zonas.forEach(zona => {
                        let zonaNueva: Zona = new Zona({
                          zona_id: zona._id,
                          tipo_zona: zona.tipo_zona,
                          costo: zona.costo,
                        });

                        if (this.evento.tipo == 1) {
                          //Agrega solo las zonas diferentes 
                          let index = this.zonas.findIndex(
                            (zonaL) => {
                              return zona.tipo_zona == zonaL.tipo_zona;
                            });

                          if (index == -1) {
                            this.zonas.push(zonaNueva);
                            console.log(this.zonas, "res")
                          }
                        }
                      });
                    },
                    (error) => {
                      console.log(error);
                    }
                  );

                console.log(this.evento, "this")
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    );
  }

  regresar = () => {
    this.mensajeSalirCompra("¿Desea cancelar la compra?");
  }

  seleccionarZona = (zona: number, btnClicked: any) => {
    let botones = Object.values(document.getElementsByTagName('button'));
    if (btnClicked.classList.contains('selected')) {
      botones.forEach(boton => {
        if (boton.classList.contains('opacity')) {
          boton.classList.remove('opacity');
        }
        if (boton.classList.contains('selected')) {
          boton.classList.remove('selected');
        }
      });
      this.tipo_zona = 0;
      return;
    } else {
      botones.forEach(boton => {
        if (boton.classList.contains('opacity')) {
          boton.classList.remove('opacity');
        }
        if (boton.classList.contains('selected')) {
          boton.classList.remove('selected');
        }
        if (boton.id) {
          if (!boton.classList.contains(btnClicked.id)) {
            boton.classList.add('opacity');
          } else {
            boton.classList.add('selected');
          }
        }
      });
    }

    this.tipo_zona = zona;

    let zonaPlaza: Zona = this.zonas.find((z) => {
      return z.tipo_zona == this.tipo_zona;
    });
    console.log(zonaPlaza);
    if (zonaPlaza) {
      this.asiento.zona = zonaPlaza;
    } else {
      return;
    }
  }

  seleccionarCantidad = (cantidad: number, liClicked: any) => {
    console.log(liClicked, "asdsad");
    let li_list = Object.values(document.getElementsByTagName('li'));
    if (liClicked.classList.contains('selected')) {
      li_list.forEach(li => {
        if (li.classList.contains('opacity')) {
          li.classList.remove('opacity');
        }
        if (li.classList.contains('selected')) {
          li.classList.remove('selected');
        }
      });
      this.cantidadTickets = 0;
      return;
    } else {
      li_list.forEach(li => {
        if (li.classList.contains('opacity')) {
          li.classList.remove('opacity');
        }
        if (li.classList.contains('selected')) {
          li.classList.remove('selected');
        }

        if (li.innerText != liClicked.innerText) {
          li.classList.add('opacity');
        } else {
          li.classList.add('selected');
        }

      });
      this.cantidadTickets = cantidad;
    }
  }

  siguientePaso = () => {
    if (this.revisaPaso()) {
      if (this.pasoCompra < 5) {
        this.pasoCompra++;
      }
      if (this.evento.tipo == 1 && this.pasoCompra == 3) {
        this.pasoCompra = 4;
      }
      this.seleccionTitulo();
      if (this.pasoCompra == 5) {
        this.finalizarCompra();
      }
    }
  }

  pasoAnterior = () => {
    if (this.pasoCompra >= 2) {
      this.pasoCompra--;
    }
    if (this.pasoCompra == 1) {
      this.tipo_zona = 0;
    }
    if (this.evento.tipo == 1 && this.pasoCompra == 3) {
      this.pasoCompra = 2;
      this.cantidadTickets = 0;
    }
    this.seleccionTitulo();
  }

  seleccionTitulo = () => {
    switch (this.pasoCompra) {
      case 1:
        this.titulo_paso = 'Selecciona zona';
        break;
      case 2:
        this.titulo_paso = "Selecciona cantidad de boletos";
        break;
      case 3:
        this.titulo_paso = "Selecciona asientos";
        break;
      case 4:
        this.titulo_paso = "Detalles de la venta";
        break;
      case 5:
        this.titulo_paso = "Finalizando venta";
        break;
    }
  }

  revisaPaso = () => {
    switch (this.pasoCompra) {
      case 1:
        if (this.tipo_zona >= 1 && this.tipo_zona <= 5) {
          return true;
        } else {
          this.abrirMensaje("Selecciona una zona");
          return false;
        }
      case 2:
        if (this.cantidadTickets >= 1 && this.cantidadTickets <= 5) {
          return true;
        } else {
          this.abrirMensaje("Selecciona la cantidad de boletos");
          return false;
        }
      case 3:
        if (this.cantidadTickets >= 1 && this.cantidadTickets <= 5) {
          return true;
        }
        return false;
      case 4:
        return true;
    }
  }

  abrirMensaje = (mensaje: string) => {
    let modal = this.dialog.open(MensajeComponent, {
      width: '500px',
      data: { mensaje: mensaje }
    });
  }

  mensajeSalirCompra = (mensaje: string) => {
    let modal = this.dialog.open(MensajeComponent, {
      width: '500px',
      data: { mensaje: mensaje, botones: true }
    });

    modal.afterClosed().subscribe((result) => {
      console.log(result);
      this.regresarBool = result;
      if (this.regresarBool) {
        this._router.navigate(['menu', 'eventos', 'lista-eventos', 'ficha-evento', { evento_id: this.evento.evento_id }]);
      }
    });

  }

  finalizarCompra = () => {
    this.hide = true;
    let interval = setInterval(
      () => {
        this.estado++;
        if (this.estado == 5){
          clearInterval(interval);
        }
      },3000);
  }
}
