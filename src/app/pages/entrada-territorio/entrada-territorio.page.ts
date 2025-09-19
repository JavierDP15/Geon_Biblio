import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entrada-territorio',
  templateUrl: './entrada-territorio.page.html',
  styleUrls: ['./entrada-territorio.page.scss'],
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
export class EntradaTerritorioPage implements OnInit {
  territorio = '';
  entrada: Entrada | null = null;

  constructor(
    private musicaService: MusicaService
    , private bibliotecaService: BibliotecaService
    , private route: ActivatedRoute
    , private router: Router
  ) { }

  async ngOnInit() {
    this.territorio = this.route.snapshot.paramMap.get('territorio') || '';
    this.entrada = await this.bibliotecaService.getPorId(this.territorio) ?? null;
  }

  irALugares() {
    this.router.navigate([`/entrada-territorio/${this.territorio}/lugares`]);
  }

  ionViewWillEnter() {
    this.musicaService.play('desert-storm');
  }

}
