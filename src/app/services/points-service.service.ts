import { Injectable, OnInit } from '@angular/core';
import { Points, Player } from '../models';
import { UUID } from 'angular2-uuid';
import * as $PouchDB from 'pouchdb';
import { PlayerServiceService } from './player-service.service';
const PouchDB = $PouchDB['default'];

@Injectable()
export class PointsServiceService implements OnInit {

  private db: any;
  private points: Points;
  private player: Player;

  constructor(public playerServiceService: PlayerServiceService) {}

  ngOnInit() {
      this.db = new PouchDB('fifteen_db_points');
  }

  public getTopTen() {
      const pointsPromise = this.db.allDocs({
          include_docs: true,
          descending: true
      }).then(function (result) {
          if ( result.rows.length > 0 ) {
          } else {
              return [];
          }
      }).catch(function (err) {
          console.log(err);
      });
      return pointsPromise;
  }

  public setNewResult( moves: number, time: number ) {

      this.player = this.playerServiceService.getPlayer();
      const pointsPromise = this.db.allDocs({
          include_docs: true,
          descending: true,
      }).then( (result) => {
          if (result.rows.length > 0) {
              if ( result.rows[0].doc.moves > moves || result.rows[0].doc.time > time ) {

              }
          } else {
              console.log('No user in db!');
              return this.updatePlayerResults();
          }
      }).catch((err) => {
          console.log(err);
      });
      return pointsPromise;
  }

  private updatePlayerResults( uuid: string = '') {
      if ( uuid === '' ) {
          uuid = UUID.UUID();
      }
      this.points = new Points( uuid, 0, 0, player._id, player );
      this.points.moves = moves;
      this.points.time  = time;
      return this.db.put( this.points ).then(function (result) {
          console.log( 'Successfully posted !', result );
          return result;
      }).catch(function (err) {
          console.log(err);
      });
  }

  private isPointExist( dbRows, user_id ) {
      return dbRows.some(function(row) {
          return user_id === row.doc.player_id;
      });
  }
}
