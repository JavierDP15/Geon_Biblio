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

  private intervalo: any;

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
