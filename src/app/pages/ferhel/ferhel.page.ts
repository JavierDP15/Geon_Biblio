import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { Router } from '@angular/router';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { FerhelComponentComponent } from 'src/app/components/ferhel-component/ferhel-component.component';
import { FerhelesService } from 'src/app/services/ferheles/ferheles.service';

@Component({
  selector: 'app-ferhel',
  templateUrl: './ferhel.page.html',
  styleUrls: ['./ferhel.page.scss'],
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
    , FerhelComponentComponent
  ]
})
export class FerhelPage implements OnInit {
  entrada: Entrada | null = null;

  constructor(
    private bibliotecaService: BibliotecaService
    , private route: Router
    , private musicaService: MusicaService
    , private ferhelService: FerhelesService
  ) { }

  async ngOnInit() {
    this.entrada = await this.bibliotecaService.getPorId('ferhel') ?? null;
  }

  ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
  }

  irALista() {
    this.route.navigate(['/ferhel/lista-ferhel']);
  }

}
