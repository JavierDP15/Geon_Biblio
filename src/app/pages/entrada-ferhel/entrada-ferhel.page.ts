import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { ActivatedRoute } from '@angular/router';
import { SalirComponent } from 'src/app/components/salir/salir.component';

@Component({
  selector: 'app-entrada-ferhel',
  templateUrl: './entrada-ferhel.page.html',
  styleUrls: ['./entrada-ferhel.page.scss'],
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
    , SalirComponent
  ]
})
export class EntradaFerhelPage implements OnInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  entrada: Entrada | null = null;
  ferhel = '';

  constructor(
    private musicaService: MusicaService
    , private bibliotecaService: BibliotecaService
    , private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.ferhel = this.route.snapshot.paramMap.get('ferhel') || '';
    this.entrada = await this.bibliotecaService.getPorId(this.ferhel) ?? null;
  }

  ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
  }

  reproducirVideo() {
    this.video.nativeElement.currentTime = 0;
    this.video.nativeElement.play();
  }

}
