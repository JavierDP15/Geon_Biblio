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

  musica = true;

  constructor(private musicaService: MusicaService) { }

  ngOnInit() {
    this.musica = !this.musicaService.getSilenciado();
    }

  cambiarMusica() {
    const pista = this.musicaService.getPistaActual();
    if (!pista) return;

    this.musicaService.cambiarSilenciado();

    if (this.musicaService.getSilenciado()) {
      this.musicaService.setVolumen(0, pista);
    } else {
      this.musicaService.setVolumen(this.musicaService.getVolumenGlobal(), pista);
      // const howl = this.musicaService.getHowl(pista);
      // if (howl && !howl.playing()) {
      //   howl.play();
      // }
    }

    this.musica = !this.musicaService.getSilenciado();
  }

}
