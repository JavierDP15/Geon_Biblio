import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  standalone: true,
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
  ]
})
export class BuscadorComponent  implements OnInit {
  resultados: Entrada[] = [];
  termino = '';
  abierto = false
  cerrando = false;

  constructor(
    private bibliotecaService: BibliotecaService
    , private router: Router
  ) { }

  ngOnInit() {
    this.resultados = [];
  }

  async toggle() {
    if (!this.abierto) {
      this.abierto = !this.abierto;
    } else {
      this.cerrando = true;
      this.resultados = [];
      setTimeout(() => {
        this.abierto = !this.abierto;
        this.cerrando = false;
      }, 350);
    }

    if (this.abierto) {
      await this.bibliotecaService.esperarDatos();
    } else {
      this.termino = '';
      this.resultados = [];
    }
  }

  buscar(event: any) {
    const texto = (event.target as HTMLInputElement).value;
    if (texto.length > 0) {
      this.resultados = this.bibliotecaService.buscar(texto);
    } else {
      this.resultados = [];
    }
  }

  elegir(item: Entrada) {
    this.toggle();
    if (item.categoria != 'lugar')
    {
      this.router.navigate(['/' + item.url]);
    } else {
      this.router.navigate(['/' + item.url], { state: {lugarId: item.id} });
    }
  }

  calcularAltura(n: number): number {
    const alturaPorItem = 40;
    const alturaBase = 80;
    const alturaMax = 400;

    return Math.min(alturaBase + n * alturaPorItem, alturaMax);
  }
}
