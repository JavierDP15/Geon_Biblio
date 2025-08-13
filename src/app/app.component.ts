import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    this.bloquearHorizontal();
  }

  async bloquearHorizontal() {
    await ScreenOrientation.lock({ orientation: 'landscape' })
  }

  async ngOnInit() {
    await StatusBar.hide();
  }
}
