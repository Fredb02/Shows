import { CollectionViewer, DataSource } from '@angular/cdk/collections'

import { Observable, BehaviorSubject, of } from 'rxjs'
import { finalize, catchError } from 'rxjs/operators'

import { IShow } from '../interfaces'
import { DataService } from './data.service'

export class ShowsDataSource implements DataSource<IShow> {
  private showsSubject = new BehaviorSubject<IShow[]>([])

  private loadingSubject = new BehaviorSubject<boolean>(false)

  public loading$ = this.loadingSubject.asObservable()

  constructor(private dataService: DataService) { }

  loadShows() {
    this.loadingSubject.next(true)
    this.dataService.getShows()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(shows => this.showsSubject.next(shows))
  }

  connect(collectionViewer: CollectionViewer): Observable<IShow[]> {
    console.log('Connecting data source')
    return this.showsSubject.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.showsSubject.complete()
    this.loadingSubject.complete()
  }

}
