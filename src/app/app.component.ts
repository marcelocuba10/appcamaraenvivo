import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {}

  async shareApp() {
    await Share.share({
      title: 'Compartir App',
      text: '¡Mira esta increíble app!',
      url: 'https://example.com', // Cambia esto al enlace de tu app
      dialogTitle: 'Compartir con amigos',
    });
  }
}
