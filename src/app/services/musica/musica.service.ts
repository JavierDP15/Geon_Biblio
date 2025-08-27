import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private musica: Howl | null = null;

  // constructor() {
  //   this.musica = new Howl({
  //     src: ['assets/audios/honor-and-sword.mp3'],
  //     loop: true,
  //     volume: 1
  //   });
  // }

  init() {
    if (!this.musica) {
      this.musica = new Howl({
        src: ['assets/audios/honor-and-sword.mp3'],
        loop: true,
        volume: 1
      });
    }
  }

  play() {
    this.musica?.play();
  }

  stop() {
    this.musica?.stop();
  }

  pause() {
    this.musica?.pause();
  }

  setVolumen(volumen: number) {
    this.musica?.volume(volumen);
  }

  getVolumen(): number {
    return this.musica ? this.musica.volume() : 0;
  }

  reproducirSonido(ruta: string, volumen: number = 1.2) {
    const sonido = new Howl({
      src: [ruta],
      volume: volumen
    });
    sonido.play();
  }
}
