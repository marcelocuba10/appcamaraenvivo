import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  private apiUrl = 'https://quetalelpuente.ggcode.com.py/api/webcams';

  constructor(private http: HttpClient) { }

  getWebcams(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
