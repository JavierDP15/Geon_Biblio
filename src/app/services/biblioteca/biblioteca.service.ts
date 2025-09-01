import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators'
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

export interface Entrada {
  nombre: string;
  categoria: string;
  descripcion: string;
  otrosDatos?: any;
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
      item.nombre.toLowerCase().includes(termino)
      || item.descripcion.toLowerCase().includes(termino)
    );
  }

  filtrarPorCategoria(categoria: string): Entrada[] {
    return this.datos.filter(item => item.categoria === categoria);
  }

  async getPorNombre(nombre: string): Promise<Entrada | undefined> {
    await this.esperarDatos();
    return this.datos.find(item => item.nombre === nombre);
  }
}
