import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform, MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private menu: MenuController, private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menu.close();  // Cerrar el menú automáticamente al navegar
      }
    });
  }

  async shareApp() {
    await Share.share({
      title: 'Compartir App',
      text: '¡Mira esta increíble app!',
      url: 'https://play.google.com/store/apps/details?id=app.quetalelpuente.ggcode', // Cambia esto al enlace de tu app
      dialogTitle: 'Compartir con amigos',
    });
  }
}
