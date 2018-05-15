import { Evento } from './evento.model';

export class ParticipanteModel {
    participante_id?: string;
    nombre?: string;
}

export class Participante extends ParticipanteModel {
    constructor(participante_model: ParticipanteModel) {
        super();
        this.participante_id = participante_model.participante_id;
        this.nombre = participante_model.nombre;
    }
}