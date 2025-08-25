import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./ayuda.component.scss'],
})
export class AyudaComponent  implements OnInit {
  @Input() pagina: string = '';

  constructor() { }

  ngOnInit() { }

  mostrarAyuda() { }

}
