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
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';

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
    , BuscadorComponent
  ]
})
export class ArchivoPage implements OnInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoEntradaCat') videoCat!: ElementRef<HTMLVideoElement>;

  currentStep = 1;
  mostrarCuerpo = false;
  puedesScrollArriba = false;
  puedesScrollAbajo = true;

  tutorial: Tutorial[] | null = null;
  tutorialStep = 1;

  desvaneciendo = false;
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
    const video = this.video.nativeElement;
    video.currentTime = 0;
    if (this.currentStep === 1) {
      video.autoplay = true;
    }
  }
  
  ionViewDidEnter() {
    this.desvaneciendo = false;
    if (!this.estadoService.getEntrado('archivo')) {
      this.tutorialService.resetTutorial('archivo');
      
      this.estadoService.setEntrado('archivo', true);
    } else {
      this.currentStep = 2;
      this.mostrarCuerpo = true;
    }

    if (this.musicaService.getPistaActual() !== 'honor-and-sword') {
      this.musicaService.stopTodas();
      this.musicaService.play('honor-and-sword');
    }
  }

  ionViewWillLeave() {
    // if (this.video?.nativeElement) {
      this.resetVideo(this.video.nativeElement);
    // }
    // if (this.videoCat?.nativeElement) {
      this.resetVideo(this.videoCat.nativeElement);
    // }

    this.currentStep = 2;
    // this.mostrarCuerpo = false;
  }

  private resetVideo(video: HTMLVideoElement) {
    if(!video) return;
    video.pause();
    video.currentTime = 0;
    video.load();
  }

  private intentarReproducir(video: HTMLVideoElement, maxIntentos = 5) {
    video.muted = true;
    video.playsInline = true;
    let intentos = 0;

    const reproducir = () => {
      video.play().then(() => {
        console.log('Video iniciado con éxito');
      })
      .catch((err) => {
        console.warn(`Intento ${intentos + 1} fallido:`, err);
        intentos++;
        if (intentos < maxIntentos) {
          setTimeout(reproducir, 500);
        } else {
          console.error('No se pudo reproducir el video tras varios intentos');
          this.currentStep = 2;
          this.mostrarCuerpo = true
        }
      })
    };

    if (video.readyState >= 3) {
      reproducir();
    } else {
      video.oncanplaythrough = reproducir;
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
    this.navegarA = categoria;
    this.musicaService.reproducirSonido('assets/audios/sonido_boton.mp3');
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.desvaneciendo = true;
      }, 1);
    });
  }

  onDesvanecerEnd(event: AnimationEvent) {
    if (event.target !== event.currentTarget) return;

    if (event.animationName.includes('desvanecer')) {
      this.desvaneciendo = false;
      this.mostrarCuerpo = false;

      this.currentStep = 3;

      requestAnimationFrame(() => {
        const videoCat = this.videoCat?.nativeElement;
        console.log(videoCat);
        if (videoCat) {
          videoCat.currentTime = 0;
          videoCat.muted = true;
          videoCat.playsInline = true;
          videoCat.autoplay = true;

          const playPromise = videoCat.play();

          if (playPromise !== undefined) {
            playPromise
          }
        }

        this.musicaService.fadeOut(8000, 'honor-and-sword');
      });
    }
  }

  onVideoCatEnded() {
    if (this.currentStep !== 3) return;
    // this.videoCat.nativeElement.currentTime = 0;
    this.router.navigate(['/' + this.navegarA]);
  }

  onScroll(event: any) {
    const el = event.target;
    this.puedesScrollArriba = el.scrollTop > 0;
    this.puedesScrollAbajo = el.scrollTop + el.clientHeight < el.scrollHeight;
  }
}
