import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./musica.component.scss'],
})
export class MusicaComponent  implements OnInit {

  musica = false;

  constructor(private musicaService: MusicaService) { }

  ngOnInit() {
    const musica = this.musicaService.getVolumen();
    if (musica > 0) {
      this.musica = true;
    }
  }

  cambiarMusica() {
    if (this.musica) {
      this.musicaService.setVolumen(0);
    } else {
      this.musicaService.setVolumen(1)
    }
    this.musica = !this.musica;
  }

}
