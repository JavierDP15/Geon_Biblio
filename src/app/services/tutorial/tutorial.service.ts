import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';

export interface Tutorial {
  pagina: string;
  paso: number,
  mensaje: string;
  otrosDatos: {
    foto: string,
    nombre: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private tutoriales: Tutorial[] = [];
  private storageReady = false;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageReady = true;
    this.tutoriales = await firstValueFrom(this.http.get<Tutorial[]>('assets/data/tutoriales.json'));
  }

  async ready() {
    if (!this.storageReady) {
      await this.init();
    }
  }

  async mostrarTutorial(pagina: string, numero: number): Promise<Tutorial | null> {
    await this.ready();

    const clave = `tutorial_${pagina}_${numero}`;
    const yaVisto = await this.storage.get(clave);
    if (!yaVisto) {
      await this.storage.set(clave, true);
      return this.tutoriales.find(t => t.pagina === pagina && t.paso === numero) || null;
    }
    return null;
  }

  async resetTutorial(pagina: string) {
    await this.storage.remove(`tutorial_${pagina}`);
  }

  async resetTodos() {
    await this.storage.clear();
  }
}
