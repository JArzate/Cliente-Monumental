import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ZonaService {

  constructor(public http: Http) { }

  getZonasPorPlaza = (plaza_id: string) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Zonas/" + plaza_id, options)
    .map(
      respuesta => respuesta.json()
    );
  }

  getZona = (zona_id: string) => {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get("http://localhost:4078/Zonas/" + zona_id, options)
    .map(
      respuesta => respuesta.json()
    );
  }
}
