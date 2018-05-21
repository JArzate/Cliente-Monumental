import { AsientoService } from './../../servicios/asiento/asiento.service';
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
  listaFilas: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  listaAsientos: Asiento[] = [];
  asientosSeleccionados: number = 0;
  asientosSelected: Asiento[] = [];
  asientosDisponibles: number = 0;
  evento: Evento;
  asiento: Asiento;
  nuevoTicket: Ticket;
  cantidadTickets: number = 0;
  pasoCompra: number = 1;
  estado: number = 1;
  titulo_paso: string = 'Selecciona zona';
  tipo_zona: number = 0;
  fila: number = 0;
  seccion: number = 0;
  tipo_zonaTxt: string;
  sol: boolean = true;
  zonasTxt: string[] = ["Palcos", "Barrera", "Tendido", "Platea", "General"];
  zonas: Zona[] = [];
  regresarBool: boolean;
  hide: boolean = false;
  mapa: string;
  secciones: number[];
  seccionImg: string;
  impresos: number = 0;
  constructor(public dialog: MatDialog, public _route: ActivatedRoute, public _router: Router,
    public _eventoService: EventoService, public _participanteService: ParticipanteService,
    public _zonaService: ZonaService, public _asientoService: AsientoService) {
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
                      let zonasBD = respuesta.zonas;
                      zonasBD.forEach(zona => {
                        let newZona: Zona = new Zona({
                          costo: zona.costo,
                          fila: zona.fila,
                          plaza: zona.plaza,
                          seccion: zona.seccion,
                          tipo_zona: zona.tipo_zona,
                          sombra: zona.sombra,
                          zona_id: zona._id
                        });
                        this.zonas.push(newZona);
                      });
                    },
                    (error) => {
                      console.log(error);
                    }
                  );

                console.log(this.evento, "this");
                this.limpiarMapa();
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

  cambioMapa = () => {
    if (this.sol && this.tipo_zona == 5) {
      if (this.mapa != "Mapa-Plaza-Media.png") {
        if (this.mapa != "Mapa-Plaza2.png") {
          this.mapa = "Mapa-Plaza-GeneralSol.png";
        }
      }
    } else if (!this.sol && this.tipo_zona == 5) {
      if (this.mapa != "Mapa-Plaza-Media.png") {
        if (this.mapa != "Mapa-Plaza2.png") {
          this.mapa = "Mapa-Plaza-GeneralSombra.png";
        }
      }
    }
  }

  seleccionarZona = (zona: number, btnClicked: any) => {
    let botones = Object.values(document.getElementsByTagName('button'));
    //Si ya hay uno seleccionado se limpia seleccion
    if (btnClicked.classList.contains('selected')) {
      botones.forEach(boton => {
        if (boton.classList.contains('opacity')) {
          boton.classList.remove('opacity');
        }
        if (boton.classList.contains('selected')) {
          boton.classList.remove('selected');
        }
      });
      if (this.evento.tipo == 1) {
        this.mapa = "Mapa-Plaza-Media.png";
      } else {
        this.mapa = "Mapa-Plaza2.png";
      }
      this.tipo_zona = 0;
      return;
    } else {
      //sino se selecciona
      this.tipo_zonaTxt = btnClicked.id;
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

        //se muestra imagen de la zona seleccionada
        if (this.evento.tipo == 1) {
          //Si es evento musical
          switch (btnClicked.id) {
            case "Palcos":
              this.mapa = "Mapa-Plaza-Media-Palcos.png";
              this.seccionImg = "PalcoSeccion.png";
              break;
            case "Barrera":
              this.mapa = "Mapa-Plaza-Media-Barrera.png";
              this.seccionImg = "PalcoSeccion.png";
              break;
            case "Tendido":
              this.mapa = "Mapa-Plaza-Media-Tendido.png";
              this.seccionImg = "TendidoSeccion.png";
              break;
            case "Platea":
              this.mapa = "Mapa-Plaza-Media-Platea.png";
              this.seccionImg = "PalcoSeccion.png";
              break;
            case "General":
              this.mapa = "Mapa-Plaza-Media-General.png";
              break;
          }
        } else {
          switch (btnClicked.id) {
            case "Palcos":
              this.mapa = "Mapa-Plaza-Palcos.png";
              this.seccionImg = "PalcoSeccion.png";
              break;
            case "Barrera":
              this.mapa = "Mapa-Plaza-Barrera.png";
              this.seccionImg = "PalcoSeccion.png";
              break;
            case "Tendido":
              this.mapa = "Mapa-Plaza-Tendido.png";
              this.seccionImg = "TendidoSeccion.png";
              break;
            case "Platea":
              this.mapa = "Mapa-Plaza-Platea.png";
              this.seccionImg = "PalcoSeccion.png";
              break;
            case "General":
              if (this.sol) {
                this.mapa = "Mapa-Plaza-GeneralSol.png";
              } else {
                this.mapa = "Mapa-Plaza-GeneralSombra.png";
              }
              break;
          }
        }
      });
    }
    this.tipo_zona = zona;
  }

  seleccionarFila = (fila: number, liClicked: any) => {
    console.log("Fila", fila);
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

      this.fila = fila;
    }
  }

  seleccionarCantidad = (cantidad: number, liClicked: any) => {
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

      if (this.asientosDisponibles < cantidad) {
        this.abrirMensaje("No hay suficientes lugares disponibles");
        liClicked.classList.remove('selected');
        cantidad = 0;
      }
      this.cantidadTickets = cantidad;
    }
  }

  selecccionaSeccion = (seccion: number, liClicked: any) => {
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
      this.seccion = 0;
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
      this.seccion = seccion;
    }
  }

  seleccionarAsiento = (asiento: Asiento, liClicked: any) => {
    if (asiento) {
      console.log(liClicked);
      if (liClicked.classList.contains('noDisponible')) {
        this.abrirMensaje("Asiento no disponible");
        return;
      }
      if (liClicked.classList.contains('seleccionado')) {
        if (this.asientosSeleccionados > 0) {
          liClicked.classList.remove('seleccionado');
          this.asientosSeleccionados--;
          let index = this.asientosSelected.findIndex((asientoLista) => {
            return asientoLista.asiento_id == asiento.asiento_id;
          });

          if (index != -1) {
            this.asientosSelected.splice(index, 1);
          }
        }
      } else {
        if (this.asientosSeleccionados < this.cantidadTickets) {
          liClicked.classList.add('seleccionado');
          this.asientosSeleccionados++;
          this.asiento.ocupado = true;
          this.asientosSelected.push(asiento);
        } else {
          this.abrirMensaje("Cantidad máxima de asientos seleccionados");
        }
      }
      console.log(this.asientosSelected);
    }
  }

  siguientePaso = () => {
    if (this.revisaPaso()) {
      if (this.pasoCompra <= 7) {
        this.pasoCompra++;
      }
      if (this.pasoCompra == 2) {
        if (this.tipo_zona != 2) {
          this.pasoCompra = 3;
        }
      }

      if (this.pasoCompra == 5) {
        if (this.tipo_zona == 5) {
          this.pasoCompra = 6;
        }
      }

      this.seleccionTitulo();

      if (this.pasoCompra == 7) {
        this.finalizarCompra();
      }

    }
  }

  pasoAnterior = () => {
    if (this.pasoCompra == 3 && this.tipo_zona != 2) {
      this.pasoCompra = 1;
      this.limpiarMapa();
      this.tipo_zona = 0;
    }

    if (this.pasoCompra >= 2) {
      this.pasoCompra--;
    }

    if (this.pasoCompra == 3 && this.tipo_zona == 5) {
      this.pasoCompra = 1;
    }

    if (this.pasoCompra == 1) {
      this.tipo_zona = 0;
      this.limpiarMapa();
    }
    if (this.pasoCompra == 2) {
      this.seccion = 0;
    }

    if (this.pasoCompra == 4) {
      this.listaAsientos = [];
    }

    this.seleccionTitulo();
  }

  seleccionTitulo = () => {
    switch (this.pasoCompra) {
      case 1:
        this.titulo_paso = 'Selecciona zona';
        break;
      case 2:
        this.titulo_paso = 'Selecciona fila';
        break;
      case 3:
        this.titulo_paso = "Selecciona sección";
        if (this.sol) {
          this.secciones = [1, 2, 3, 4, 5];
        } else {
          this.secciones = [6, 7, 8, 9, 10];
        }
        break;
      case 4:
        this.titulo_paso = "Selecciona cantidad de boletos";
        this.getZonaEnSeccion();
        break;
      case 5:
        this.titulo_paso = "Selecciona asientos";
        this.getAsientos();
        break
      case 6:
        this.titulo_paso = "Detalles de la venta";
        break;
      case 7:
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
        if (this.fila >= 1 && this.fila <= 8) {
          return true;
        }
        return false;
      case 3:
        if (this.seccion >= 1 && this.seccion <= 10) {
          return true;
        } else {
          this.abrirMensaje("Selecciona la seccion para continuar");
          return false;
        }
      case 4:
        if (this.cantidadTickets >= 1 && this.cantidadTickets <= 5) {
          return true;
        } else {
          this.abrirMensaje("Selecciona la cantidad de boletos");
          return false;
        }
      case 5:
        if (this.asientosSeleccionados == this.cantidadTickets) {
          return true;
        } else {
          this.abrirMensaje("No haz seleccionado todos los asientos");
          return false;
        }
      case 6:
        if (this.cantidadTickets >= 1 && this.cantidadTickets <= 5) {
          return true;
        }
        return false;
      case 7:
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
        if (this.estado != 5) {
          this.estado++;
        }
        if (this.estado == 5) {
          if (this.impresos < this.cantidadTickets) {
            this.asientosSelected.forEach((asiento) => {
              this._asientoService.actualizarAsiento(asiento.asiento_id)
                .then(() => {
                  this.impresos++;
                });
            });
          } else {
            clearInterval(interval);
            this._router.navigate(['menu']);
          }
        }
      }, 3000);
  }

  limpiarMapa = () => {
    if (this.evento.tipo == 1) {
      this.mapa = "Mapa-Plaza-Media.png";
    } else {
      this.mapa = "Mapa-Plaza2.png";
    }
  }

  getZonaEnSeccion = () => {
    /*Se obtiene la zona dada la seccion*/
    let zonaSeleccionada = this.zonas.find((zona) => {
      return zona.tipo_zona == this.tipo_zona && zona.seccion == this.seccion && this.sol != zona.sombra && this.fila == zona.fila;
    });

    if (zonaSeleccionada) {
      this.asiento.zona = zonaSeleccionada;
      this._asientoService.getAsientosDisponiblesPorZona(zonaSeleccionada.zona_id)
        .subscribe(
          (respuesta) => {
            if (respuesta) {
              this.asientosDisponibles = respuesta.disponibles;
              console.log("Lugares Disponibles", this.asientosDisponibles);
            }
          }
        );
    }
  }

  getAsientos = () => {
    this.asientosSelected = [];
    this.listaAsientos = [];
    this.asientosSeleccionados = 0;
    this._asientoService.getAsientosPorZona(this.asiento.zona.zona_id)
      .subscribe(
        (respuesta) => {
          if (respuesta) {
            let asientos = respuesta.asientos;
            asientos.forEach(asiento => {
              let asientoNuevo = new Asiento({
                asiento_id: asiento._id,
                num_asiento: asiento.num_asiento,
                ocupado: asiento.ocupado,
                zona: this.asiento.zona
              });
              this.listaAsientos.push(asientoNuevo);
              console.log(this.listaAsientos);
            });
          }
        }
      );
  }
}
