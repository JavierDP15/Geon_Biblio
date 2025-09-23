import { Injectable } from '@angular/core';

interface EstadoFerhel {
  descubierto: boolean;
  nuevo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FerhelesService {
  private estados: Record<string, EstadoFerhel> = {};
  private storageKey = 'ferheles_descubiertos';

  constructor() {
    this.cargarDeStorage();
  }

  private guardarEnStorage() {
    try {
      localStorage.setItem(this.storageKey,JSON.stringify(this.estados));
    } catch (err) {
      console.error('Error guardando en localStorage', err);
    }
  }

  private cargarDeStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.estados = JSON.parse(data);
      }
    } catch (err) {
      console.error('Error leyendo de localStorage', err);
      this.estados = {};
    }
  }

  setDescubierto(ferhel: string, valor: boolean) {
      const actual = this.estados[ferhel] ?? { descubierto: false, nuevo: false };

      if (!actual.descubierto && valor) {
        actual.nuevo = true;
      }

      actual.descubierto = valor;
      this.estados[ferhel] = actual;
      // this.estados[ferhel].descubierto = valor;
      this.guardarEnStorage();
  }

  getDescubierto(ferhel: string): boolean {
    return this.estados[ferhel]?.descubierto ?? false;
  }

  getNuevo(ferhel: string):boolean {
    return this.estados[ferhel]?.nuevo ?? false;
  }

  getYMarcaNuevo(ferhel: string): boolean {
    const estado = this.estados[ferhel];
    if (!estado) return false;

    const eraNuevo = estado.nuevo;
    if (eraNuevo) {
      estado.nuevo = false
      this.guardarEnStorage();
    }
    return eraNuevo;
  }

  resetDescubierto(ferhel: string) {
    delete this.estados[ferhel];
    this.guardarEnStorage();
  }

  resetTodos() {
    this.estados = {};
    this.guardarEnStorage();
  }
}
