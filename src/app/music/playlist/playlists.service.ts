import {Playlist} from "./playlist";
import {Platform} from "ionic-angular";

export class PlaylistsService {
    private playlists = [];

    constructor(private platform : Platform) {

        let rootDir = "";

        if (this.platform.is('android')) {
            rootDir = '/android_asset/www/';
        }

        let fakePlaylist = new Playlist();

        // let fileName = rootDir + 'assets/sound/Dimmu.mp3';
        // fakePlaylist.getList().push(rootDir + 'assets/sound/course lente.wav');
        // fakePlaylist.getList().push(rootDir + 'assets/sound/Dimmu.mp3');
        fakePlaylist.getList().push(rootDir + 'assets/sound/1 minute.wav');
        fakePlaylist.getList().push(rootDir + 'assets/sound/2 minutes.wav');
        fakePlaylist.getList().push(rootDir + 'assets/sound/not a file');
        fakePlaylist.getList().push(rootDir + 'assets/sound/not a file');
        fakePlaylist.getList().push(rootDir + 'assets/sound/not a file');
        fakePlaylist.getList().push(rootDir + 'assets/sound/3 minutes.wav');
        fakePlaylist.getList().push(rootDir + 'assets/sound/4 minutes.wav');
        fakePlaylist.getList().push(rootDir + 'assets/sound/not a file');
        // fakePlaylist.getList().push(rootDir + 'assets/sound/5 minutes.wav');
        // fakePlaylist.getList().push(rootDir + 'assets/sound/6 minutes.wav');
        // fakePlaylist.getList().push(rootDir + 'assets/sound/7 minutes.wav');
        // fakePlaylist.getList().push(rootDir + 'assets/sound/8 minutes.wav');
        fakePlaylist.getList().push(rootDir + 'assets/sound/not a file');
        fakePlaylist.getList().push(rootDir + 'assets/sound/not a file');

        this.playlists.push(fakePlaylist);
    }

    getPlaylists () {
        return this.playlists;
    }
}
