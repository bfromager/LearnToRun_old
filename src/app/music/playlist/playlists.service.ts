// https://stackoverflow.com/questions/41432388/how-to-inject-service-into-class-not-component
// https://stackoverflow.com/questions/40536409/getting-dependency-from-injector-manually-inside-a-directive/40537194#40537194
// https://stackoverflow.com/questions/42396804/how-to-write-a-service-constructor-that-requires-parameters-in-angular-2

import {Injectable, Injector} from "@angular/core";
import {Platform} from "ionic-angular";
import {Playlist} from "./playlist";
import {PlaylistsFakeService} from "./playlistsFake.service";
import {AssetService} from "../../files/asset.service";

// https://offering.solutions/blog/articles/2018/08/17/using-useclass-usefactory-usevalue-useexisting-with-treeshakable-providers-in-angular/

export abstract class PlaylistsBaseService {
    protected playlists : Playlist[] = [];

    constructor() {
    }

    getPlaylists () {
        return this.playlists;
    }
}

@Injectable()
export class PlaylistsService {
    private service: PlaylistsBaseService;
    private fakePlaylist: Playlist = new Playlist();
    protected playlists : Playlist[] = [];

    constructor(private asset: AssetService) {
        // // this.playlistsService = this.createNewService();
        // this.service = this.injector.get<any>(PlaylistsFakeService);

        // this.fakePlaylist.getList().push(this.asset.getWavePath('course lente.wav'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('Dimmu.mp3'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('1 minute.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('2 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('3 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('4 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('5 minutes.wav'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('6 minutes.wav'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('7 minutes.wav'));
        // this.fakePlaylist.getList().push(this.asset.getWavePath('8 minutes.wav'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));
        this.fakePlaylist.getList().push(this.asset.getWavePath('not a file'));

        this.playlists.push(this.fakePlaylist);
    }

    getPlaylists () {
        // return this.service.getPlaylists();
        return this.playlists;
    }

    // createNewService(): PlaylistsFakeService {
    //     // if (this.platform.is('cordova')) {
    //     //     console.log("cordova");
    //     //     return new MediaCordova ();
    //     // }
    //     // else {
    //     //     console.log("not cordova");
    //     //     return new MediaFake ();
    //     // }
    //     return new PlaylistsFakeService(this.platform);
    // }
    //
    // getService(): PlaylistsFakeService {
    //     return this.playlistsService;
    // }

}

