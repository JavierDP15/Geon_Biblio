import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ayuda, AyudaService } from 'src/app/services/ayuda/ayuda.service';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { CajaTextoComponent } from '../caja-texto/caja-texto.component';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  standalone: true,
  imports: [
    CommonModule
    , DialogoComponent
    , CajaTextoComponent
  ],
  styleUrls: ['./ayuda.component.scss'],
})
export class AyudaComponent  implements OnInit {
  @Input() pagina: string = '';

  ayudaSeleccionada: Ayuda[] = [];

  dialogo = false;
  cuadroTexto = false;

  pasoAyuda = 0;

  constructor(
    private ayudaService: AyudaService
    , private cdr: ChangeDetectorRef
  ) { }

  trackByPaso = (_: number, p: Ayuda) => p.paso;

  ngOnInit() { }

  async mostrarAyuda() {
    this.ayudaSeleccionada = await this.ayudaService.getAyudaRandom(this.pagina) || [];

    if (!this.ayudaSeleccionada.length) {
      console.log(`No hay ayudas para la página: ${this.pagina}`);
      return;
    }
    console.log(this.ayudaSeleccionada);
    this.pasoAyuda = 1;
  };

  async onCerrarPaso() {
    if (this.ayudaSeleccionada && this.pasoAyuda < this.ayudaSeleccionada.length) {
      this.pasoAyuda++;
    } else {
      this.ayudaSeleccionada = [];
      this.pasoAyuda = 0;
    }
  }

}
