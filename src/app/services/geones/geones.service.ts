import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeonesService {
  private descubierto: Record<string, boolean> = {};
  private storageKey = 'geones_descubiertos';

  constructor() {
    this.cargarDeStorage();
  }

  private guardarEnStorage() {
    try {
      localStorage.setItem(this.storageKey,JSON.stringify(this.descubierto));
    } catch (err) {
      console.error('Error guardando en localStorage', err);
    }
  }

  private cargarDeStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.descubierto = JSON.parse(data);
      }
    } catch (err) {
      console.error('Error leyendo de localStorage', err);
      this.descubierto = {};
    }
  }

  setDescubierto(geon: string, valor: boolean) {
    this.descubierto[geon] = valor;
    this.guardarEnStorage();
  }

  getDescubierto(geon: string): boolean {
    return this.descubierto[geon] ?? false;
  }

  resetDescubierto(geon: string) {
    delete this.descubierto[geon];
    this.guardarEnStorage();
  }

  resetTodos() {
    this.descubierto = {};
    this.guardarEnStorage();
  }
}
