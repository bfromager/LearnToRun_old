import {Component, OnDestroy, OnInit} from "@angular/core";
import {Ticker} from "../../ticker/ticker";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'countdown-component',
    templateUrl: 'countDown.component.html',
})

export class CountDownComponent implements OnInit, OnDestroy {

    private initTimeInSeconds = 4000;
    private timeInSeconds = 0;

    displayTime = this.getSecondsAsDigitalClock(this.timeInSeconds);

    private tickerSub: Subscription = null;
    private ticker: Ticker;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.stop();
    }

    public initCountDown(seconds : number) {
        this.stop();
        this.initTimeInSeconds = seconds;
        this.timeInSeconds = this.initTimeInSeconds;
        this.displayTime = this.getSecondsAsDigitalClock(this.timeInSeconds);

        this.ticker = new Ticker(1000);
        this.tickerSub = this.ticker.tick.subscribe(()=>{this.onTickerTick();});
    }

    public start() {
        if (this.ticker != null) {
            this.ticker.start();
        }
    }

    public stop() {
        if (this.ticker != null) {
            this.ticker.stop();
        }
        if (this.tickerSub != null) {
            this.tickerSub.unsubscribe();
            this.tickerSub = null;
        }
    }

    public pause() {
        if (this.ticker != null) {
            this.ticker.stop();
        }
    }

    private onTickerTick(){
        if (--this.timeInSeconds <= 0) {
            this.ticker.stop();
        }
        this.displayTime = this.getSecondsAsDigitalClock(this.timeInSeconds);
    }

    private getSecondsAsDigitalClock(inputSeconds: number) {
        // var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(inputSeconds / 3600);
        var minutes = Math.floor((inputSeconds - (hours * 3600)) / 60);
        var seconds = inputSeconds - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString;

        if (hours > 0 || this.initTimeInSeconds >= 3600) { hoursString = ((hours < 10) ? "0" + hours.toString() : hours.toString()) + ":"; }
        if (minutes > 0 || hours > 0 || this.initTimeInSeconds >= 60) { minutesString = ((minutes < 10) ? "0" + minutes.toString() : minutes.toString()) + ":"; }
        secondsString = (seconds < 10) ? "0" + seconds.toString() : seconds.toString();

        return hoursString + minutesString + secondsString;
    }


}