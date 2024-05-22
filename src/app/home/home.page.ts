import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import Hls from 'hls.js';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  ) {}

  ngAfterViewInit() {
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
}
