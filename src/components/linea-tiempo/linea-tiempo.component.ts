import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.component.html',
  styleUrls: ['./linea-tiempo.component.css']
})
export class LineaTiempoComponent implements OnInit, OnDestroy {
  Array: string[] = ['', '', '', '', '']
  public Text:string;
  public Speech = new SpeechSynthesisUtterance();
  public Desliza: boolean = true;
  public Interval;
  constructor() { }

  ngOnInit() {
    this.Text = "Deliza la pantalla para ver mas contenido de la línea de tiempo, preciona el icono del sonido para leerlo por ti.";
    this.Speech.text = this.Text;
    setTimeout(()=>{
      window.speechSynthesis.speak(this.Speech);
    },1500);

    this.Interval = setInterval(
      () => {

        var img_gif = document.getElementsByClassName('img-desliza');
        img_gif[0].classList.add('animated');
        img_gif[0].classList.add('fadeOut');

        setTimeout(() => {
          this.Desliza = false;
        }, 1000);
      }, 3000);
  }

  ngOnDestroy() {
    if (this.Interval) {
      clearInterval(this.Interval);
    }
  }

}
