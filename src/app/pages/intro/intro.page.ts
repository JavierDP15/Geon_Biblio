import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen'
import { Howl } from 'howler';
import { Platform } from '@ionic/angular'
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  @ViewChild('video1') introVideo1!: ElementRef<HTMLVideoElement>;

  showVideo1 = true;
  
  musica1!: Howl;
  
  showStartButton = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private audioService: AudioService
  ) { }

  async ngOnInit() {
    if (this.platform.is('ios')) {
      this.showStartButton = true;
    } else {
      this.startIntro();
    }

    this.musica1 = new Howl ({
      src: ['assets/audios/magical-twinkle.mp3'],
      volume: 1
    });
  }

  startIntro() {
    this.showStartButton = false;
    this.showVideo1 = true;

    setTimeout(() => {
      this.introVideo1.nativeElement.play();
      this.musica1.play();
    }, 100);
  }

  onVideoEnded() {
    this.musica1.stop();
    this.router.navigate(['/inicio']);
  }
}
