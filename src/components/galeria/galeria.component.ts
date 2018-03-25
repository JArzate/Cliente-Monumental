import { element } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  providers: [FacebookService]
})
export class GaleriaComponent implements OnInit {
  public Speech = new SpeechSynthesisUtterance();
  public Text: string;
  public Images: string[] = [];
  public Next_page: string = null;
  public Prev_page: string = null;
  public SelectedImage: string;
  constructor(public _facebookService: FacebookService, public _router: Router, public _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.Text = "Pulsa las flechas en la parte inferior de la pantalla para cargar más imagenes, selecciona "
      + "una imagen para verla en tamaño real."
    this.Speech.text = this.Text;
    setTimeout(()=>{
      //window.speechSynthesis.speak(this.Speech);
    },1500);

    //Confiuracion del servicio de facebook
    let initParams: InitParams = {
      appId: '892118350967844',
      xfbml: true,
      cookie: true,
      version: 'v2.12'
    };

    this._facebookService.init(initParams)
      .then(
        () => {
          if (!this._facebookService.getLoginStatus()) {
            console.log("Sesion ya iniciada")
          } else {
            console.log("Iniciando sesion");
            this.LogIn();
          }
        }
      ).catch(
        (error) => {
          console.log("error init", error);
        }
      );

  }

  NextImages = () => {
    this.Images = [];
    //Sehace peticion al servicio de fb que se conectara al API Graph
    this._facebookService.api(
      //ID DEL ALBUM que se requiere, y los parametros
      '/642368519113542/photos',
      'get',
      {
        fields: "images",
        limit: "4",
        after: this.Next_page
      }
    ).then(
      response => {
        console.log(response);

        //Si existe un vector de datos
        if (response.data) {
          //Por cada dato obtenemos su liga a la imagen y se almacena en otro vector
          response.data.forEach(
            element => {
              this.Images.push(element.images[0].source);
            });
          this.SetSelectedImage(this.SelectedImage);
        }

        //Si existe paginacion
        if (response.paging) {
          //Si existe un siguiente
          if (response.paging.next) {
            this.Next_page = response.paging.cursors.after;
          } else {
            this.Next_page = null;
          }
          //Si existe un anterior
          if (response.paging.previous) {
            this.Prev_page = response.paging.cursors.before;
          } else {
            this.Prev_page = null;
          }
        }
      }
    ).catch(
      error => {
        console.log("error", error);
      }
    );
  }

  PrevImages = () => {
    this.Images = [];
    this._facebookService.api(
      '/642368519113542/photos',
      'get',
      {
        fields: "images",
        limit: "4",
        before: this.Prev_page
      }
    ).then(
      response => {
        console.log("response", response);

        //Si la respuesta existe un vector data
        if (response.data) {
          response.data.forEach(
            element => {
              this.Images.push(element.images[0].source);
            });
          this.SetSelectedImage(this.SelectedImage);
        }
        //Si existe paginacion
        if (response.paging) {

          //Si existe una siguiennte paginacion
          if (response.paging.next) {
            this.Next_page = response.paging.cursors.after;
          } else {
            this.Next_page = null;
          }
          //Si existe una paginacion anterior
          if (response.paging.previous) {
            this.Prev_page = response.paging.cursors.before;
          } else {
            this.Prev_page = null;
          }
        }
      }
    ).catch(
      error => {
        console.log("error", error);
      }
    );
  }

  //Se obtiene la primera pagina de imagenes
  GetImages = () => {
    this._facebookService.api(
      '/642368519113542/photos',
      'get',
      {
        fields: "images",
        limit: "4"
      }
    ).then(
      response => {
        console.log("response", response);
        //Si la respuesta existe un vector data
        if (response.data) {

          //por cada dato en el vector se extrae su fuente de la imagen y se guarda en un nuevo vector
          response.data.forEach(
            element => {
              this.Images.push(element.images[0].source);
            });

          //se guarda la primera imagen como la imagen seleccionada
          this.SetSelectedImage(this.Images[0]);
        }

        //Si existe paginacion
        if (response.paging) {
          //si hay un siguiente guardamos la liga a la siguiente pagina de imagenes
          if (response.paging.next) {
            this.Next_page = response.paging.cursors.after;
          } else {
            this.Next_page = null;
          }
          console.log("Next", this.Next_page);
        }
      }
    ).catch(
      error => {
        console.log("error", error);
      }
    );
  }

  //Inicia sesion en facebook
  LogIn = () => {
    this._facebookService.login()
      .then(
        (response: LoginResponse) => {
          if (response.status === 'connected') {
            this.GetImages();
          } else if (response.status === 'not_authorized') {
            console.log("No autorizado en la app")
          } else {
            console.log("No logeado")
          }
        }
      )
      .catch(
        (error) => {
          console.log("no Logged", error)
        }
      );
  }

  //Se obtiene la foto elegida y se agregan animaciones
  SetSelectedImage = (image: string) => {

    this.SelectedImage = image;
    var imgs = document.getElementsByName('img');

    for (let index = 0; index < imgs.length; index++) {
      if (imgs[index].getAttribute('src') == this.SelectedImage) {
        imgs[index].classList.add('active-photo');
        imgs[index].classList.add('animated');
        imgs[index].classList.add('pulse');
      } else {
        imgs[index].classList.remove('active-photo');
        imgs[index].classList.remove('animated');
        imgs[index].classList.remove('pulse');
      }
    }
  }

}
