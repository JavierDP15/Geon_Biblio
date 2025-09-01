import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

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

  constructor(
    private bibliotecaService: BibliotecaService
    , private musicaService: MusicaService
  ) { }

  async ngOnInit() {
    this.geones = await this.bibliotecaService.getPorNombre('Geones') ?? null;
  }

  ionViewWillEnter() {
    if (!this.musicaService.getSilenciado()) {
      this.musicaService.play('caves-of-dawn');
    }
  }

  toggleBotones() {
    this.botonesVisibles = !this.botonesVisibles;
  }

}
