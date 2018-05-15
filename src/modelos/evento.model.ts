import { Participante } from './participante.model';
import { Plaza } from './plaza.model';

export class EventoModel {
    evento_id?: string;
    titulo?: string;
    fecha?: string;
    imagen?: string;
    tipo?: number;
    plaza?: Plaza;

    participantes?: Participante[];
}

export class Evento extends EventoModel {
    constructor(eventoModel: EventoModel) {
        super();
        this.evento_id = eventoModel.evento_id;
        this.titulo = eventoModel.titulo;
        this.fecha = eventoModel.fecha;
        this.imagen = eventoModel.imagen;
        this.tipo = eventoModel.tipo;
        this.plaza = eventoModel.plaza;
        this.participantes = eventoModel.participantes;
    }
}