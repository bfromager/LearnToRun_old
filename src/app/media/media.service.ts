import {Ticker} from "../ticker/ticker";
import {Subject} from "rxjs/Subject";

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


    protected maxVolume = 1;
    protected minVolume = 0.1;
    protected volumeStep = 0.05;
    protected fadeDelayMs = 750;
    protected  currentVolume = this.maxVolume;
    private isFadingOut = true;

    private ticker: Ticker = new Ticker(this.fadeDelayMs/(this.maxVolume - this.minVolume)*this.volumeStep);

    status = new Subject<MediaStatus>();

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

    fadeOut(){
        this.isFadingOut = true;
        this.ticker.start();
    }
    fadeIn(){
        this.isFadingOut = false;
        this.ticker.start();
    }

    private onFaderTick() {
        if (this.isFadingOut) {
            if (this.currentVolume <= this.minVolume) {
                this.ticker.stop();
                return;
            }
            this.currentVolume -= this.volumeStep;
        }
        else {
            if (this.currentVolume >= this.maxVolume) {
                this.ticker.stop();
                return;
            }
            this.currentVolume += this.volumeStep;
        }
        this.setVolume();
    }

}