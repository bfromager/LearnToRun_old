import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {PlaylistsService} from "./playlists.service";

@Injectable()
export class PlaylistsServiceFactory {
    private playlistsService: PlaylistsService;

    constructor(private platform: Platform) {
        this.playlistsService = this.createNewService();
    }

    createNewService(): PlaylistsService {
        // if (this.platform.is('cordova')) {
        //     console.log("cordova");
        //     return new MediaCordovaService ();
        // }
        // else {
        //     console.log("not cordova");
        //     return new MediaFakeService ();
        // }
        return new PlaylistsService(this.platform);
    }

    getService(): PlaylistsService {
        return this.playlistsService;
    }

}
