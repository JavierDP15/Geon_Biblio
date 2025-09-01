import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoPaginasService {
  
  private estados: Record<string, boolean> = {};

  constructor() {}

  setEntrado(pagina: string, valor: boolean) {
    this.estados[pagina] = valor;
  }

  getEntrado(pagina: string): boolean {
    return this.estados[pagina] ?? false;
  }

  resetPagina(pagina: string) {
    delete this.estados[pagina];
  }

  resetTodos() {
    this.estados = {};
  }
}
