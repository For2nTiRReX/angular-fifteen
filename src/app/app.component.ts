import {Component, OnInit} from '@angular/core';
import * as $PouchDB from 'pouchdb';
const PouchDB = $PouchDB['default'];


@Component({
  selector: 'fifteen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fifteen';

  ngOnInit () {

      let db = new PouchDB('fifteen_db');
      console.log(db);
  }


}
