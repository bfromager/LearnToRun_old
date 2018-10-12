import {Platform} from "ionic-angular";
import {Injectable} from "@angular/core";
import {MediaCordova} from "./mediaCordova";
import {MediaFake} from "./mediaFake";
import {MediaBase} from "./mediaBase";

@Injectable()
export class MediaServiceFactory {
    constructor(private platform: Platform) {
        console.log("MediaServiceFactory", platform.platforms());
    }

    createNewService(): MediaBase {
        if (this.platform.is('cordova')) {
            console.log("cordova");
            return new MediaCordova ();
        }
        else {
            console.log("not cordova");
            return new MediaFake ();
        }
    }

}