import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tutorial, TutorialService } from 'src/app/services/tutorial/tutorial.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./dialogo.component.scss'],
})
export class DialogoComponent  implements OnInit {
  @Input() pagina: string = '';
  @Input() tutorial: Tutorial | null = null;
  @Output() cerrar = new EventEmitter<void>();

  constructor() { }

  async ngOnInit() { }

  cerrarDialogo() {
    this.cerrar.emit();
  }
}
