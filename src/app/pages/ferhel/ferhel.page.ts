import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { RuedaBiomasComponent } from 'src/app/components/rueda-biomas/rueda-biomas.component';
import { Tutorial, TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { EstadoPaginasService } from 'src/app/services/estadoPaginas/estado-paginas';
import { DialogoComponent } from 'src/app/components/dialogo/dialogo.component';
import { CajaTextoComponent } from 'src/app/components/caja-texto/caja-texto.component';

@Component({
  selector: 'app-ferhel',
  templateUrl: './ferhel.page.html',
  styleUrls: ['./ferhel.page.scss'],
  standalone: true,
  imports: [
    CommonModule
    , IonContent
    , IonHeader
    , IonTitle
    , IonToolbar
    , FormsModule
    , AtrasComponent
    , AyudaComponent
    , MusicaComponent
    , FerhelComponentComponent
    , RuedaBiomasComponent
    , DialogoComponent
    , CajaTextoComponent
  ]
})
export class FerhelPage implements OnInit {
  @ViewChild('videoCatalejo') videoCatalejo!: ElementRef<HTMLVideoElement>;

  entrada: Entrada | null = null;

  mostrarVideo = false;
  biomas = false;
  tutorial: Tutorial[] | null = null;
  tutorialStep = 0;
  mostrarTutorial = false;
  arriba = false;

  constructor(
    private bibliotecaService: BibliotecaService
    , private route: Router
    , private musicaService: MusicaService
    , private ferhelService: FerhelesService
    , private tutorialService: TutorialService
    , private estadoService: EstadoPaginasService
  ) { }

  async ngOnInit() {
    this.entrada = await this.bibliotecaService.getPorId('ferhel') ?? null;
    this.musicaService.play('the-white-lion');
    this.mostrarVideo = false;
    // await this.tutorialService.resetTutorial('ferhel');
    await this.recibirTutorial();
  }
  
  ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
    this.mostrarVideo = false;
    this.biomas = false;
  }
  
  async recibirTutorial() {
    const tutoriales = await this.tutorialService.mostrarTutorial('ferhel');
    console.log(tutoriales);
    if (tutoriales) {
      this.mostrarTutorial = true;
      this.tutorial = tutoriales;
      this.tutorialStep = 0;
    }
  }

  async onCerrarTutorialStep() {
    this.mostrarTutorial = false;

    await new Promise(resolve => setTimeout(resolve));

    if (this.tutorial && this.tutorialStep < this.tutorial.length - 1) {
      this.tutorialStep++;
      switch (this.tutorialStep) {
        case 9:
        case 17:
          this.arriba = true;
          break;
        case 11:
          this.biomas = true;
          break;
        case 13:
          this.biomas = false;
          break;
        default:
          this.arriba = false;
          break;
      }
    } else {
      this.tutorial = null;
    }

    this.mostrarTutorial = true;
  }

  irAObservar() {
    this.musicaService.fadeOut(5000, 'the-white-lion');
    this.mostrarVideo = true;
    const video = this.videoCatalejo.nativeElement;
    video.currentTime = 0;
    video.muted = true;
    video.playsInline = true;
    video.play();
  }
  
  mostrarBiomas() {
    if (!this.biomas) {
      this.biomas = true;
    }
  }
  
  onVideoCatalejoEnd() {
    this.musicaService.stop('the-white-lion');
    this.route.navigate(['/ferhel/observar-ferhel']);
  }

  cerrarRueda() {
    this.biomas = false;
  }

}
