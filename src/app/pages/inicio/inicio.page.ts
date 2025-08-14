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
  @ViewChild('video2') video2!: ElementRef<HTMLVideoElement>;

  currentStep = 1;

  showVideo1 = true;
  showVideo2 = false;
  showImage = false;
  mostrarMenu= false;
  sonido = true;

  musica!: Howl;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.musica = new Howl({
      src: ['assets/audios/honor-and-sword.mp3'],
      volume: 1
    });

    setTimeout(() => {
      this.video1.nativeElement.play();
      this.musica.play();
    }, 100);
  }

  onVideo1Ended() {
    this.currentStep = 2;

    setTimeout(() => {
      this.video2.nativeElement.play();
    }, 100);
  }

  onVideo2Ended() {
    this.currentStep = 3;
    this.mostrarMenu = true;
  }

  cambiarSonido() {
    if (this.sonido === true) {
      this.musica.volume(0);
      this.sonido = false;
    } else {
      this.musica.volume(1);
      this.sonido = true;
    }
  }

  // saltar() {
  //   this.currentStep = 3;
  //   this.mostrarMenu = true;
  //   this.video1.nativeElement.pause();
  //   this.video1.nativeElement.currentTime = 0;
  // }
}
