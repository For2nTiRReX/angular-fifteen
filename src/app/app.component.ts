import {Component, OnInit} from '@angular/core';
import PouchDB from 'pouchdb';


@Component({
  selector: 'fifteen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fifteen';

  ngOnInit () {

      let db = new PouchDB('mydb');
      console.log(db);
  }


}
