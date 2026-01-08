import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { InmortalComponentComponent } from 'src/app/components/inmortal-component/inmortal-component.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inmortales',
  templateUrl: './inmortales.page.html',
  styleUrls: ['./inmortales.page.scss'],
  standalone: true,
  imports: [
    IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , AtrasComponent
    , AyudaComponent
    , MusicaComponent
    , InmortalComponentComponent
  ]
})
export class InmortalesPage implements OnInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  mostrarVideo = false;
  categoria: string = '';
  animacion = false;

  constructor(
    private musicaService: MusicaService
    , private router: Router
  ) { }

  ngOnInit() {
  }

  irA(categoria: string) {
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.categoria = categoria;
    this.mostrarVideo = true;
    setTimeout(() => {
      this.animacion = true;
    }, 3500);
  }

  saltarVideo() {
    this.mostrarVideo = false;
    this.resetVideo(this.video.nativeElement);
    this.animacion = false;
    this.router.navigate(['/inmortales', this.categoria]);
  }

  onTimeUpdate() {
    const video = this.video.nativeElement;

    if (
      video.duration &&
      video.currentTime >= video.duration -2 &&
      !this.animacion
    ) {
      this.animacion = true;
    }
  }

  onVideoEnded() {
    this.mostrarVideo = false;
    this.resetVideo(this.video.nativeElement);
    setTimeout(() => {
      this.animacion = false;
      this.router.navigate(['/inmortales', this.categoria]);
    }, 1000)
  }

  private resetVideo(video: HTMLVideoElement) {
    if(!video) return;
    video.pause();
    video.currentTime = 0;
    video.load();
  }
}
