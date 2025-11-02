import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { Router } from '@angular/router';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { FerhelComponentComponent } from 'src/app/components/ferhel-component/ferhel-component.component';
import { FerhelesService } from 'src/app/services/ferheles/ferheles.service';
import { RuedaBiomasComponent } from 'src/app/components/rueda-biomas/rueda-biomas.component';

@Component({
  selector: 'app-ferhel',
  templateUrl: './ferhel.page.html',
  styleUrls: ['./ferhel.page.scss'],
  standalone: true,
  imports: [
    CommonModule
    , IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , FormsModule
    , AtrasComponent
    , AyudaComponent
    , MusicaComponent
    , FerhelComponentComponent
    , RuedaBiomasComponent
  ]
})
export class FerhelPage implements OnInit {
  @ViewChild('videoCatalejo') videoCatalejo!: ElementRef<HTMLVideoElement>;

  entrada: Entrada | null = null;

  mostrarVideo = false;
  biomas = false;

  constructor(
    private bibliotecaService: BibliotecaService
    , private route: Router
    , private musicaService: MusicaService
    , private ferhelService: FerhelesService
  ) { }

  async ngOnInit() {
    this.entrada = await this.bibliotecaService.getPorId('ferhel') ?? null;
    this.mostrarVideo = false;
  }

  ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
    this.mostrarVideo = false;
    this.biomas = false;
  }

  irAObservar() {
    this.mostrarVideo = true;
    const video = this.videoCatalejo.nativeElement;
    video.currentTime = 0;
    video.muted = true;
    video.playsInline = true;
    video.play();
  }

  mostrarBiomas() {
    if (!this.biomas) {
      this.biomas = true;
    }
  }
  
  onVideoCatalejoEnd() {
    this.route.navigate(['/ferhel/observar-ferhel']);
  }

  cerrarRueda() {
    this.biomas = false;
  }

}
