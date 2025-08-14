import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AudioService } from 'src/app/services/audio/audio.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InicioPage implements OnInit {

  @ViewChild('video1') video1!: ElementRef<HTMLVideoElement>;

  currentStep = 1;
  mostrarMenu= false;
  sonido = true;

  musica!: Howl;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.musica = new Howl({
      src: ['assets/audios/honor-and-sword.mp3'],
      volume: 1,
      loop: true
    });

    setTimeout(() => {
      this.video1.nativeElement.play();
      this.musica.play();
    }, 100);
  }

  onVideo1Ended() {
    if (this.currentStep !== 1) return;
    this.currentStep = 2;
    this.mostrarMenu = true;
  }

  cambiarSonido() {
    this.sonido = !this.sonido;
    this.musica.volume(this.sonido ? 1 : 0);
  }

  saltarVideo() {
    this.video1.nativeElement.pause();
    this.video1.nativeElement.currentTime = 0;
    this.currentStep = 2;
    this.mostrarMenu = true;
  }
}
