import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VisorComponent } from '../visor/visor.component';

@Component({
  selector: 'app-mapa-interactivo',
  templateUrl: './mapa-interactivo.component.html',
  styleUrls: ['./mapa-interactivo.component.scss']
})
export class MapaInteractivoComponent implements OnInit {
  //SpeechSyntehis permite crear una instancia de speach para poder usar voz
  Speech = new SpeechSynthesisUtterance();
  // Texto que sera hablado por Speech
  Texto: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.Texto = "Toca el botón de acuerdo al color de la zona que desees ver, la vista presentada es un ejemplo de como puedes apreciar el ruedo";
    this.Speech.text = this.Texto;
    setTimeout(
      () => {
       // window.speechSynthesis.speak(this.Speech);
      }, 1500);
  }

  MostrarVista = (vista: string) => {
    let modal = this.dialog.open(VisorComponent, {
      width: '1000px',
      data: { vista: vista, disableClose: true }
    })
  }
}
