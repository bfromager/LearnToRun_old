import {Media, MEDIA_ERROR, MEDIA_STATUS, MediaObject} from '@ionic-native/media';
import {MediaService, MediaStatus} from "./media.service";

export class MediaCordovaService extends MediaService {

    protected userStop = true;
    private media: Media = new Media();
    private mediaObject: MediaObject =  null;
    private requestPause = false;
    private mediaStatus: MediaStatus = MediaStatus.NONE;

    constructor() {
        super();
    }

    load(file : string) {

        try {

            this.mediaObject = this.media.create(file);
            this.mediaObject.onSuccess.subscribe(() => this.onFinish());
            this.mediaObject.onError.subscribe((error) => this.onError(error));
            this.mediaObject.onStatusUpdate.subscribe((status) => this.onUpdateStatus(status)); // fires when file status changes
        }
        catch(e) {
            alert(e);
            if (this.mediaObject != null)
                this.mediaObject.release();
            this.mediaObject = null;
        }
    }

// https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    play(){
        this.userStop = false;
        if (this.mediaObject != null) {
            this.mediaObject.play();
            this.setVolume();
        }
    }
    pause(){
        if (this.mediaObject != null) {
             // if (this.mediaStatus == MediaStatus.NONE || this.mediaStatus == MediaStatus.STARTING || this.mediaStatus == MediaStatus.RUNNING) {
             //    this.requestPause = true;
             // }

            // if (this.mediaStatus == MediaStatus.RUNNING) {
            //     this.requestPause = false;
                this.mediaObject.pause();
            // }
        }
    }
    stop(){
        this.userStop = true;
        if (this.mediaObject != null) {
            this.mediaObject.stop();
        }
    }

    protected setVolume() {
        console.log("vol : ",this.currentVolume);
        if (this.mediaObject != null /* && this.fileLoaded*/) {
            this.mediaObject.setVolume(this.currentVolume);
        }
    }

    private onFinish() {
        console.log('Action is successful');
        this.mediaObject.release();
        this.mediaObject = null;

        if (this.userStop) {
            this.mediaStatus = MediaStatus.STOPPED;
        }else{
            //     if (this.requestPause)
            //         this.mediaStatus = MediaStatus.NONE;
            //     else
            this.mediaStatus = MediaStatus.FINISHED;
        }
        this.status.next(this.mediaStatus);
    }


    private onUpdateStatus(status: MEDIA_STATUS) {
        switch(status) {
            case MEDIA_STATUS.NONE:     { this.mediaStatus = MediaStatus.NONE;  break; }
            case MEDIA_STATUS.STARTING: { this.mediaStatus = MediaStatus.STARTING;  break; }
            case MEDIA_STATUS.RUNNING:  { this.mediaStatus = MediaStatus.RUNNING;  break; }
            case MEDIA_STATUS.PAUSED:   { this.mediaStatus = MediaStatus.PAUSED;  break; }
/*            case MEDIA_STATUS.STOPPED:  {
                if (this.userStop) {
                    this.mediaStatus = MediaStatus.STOPPED;
                }else{
                //     if (this.requestPause)
                //         this.mediaStatus = MediaStatus.NONE;
                //     else
                        this.mediaStatus = MediaStatus.FINISHED;
                }
                break;
            }*/
        }

        // if (this.mediaStatus == MediaStatus.RUNNING) {
        //     if (this.requestPause) {
        //         setTimeout(()=>{
        //             this.pause();
        //         },10);
        //     }
        // }

        // if (this.mediaStatus == MediaStatus.PAUSED
        //     || this.mediaStatus == MediaStatus.STOPPED
        //     || this.mediaStatus == MediaStatus.FINISHED
        //     || this.mediaStatus == MediaStatus.NONE
        // ) {
        //     this.requestPause = false;
        // }

        // if (this.mediaStatus == MediaStatus.STOPPED
        //     || this.mediaStatus == MediaStatus.FINISHED
        //     || this.mediaStatus == MediaStatus.NONE
        // ) {
        //     this.mediaObject.release();
        //     this.mediaObject = null;
        // }

        this.status.next(this.mediaStatus);
    }

    private onError(error: MEDIA_ERROR) {
        switch(error) {
            case MEDIA_ERROR.ABORTED: {
                alert("ABORTED");
                break;
            }
            case MEDIA_ERROR.NETWORK: {
                alert("NETWORK");
                break;
            }
            case MEDIA_ERROR.DECODE: {
                alert("DECODE");
                break;
            }
            case MEDIA_ERROR.SUPPORTED: {
                alert("SUPPORTED");
                break;
            }
        }

    }

}