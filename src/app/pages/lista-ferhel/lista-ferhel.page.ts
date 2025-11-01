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
import { ActivatedRoute } from '@angular/router';

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
  habitat = '';
  // listaAEntrar: Entrada[] = [];
  // biomas: string[] = [
    // 'desierto'
    // , 'tundra'
    // , 'montaña'
    // , 'bosque'
    // , 'pantano'
    // , 'rio'
    // , 'subterraneo'
    // , 'oceano'
    // , 'selva'
  // ];
  // listaPorBiomas: Entrada[][] = [];
  // paginaActual = 1;
  // readonly porPagina = 8;
  // paginasTotales = 1;

  entrarSiguiente = false;
  entrarAnterior = false;
  animando = false;

  constructor(
    private bibliotecaService: BibliotecaService
    , private ferhelService: FerhelesService
    , private musicaService: MusicaService
    , private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.ferhelService.setDescubierto('fermiti', true);
    await this.ferhelService.resetDescubierto('typhos');
    await this.ferhelService.setDescubierto('typhos', true);
    const datos = await this.bibliotecaService.getPorCategoria('ferhel');
    this.habitat = this.route.snapshot.paramMap.get('habitat') || '';
    this.lista = await this.bibliotecaService.getPorBioma(this.habitat) || [];
  }

  ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
  }

  // siguiente() {
  //   if (this.paginaActual < this.paginasTotales) {
  //     this.listaAEntrar = this.listaPorBiomas[this.paginaActual]
  //     this.animando = true
  //     this.entrarSiguiente = true;
  //     setTimeout(() => {
  //       this.entrarSiguiente = false;
  //       this.paginaActual++;
  //       this.animando = false;
  //       this.lista = this.listaAEntrar;
  //       this.listaAEntrar = [];
  //     }, 1000);
  //   }
  // }

  // anterior() {
  //   if (this.paginaActual > 1) {
  //     this.listaAEntrar = this.listaPorBiomas[this.paginaActual - 2]
  //     this.animando =  true;
  //     this.entrarAnterior = true;
  //     setTimeout(() => {
  //       this.entrarAnterior = false;
  //       this.paginaActual--;
  //       this.animando = false;
  //       this.lista = this.listaAEntrar;
  //       this.listaAEntrar = [];
  //     }, 1000);
  //   }
  // }

}
