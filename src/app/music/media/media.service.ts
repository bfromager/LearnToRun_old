import {Ticker} from "../../ticker/ticker";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

export enum MediaStatus {
    NONE = "NONE",
    STARTING = "STARTING",
    RUNNING = "RUNNING",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
    FINISHED = "FINISHED",
}

// @Injectable()
export abstract class MediaService {
    // private tickerSub: Subscription;

    protected userStop = true;


    protected maxVolume = 0.2;
    protected minVolume = this.maxVolume / 10;
    protected volumeStep = 20;
    protected fadeDelayMs = 750;
    protected  currentVolume = this.maxVolume;
    private isFadingOut = true;

    private ticker: Ticker = new Ticker(this.fadeDelayMs/this.volumeStep);

    status = new Subject<MediaStatus>();
    private fadeEnd = new Subject();
    private sub: Subscription;

    abstract load(file : string);
    abstract play();
    abstract pause();
    abstract stop();
    protected abstract setVolume();

    constructor() {
        this.ticker.tick.subscribe(()=>{this.onFaderTick();});
    }

    /*play() {
        this.userStop = false;
    }

    stop() {
        this.userStop = true;
    }*/

    // play(file: string) : Promise<any> {
    //     return new Promise(resolve => {
    //         this.mediaService.status.subscribe((status) => {
    //             if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
    //                 resolve(null);
    //             }
    //         });
    //         this.mediaService.load(file);
    //         this.mediaService.play();
    //     });
    // }


    fadeOut() : Promise<any> {
        return new Promise(resolve => {
            this.sub = this.fadeEnd.subscribe(() => {
                this.sub.unsubscribe();
                resolve(null);
            });
            this.isFadingOut = true;
            this.ticker.start();
        });
    }

    fadeIn() : Promise<any> {
        return new Promise(resolve => {
            this.sub = this.fadeEnd.subscribe(() => {
                this.sub.unsubscribe();
                resolve(null);
            });
            this.isFadingOut = false;
            this.ticker.start();
        });
    }

    private onFaderTick() {
        let step =  (this.maxVolume - this.minVolume) /  this.volumeStep;
        if (this.isFadingOut) {
            if (this.currentVolume <= this.minVolume) {
                this.ticker.stop();
                this.fadeEnd.next();
                return;
            }
            this.currentVolume -= step;
        }
        else {
            if (this.currentVolume >= this.maxVolume) {
                this.ticker.stop();
                this.fadeEnd.next();
                return;
            }
            this.currentVolume += step;
        }
        this.setVolume();
    }

}