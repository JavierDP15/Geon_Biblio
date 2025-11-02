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

  showVideo1 = true;
  showVideo2 = false;
  
  showStartButton = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private audioService: AudioService,
    private geonesService: GeonesService
  ) { }

  async ngOnInit() {
    this.geonesService.resetTodos();
    if (this.platform.is('ios')) {
      this.showStartButton = true;
    } else {
      this.startIntro();
    }
  }

  startIntro() {
    this.showStartButton = false;
    this.showVideo1 = true;
  }

  onVideoEnded() {
    if(this.showVideo1) {
      this.showVideo1 = false;
      this.showVideo2 = true;
    } else {
      this.showVideo2 = false;
      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 2000)
    }
  }
}
