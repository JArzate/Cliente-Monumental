import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  Height: Number = 322;
  //SpeechSyntehis permite crear una instancia de speach para poder usar voz
  Speech = new SpeechSynthesisUtterance();
  // Texto que sera hablado por Speech
  Texto: string;
  constructor() { }

  ngOnInit() {
    //Cuando se toque pantalla la bandera se apagra y cambiara la vista
    this.Texto = "Elige una opción del menú";
    this.Speech.text = this.Texto;
    setTimeout(() => {
     window.speechSynthesis.speak(this.Speech);
    }, 1500);
  }

}
