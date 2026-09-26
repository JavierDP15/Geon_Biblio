import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { SalirComponent } from 'src/app/components/salir/salir.component';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';
import { LugarComponent } from 'src/app/components/lugar/lugar.component';

@Component({
  selector: 'app-lugares-territorio',
  templateUrl: './lugares-territorio.page.html',
  styleUrls: ['./lugares-territorio.page.scss'],
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
    , SalirComponent
    , LugarComponent
  ]
})
export class LugaresTerritorioPage implements OnInit {
  territorio = '';
  entrada: Entrada | null = null;
  lista: Entrada[] = [];

  constructor(
    private route: ActivatedRoute
    , private bibliotecaService: BibliotecaService
  ) { }

  async ngOnInit() {
    const datos = await this.bibliotecaService.getPorCategoria('lugat');
    this.territorio = this.route.snapshot.paramMap.get('territorio') || '';
    this.entrada = await this.bibliotecaService.getPorId(this.territorio) ?? null;
    this.lista = await this.bibliotecaService.getPorPadre(this.territorio) || [];
  }

}
