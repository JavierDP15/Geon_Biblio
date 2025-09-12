import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { Router } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-geografia',
  templateUrl: './geografia.page.html',
  styleUrls: ['./geografia.page.scss'],
  standalone: true,
  imports: [IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , MusicaComponent
    , AyudaComponent
    , AtrasComponent
  ]
})
export class GeografiaPage implements OnInit {
  entrada: Entrada | null = null;

  constructor(
    private route: Router
    , private bibliotecaService: BibliotecaService
    , private musicaService: MusicaService
  ) { }

  async ngOnInit() {
    this.entrada = await this.bibliotecaService.getPorId('geografia') ?? null;
  }

  irA() {
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.route.navigate(['/territorios']);
  }

}
