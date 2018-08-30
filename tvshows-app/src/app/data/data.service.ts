import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { IShow } from '../interfaces'
import { HttpErrorHandler, HandleError } from '../http-error-handler.service'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService')
  }

  getShows(): Observable<IShow[]> {
    const getURL = `${environment.baseUrl}shows/`
    return this.http.get<IShow[]>(getURL)
      .pipe(
        catchError(this.handleError('getShows', []))
      )
  }
}
