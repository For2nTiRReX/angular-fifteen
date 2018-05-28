import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { UUID } from 'angular2-uuid';
import * as $PouchDB from 'pouchdb';
const PouchDB = $PouchDB['default'];

@Injectable()
export class PlayerServiceService {

  public player: Player;
  private db: any;

  constructor() {
    this.db = new PouchDB('fifteen_db');
    console.log(this.db);
  }

  public loginUser( userLogin: string ) {

    let uuid = UUID.UUID();
    this.player = new Player( uuid, userLogin );
    var todo = {
      _id: new Date().toISOString(),
      title: 'Fake',
      completed: false
    };
    this.db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!',result);
      }
      else {
        console.log('Error!',result);
      }
    });
  }

}
