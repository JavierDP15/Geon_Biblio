import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FerhelesService } from 'src/app/services/ferheles/ferheles.service';
import { MusicaComponent } from '../musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss'],
  standalone: true,
  imports: [
    CommonModule
    , MusicaComponent
  ]
})
export class OpcionesComponent  implements OnInit {
  @Output() cerrar = new EventEmitter<void>();

  sistemaAReiniciar = '';
  pidiendoConfirmacion = false;

  constructor(
    private ferhelService: FerhelesService
    , private musicaService: MusicaService
  ) { }

  ngOnInit() {}

  cerrarOpciones() {
    this.cerrar.emit();
  }

  confirmarReinicio(sistema: string) {
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.sistemaAReiniciar = sistema;
    this.pidiendoConfirmacion = true;
  }

  async confirmar(valor: boolean) {
    if (valor) {
      switch (this.sistemaAReiniciar) {
        case "ferhel":
          await this.ferhelService.resetTodos()
          break;
        default:
          console.error('El sistema seleccionado no existe.')
          break;
      }
    }
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.sistemaAReiniciar = '';
    this.pidiendoConfirmacion = false;
  }
}
