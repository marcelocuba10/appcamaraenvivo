import { Component, OnInit } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
})
export class ForecastPage implements OnInit {

  constructor() { }

  async ngOnInit() {
    await AdMob.initialize();
    this.showBanner();
  }

  async showBanner() {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-9253092378386410/2148604195',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false // Configura esto en false para producción
    };

    try {
      await AdMob.showBanner(options);
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  }
}
