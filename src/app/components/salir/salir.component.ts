import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SalirComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  volver() {
    this.router.navigate(['/archivo'])
  }
}
