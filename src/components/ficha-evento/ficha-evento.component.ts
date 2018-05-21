import { Zona } from './../../modelos/zona.model';
import { ZonaService } from './../../servicios/zona/zona.service';
import { Participante } from './../../modelos/participante.model';
import { ParticipanteService } from './../../servicios/participante/participante.service';
import { Evento } from './../../modelos/evento.model';
import { EventoService } from './../../servicios/evento/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Plaza } from '../../modelos/plaza.model';
import { StaticInjector } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-ficha-evento',
  templateUrl: './ficha-evento.component.html',
  styleUrls: ['./ficha-evento.component.scss']
})
export class FichaEventoComponent implements OnInit {
  evento: Evento;
  participantes: Participante[] = [];
  zonas: Zona[] = [];
  zonasTxt: string[] = ["Palcos", "Barrera", "Tendido", "Platea", "General"];
  constructor(public _route: ActivatedRoute, public _router: Router, public _eventoService: EventoService, public _participanteService: ParticipanteService, public _zonaService: ZonaService) { }

  ngOnInit() {
    this._route.params.forEach(
      (parametro) => {
        let evento_id: string = parametro['evento_id'];
        console.log(evento_id, "Evento que llego");
        if (evento_id) {
          this._eventoService.getEventoPorId(evento_id)
            .subscribe(
              (respuesta: any) => {
                let evento = respuesta.evento;
                console.log(evento, "!!!@!@!@!@!@");
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

                //Se obtienen losparticipantes del evento
                this._participanteService.getParticipantesPorEvento(this.evento.evento_id)
                  .subscribe(
                    (respuesta) => {
                      let participantes = respuesta.participantes;

                      participantes.forEach(participante => {
                        let nuevoPariticipante: Participante = new Participante({
                          participante_id: participante.participante_id,
                          nombre: participante.nombre
                        });
                        this.participantes.push(nuevoPariticipante);
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
                                costo: zona.costo
                              });

                              //Agrega solo las zonas diferentes 
                              let index = this.zonas.findIndex(
                                (zonaL) => {
                                  return zona.tipo_zona == zonaL.tipo_zona;
                                });

                              if (index == -1) {
                                this.zonas.push(zonaNueva);
                                console.log(this.zonas, "res");
                              }
                            });
                          },
                          (error) => {
                            console.log(error);
                          }
                        );
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
    this._router.navigate(['menu', 'eventos', 'lista-eventos', { tipo: this.evento.tipo }]);
  }

}
