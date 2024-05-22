import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import Hls from 'hls.js';
import { DomSanitizer } from '@angular/platform-browser';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  webcams: any[] = [];
  views: number[] = [];

  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(
    private webcamService: WebcamService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  async ngAfterViewInit() {
    await AdMob.initialize();
    try {
      await AdMob.initialize();
      this.showBanner();
    } catch (error) {
      console.error('AdMob initialization error:', error);
    }

    this.loadWebcams();
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

  loadWebcams() {
    this.webcamService.getWebcams().subscribe((data) => {
      this.webcams = data.map((webcam: any) => {
        if (webcam.type === 'Iframe') {
          webcam.url = this.sanitizer.bypassSecurityTrustResourceUrl(webcam.url);
        }
        return webcam;
      });
      this.views = this.webcams.map(() => this.getRandomNumber());

      // Forzar la detección de cambios para asegurarnos de que los ViewChildren estén inicializados
      this.cdr.detectChanges();

      // Inicializar los videos después de asegurarnos de que la vista está actualizada
      this.initializeVideos();
    });
  }

  initializeVideos() {
    this.videoPlayers.forEach((videoPlayer, index) => {
      const webcam = this.webcams[index];
      if (webcam && webcam.type === 'M3u8') {
        const videoElement = videoPlayer.nativeElement;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(webcam.url);
          hls.attachMedia(videoElement);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // No reproducir automáticamente al iniciar
          });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          videoElement.src = webcam.url;
          videoElement.addEventListener('loadedmetadata', () => {
            // No reproducir automáticamente al iniciar
          });
        }
      }
    });
  }

  // Método para alternar la reproducción del video
  togglePlay(videoElement: ElementRef<HTMLVideoElement>) {
    const video = videoElement.nativeElement;
    if (video.paused) {
      video.play(); // Iniciar la reproducción si está pausado
    } else {
      video.pause();
    }
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 10000) + 1; // Número aleatorio entre 1 y 10000
  }

  doRefresh(event: any) {
    this.loadWebcams();
    event.target.complete(); // Finalizar la acción de refresco
  }
}
