import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { Tutorial, TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { DialogoComponent } from 'src/app/components/dialogo/dialogo.component';
import { CajaTextoComponent } from 'src/app/components/caja-texto/caja-texto.component';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { Router } from '@angular/router';
import { EstadoPaginasService } from 'src/app/services/estadoPaginas/estado-paginas';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
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
    , DialogoComponent
    , CajaTextoComponent
    , AtrasComponent
  ]
})
export class ArchivoPage implements OnInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoEntradaCat') videoCat!: ElementRef<HTMLVideoElement>;

  currentStep = 1;
  mostrarCuerpo = false;

  tutorial: Tutorial[] | null = null;
  tutorialStep = 1;

  navegarA = '';

  constructor(
    private musicaService: MusicaService,
    private tutorialService: TutorialService,
    private router: Router,
    private estadoService: EstadoPaginasService
  ) { }

  ngOnInit() {
    // this.tutorialService.resetTutorial('archivo');
    // setTimeout(() => {
    //   this.video.nativeElement.play();
    // }, 100)
  }
  
  ionViewWillEnter() {
    if (!this.estadoService.getEntrado('archivo')) {
      this.tutorialService.resetTutorial('archivo');
      setTimeout(() => {
        this.video.nativeElement.play();
      }, 100);
      this.estadoService.setEntrado('archivo', true);
    } else {
      this.currentStep = 2;
      this.mostrarCuerpo = true;
    }

    if (this.musicaService.getPistaActual() !== 'honor-and-sword') {
      console.log('Ayuyu');
      this.musicaService.stopTodas();
      this.musicaService.play('honor-and-sword');
    }
  }

  onVideoEnded() {
    if (this.currentStep !== 1) return;
    this.currentStep = 2;
    this.mostrarCuerpo = true;
    setTimeout(() => {
      this.mostrarTutorial();
    }, 500);
  }

  saltarVideo() {
    this.video.nativeElement.pause();
    this.video.nativeElement.currentTime = 0;
    if (this.currentStep === 1) {
      this.currentStep = 2;
    } 
    if (this.currentStep === 3) {
      this.videoCat.nativeElement.pause();
      this.videoCat.nativeElement.currentTime = 0;
      this.musicaService.stopTodas();
      this.router.navigate(['/' + this.navegarA]);
    }
    this.mostrarCuerpo = true;
    setTimeout(() => {
      this.mostrarTutorial();
    }, 500);
  }

  async mostrarTutorial() {
    const tutoriales = await this.tutorialService.mostrarTutorial('archivo');
    if (tutoriales) {
      this.tutorial = tutoriales;
      this.tutorialStep = 1;
    }
  }

  async onCerrarTutorialStep() {
    if (this.tutorial && this.tutorialStep < this.tutorial.length) {
      this.tutorialStep++;
    } else {
      this.tutorial = null;
      this.tutorialStep = 0;
    }
  }

  irA(categoria: string) {
    this.currentStep = 3;
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    this.navegarA = categoria;
    setTimeout(() => {
      this.mostrarCuerpo = false;
      this.videoCat.nativeElement.play();
      this.musicaService.fadeOut(8000, 'honor-and-sword')
    }, 1000)
  }

  onVideoCatEnded() {
    if (this.currentStep !== 3) return;
    this.videoCat.nativeElement.currentTime = 0;
    this.router.navigate(['/' + this.navegarA]);
  }
}
