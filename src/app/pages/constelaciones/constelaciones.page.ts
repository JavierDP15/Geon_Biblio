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

  mostrarCaal = false;
  pasoCaal = 0;
  ocultarSVGCaal = true;
  private lineasCaal = 5;

  mostrarDyshiba = false;
  pasoDyshiba = 0;
  ocultarSVGDyshiba = true;
  private lineasDyshiba = 8;

  mostrarUpsilon = false;
  pasoUpsilon = 0;
  ocultarSVGUpsilon = true;
  private lineasUpsilon = 5;

  constructor(
      private geonesService: GeonesService
    , private musicaService: MusicaService
    , private router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.musicaService.play('caves-of-dawn');
    // this.geonesService.resetDescubierto('abacu');
    // this.geonesService.resetDescubierto('virnut');
    // this.geonesService.resetDescubierto('caal');
    // this.geonesService.resetDescubierto('dyshiba');
    // this.geonesService.resetDescubierto('upsilon');

    if (this.geonesService.getDescubierto('abacu')) {
      this.mostrarAbacu = true;
      this.ocultarSVGAbacu = true;
    }

    if (this.geonesService.getDescubierto('virnut')) {
      this.mostrarVirnut = true;
      this.ocultarSVGVirnut = true;
    }

    if (this.geonesService.getDescubierto('caal')) {
      this.mostrarCaal = true;
      this.ocultarSVGCaal = true;
    }

    if (this.geonesService.getDescubierto('dyshiba')) {
      this.mostrarDyshiba = true;
      this.ocultarSVGDyshiba = true;
    }

    if (this.geonesService.getDescubierto('upsilon')) {
      this.mostrarUpsilon = true;
      this.ocultarSVGUpsilon = true;
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

  caal() {
    if (this.isAnimating) return;
    
    if (!this.mostrarCaal) {
      this.isAnimating = true;
      this.ocultarSVGCaal = !this.ocultarSVGCaal;
      for (let i = 0; i < this.lineasCaal; i++) {
        setTimeout(() => {
          this.pasoCaal++;
        }, i * 500);
      }
      setTimeout(() => {
        this.mostrarCaal = !this.mostrarCaal
        this.geonesService.setDescubierto('caal', true);
        this.isAnimating = false;
      }, 600 * this.lineasCaal);
    }
  }

  dyshiba() {
    if (this.isAnimating) return;
    
    if (!this.mostrarDyshiba) {
      this.isAnimating = true;
      this.ocultarSVGDyshiba = !this.ocultarSVGDyshiba;
      for (let i = 0; i < this.lineasDyshiba; i++) {
        setTimeout(() => {
          this.pasoDyshiba++;
        }, i * 400);
      }
      setTimeout(() => {
        this.mostrarDyshiba = !this.mostrarDyshiba
        this.geonesService.setDescubierto('dyshiba', true);
        this.isAnimating = false;
      }, 400 * this.lineasDyshiba);
    }
  }

  upsilon() {
    if (this.isAnimating) return;
    
    if (!this.mostrarUpsilon) {
      this.isAnimating = true;
      this.ocultarSVGUpsilon = !this.ocultarSVGUpsilon;
      for (let i = 0; i < this.lineasUpsilon; i++) {
        setTimeout(() => {
          this.pasoUpsilon++;
        }, i * 500);
      }
      setTimeout(() => {
        this.mostrarUpsilon = !this.mostrarUpsilon
        this.geonesService.setDescubierto('upsilon', true);
        this.isAnimating = false;
      }, 500 * this.lineasUpsilon);
    }
  }
}
