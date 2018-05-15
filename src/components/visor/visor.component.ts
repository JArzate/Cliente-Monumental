import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss']
})
export class VisorComponent implements OnInit {
  ruedo: boolean = false;
  vista:string;
  constructor(public dialogRef: MatDialogRef<VisorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
      if (data.vista){
        // if (data.vista == 'Ruedo'){
        //   this.ruedo = true;
        // }
        console.log(data.vista);
        this.vista = data.vista;
      }
    }

  ngOnInit() {
  }
}
