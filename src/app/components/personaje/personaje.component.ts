import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class PersonajeComponent  implements OnInit {
  @Input() personaje: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.personaje);
  }

  irA() {
    this.router.navigate(['/personaje', this.personaje]);
  }

}
