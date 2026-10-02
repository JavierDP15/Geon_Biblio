import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaPj, SalasPjService } from 'src/app/services/salas-pj/salas-pj.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { SalirComponent } from 'src/app/components/salir/salir.component';
import imageMapResize from 'image-map-resizer';

@Component({
  selector: 'app-sala-pj',
  templateUrl: './sala-pj.page.html',
  styleUrls: ['./sala-pj.page.scss'],
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
    , SalirComponent
  ]
})
export class SalaPjPage implements OnInit {
  sala = '';
  salaArray: SalaPj | null = null;
  mapaInicializado = false;

  constructor(
    private route: ActivatedRoute
    , private el: ElementRef
    , private salaPjService: SalasPjService
    , private musicaService: MusicaService
    , private router: Router
  ) { }

  async ngOnInit() {
    this.sala = this.route.snapshot.paramMap.get('sala') || '';
    this.salaArray = await this.salaPjService.getPorId(this.sala) || null;
  }
  
  ionViewWillEnter() {
    this.musicaService.play('musica-pjs');
  }
  
  ionViewDidEnter() {
    console.log('Mapa iniciado: ', this.mapaInicializado);
    this.mapaInicializado = true
    console.log('DidEnter1');
    this.inicializarMapa();
  }

  ionViewDidLeave() {
    this.mapaInicializado = false
    console.log('DidLeave1');
  }
  
  inicializarMapa() {
    console.log('Inicializando mapa');
      setTimeout(() => {
        const area = document.querySelector('area');

        console.log(this.salaArray?.coords);

        console.log('ANTES: ', area?.getAttribute('coords'));

        imageMapResize();

        console.log('DESPUES: ', area?.getAttribute('coords'));
        }, 50);
    }

  irA(personaje: string) {
    this.router.navigate(['/personaje', personaje]);
  }
}
