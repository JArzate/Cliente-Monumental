import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos-menu',
  templateUrl: './eventos-menu.component.html',
  styleUrls: ['./eventos-menu.component.scss']
})
export class EventosMenuComponent implements OnInit {
  Text: string;
  Speech = new SpeechSynthesisUtterance();
  constructor() { }

  ngOnInit() {
    this.Text = "Selecciona la categoría de eventos en que estés interesado";
    this.Speech.text = this.Text;
    setTimeout(() => {
     // window.speechSynthesis.speak(this.Speech);
    }, 1500);
  }

}
