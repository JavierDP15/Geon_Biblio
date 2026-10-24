import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { SalirComponent } from 'src/app/components/salir/salir.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biomas',
  templateUrl: './biomas.page.html',
  styleUrls: ['./biomas.page.scss'],
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
  ]
})
export class BiomasPage implements OnInit {
  bosque: boolean = false;
  desierto: boolean = true;
  montana: boolean = true;
  oceano: boolean = false;
  pantano: boolean = false;
  rio: boolean = false;
  selva: boolean = false;
  subterraneo: boolean = false;
  tundra: boolean = false;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

  irAHabitat(bioma: string) {
    this.route.navigate(['/ferhel/lista-ferhel', bioma]);
  }

}
