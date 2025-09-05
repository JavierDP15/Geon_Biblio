import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Router } from '@angular/router';
import { EstadoPaginasService } from 'src/app/services/estadoPaginas/estado-paginas';

@Component({
  selector: 'app-geones',
  templateUrl: './geones.page.html',
  styleUrls: ['./geones.page.scss'],
  standalone: true,
  imports: [
    IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , IonIcon
    , CommonModule
    , FormsModule
    , MusicaComponent
    , AyudaComponent
    , AtrasComponent
  ]
})
export class GeonesPage implements OnInit {
  mostrarCuerpo = true;
  geones: Entrada | null = null;
  botonesVisibles = false;
  // imagenCargada = false;

  navegarA = '';

  constructor(
    private bibliotecaService: BibliotecaService
    , private musicaService: MusicaService
    , private estadoPaginasService: EstadoPaginasService
    , private router: Router
  ) { }

  async ngOnInit() {
    this.geones = await this.bibliotecaService.getPorNombre('Geones') ?? null;
  }

  ionViewWillEnter() {
    this.musicaService.play('caves-of-dawn');
    const mostrarBotones = this.estadoPaginasService.getEntrado('botonesGeon');
    if (!mostrarBotones) {
      this.botonesVisibles = false;
      this.estadoPaginasService.setEntrado('botonesGeon', false);
    } else {
      this.botonesVisibles = true;
    }
  }

  // onImagenCargada() {
  //   this.imagenCargada = true;
  // }

  toggleBotones() {
    this.botonesVisibles = !this.botonesVisibles;
    this.estadoPaginasService.setEntrado('botonesGeon', this.botonesVisibles);
  }

  irA(subcategoria: string) {
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.navegarA = subcategoria;
    this.router.navigate(['/' + this.navegarA]);
  }

}
