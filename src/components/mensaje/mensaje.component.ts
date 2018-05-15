import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {
  mensaje: string;
  botones:boolean = false;
  constructor(public dialogRef: MatDialogRef<MensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    if (data.mensaje) {
      this.mensaje = data.mensaje;
    }
    if (data.botones){
      this.botones = true;
    }
  }

  ngOnInit() {
  }

  regresar = () => {
    this.dialogRef.close(true);
  }

}
