import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { SalasPjService } from 'src/app/services/salas-pj/salas-pj.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.page.html',
  styleUrls: ['./personaje.page.scss'],
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
  ]
})
export class PersonajePage implements OnInit {
  personaje = '';
  atras = '';

  entrada: Entrada | null = null;

  constructor(
    private route: ActivatedRoute
    , private bibliotecaService: BibliotecaService
    , private musicaService: MusicaService
  ) { }

  async ngOnInit() {
    this.personaje = this.route.snapshot.paramMap.get('personaje') || '';
    this.entrada = await this.bibliotecaService.getPorId(this.personaje) || null;
    this.atras = 'sala-pj/' + this.entrada?.otrosDatos.padre;
  }

  ionViewWillEnter() {
    this.musicaService.play('musica-pjs');
  }

}
