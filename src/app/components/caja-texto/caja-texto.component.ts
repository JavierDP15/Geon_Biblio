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

  private intervalos: any[] = [];

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
    if (this.animando) {
      this.intervalos.forEach(i => clearInterval(i));
      this.intervalos = [];
      this.textoMostrado = this.paginas[this.paginaActual];
      this.animando = false;
      return;
    }

    this.intervalos.forEach(i => clearInterval(i));
    this.intervalos = [];
    this.textoMostrado = '';
    this.animando = true;

    const container = document.createElement('div');
    container.innerHTML = this.paginas[this.paginaActual];
    const nodes: Node[] = Array.from(container.childNodes);

    let htmlAcumulado = '';
    let i = 0;

    const siguienteNodo = () => {
      if (i < nodes.length) {
        animarNodo(nodes[i]);
        i++;
      } else {
        this.animando = false;
        this.intervalos = [];
      }
    };

    const animarNodo = (node: Node) => {
      if (!node) return siguienteNodo();

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        let j = 0;

        const intervalo = setInterval(() => {
          if (j < text.length) {
            htmlAcumulado += text[j];
            this.textoMostrado = htmlAcumulado;
            j++;
          } else {
            clearInterval(intervalo);
            this.intervalos = this.intervalos.filter(i => i !== intervalo);
            siguienteNodo();
          }
        }, this.velocidad);

        this.intervalos.push(intervalo);

      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as HTMLElement).tagName.toLowerCase();
        htmlAcumulado += `<${tag}>`;

        const hijos = Array.from(node.childNodes);
        let k = 0;

        const animarHijo = () => {
          if (k < hijos.length) {
            animarNodo(hijos[k]);
            k++;
          } else {
            htmlAcumulado += `</${tag}>`;
            this.textoMostrado = htmlAcumulado;
            siguienteNodo();
          }
        };

        animarHijo();

      } else {
        siguienteNodo();
      }
    };

    siguienteNodo();
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
      this.intervalos.forEach(i => clearInterval(i));
      this.intervalos = [];
      this.textoMostrado = this.paginas[this.paginaActual];
      this.animando = false;
    }
  }

  cerrarDialogo() {
    this.cerrar.emit();
  }
}
