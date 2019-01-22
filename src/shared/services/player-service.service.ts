import { Injectable } from '@angular/core';
import { Player } from 'models/index';
import { UUID } from 'angular2-uuid';
import PouchDB from 'pouchdb';
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PlayerServiceService {

    private playerSubject = new ReplaySubject(1);
    private player: Player;
    private db: any;

    constructor() {
        this.db = new PouchDB('fifteen_db');
       
        if(localStorage.getItem('player')) {
            const localStorageUser =  JSON.parse(localStorage.getItem('player'));
            this.loginUser(localStorageUser.name);
        }
    }

    public getPlayer() {
        return this.playerSubject;
    }

    public loginUser( userLogin: string ): Promise<Player> {
        const userPromise = this.db.allDocs({
            include_docs: true
        }).then( (result) => {
            if ( result.rows.length < 1 || !this.isUserExist( result.rows, userLogin ) ) {
                return this.createNewUser( userLogin ).then((createdUser) => {
                    return this.getUserFromDb( createdUser.id );
                });
            } else {
                return this.getUserFromDb( result.rows.find(item => item.doc.name === userLogin ).id );
            }
        }).catch( (err) => {
            console.log(err);
        });
        return userPromise;
    }

    private createNewUser( userLogin: string ) {
        const uuid = UUID.UUID();
        this.player = new Player( uuid, userLogin );
        this.playerSubject.next( this.player );
        return this.db.put( this.player).then(function (result) {
            console.log( 'Successfully posted !', result );
            return result;
        }).catch(function (err) {
            console.log(err);
        });
    }

    private getUserFromDb( userId: string ): Promise<Player> {
        return this.db.allDocs({
            include_docs: true,
            startkey: userId,
            endkey: userId
        }).then( (result) => {
            this.player = new Player( result.rows[0].doc._id, result.rows[0].doc.name );
            this.playerSubject.next( this.player );
            localStorage.setItem('player', JSON.stringify(this.player));
            return this.player;
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