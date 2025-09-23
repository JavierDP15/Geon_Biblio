import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators'
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

export interface Entrada {
  id: string;
  nombre: string;
  url: string;
  categoria: string;
  descripcion: string;
  otrosDatos: {
    padre: string,
    subtitulo: string,
    imagen: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private datos: Entrada[] = [];
  private cargado$ = new BehaviorSubject<boolean>(false);

  constructor (private http: HttpClient) {
    this.inicializarDatos();
  }

  private async inicializarDatos() {
    const data = await firstValueFrom(this.http.get<Entrada[]>('assets/data/biblioteca.json'));
    this.datos = data;
    this.cargado$.next(true);
  }

  async esperarDatos() {
    if (this.cargado$.value) return;
    await firstValueFrom(this.cargado$.asObservable().pipe(filter(v => v)));
  }

  cargarDatos(): Observable<Entrada[]> {
    if (this.datos.length > 0) {
      return new Observable(obs => {
        obs.next(this.datos);
        obs.complete();
      });
    }

    return this.http.get<Entrada[]>('assets/data/biblioteca.json').pipe(
      map(data => {
        this.datos = data;
        return this.datos;
      })
    );
  }

  buscar(termino: string): Entrada[] {
    termino = termino.toLowerCase();
    return this.datos.filter(item => 
      item.id.toLowerCase().includes(termino)
      || item.descripcion.toLowerCase().includes(termino)
    );
  }

  // filtrarPorCategoria(categoria: string): Entrada[] {
  //   return this.datos.filter(item => item.categoria === categoria);
  // }

  async getPorId(id: string): Promise<Entrada | undefined> {
    await this.esperarDatos();
    return this.datos.find(item => item.id === id);
  }

  async getPorPadre(padre: string): Promise<Entrada[] | null> {
    await this.esperarDatos();

    return this.datos.filter(p => p.otrosDatos.padre === padre) || null;
  }

  async getPorCategoria(categoria: string): Promise<Entrada[] | null> {
    await this.esperarDatos();

    return this.datos.filter(c => c.categoria === categoria) || null;
  }
}
