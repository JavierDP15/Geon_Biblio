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
      this.musicaService.initPista('desert-storm');
    } else {
      document.addEventListener('click', () => {
        this.musicaService.initPista('honor-and-sword');
        this.musicaService.initPista('caves-of-dawn');
        this.musicaService.initPista('desert-storm');
      }, {once: true});
    }

    this.precargarImagen('assets/fondos/fondo_categoria.jpg');
  }

  precargarImagen(src: string) {
    const img = new Image();
    img.src = src;
  }

  async bloquearHorizontal() {
    await ScreenOrientation.lock({ orientation: 'landscape' })
  }

  ngOnInit() {
    App.addListener('pause', () => {
      this.musicaService.pauseTodas();
    });

    App.addListener('resume', () => {
      const actual = this.musicaService.getPistaActual();
      if (actual) {
        const howl = this.musicaService.getHowl(actual);
        if (howl && !howl.playing()) {
          howl.play();
        }
      }
    })
  }
}
