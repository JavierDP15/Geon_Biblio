import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { InmortalComponentComponent } from 'src/app/components/inmortal-component/inmortal-component.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inmortales',
  templateUrl: './inmortales.page.html',
  styleUrls: ['./inmortales.page.scss'],
  standalone: true,
  imports: [
    IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , AtrasComponent
    , AyudaComponent
    , MusicaComponent
    , InmortalComponentComponent
  ]
})
export class InmortalesPage implements OnInit {

  constructor(
    private musicaService: MusicaService
    , private router: Router
  ) { }

  ngOnInit() {
  }

  irA(inmortal: string) {
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.router.navigate(['/inmortales', inmortal]);
  }
}
