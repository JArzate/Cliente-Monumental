import { Zona } from './../../modelos/zona.model';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Asiento } from '../../modelos/asiento.model';

@Injectable()
export class AsientoService {
  asientos: Asiento[] = [];
  constructor(public http: Http) {

  }

  getAsientosDisponiblesPorZona = (zona_id: string) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers,
    });

    return this.http.get("http://localhost:4078/AsientosD/" + zona_id, options)
      .map(
        res => res.json()
      );
  }

  actualizarAsiento = (asientoId: string) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let promise = new Promise((res, rej) => {
      this.http.put("http://localhost:4078/Asiento/" + asientoId, options)
        .toPromise()
        .then(
          (response) => {
            console.log(response);
            res();
          }
        );
    });

    return promise;

  }

  getAsientosPorZona = (zonaId: string) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Asientos/" + zonaId, options)
      .map(
        res => res.json()
      );
  }

}
