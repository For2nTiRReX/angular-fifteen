import { Injectable } from '@angular/core';
import { Points, Player } from '../models';
import { UUID } from 'angular2-uuid';
import * as $PouchDB from 'pouchdb';
import { PlayerServiceService } from './player-service.service';
const PouchDB = $PouchDB['default'];

@Injectable()
export class PointsServiceService {

  private db: any;
  private points: Points;
  private player: Player;

  constructor(public playerServiceService: PlayerServiceService) {
      this.db = new PouchDB('fifteen_db_points');
      this.player = this.playerServiceService.getPlayer();
      this.points = new Points( '', 0, 0, this.player._id, this.player );
  }

  public getTopTen() {
      const pointsPromise = this.db.allDocs({
          include_docs: true,
          descending: true
      }).then( (result) => {
          if ( result.rows.length > 0 ) {
          } else {
              return [];
          }
      }).catch( (err) => {
          console.log(err);
      });
      return pointsPromise;
  }

  public setNewResult( moves: number, time: number ) {
      let haveToBeUpdated = false;
      this.points.moves = moves;
      this.points.time  = time;
      const pointsPromise = this.db.allDocs({
          include_docs: true,
          descending: true,
      }).then( (result) => {
          haveToBeUpdated = this.isPointsHaveToBeUpdated( result.rows, moves, time );
          if (result.rows.length > 0 && haveToBeUpdated) {
              this.updatePlayerResults(this.points, haveToBeUpdated);
          } else {
              this.updatePlayerResults(this.points);
          }
      }).catch((err) => {
          console.log(err);
      });
      return pointsPromise;
  }

  private updatePlayerResults( points: Points, uuid: string = '' ) {
      if ( uuid === '' ) {
          uuid = UUID.UUID();
          points._id = uuid;
      }
      return this.db.put( points ).then( (result) => {
          console.log( 'Successfully posted !', result );
          return result;
      }).catch( (err) => {
          console.log(err);
      });
  }

  private isPointsHaveToBeUpdated( dbRows, moves, time ) {
      return dbRows.find( (row) => {
          if ( row.doc.player_id === this.player._id && (moves < row.doc.moves || time < row.doc.time) ) {
              this.points._id = row.doc._id;
              return row.doc._id;
          } else {
              return false;
          }
      });
  }
}
