import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';

export interface Ayuda {
  pagina: string;
  numero: number;
  paso: number;
  nombre: string;
  foto: string;
  texto: string;
}

@Injectable({
  providedIn: 'root'
})

export class AyudaService {
  private ayudas: Ayuda[] = [];
  private storageReady = false;

  constructor (
    private storage: Storage
    , private http: HttpClient
  ) {
    this.init();
  };

  async init() {
    await this.storage.create();
    this.storageReady = true;
    this.ayudas = await firstValueFrom(this.http.get<Ayuda[]>('assets/data/ayuda.json'));
  };

  async ready() {
    if (!this.storageReady) {
      await this.init();
    }
  };

  async getAyudas(pagina: string): Promise<Ayuda[] | null> {
    await this.ready();

    return this.ayudas.filter(a => a.pagina === pagina) || null;
  };

  async getAyudaRandom(pagina: string): Promise<Ayuda[] | null> {
    await this.ready();

    const ayudasPagina = this.ayudas.filter(a => a.pagina === pagina);
    if (!ayudasPagina.length) return null;

    const agrupadas: Record<number, Ayuda[]> = {};
    for (const ayuda of ayudasPagina) {
      if (!agrupadas[ayuda.numero]) {
        agrupadas[ayuda.numero] = [];
      }
      agrupadas[ayuda.numero].push(ayuda);
    }

    const numeros = Object.keys(agrupadas).map(n => parseInt(n, 10));

    const randomNumero = numeros[Math.floor(Math.random() * numeros.length)];

    return agrupadas[randomNumero].sort((a, b) => a.paso - b.paso);
  }

  async setVisto(numero: number, pagina: string) {
    const clave = `ayuda_${pagina}_${numero}`;
    const yaVisto = await this.storage.get(clave);

    if (!yaVisto) {
      await this.storage.set(clave, true);
    }
  };

  async resetTodas() {
    await this.ready();
    const keys = await this.storage.keys();
    const keysToRemove = keys.filter(k => k.startsWith(`ayuda`));
    for (const key of keysToRemove) {
      await this.storage.remove(key);
    }
  }
}
