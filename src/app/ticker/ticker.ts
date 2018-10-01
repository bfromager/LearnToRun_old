import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {interval} from "rxjs/observable/interval";
import {Subscription} from "rxjs/Subscription";

export class Ticker {

    private timer: Observable<any>;
    private sub: Subscription = null;
    tick = new Subject();

    constructor( public ms: number = 1000 ) {
        this.timer =  interval(ms);
    }

    start() {
        this.sub = this.timer.subscribe(
            ()=>{this.tick.next();}
        )
    }
    stop() {
        if (this.sub != null) {
            this.sub.unsubscribe();
            this.sub = null;
        }
    }
}