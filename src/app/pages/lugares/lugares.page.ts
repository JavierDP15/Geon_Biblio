import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
  standalone: true,
  imports: [IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , IonButton
    , CommonModule
    , FormsModule
    , AtrasComponent
    , AyudaComponent
    , MusicaComponent
  ]
})
export class LugaresPage implements OnInit {

  @ViewChild('scrollContenedor') scrollContenedor!: ElementRef<HTMLDivElement>;

  entradas: Entrada[] | null = null;
  entradaActual: Entrada | null = null;
  entradaACambiar: Entrada | null = null;
  territorio = "";
  paginaActual = 1;
  paginasTotales = 1;
  entrarDerecha = false;
  entrarIzquierda = false;

  constructor(
    private route: ActivatedRoute
    , private bibliotecaService: BibliotecaService
    , private musicaService: MusicaService
  ) { }

  async ngOnInit() {
    this.territorio = this.route.snapshot.paramMap.get('territorio') || '';
    this.entradas = await this.bibliotecaService.getPorPadre(this.territorio);
    if (this.entradas) {
      this.paginasTotales = this.entradas?.length;
      this.entradaActual = this.entradas[0];
    }
  }

  siguienteLugar() {
    if (this.paginaActual < this.paginasTotales && this.entradas) {
      this.paginaActual++;
      this.entradaACambiar = this.entradas[this.paginaActual - 1]
      setTimeout(() => {
        this.entrarDerecha = true;
      }, 10);
      setTimeout(() => {
        this.scrollContenedor.nativeElement.scrollTop = 0;
      }, 990);
      setTimeout(() => {
        this.entradaActual = this.entradaACambiar;
        this.entradaACambiar = null;
        this.entrarDerecha = false;
      }, 1000);
    }
  }

  anteriorLugar() {
    if (this.paginaActual > 1 && this.entradas) {
      this.entradaACambiar = this.entradas[this.paginaActual - 2];
      this.paginaActual--;
      setTimeout(() => {
        this.entrarIzquierda = true;
      }, 10);
      setTimeout(() => {
        this.scrollContenedor.nativeElement.scrollTop = 0;
      }, 990);
      setTimeout(() => {
        this.entradaActual = this.entradaACambiar;
        this.entradaACambiar = null;
        this.entrarIzquierda = false;
      }, 1000);
    }
  }

  ionViewWillEnter() {
    this.musicaService.play('desert-storm');
  }

}
