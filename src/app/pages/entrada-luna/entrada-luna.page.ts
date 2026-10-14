import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { SalirComponent } from 'src/app/components/salir/salir.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-entrada-luna',
  templateUrl: './entrada-luna.page.html',
  styleUrls: ['./entrada-luna.page.scss'],
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
export class EntradaLunaPage implements OnInit {
  luna = '';
  entrada: Entrada | null = null;

  constructor(
    private route: ActivatedRoute
    , private bibliotecaService: BibliotecaService
  ) { }

  async ngOnInit() {
    this.luna = this.route.snapshot.paramMap.get('luna') || '';
    this.entrada = await this.bibliotecaService.getPorId(this.luna) ?? null;
  }

}
