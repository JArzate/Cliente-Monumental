import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-como-llegar',
  templateUrl: './como-llegar.component.html',
  styleUrls: ['./como-llegar.component.scss']
})
export class ComoLlegarComponent implements OnInit {
  //SpeechSyntehis permite crear una instancia de speach para poder usar voz
  Speech = new SpeechSynthesisUtterance();
  // Texto que sera hablado por Speech
  Texto: string;

  Direccion: any;
  Origen: any;
  Destino: any;
  lat: Number = 21.874832;
  lng: Number = -102.306751;
  zoom: Number = 18;
  constructor() {
    this.Origen = { lat: this.lat, lng: this.lng }
  }

  ngOnInit() {
    this.Texto = "Selecciona uno de los siguientes lugares al que desees ir, y en el mapa, se te mostrará la ruta de como llegar";
    this.Speech.text = this.Texto;
    setTimeout(
      () => {
        // window.speechSynthesis.speak(this.Speech);
      }, 1500);
  }

  TrazarRuta = (lat: number, lng: number, img) => {
    let aux = img.target.previousElementSibling.src.split('/');
    let selectedPlace = aux[3] + "/" + aux[4] + "/" + aux[5] + "/" + aux[6];
    let imgs = document.getElementsByTagName('img');

    for (let index = 0; index < imgs.length; index++) {
      if (imgs[index].getAttribute('src') == selectedPlace) {
        imgs[index].classList.add('animated');
        imgs[index].classList.add('pulse');
        imgs[index].classList.add('activo');
        imgs[index].style.filter = 'grayscale(0)';
      } else {
        imgs[index].classList.remove('activo');
        imgs[index].classList.remove('animated');
        imgs[index].classList.remove('pulse');
        if (!imgs[index].classList.contains('fondo')) {
          imgs[index].style.filter = 'grayscale(1)';
        }
      }
    }

    this.Destino = {
      lat: lat,
      lng: lng
    }
    this.Direccion = {
      Origen: this.Origen,
      Destino: this.Destino
    }

  }
}
