//Estructura, se puede omitir y hacerlo directamente abajo
class SucesoHistoricoModel {
    idSuceso: string;
    fecha: Date;
    texto: string;
    imagen?: string;
}

//El export es para porder utilizar la clase en otras clases
//cuando un atributo lleva '?' significa que el parametro es opcional
//super porque se esta heredando.

export class SucesoHistorico extends SucesoHistoricoModel {
    constructor (sucesoHistorico?:SucesoHistoricoModel) {
        super();
        if (sucesoHistorico){
            this.idSuceso = sucesoHistorico.idSuceso;
            this.fecha = sucesoHistorico.fecha;
            this.texto = sucesoHistorico.texto;
            this.imagen = sucesoHistorico.imagen;
        }
    }
}

