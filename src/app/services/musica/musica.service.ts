import { Injectable } from '@angular/core';
import { Howl } from 'howler';

export interface Pista {
  nombre: string;
  howl: Howl;
  loop?: boolean;
  volumen?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private pistas: Record<string, Pista> = {};
  private pistaActual: string | null = null;
  private volumenGlobal: number = 0.5;
  private silenciado: boolean = false;

  constructor() {
    const guardado = localStorage.getItem('musicaSilenciada');

    if (guardado === null) {
      localStorage.setItem('musicaSilenciada', 'false');
      this.silenciado = false;
    } else {
      this.silenciado = guardado === 'true';
    }
  }

  initPista(nombre: string, loop: boolean = true, volumen: number = this.volumenGlobal) {
    if (!this.pistas[nombre]) {
      this.pistas[nombre] = {
        nombre,
        howl: new Howl({
          src: [`assets/audios/${nombre}.mp3`],
          loop,
          volume: volumen
        }),
        loop,
        volumen
      };
    }
  }

  play(nombre: string, loop: boolean = true, volumen: number = this.volumenGlobal) {
    if (this.pistaActual === nombre) return;

    this.initPista(nombre, loop, volumen);

    if (this.pistaActual) {
      this.stop(this.pistaActual);
    }

    this.pistaActual = nombre;

    const volumFinal = this.silenciado ? 0 : volumen;
    this.pistas[nombre].howl.volume(volumFinal)
    this.pistas[nombre].howl.play();
  }

  pause(nombre?: string) {
    const pista = nombre ? this.pistas[nombre] : this.pistaActual ? this.pistas[this.pistaActual] : null;
    pista?.howl.pause();
  }

  stop(nombre?: string) {
    const pista = nombre ? this.pistas[nombre] : this.pistaActual ? this.pistas[this.pistaActual] : null;
    pista?.howl.stop();
    if (nombre === this.pistaActual) this.pistaActual = null;
  }


  setVolumen(volumen: number, nombre?: string) {
    if (nombre && this.pistas[nombre]) {
      this.pistas[nombre].howl.volume(volumen);
      this.pistas[nombre].volumen = volumen;
    } else if (this.pistaActual) {
      this.pistas[this.pistaActual].howl.volume(volumen);
      this.pistas[this.pistaActual].volumen;
    }
  }

  getVolumen(nombre?: string): number {
    if (nombre && this.pistas[nombre]) return this.pistas[nombre].howl.volume();
    if (this.pistaActual) return this.pistas[this.pistaActual].howl.volume();
    return 0;
  }

  reproducirSonido(ruta: string, volumen: number = 1.2) {
    if (this.silenciado) return;
    const sonido = new Howl({
      src: [ruta],
      volume: volumen
    });
    sonido.play();
  }

  reproducirAmbiente(nombre: string, volumen: number = 0.9) {
    if (!this.pistas[nombre]) {
      this.initPista(nombre, true, volumen);
    }
    this.pistas[nombre].howl.volume(this.silenciado ? 0 : volumen);
    this.pistas[nombre].howl.play();
  }

  pauseTodas() {
    Object.values(this.pistas).forEach(p => p.howl.pause());
  }

  stopTodas() {
    Object.values(this.pistas).forEach(p => p.howl.stop());
    this.pistaActual = null;
  }

  getPistaActual() {
    if (this.pistaActual) {
      return this.pistaActual;
    } else {
      return '';
    }
  }

  getVolumenGlobal() {
    return this.volumenGlobal;
  }

  getSilenciado(): boolean {
    return !!this.silenciado;
  }

  getHowl(nombre: string) {
    return this.pistas[nombre]?.howl ?? null;
  }

  cambiarSilenciado() {
    this.silenciado = !this.silenciado;
    localStorage.setItem('musicaSilenciada', String(this.silenciado));

    // if (this.pistaActual) {
    //   this.setVolumen(this.silenciado ? 0 : this.pistas[this.pistaActual].volumen ?? this.volumenGlobal, this.pistaActual)
    // }

    Object.values(this.pistas).forEach(pista => {
      const volumenFinal = this.silenciado ? 0 : (pista.volumen ?? this.volumenGlobal);
      pista.howl.volume(volumenFinal);
    })
  }

  fadeOut(duracion: number, nombre: string) {
    const pista = nombre ? this.pistas[nombre] : this.pistaActual ? this.pistas[this.pistaActual] : null;
    if (pista && pista.howl.playing()) {
      const volumenActual = pista.howl.volume();
      pista.howl.fade(volumenActual, 0, duracion);
      setTimeout(() => pista.howl.pause(), duracion);
    }
  }

  fadeIn(duracion: number, nombre: string) {
    const pista = nombre ? this.pistas[nombre] : this.pistaActual ? this.pistas[this.pistaActual] : null;
    if (pista) {
      const volumenObjetivo = this.silenciado ? 0 : (pista.volumen ?? this.volumenGlobal);
      pista.howl.volume(0);
      pista.howl.play();
      pista.howl.fade(0, volumenObjetivo, duracion);
    }
  }
}
