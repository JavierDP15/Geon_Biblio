import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { GeonesService } from 'src/app/services/geones/geones.service';

@Component({
  selector: 'app-constelaciones',
  templateUrl: './constelaciones.page.html',
  styleUrls: ['./constelaciones.page.scss'],
  standalone: true,
  imports: [
      IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , MusicaComponent
    , AtrasComponent
    , AyudaComponent
  ]
})
export class ConstelacionesPage implements OnInit {
  mostrarAbacu = false;
  pasoAbacu = 0;
  private lineasAbacu = 4;

  constructor(
    private geonesService: GeonesService
  ) { }

  ngOnInit() { }

  abacu() {
    if (!this.mostrarAbacu) {
      for (let i = 0; i < this.lineasAbacu; i++) {
        setTimeout(() => {
          this.pasoAbacu++;
          console.log(this.pasoAbacu);
        }, 500 * (i + 1));
      }
      setTimeout(() => {
        this.mostrarAbacu = !this.mostrarAbacu
      }, 500 * (this.lineasAbacu + 1));
      this.geonesService.setDescubierto('abacu', true);
    } else {

    }
  }
}
