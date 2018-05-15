import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Participante } from '../../modelos/participante.model';

@Injectable()
export class ParticipanteService {
  participanntes: Participante[]
  constructor(public http: Http) { }

  getParticipantesPorEvento = (evento_id: string) => {
    let headers = new Headers({
      'Content-type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Participantes/" + evento_id, options)
      .map(
        response => response.json()
      );
  }
}
