import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { UUID } from 'angular2-uuid';
import * as $PouchDB from 'pouchdb';
const PouchDB = $PouchDB['default'];

@Injectable()
export class PlayerServiceService {

    private player: Player;
    private db: any;

    constructor() {
        this.db = new PouchDB('fifteen_db');
    }

    public getPlayer() {
        return this.player;
    }

    public loginUser( userLogin: string ): Promise<Player> {
        const that = this;
        const userPromise = this.db.allDocs({
            include_docs: true,
            descending: true
        }).then(function (result) {
            if ( result.rows.length < 1 || !that.isUserExist( result.rows, userLogin ) ) {
                that.createNewUser( userLogin ).then((createdUser) => {
                    return that.getUserFromDb( createdUser.id );
                });
            } else {
                return that.getUserFromDb( result.rows.find(item => item.doc.name === userLogin ).id );
            }
        }).catch(function (err) {
            console.log(err);
        });
        return userPromise;
    }

    private createNewUser( userLogin: string ) {
        const uuid = UUID.UUID();
        this.player = new Player( uuid, userLogin );
        return this.db.put( this.player).then(function (result) {
            console.log( 'Successfully posted !', result );
            return result;
        }).catch(function (err) {
            console.log(err);
        });
    }

    private getUserFromDb( userId: string ): Promise<Player> {
        const that = this;
        return this.db.allDocs({
            include_docs: true,
            attachments: true,
            startkey: userId,
            endkey: userId
        }).then(function (result) {
            that.player = new Player( result.rows[0].doc._id, result.rows[0].doc.name );
            localStorage.setItem('player', JSON.stringify(that.player));
            return that.player;
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
