import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lunas',
  templateUrl: './lunas.page.html',
  styleUrls: ['./lunas.page.scss'],
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
  ]
})
export class LunasPage implements OnInit {

  constructor(
    private musicaService: MusicaService
    , private router: Router
  ) { }

  ngOnInit() {
  }

  irA(luna: String) {
    this.router.navigate(['/lunas', luna]);
  }

}
