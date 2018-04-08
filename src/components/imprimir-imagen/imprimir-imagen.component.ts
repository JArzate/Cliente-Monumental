import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imprimir-imagen',
  templateUrl: './imprimir-imagen.component.html',
  styleUrls: ['./imprimir-imagen.component.scss']
})
export class ImprimirImagenComponent implements OnInit {
  @Input('Imagen') URL_Imagen:string;
  constructor() { }

  ngOnInit() {
  }

}
