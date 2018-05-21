import { Participante } from './../../modelos/participante.model';
import { ParticipanteService } from './../../servicios/participante/participante.service';
import { Evento } from './../../modelos/evento.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventoService } from '../../servicios/evento/evento.service';
import { Plaza } from '../../modelos/plaza.model';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss']
})
export class ListaEventosComponent implements OnInit {
  evento: Evento;
  sig_Pagina: number = 1;
  ant_Pagina: number = 0;
  tipo_Evento: number;
  total_Eventos: number;

  Text: string;
  Speech = new SpeechSynthesisUtterance();
  constructor(public _route: ActivatedRoute, public _router: Router, public _eventoService: EventoService, public _participanteService: ParticipanteService) {

  }

  ngOnInit() {
    this.Text = "Utiliza las flechas que están a los lados para desplegar más eventos; y si deseas ver un evento, preciona su imagen, así, veras más detalles de este.";
    this.Speech.text = this.Text;
    setTimeout(() => {
     // window.speechSynthesis.speak(this.Speech);
    }, 1500);
    //Se obtiene el parametro que se envia por router para saber el tipo de evento
    this._route.params.forEach(
      //por cada parametro
      (parametro) => {
        //obtenemos el tipo

        this.tipo_Evento = +parametro['tipo'];
        let pagina: number = +parametro['pagina'];

        this._eventoService.getTotalEventos(this.tipo_Evento)
          .subscribe(
            (respuesta) => {
              let totalEventos = respuesta.totalEventos;
              if (totalEventos) {
                this.total_Eventos = totalEventos;
              }
            },
            (error) => {
              console.log(error);
            });


        if (!pagina) {
          pagina = 1;
        } else {
          this.sig_Pagina = pagina + 1;
          this.ant_Pagina = pagina - 1;
        }

        //si existe el parametro
        if (this.tipo_Evento) {
          this._eventoService.getEventosPaginado(this.tipo_Evento, pagina)
            .subscribe(
              (respuesta) => {
                console.log(respuesta);
                let eventos = respuesta.eventos;
                //Por cada evento se agrega a la lista de eventos, junto con su plaza
                if (eventos) {
                  eventos.forEach(evento => {
                    let eventoNuevo: Evento = new Evento(evento);
                    eventoNuevo.evento_id = evento._id;
                    eventoNuevo.participantes = [];
                    //Se piden los participantes del evento
                    this._participanteService.getParticipantesPorEvento(evento._id)
                      .subscribe(
                        (respuesta) => {
                          let participantes = respuesta.participantes;
                          participantes.forEach(participante => {
                            let participanteNuevo: Participante = new Participante({
                              participante_id: participante._id,
                              nombre: participante.nombre
                            });
                            eventoNuevo.participantes.push(participanteNuevo);
                          });
                        },
                        (error) => {
                          console.log(error);
                        }
                      )
                    this.evento = eventoNuevo;
                    console.log(this.evento, "Evento");
                  });
                }
              },
              (error) => {
                console.log(error);
              }
            )
        } else {
          this._router.navigate(['menu', 'eventos', { tipo: this.tipo_Evento }]);
        }
      }
    );
  }

  regresar = () => {
    this._router.navigate(['menu', 'eventos']);
  }

  siguienteEvento = () => {
    this._router.navigate(['menu', 'eventos', 'lista-eventos', { tipo: this.tipo_Evento, pagina: this.sig_Pagina }]);
  }
  
  anteriorEvento = () => {
    this._router.navigate(['menu', 'eventos', 'lista-eventos', { tipo: this.tipo_Evento, pagina: this.ant_Pagina }]);
  }
}
