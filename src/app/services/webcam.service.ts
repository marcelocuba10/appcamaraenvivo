import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  private apiUrl = 'https://quetalelpuente.ggcode.com.py/api/webcams';

  constructor(private http: HttpClient) { }

  getWebcams(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Cámara no disponible en este momento. Por favor, intente más tarde.';

    if (error.status === 502) {
      errorMessage = 'E502: Cámara no disponible en este momento. Por favor, intente más tarde.';
    }

    console.error(`Backend returned code ${error.status}, body was: ${error.message}`);

    return throwError(errorMessage);
  }
}
