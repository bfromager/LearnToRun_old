import {Injectable} from "@angular/core";

import {MediaService, MediaStatus} from "../media/media.service";
import {MediaServiceFactory} from "../media/media.service.factory";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class FilePlayerService {

    private mediaService: MediaService;
    private sub: Subscription;
    // private mediaStatus: MediaStatus = MediaStatus.NONE;

    constructor(private mediaServiceFactory: MediaServiceFactory) {
        this.mediaService = this.mediaServiceFactory.createNewService();
        //this.mediaService.status.subscribe((status) => { this.onPlayStatus(status); });
    }

    // https://stackoverflow.com/questions/50303033/how-to-return-a-promise-from-subscribe-in-angular-5


    play(file: string) : Promise<any> {
        return new Promise(resolve => {
            this.sub = this.mediaService.status.subscribe((status) => {
                if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
                    this.sub.unsubscribe();
                    resolve(null);
                }
            });
            this.mediaService.load(file);
            this.mediaService.play();
        });
    }

    // private onPlayStatus(status: MediaStatus) {
    //     console.log(status);
    //     this.mediaStatus = status;
    //     if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
    //     }
    // }
}