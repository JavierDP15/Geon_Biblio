import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { FerhelComponentComponent } from 'src/app/components/ferhel-component/ferhel-component.component';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { FerhelesService } from 'src/app/services/ferheles/ferheles.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-lista-ferhel',
  templateUrl: './lista-ferhel.page.html',
  styleUrls: ['./lista-ferhel.page.scss'],
  standalone: true,
  imports: [IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , AtrasComponent
    , AyudaComponent
    , MusicaComponent
    , FerhelComponentComponent
  ]
})
export class ListaFerhelPage implements OnInit {
  lista: Entrada[] = [];
  paginaActual = 1;
  readonly porPagina = 8;
  paginasTotales = 1;

  entrarSiguiente = false;
  entrarAnterior = false;
  animando = false;

  constructor(
    private bibliotecaService: BibliotecaService
    , private ferhelService: FerhelesService
    , private musicaService: MusicaService
  ) { }

  async ngOnInit() {
    await this.ferhelService.setDescubierto('fermiti', true);
    await this.ferhelService.resetDescubierto('typhos');
    await this.ferhelService.setDescubierto('typhos', true);
    const datos = await this.bibliotecaService.getPorCategoria('ferhel');
    this.lista = datos ?? [];
    this.paginasTotales = Math.ceil(this.lista.length / this.porPagina);
  }

  ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
  }

  get paginaActualItems(): Entrada[] {
    const start = (this.paginaActual - 1) * this.porPagina;
    return this.lista.slice(start, start + this.porPagina);
  }

  get paginaSiguienteItems(): Entrada[] {
    if (this.paginaActual < this.paginasTotales) {
      const start = this.paginaActual * this.porPagina;
      return this.lista.slice(start, start + this.porPagina);
    }
    return [];
  }

  get paginaAnteriorItems(): Entrada[] {
    if (this.paginaActual > 1)
    {
      const start = (this.paginaActual - 2) * this.porPagina;
      return this.lista.slice(start, start + this.porPagina);
    }
    return [];
  }

  siguiente() {
    console.log('ayuyu');
    if (this.paginaActual < this.paginasTotales) {
      this.animando = true
      this.entrarSiguiente = true;
      setTimeout(() => {
        this.entrarSiguiente = false;
        this.paginaActual++;
        this.animando = false;
      }, 1000);
    }
  }

  anterior() {
    console.log('ayuyu');
    if (this.paginaActual > 1) {
      this.animando =  true;
      this.entrarAnterior = true;
      setTimeout(() => {
        this.entrarAnterior = false;
        this.paginaActual--;
        this.animando = false;
      }, 1000);
    }
  }

}
