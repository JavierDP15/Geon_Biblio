import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';

@Component({
  selector: 'app-observar-ferhel',
  templateUrl: './observar-ferhel.page.html',
  styleUrls: ['./observar-ferhel.page.scss'],
  standalone: true,
  imports: [IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , AtrasComponent
    , AyudaComponent
    , MusicaComponent
  ]
})
export class ObservarFerhelPage implements OnInit {
  posX = window.innerWidth / 2;
  posY = window.innerHeight / 2;

  constructor() { }

  ngOnInit() {
  }

  onMove(event: TouchEvent | MouseEvent) {
    if ('touches' in event) {
      this.posX = event.touches[0].clientX;
      this.posY = event.touches[0].clientY;
    } else {
      this.posX = event.clientX;
      this.posY = event.clientY;
    }
  }

  cosa() {
    console.log('ayuyu');
  }

}
