import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import imageMapResize from 'image-map-resizer';

@Component({
  selector: 'app-rueda-biomas',
  templateUrl: './rueda-biomas.component.html',
  styleUrls: ['./rueda-biomas.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class RuedaBiomasComponent  implements OnInit {
  @Output() cerrar = new EventEmitter<void>();

  private mapaInicializado = false;

  habitatSeleccionado = '';
  irASeleccionado = '';

  constructor(
    private route: Router
  ) { }
  
  ngOnInit() {}
  
  inicializarMapa() {
    if (!this.mapaInicializado) {
      setTimeout(() => {
        imageMapResize();
        this.mapaInicializado = true;
      }, 50);
    }
  }

  cerrarRueda() {
    this.cerrar.emit();
  }

  onAreaClick(event: MouseEvent): void {
    event.preventDefault();
    const target = event.target as HTMLAreaElement;
    const habitat = target.title;
    const irA = target.className;
    this.habitatSeleccionado = habitat;
    this.irASeleccionado = irA;

    console.log(this.habitatSeleccionado);
  }

  irAHabitat() {

    this.route.navigate(['/ferhel/lista-ferhel', this.irASeleccionado]);
  }
}
