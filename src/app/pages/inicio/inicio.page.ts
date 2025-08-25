import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Howl } from 'howler';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MusicaComponent]
})
export class InicioPage implements OnInit {

  @ViewChild('video1') video1!: ElementRef<HTMLVideoElement>;

  currentStep = 1;
  mostrarMenu = false;
  sonido = true;
  desvanecer = false;

  // musica!: Howl;

  constructor(
    private musicaService: MusicaService
    , private router: Router
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.video1.nativeElement.play();
      this.musicaService.play();
    }, 100);
  }

  onVideo1Ended() {
    if (this.currentStep !== 1) return;
    this.currentStep = 2;
    this.mostrarMenu = true;
  }

  saltarVideo() {
    this.video1.nativeElement.pause();
    this.video1.nativeElement.currentTime = 0;
    this.currentStep = 2;
    this.mostrarMenu = true;
  }

  toArchivo() {
    this.desvanecer = true;
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3')
    setTimeout(() => {
      this.router.navigate(['/archivo']);
    }, 1000);
  }
}
