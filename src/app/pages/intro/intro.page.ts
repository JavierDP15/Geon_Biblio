import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen'
import { Howl } from 'howler';
import { Platform } from '@ionic/angular'
import { AudioService } from 'src/app/services/audio/audio.service';
import { GeonesService } from 'src/app/services/geones/geones.service';
import { Capacitor } from '@capacitor/core';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  @ViewChild('video1') introVideo1!: ElementRef<HTMLVideoElement>;
  @ViewChild('video2') introVideo2!: ElementRef<HTMLVideoElement>;

  showVideo1 = false;
  showVideo2 = false;
  
  showStartButton = true;

  constructor(
    private router: Router,
    private platform: Platform,
    private audioService: AudioService,
    private musicaService: MusicaService,
    private geonesService: GeonesService
  ) { }

  async ngOnInit() {
    this.geonesService.resetTodos();

    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() === 'ios') {
      this.showStartButton = true;
    } else {
      this.showVideo1 = true;
      this.startIntro();
    }
  }

  comprobarVideo(video: HTMLVideoElement) {
    if (!this.musicaService.getSilenciado()) {
      return
    } else {
      video.muted = true;
    }
  }

  startIntro() {
    this.showStartButton = false;
    setTimeout(() => {
      this.showVideo1 = true;
    }, 5)
  }

  onVideoEnded() {
    if (this.showVideo1) {
      this.showVideo1 = false;
      this.showVideo2 = true;
    } else {
      this.showVideo2 = false;
        this.router.navigate(['/inicio']);
    }
  }
}
