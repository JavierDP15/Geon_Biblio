import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { StatusBar, Style } from '@capacitor/status-bar';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, 
    IonRouterOutlet,
    ReactiveFormsModule
  ],
})
export class AppComponent {
  constructor() {
    this.bloquearHorizontal();
    StatusBar.hide();
  }

  async bloquearHorizontal() {
    await ScreenOrientation.lock({ orientation: 'landscape' })
  }

  // async ngOnInit() {
  //   await StatusBar.hide();
  // }
}
