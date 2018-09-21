import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {interval} from "rxjs/observable/interval";
import {Subscription} from "rxjs/Subscription";

export class Ticker {

    // private isRunning: boolean = false;
    private timer: Observable<any>;
    private sub: Subscription;
    tick = new Subject();

    constructor( public ms: number = 1000 ) {
        // console.log("Ticker Create");
        this.timer =  interval(ms);
    }

    start() {
        // this.isRunning = true;
        this.sub = this.timer.subscribe(
            ()=>{this.tick.next();}
        )
        // this.doTick();
    }
    stop() {
        // this.isRunning = false;
        this.sub.unsubscribe();
    }

    // private doTick() {
    //     // console.log("doTick");
    //     setTimeout(() => {
    //         if (!this.isRunning) { return; }
    //         this.tick.next();
    //         this.doTick();
    //     }, this.interval);
    // }

}