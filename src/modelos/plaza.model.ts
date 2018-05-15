export class PlazaModel {
    plaza_id:string;
    num_lugares:number;
}

export class Plaza extends PlazaModel {
    constructor(plaza_model: PlazaModel) {
        super();
        this.plaza_id = plaza_model.plaza_id;
        this.num_lugares= plaza_model.num_lugares;
    }
}