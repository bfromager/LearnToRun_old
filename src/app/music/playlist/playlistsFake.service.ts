import {Playlist} from "./playlist";
import {Injectable} from "@angular/core";
import {PlaylistsBaseService} from "./playlists.service";
import {AssetService} from "../../files/asset.service";

@Injectable()
export class PlaylistsFakeService extends PlaylistsBaseService{
    private fakePlaylist: Playlist = new Playlist();

    constructor(private asset: AssetService /*, private fakePlaylist: Playlist*/) {
        super();

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
}
