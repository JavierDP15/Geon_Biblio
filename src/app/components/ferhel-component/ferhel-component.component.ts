import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private bibliotecaService: BibliotecaService
    , private ferhelService: FerhelesService
  ) { }

  async ngOnInit() {
    this.descubierto = await this.ferhelService.getDescubierto(this.ferhel);
    this.nuevo = await this.ferhelService.getYMarcaNuevo(this.ferhel);
    this.entrada = await this.bibliotecaService.getPorId(this.ferhel) ?? null;
  }

}
