import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';

export interface Tutorial {
  pagina: string;
  titulo: string;
  mensaje: string;
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
    this.tutoriales = await firstValueFrom(this.http.get<Tutorial[]>('assets/data/toturiales.json'));
  }

  async mostrarTutorial(pagina: string): Promise<Tutorial | null> {
    if (!this.storageReady) return null;

    const yaVisto = await this.storage.get(`tutorial_${pagina}`);
    if (!yaVisto) {
      await this.storage.set(`tutorial_${pagina}`, true);
      return this.tutoriales.find(t => t.pagina === pagina) || null;
    }
    return null;
  }
}
