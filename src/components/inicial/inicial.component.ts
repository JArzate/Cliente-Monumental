import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {
  //SpeechSyntehis permite crear una instancia de speach para poder usar voz
  Speech = new SpeechSynthesisUtterance();
  // Texto que sera hablado por Speech
  Texto: string;
  constructor() { }

  ngOnInit() {
    this.Texto = "Hola, bienvenido a monumental. Toca la pantalla para ir al menú principal."
    //Configurando lenguaje de la voz
    this.Speech.lang = "es-MX";
    //Configurando el texto que dirá
    this.Speech.text = this.Texto;
    //En cuanto inicie, esperara 1.5 segundos y comenzara a hablar
    setTimeout(
      () => {
        //window.speechSynthesis.speak(this.Speech);
      }, 1500);
  }
}
