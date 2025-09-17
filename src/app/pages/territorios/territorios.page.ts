import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-territorios',
  templateUrl: './territorios.page.html',
  styleUrls: ['./territorios.page.scss'],
  standalone: true,
  imports: [IonContent
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
export class TerritoriosPage implements OnInit {
  territorioObjetivo = '';

  constructor(
    private musicaService: MusicaService
    , private router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.musicaService.play('desert-storm');
    this.territorioObjetivo = '';
  }

  irA(territorio: string) {
    this.territorioObjetivo = territorio;
    setTimeout(() => {
      this.router.navigate(['/entrada-territorio', territorio])
    }, 1000)
  }
}
