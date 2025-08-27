import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';

@Component({
  selector: 'app-geones',
  templateUrl: './geones.page.html',
  styleUrls: ['./geones.page.scss'],
  standalone: true,
  imports: [
    IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , MusicaComponent
    , AyudaComponent
    , AtrasComponent
  ]
})
export class GeonesPage implements OnInit {
  mostrarCuerpo = true;

  constructor() { }

  ngOnInit() {

  }

}
