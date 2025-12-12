import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaPj, SalasPjService } from 'src/app/services/salas-pj/salas-pj.service';

@Component({
  selector: 'app-salas-pj',
  templateUrl: './salas-pj.component.html',
  styleUrls: ['./salas-pj.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class SalasPjComponent  implements OnInit {
  @Input() sala: string = '';

  salaPj: SalaPj | null = null;

  constructor(
    private router: Router
    , private salasPjService: SalasPjService
  ) { }

  async ngOnInit() {
    this.salaPj = await this.salasPjService.getPorId(this.sala) || null;
  }

}
