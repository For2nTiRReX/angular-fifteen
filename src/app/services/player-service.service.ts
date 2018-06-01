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

        const that = this;
        const userPromise = this.db.allDocs({
            include_docs: true,
            descending: true
        }).then(function (result) {
            if ( result.rows.length < 1 || !that.isUserExist( result.rows, userLogin ) ) {
                console.log(that.createNewUser( userLogin ));
            } else {
                console.log(result.rows);
            }
        }).catch(function (err) {
            console.log(err);
        });

        console.log(userPromise);
        return userPromise;
    }

    public createNewUser( userLogin: string ) {

        let uuid = UUID.UUID();
        this.player = new Player( uuid, userLogin );
        return this.db.put( this.player).then(function (result) {
            console.log('Successfully posted !',result);
            return result;
        }).catch(function (err) {
            console.log(err);
        });
    }

    private isUserExist( dbRows, userLogin ) {
        return dbRows.some(function(row) {
            return userLogin === row.doc.name;
        });
    }
}
