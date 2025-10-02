import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { FerhelesService } from 'src/app/services/ferheles/ferheles.service';

@Component({
  selector: 'app-ferhel-component',
  templateUrl: './ferhel-component.component.html',
  styleUrls: ['./ferhel-component.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FerhelComponentComponent  implements OnInit {
  @Input() ferhel: string = '';

  entrada: Entrada | null = null;
  descubierto = false;
  nuevo = false;
  pasoMostrar = 0;

  constructor(
    private bibliotecaService: BibliotecaService
    , private ferhelService: FerhelesService
    , private router: Router
  ) { }

  async ngOnInit() {
    this.descubierto = await this.ferhelService.getDescubierto(this.ferhel);
    // this.nuevo = await this.ferhelService.getYMarcaNuevo(this.ferhel);
    if (this.descubierto) {
      this.nuevo = await this.ferhelService.getNuevo(this.ferhel);
      if (this.nuevo) {
        this.pasoMostrar = 1;
      }
    }
    this.entrada = await this.bibliotecaService.getPorId(this.ferhel) ?? null;
  }

  pulsar() {
    if (this.pasoMostrar == 1){
      this.pasoMostrar = 2;
      this.ferhelService.quitarNuevo(this.ferhel);
      setTimeout(() => {
        this.pasoMostrar = 0;
      }, 3000)

    } else {
      this.router.navigate(['/entrada-ferhel/' + this.ferhel]);
    }
  }

}
