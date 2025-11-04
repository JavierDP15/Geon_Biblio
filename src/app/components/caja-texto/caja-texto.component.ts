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
  @Input() pagina: string = '';
  @Input() entrada: Tutorial | Ayuda | null = null;
  @Input() arriba: boolean = false;
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
  if (!texto) return;

  const container = document.createElement('div');
  container.innerHTML = texto;

  const pages: string[] = [];
  let currentPage = document.createElement('div');
  let currentCount = 0;

  // Pila de nodos originales (ancestros) y clones en la página actual
  const originalStack: Element[] = [];
  let cloneStack: Element[] = [];

  const appendTextToCurrent = (t: string) => {
    if (!t) return;
    const node = document.createTextNode(t);
    if (cloneStack.length) {
      cloneStack[cloneStack.length - 1].appendChild(node);
    } else {
      currentPage.appendChild(node);
    }
  };

  const pushPageAndReopen = () => {
    // Guardar página actual
    pages.push(currentPage.innerHTML);
    // Nueva página en blanco
    currentPage = document.createElement('div');
    // Reconstruir clones de la pila de ancestros para la nueva página
    cloneStack = [];
    let parent: Node = currentPage;
    for (const orig of originalStack) {
      const c = orig.cloneNode(false) as Element;
      parent.appendChild(c);
      cloneStack.push(c);
      parent = c;
    }
  };

  const processNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let txt = node.textContent || '';
      while (txt.length > 0) {
        const remaining = charsPorPagina - currentCount;
        if (remaining <= 0) {
          // página llena -> guardar y continuar en nueva página
          pushPageAndReopen();
          currentCount = 0;
          // quitar espacios iniciales del resto para evitar empezar con espacio
          txt = txt.replace(/^\s+/, '');
          continue;
        }

        if (txt.length <= remaining) {
          // cabe entero en la página actual
          appendTextToCurrent(txt);
          currentCount += txt.length;
          txt = '';
        } else {
          // hay que partir el text node: preferir partir en espacio
          const windowSlice = txt.slice(0, remaining + 1); // +1 por si hay espacio justo en remaining
          let splitIdx = windowSlice.lastIndexOf(' ');
          if (splitIdx <= 0) splitIdx = remaining; // si no hay espacio, partir en remaining
          const part = txt.slice(0, splitIdx);
          appendTextToCurrent(part);
          currentCount += part.length;
          // preparar resto para la siguiente iteración / página
          txt = txt.slice(splitIdx).replace(/^\s+/, '');
          // cerrar y comenzar nueva página
          pushPageAndReopen();
          currentCount = 0;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // entrar en elemento: guardar en la pila de ancestros (original) y crear clone vacío
      originalStack.push(node as Element);
      const clone = (node as Element).cloneNode(false) as Element;
      if (cloneStack.length) {
        cloneStack[cloneStack.length - 1].appendChild(clone);
      } else {
        currentPage.appendChild(clone);
      }
      cloneStack.push(clone);

      // procesar hijos
      for (const child of Array.from(node.childNodes)) {
        processNode(child);
      }

      // salir del elemento
      originalStack.pop();
      cloneStack.pop();
    } else {
      // Ignorar comments / nodes no text/element
    }
  };

  // procesar nodos de primer nivel
  for (const child of Array.from(container.childNodes)) {
    processNode(child);
  }

  // añadir la última página si hay contenido o si no se generó ninguna página aún
  if (currentPage.innerHTML || pages.length === 0) {
    pages.push(currentPage.innerHTML);
  }

  // opcional: recortar espacios sobrantes de los extremos de cada página
  this.paginas = pages.map(p => p.trim());
}

  private async mostrarConAnimacion() {
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

  const animarNodo = async (node: Node): Promise<void> => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      for (let j = 0; j < text.length; j++) {
        htmlAcumulado += text[j];
        this.textoMostrado = htmlAcumulado;
        await new Promise(res => {
          const t = setTimeout(res, this.velocidad);
          this.intervalos.push(t);
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = (node as HTMLElement).tagName.toLowerCase();
      htmlAcumulado += `<${tag}>`;
      this.textoMostrado = htmlAcumulado;

      for (const child of Array.from(node.childNodes)) {
        await animarNodo(child);
      }

      htmlAcumulado += `</${tag}>`;
      this.textoMostrado = htmlAcumulado;
    }
  };

  for (const node of nodes) {
    await animarNodo(node);
  }

  this.animando = false;
  this.intervalos = [];
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
