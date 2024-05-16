import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('videoPlayer1') videoPlayer1!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer2') videoPlayer2!: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngAfterViewInit() {
    const video1 = this.videoPlayer1.nativeElement;
    const video2 = this.videoPlayer2.nativeElement;
    const videoSrc1 = 'https://video02.logicahost.com.br/portaldacidade/fozpontedaamizadesentidobrasil.stream/chunklist_w422405694.m3u8';
    const videoSrc2 = 'https://5b33b873179a2.streamlock.net:1443/camerapontefoz/camerapontefoz.stream/chunklist.m3u8';

    if (Hls.isSupported()) {
      const hls1 = new Hls();
      hls1.loadSource(videoSrc1);
      hls1.attachMedia(video1);
      hls1.on(Hls.Events.MANIFEST_PARSED, () => {
        // No reproducir automáticamente al iniciar
      });

      const hls2 = new Hls();
      hls2.loadSource(videoSrc2);
      hls2.attachMedia(video2);
      hls2.on(Hls.Events.MANIFEST_PARSED, () => {
        // No reproducir automáticamente al iniciar
      });
    } else if (video1.canPlayType('application/vnd.apple.mpegurl') && video2.canPlayType('application/vnd.apple.mpegurl')) {
      video1.src = videoSrc1;
      video1.addEventListener('loadedmetadata', () => {
        // No reproducir automáticamente al iniciar
      });

      video2.src = videoSrc2;
      video2.addEventListener('loadedmetadata', () => {
        // No reproducir automáticamente al iniciar
      });
    }
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
}
