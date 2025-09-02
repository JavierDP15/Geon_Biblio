import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeonesService {
  private descubierto: Record<string, boolean> = {};

  constructor() {}

  setDescubierto(geon: string, valor: boolean) {
    this.descubierto[geon] = valor;
  }

  getDescubierto(geon: string): boolean {
    return this.descubierto[geon] ?? false;
  }

  resetDescubierto(geon: string) {
    delete this.descubierto[geon];
  }

  resetTodos() {
    this.descubierto = {};
  }
}
