import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-inmortal-component',
  templateUrl: './inmortal-component.component.html',
  styleUrls: ['./inmortal-component.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class InmortalComponentComponent  implements OnInit {
  @Input() inmortal: string = '';
  @Input() seleccionado = false;

  @Output() seleccionadoEvento = new EventEmitter<any>();
  // @Output() detallesEvento = new EventEmitter<any>();
  @Output() detallesEvento = new EventEmitter<HTMLElement>();

  @ViewChild('inmortalEl', { static: false })
  inmortalEl!: ElementRef<HTMLElement>;

  entrada: Entrada | null = null;
  ampliado: boolean = false;

  textoBoton: string = '';

  constructor(
    private bibliotecaService: BibliotecaService
  ) { }

  async ngOnInit() {
    this.entrada = await this.bibliotecaService.getPorId(this.inmortal) ?? null;
  }

  seleccionar() {
    this.seleccionadoEvento.emit(this.inmortal);
  if (this.textoBoton === 'Volver') return;
    this.textoBoton = 'Detalles'
  }

  detalles() {
    this.detallesEvento.emit(this.inmortalEl.nativeElement);
    this.ampliado = true;
    this.textoBoton = 'Volver'
  }
}
