import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { SalasPjComponent } from 'src/app/components/salas-pj/salas-pj.component';
import { Router } from '@angular/router';
import { SalaPj, SalasPjService } from 'src/app/services/salas-pj/salas-pj.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  styleUrls: ['./personajes.page.scss'],
  standalone: true,
  imports: [IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , AtrasComponent
    , MusicaComponent
    , AyudaComponent
    , SalasPjComponent
  ]
})
export class PersonajesPage implements OnInit {
  salas: SalaPj[] = [];

  constructor(
    private router: Router
    , private salasPjService: SalasPjService
    , private musicaService: MusicaService
  ) { }

  async ngOnInit() {
    this.salas = await this.salasPjService.getAll();
  }

  ionViewWillEnter() {
    this.musicaService.play('musica-pjs');
  }

  irA(sala: string) {
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.router.navigate(['/sala-pj', sala])
  }

}
