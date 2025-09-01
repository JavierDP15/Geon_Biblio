import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { StatusBar, Style } from '@capacitor/status-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MusicaService } from './services/musica/musica.service';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, 
    IonRouterOutlet,
    ReactiveFormsModule
  ],
})
export class AppComponent {
  constructor(
    private musicaService: MusicaService,
    private platform: Platform
  ) {
    this.bloquearHorizontal();
    StatusBar.hide();

    if(this.platform.is('android')) {
      this.musicaService.initPista('honor-and-sword');
      this.musicaService.initPista('caves-of-dawn');
    } else {
      document.addEventListener('click', () => {
        this.musicaService.initPista('honor-and-sword');
        this.musicaService.initPista('caves-of-dawn');
      }, {once: true});
    }
  }

  async bloquearHorizontal() {
    await ScreenOrientation.lock({ orientation: 'landscape' })
  }

  ngOnInit() {
    App.addListener('pause', () => {
      this.musicaService.pauseTodas();
    });

    App.addListener('resume', () => {
      if (this.musicaService.getPistaActual()) {
        this.musicaService.play(this.musicaService.getPistaActual());
      }
    })
  }
}
