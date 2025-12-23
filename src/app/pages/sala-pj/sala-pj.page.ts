import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { ActivatedRoute } from '@angular/router';
import { PersonajeComponent } from 'src/app/components/personaje/personaje.component';
import { SalaPj, SalasPjService } from 'src/app/services/salas-pj/salas-pj.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { SalirComponent } from 'src/app/components/salir/salir.component';

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
    , PersonajeComponent
    , SalirComponent
  ]
})
export class SalaPjPage implements OnInit {
  sala = '';
  salaArray: SalaPj | null = null;

  coordsX: number[] = [0, 0, 0];
  coordsY: number[] = [0, 0, 0];

  constructor(
    private route: ActivatedRoute
    , private el: ElementRef
    , private salaPjService: SalasPjService
    , private musicaService: MusicaService
  ) { }

  async ngOnInit() {
    this.sala = this.route.snapshot.paramMap.get('sala') || '';
    this.salaArray = await this.salaPjService.getPorId(this.sala) || null;

    if (this.salaArray){
      for (let i = 0; i < this.salaArray.coords.length; i++) {
        this.coordsX[i] = this.salaArray.coords[i][0];
        this.coordsY[i] = this.salaArray.coords[i][1];
      }
    }
    
    this.el.nativeElement.style.setProperty('--coord-x1', this.coordsX[0] + '%');
    this.el.nativeElement.style.setProperty('--coord-x2', this.coordsX[1] + '%');
    this.el.nativeElement.style.setProperty('--coord-x3', this.coordsX[2] + '%');
    this.el.nativeElement.style.setProperty('--coord-y1', this.coordsY[0] + '%');
    this.el.nativeElement.style.setProperty('--coord-y2', this.coordsY[1] + '%');
    this.el.nativeElement.style.setProperty('--coord-y3', this.coordsY[2] + '%');
    this.el.nativeElement.style.setProperty('--scale1', this.salaArray?.scale[0]);
    this.el.nativeElement.style.setProperty('--scale2', this.salaArray?.scale[1]);
    this.el.nativeElement.style.setProperty('--scale3', this.salaArray?.scale[2]);
  }

  ionViewWillEnter() {
    this.musicaService.play('musica-pjs');
  }

}
