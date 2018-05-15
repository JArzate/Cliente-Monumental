import { Asiento } from './asiento.model';
import { Evento } from './evento.model';
import { Zona } from './zona.model';

export class TicketModel {
    evento?: Evento;
    asiento?: Asiento;
}

export class Ticket extends TicketModel {
    constructor(ticket_model?: TicketModel) {
        super();
        if (ticket_model){
            this.evento = ticket_model.evento;
            this.asiento = ticket_model.asiento;
        }
    }
}