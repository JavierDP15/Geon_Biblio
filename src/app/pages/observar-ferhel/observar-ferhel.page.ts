import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { BibliotecaService, Entrada } from 'src/app/services/biblioteca/biblioteca.service';

interface Lupa {
  x: number;
  y: number;
  ferhel: Entrada;
  encontrada: boolean;
  visible: boolean
}

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
    // , 'tundra'
    // , 'montaña'
    // , 'bosque'
    // , 'pantano'
    // , 'rio'
    // , 'subterraneo'
    // , 'oceano'
    // , 'selva'
  ];
  ferhels: Entrada[] = [];
  lupas: Lupa[] = [];

  coordDesierto: number[][] = [
    [window.innerWidth * 0.11 , window.innerHeight * 0.46],
    [window.innerWidth * 0.3 , window.innerHeight * 0.74],
    [window.innerWidth * 0.55 , window.innerHeight * 0.52],
    [window.innerWidth * 0.8 , window.innerHeight * 0.705],
    [window.innerWidth * 0.85 , window.innerHeight * 0.39]
  ];
  coordMontaña: number[][] = [
    [window.innerWidth * 0 , window.innerHeight * 0],
    [window.innerWidth * 0 , window.innerHeight * 0],
    [window.innerWidth * 0 , window.innerHeight * 0],
    [window.innerWidth * 0 , window.innerHeight * 0],
    [window.innerWidth * 0 , window.innerHeight * 0]
  ];

  catalejoRadio = 130
  posX = window.innerWidth / 2;
  posY = window.innerHeight / 2;
  
  targetX = this.posX;
  targetY = this.posY;
  bloquear = false;

  videoActivo = false;
  videoSrc = '';
  posterSrc = '';
  
  animFrame?: number;

  lupaActual: any;

  bioma= '';

  constructor(
    private musicaService: MusicaService
    , private bibliotecaService: BibliotecaService
  ) { }
  
  async ngOnInit() {
    document.body.style.touchAction = 'none';
    document.addEventListener('pointerdown', this.onPointerMove);
    document.addEventListener('pointermove', this.onPointerMove);

    this.animarCatalejo();
  }
  
  async ionViewWillEnter() {
    this.musicaService.play('the-white-lion');
    this.musicaService.reproducirAmbiente(`ambiente_${this.bioma}`);
    const random = Math.floor(Math.random() * this.biomas.length)
    this.bioma = this.biomas[random];
    this.ferhels = await this.bibliotecaService.getPorBioma(this.bioma) ?? [];
    switch (this.bioma) {
      case "desierto":
        this.crearLupas(this.coordDesierto);
        break;
      case "tundra":
        break;
      case "montaña":
        this.crearLupas(this.coordMontaña);
        break;
      case "bosque":
        break;
      case "pantano":
        break;
      case "rio":
        break;
      case "subterraneo":
        break;
      case "oceano":
        break;
      case "selva":
        break;
      default:
        console.error('No se ha elegido ningún bioma.');
        break;
    }
  }

  ionViewWillLeave() {
    this.musicaService.stop(`ambiente_${this.bioma}`);
    this.ferhels = [];
    this.lupas = [];
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
    this.videoSrc = 'assets/videos/ferhel/' + lupa.ferhel.id + '_animacion.mp4';
    this.posterSrc = lupa.ferhel.otrosDatos.imagen;
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

  crearLupas(coordenadas: number[][]) {
    const coordAux = coordenadas;
    const ferhelAux = this.ferhels;
    const opcionesCantidadLupas = [1, 2, 2, 2, 3];
    const cantidadLupas = opcionesCantidadLupas[Math.floor(Math.random() * opcionesCantidadLupas.length)];
    for (let i = 0; i < cantidadLupas; i++) {
      const indiceCoordSeleccionada = Math.floor(Math.random() * coordAux.length);
      const indiceFerhelSeleccionado = Math.floor(Math.random() * ferhelAux.length);
      const coordNuevaLupa = coordAux[indiceCoordSeleccionada];
      this.crearLupa(coordNuevaLupa[0], coordNuevaLupa[1], ferhelAux[indiceFerhelSeleccionado]);
      coordAux.splice(indiceCoordSeleccionada, 1);
      ferhelAux.splice(indiceFerhelSeleccionado, 1);
    }
  }

  crearLupa(x: number, y: number, ferhel: Entrada) {
    const nuevaLupa: Lupa = {
      x,
      y,
      ferhel,
      encontrada: false,
      visible: true
    };

    this.lupas.push(nuevaLupa);
  }
}