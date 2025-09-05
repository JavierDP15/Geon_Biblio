import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-entrada-geon',
  templateUrl: './entrada-geon.page.html',
  styleUrls: ['./entrada-geon.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EntradaGeonPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
