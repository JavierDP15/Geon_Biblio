import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LugarComponent  implements OnInit {
  @Input() lugar: string = '';

  entrada: Entrada | null = null;

  constructor(
    private bibliotecaService: BibliotecaService
    , private router: Router
  ) { }

  async ngOnInit() {
    this.entrada = await this.bibliotecaService.getPorId(this.lugar) ?? null;
  }

}
