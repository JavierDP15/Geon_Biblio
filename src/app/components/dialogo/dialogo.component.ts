import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ayuda } from 'src/app/services/ayuda/ayuda.service';
import { Tutorial, TutorialService } from 'src/app/services/tutorial/tutorial.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./dialogo.component.scss'],
})
export class DialogoComponent  implements OnInit {
  @Input() pagina: string = '';
  @Input() entrada: Tutorial | Ayuda | null = null;
  @Output() cerrar = new EventEmitter<void>();

  paginas: string[] = [];
  paginaActual = 0;

  textoMostrado = '';
  velocidad = 30;
  animando = false;

  private intervalos: any [] = [];
  // private intervalo: any;

  constructor() { }

  async ngOnInit() {
    if (this.entrada?.texto) {
      this.paginarTexto(this.entrada.texto, 220);
      this.mostrarConAnimacion();
    }
  }

  private paginarTexto(texto: string, charsPorPagina: number) {
  this.paginas = [];
  let i = 0;

  while (i < texto.length) {
    let fin = i + charsPorPagina;

    if (fin < texto.length) {
      while (fin > i && texto[fin] !== ' ' && texto[fin] !== '\n') {
        fin--;
      }
    }

    if (fin === i) {
      fin = i + charsPorPagina;
    }

    this.paginas.push(texto.substring(i, fin).trim());
    i = fin;
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
