import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MusicaComponent]
})
export class ArchivoPage implements OnInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  currentStep = 1;
  mostrarCuerpo = false;

  constructor(
    private musicaService: MusicaService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.video.nativeElement.play();
    }, 100)
  }

  onVideoEnded() {
    if (this.currentStep !== 1) return;
    this.currentStep = 2;
    this.mostrarCuerpo = true;
  }

}
