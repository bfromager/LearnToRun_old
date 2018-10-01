import {Platform} from "ionic-angular";
import {Injectable} from "@angular/core";
import {MediaCordovaService} from "./mediaCordova.service";
import {MediaFakeService} from "./mediaFake.service";
import {MediaService} from "./media.service";

@Injectable()
export class MediaServiceFactory {
    constructor(private platform: Platform) {
        console.log("MediaServiceFactory", platform.platforms());
    }

    createNewService(): MediaService {
        if (this.platform.is('cordova')) {
            console.log("cordova");
            return new MediaCordovaService ();
        }
        else {
            console.log("not cordova");
            return new MediaFakeService ();
        }
    }

}