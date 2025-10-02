import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Entrada } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-observar-ferhel',
  templateUrl: './observar-ferhel.page.html',
  styleUrls: ['./observar-ferhel.page.scss'],
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
export class ObservarFerhelPage implements OnInit {
  biomas: string[] = [
    'desierto'
    // , 'cueva'
    , 'montaña'
    // , 'bosque'
    // , 'pantano'
    // , 'rio'
    // , 'subterraneo'
    // , 'oceano'
    // , 'selva'
  ];
  ferhels: Entrada[] = [];

  catalejoRadio = 130
  posX = window.innerWidth / 2;
  posY = window.innerHeight / 2;
  
  targetX = this.posX;
  targetY = this.posY;
  bloquear = false;

  videoActivo= false;
  videoSrc = '';
  
  animFrame?: number;

  lupaActual: any;

  bioma= '';

  lupas = [
    {x: 200, y: 150, visible: false, id: 1, video: 'assets/videos/ferhel/fermiti_animacion.mp4', encontrada: false},
    {x: 600, y: 250, visible: false, id: 2, video: 'assets/videos/ferhel/fermiti_animacion.mp4', encontrada: false}
  ];

  constructor(
    private musicaService: MusicaService
  ) { }
  
  ngOnInit() {
    document.body.style.touchAction = 'none';
    document.addEventListener('pointerdown', this.onPointerMove);
    document.addEventListener('pointermove', this.onPointerMove);

    this.animarCatalejo();
    this.bioma = this.biomas[Math.floor(Math.random() * this.biomas.length)];
    console.log(this.bioma);
  }

  ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
    this.musicaService.reproducirAmbiente(`ambiente_${this.bioma}`);
  }

  ionViewWillLeave() {
    this.musicaService.stop(`ambiente_${this.bioma}`);
  }

  private onPointerMove = (e: PointerEvent) => {
    if (this.bloquear) return;
    this.targetX = e.clientX;
    this.targetY = e.clientY;

  }

  actualizarObjetivo(ev: PointerEvent) {
    if (this.bloquear) return;
    this.onPointerMove(ev);

    if (!this.animFrame) {
      this.animarCatalejo();
    }
  }

  animarCatalejo() {
    const animate = () => {
      const ease = 0.1;
      this.posX += (this.targetX - this.posX) * ease;
      this.posY += (this.targetY - this.posY) * ease;

      this.actualizarLupas();

      this.animFrame = requestAnimationFrame(animate);
    };
    this.animFrame = requestAnimationFrame(animate);
  }

  actualizarLupas() {
    this.lupas.forEach(lupa => {
      const dx = lupa.x - this.posX;
      const dy = lupa.y - this.posY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lupa.visible = dist <= this.catalejoRadio;
    });
  }

  clickLupa(lupa: any) {
    if (!lupa.visible) return;

    this.bloquear = true;
    this.videoActivo = true
    this.videoSrc = lupa.video;
    this.lupaActual = lupa;
  }

  cerrarVideo() {
    this.videoActivo = false;
    this.bloquear = false;

    if (this.lupaActual) {
      this.lupaActual.visible = false;
      this.lupaActual.encontrada = true;
      this.lupaActual = null;
    }

    console.log(this.lupas);
  }

}
