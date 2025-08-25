import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { Tutorial, TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { DialogoComponent } from 'src/app/components/dialogo/dialogo.component';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MusicaComponent, AyudaComponent, DialogoComponent]
})
export class ArchivoPage implements OnInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  currentStep = 1;
  mostrarCuerpo = false;
  tutorial: Tutorial | null = null;

  constructor(
    private musicaService: MusicaService,
    private tutorialService: TutorialService
  ) { }

  ngOnInit() {
    this.tutorialService.resetTodos();
    setTimeout(() => {
      this.video.nativeElement.play();
    }, 100)
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
    this.currentStep = 2;
    this.mostrarCuerpo = true;
    setTimeout(() => {
      this.mostrarTutorial();
    }, 500);
  }

  async mostrarTutorial() {
      this.tutorial = await this.tutorialService.mostrarTutorial('archivo', 1);
      console.log(this.tutorial);
  }
}
