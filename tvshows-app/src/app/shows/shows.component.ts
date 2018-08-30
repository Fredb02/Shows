import { Component, OnInit } from '@angular/core'
import {MatTableDataSource} from '@angular/material'
import {SelectionModel} from '@angular/cdk/collections'

import { IShow } from '../interfaces'
import { DataService } from '../data/data.service'
import { ShowsDataSource } from '../data/showsDataSource.service'

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
})
export class ShowsComponent implements OnInit {
  shows: IShow[] = []
  displayedColumns = ['select', 'id', 'name', 'status', 'downloaded']
  dataSource:  ShowsDataSource
  selection = new SelectionModel<IShow>(true, [])

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSource = new ShowsDataSource(this.dataService)
    this.dataSource.loadShows()
    // this.onGet()
    // console.log(this.shows)
  }

  onGet() {
    console.log('onGet')
    this.dataService.getShows().subscribe(shows => (this.shows = shows))
    console.log('after')
  }

  search(showName: String) {}
/*
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row))
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }
 */
}
