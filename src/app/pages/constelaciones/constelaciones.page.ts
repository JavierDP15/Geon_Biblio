import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { GeonesService } from 'src/app/services/geones/geones.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Router } from '@angular/router';

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
  isAnimating = false;

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
    , private router: Router
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

  irA(geonSeleccionado: string) {
    this.router.navigate(['/entrada-geon', geonSeleccionado]);
  }

  abacu() {
    if (this.isAnimating) return;
    
    if (!this.mostrarAbacu) {
      this.isAnimating = true;
      this.ocultarSVGAbacu = !this.ocultarSVGAbacu;
      for (let i = 0; i < this.lineasAbacu; i++) {
        setTimeout(() => {
          this.pasoAbacu++;
        }, i * 500);
      }
      setTimeout(() => {
        this.mostrarAbacu = !this.mostrarAbacu
        this.geonesService.setDescubierto('abacu', true);
        this.isAnimating = false;
      }, 500 * this.lineasAbacu);
    }
  }

  virnut() {
    if (this.isAnimating) return;
    
    if (!this.mostrarVirnut) {
      this.isAnimating = true;
      this.ocultarSVGVirnut = !this.ocultarSVGVirnut;
      for (let i = 0; i < this.lineasVirnut; i++) {
        setTimeout(() => {
          this.pasoVirnut++;
        }, i * 500);
      }
      setTimeout(() => {
        this.mostrarVirnut = !this.mostrarVirnut
        this.geonesService.setDescubierto('virnut', true);
        this.isAnimating = false;
      }, 500 * this.lineasVirnut);
    }
  }
}
