import { Evento } from './../../modelos/evento.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventoService {
  eventos: Evento[];
  constructor(public http: Http) {

  }

  getEventosPaginado = (tipo: number, pagina: number) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Eventos/" + tipo + "/" + pagina, options)
      .map(
        response => response.json()
      )

  }

  getEventosPorTipo = (tipo: Number) => {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Eventos/" + tipo, options)
      .map(
        response => response.json()
      )
  }

  getEventoPorId = (evento_id: string) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Evento/" + evento_id, options)
      .map(
        response => response.json()
      )
  }

  getTotalEventos = (tipo: number) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Eventos/" + tipo, options)
      .map(
        response => response.json()
      )
  }
}
