import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/operators';

export interface SalaPj {
  id: string,
  nombre: string,
  personajes: string[],
  coords: [number, number][],
  scale: number[]
}

@Injectable({
  providedIn: 'root'
})
export class SalasPjService {
  private datos: SalaPj[] = [];
  private cargado$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    this.datos = await firstValueFrom(this.http.get<SalaPj[]>('assets/data/salas-pj.json'));
    this.cargado$.next(true);
  }

  async esperarDatos() {
    if (this.cargado$.value) return;
    await firstValueFrom(this.cargado$.asObservable().pipe(filter(v => v)));
  }

  async getAll() {
    await this.esperarDatos();
    return this.datos;
  }

  async getPorId(id: string): Promise<SalaPj | undefined> {
    await this.esperarDatos();
    return this.datos.find(item => item.id === id);
  }
}
