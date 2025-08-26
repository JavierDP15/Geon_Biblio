import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atras',
  templateUrl: './atras.component.html',
  styleUrls: ['./atras.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AtrasComponent  implements OnInit {
  @Input() pagina: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  volver() {
    this.router.navigate(['/' + this.pagina])
  }
}
