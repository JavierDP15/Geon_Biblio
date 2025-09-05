import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-entrada-geon',
  templateUrl: './entrada-geon.page.html',
  styleUrls: ['./entrada-geon.page.scss'],
  standalone: true,
  imports: [IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , CommonModule
    , FormsModule
    , MusicaComponent
    , AtrasComponent
    , AyudaComponent
  ]
})
export class EntradaGeonPage implements OnInit {
  private geon = '';
  entrada: Entrada | null = null;

  constructor(
      private route: ActivatedRoute
    , private bibliotecaService : BibliotecaService
  ) { }

  async ngOnInit() {
    this.geon = this.route.snapshot.paramMap.get('geon') || '';
    console.log(this.geon);
    this.entrada = await this.bibliotecaService.getPorId(this.geon) ?? null;
    console.log(this.entrada);
  }

}
