import { Zona } from './zona.model';

export class AsientoModel {
    asiento_id?: string;
    num_asiento?: number;
    ocupado?: boolean;
    zona?: Zona;
}

export class Asiento extends AsientoModel {
    constructor(asiento_model?: AsientoModel) {
        super();
        if (asiento_model) {
            this.asiento_id = asiento_model.asiento_id;
            this.num_asiento = asiento_model.num_asiento;
            this.ocupado = asiento_model.ocupado;
            this.zona = asiento_model.zona;
        }
    }
}