import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { SalirComponent } from 'src/app/components/salir/salir.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { InmortalComponentComponent } from 'src/app/components/inmortal-component/inmortal-component.component';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-bishnas',
  templateUrl: './bishnas.page.html',
  styleUrls: ['./bishnas.page.scss'],
  standalone: true,
  imports: [
    IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , AtrasComponent
    , SalirComponent
    , AyudaComponent
    , MusicaComponent
    , InmortalComponentComponent
  ]
})
export class BishnasPage implements OnInit {
  bishnas: Entrada[] = [];

  seleccionado: string | null = null;
  detalle: string | null = null;

  constructor(
    private bibliotecaService: BibliotecaService
  ) { }

  async ngOnInit() {
    this.bishnas = await this.bibliotecaService.getPorPadre('bishnas') ?? [];
  }

  onItemSelected(item: any) {
    this.seleccionado = item;
  }

  mostrarDetalles(element: HTMLElement, id: string) {
    this.detalle = id;

    setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }, 0);
  }

}
