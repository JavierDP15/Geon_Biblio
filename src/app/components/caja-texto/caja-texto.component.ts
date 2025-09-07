import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ayuda } from 'src/app/services/ayuda/ayuda.service';
import { Tutorial } from 'src/app/services/tutorial/tutorial.service';

@Component({
  selector: 'app-caja-texto',
  templateUrl: './caja-texto.component.html',
  styleUrls: ['./caja-texto.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CajaTextoComponent  implements OnInit {
  @Input() entrada: Tutorial | Ayuda | null = null;
  @Output() cerrar = new EventEmitter<void>();

  paginas: string[] = [];
  paginaActual = 0;

  textoMostrado = '';
  velocidad = 30;
  animando = false;

  private intervalo: any;

  constructor() { }

  ngOnInit() {
    if (this.entrada?.texto) {
      this.paginarTexto(this.entrada.texto, 200);
      this.mostrarConAnimacion();
    }
  }

  private paginarTexto(texto: string, charsPorPagina: number) {
    this.paginas = [];
    for (let i = 0; i < texto.length; i += charsPorPagina) {
      this.paginas.push(texto.substring(i, i +charsPorPagina));
    }
  }

  private mostrarConAnimacion() {
    this.textoMostrado = '';
    clearInterval(this.intervalo);

    const texto =this.paginas[this.paginaActual];
    let i = 0;

    this.animando = true;

    this.intervalo = setInterval(() => {
      if (i < texto.length) {
        this.textoMostrado += texto[i];
        i++;
      } else {
        clearInterval(this.intervalo);
        this.animando = false;
      }
    }, this.velocidad);
  }

  siguiente() {
    if (!this.animando){
      if (this.paginaActual < this.paginas.length - 1) {
        this.paginaActual++;
        this.mostrarConAnimacion();
      } else {
        this.cerrarDialogo();
      }
    } else {
      clearInterval(this.intervalo);
      this.textoMostrado = this.paginas[this.paginaActual];
      this.animando = false;
    }
  }

  cerrarDialogo() {
    this.cerrar.emit();
  }
}
