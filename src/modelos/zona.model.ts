import { Plaza } from './plaza.model';
export class ZonaModel {
    zona_id?:string;
    sol_sombra?: boolean;
    tipo_zona?: number;
    seccion?: number;
    fila?: number = 0;
    costo?: number;
    plaza?: Plaza;
}

export class Zona extends ZonaModel {
    constructor(zona_model: ZonaModel) {
        super();
        this.zona_id = zona_model.zona_id;
        this.sol_sombra = zona_model.sol_sombra;
        this.tipo_zona = zona_model.tipo_zona;
        this.seccion = zona_model.seccion;
        this.fila = zona_model.fila;
        this.costo = zona_model.costo;
        this.plaza = zona_model.plaza;
    }
}