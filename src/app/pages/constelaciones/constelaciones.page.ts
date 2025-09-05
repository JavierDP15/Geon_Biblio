import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { GeonesService } from 'src/app/services/geones/geones.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

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
  ocultarSVGAbacu = true;
  private lineasAbacu = 4;

  mostrarVirnut = false;
  pasoVirnut = 0;
  ocultarSVGVirnut = true;
  private lineasVirnut = 6;

  constructor(
      private geonesService: GeonesService
    , private musicaService: MusicaService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.musicaService.play('caves-of-dawn');
    this.geonesService.resetDescubierto('virnut');

    if (this.geonesService.getDescubierto('abacu')) {
      this.mostrarAbacu = true;
    }

    if (this.geonesService.getDescubierto('virnut')) {
      this.mostrarVirnut = true;
    }
  }

  abacu() {
    if (!this.mostrarAbacu) {
      this.ocultarSVGAbacu = !this.ocultarSVGAbacu;
      for (let i = 0; i < this.lineasAbacu; i++) {
        setTimeout(() => {
          this.pasoAbacu++;
        }, i * 500);
      }
      setTimeout(() => {
        this.mostrarAbacu = !this.mostrarAbacu
        this.geonesService.setDescubierto('abacu', true);
      }, 500 * this.lineasAbacu);
    } else {

    }
  }

  virnut() {
    if (!this.mostrarVirnut) {
      this.ocultarSVGVirnut = !this.ocultarSVGVirnut;
      for (let i = 0; i < this.lineasVirnut; i++) {
        setTimeout(() => {
          this.pasoVirnut++;
        }, i * 500);
      }
      setTimeout(() => {
        this.mostrarVirnut = !this.mostrarVirnut
        this.geonesService.setDescubierto('virnut', true);
      }, 500 * this.lineasVirnut);
    } else {

    }
  }
}
