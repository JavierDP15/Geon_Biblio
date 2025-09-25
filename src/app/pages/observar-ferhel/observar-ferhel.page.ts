import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AtrasComponent } from 'src/app/components/atras/atras.component';
import { AyudaComponent } from 'src/app/components/ayuda/ayuda.component';
import { MusicaComponent } from 'src/app/components/musica/musica.component';

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
  catalejoRadio = 130
  posX = window.innerWidth / 2;
  posY = window.innerHeight / 2;
  
  targetX = this.posX;
  targetY = this.posY;
  
  animFrame?: number;

  lupas = [
    {x: 200, y: 150, visible: false, id: 1},
    {x: 600, y: 300, visible: false, id: 2}
  ];

  constructor() { }
  
  ngOnInit() {
    this.animarCatalejo();
  }

  actualizarObjetivo(ev: PointerEvent) {
    this.targetX = ev.clientX;
    this.targetY = ev.clientY;

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

  pointerDown(ev: PointerEvent | TouchEvent) {
    const p = 'touches' in ev ? ev.touches[0] : ev;
    this.targetX = p.clientX;
    this.targetY = p.clientY;
  }

  pointerMove(ev: PointerEvent | TouchEvent) {
    const p = 'touches' in ev ? ev.touches[0] : ev;
    this.targetX = p.clientX;
    this.targetY = p.clientY;
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

    console.log('Encontrada', lupa.id);
  }

}
