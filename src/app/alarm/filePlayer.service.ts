import {Injectable} from "@angular/core";

import {MediaService, MediaStatus} from "../media/media.service";
import {MediaServiceFactory} from "../media/media.service.factory";

@Injectable()
export class FilePlayerService {

    private mediaService: MediaService;
    // private mediaStatus: MediaStatus = MediaStatus.NONE;

    constructor(private mediaServiceFactory: MediaServiceFactory) {
        this.mediaService = this.mediaServiceFactory.createNewService();
        //this.mediaService.status.subscribe((status) => { this.onPlayStatus(status); });
    }

    // https://stackoverflow.com/questions/50303033/how-to-return-a-promise-from-subscribe-in-angular-5


    play(file: string) : Promise<any> {
        return new Promise(resolve => {
            this.mediaService.status.subscribe((status) => {
                if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
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