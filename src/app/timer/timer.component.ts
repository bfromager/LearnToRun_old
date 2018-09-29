// https://www.codingandclimbing.co.uk/blog/ionic-2-simple-countdown-timer

import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ITimer} from './timer.interface';
import {Ticker} from "../ticker/ticker";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'timer-component',
    templateUrl: 'timer.component.html',
    // style: ['timer.component.css']
})

export class TimerComponent implements OnInit, OnDestroy {

    @Input() timeInSeconds: number;
    private timer: ITimer;

    private tickerSub: Subscription;
    private ticker: Ticker = new Ticker(1000);

    constructor() {
    }

    ngOnInit() {
        console.log("TimerComponent Create");
        this.tickerSub = this.ticker.tick.subscribe(()=>{this.onTickerTick();});
        this.initTimer();
    }

    ngOnDestroy() {
        console.log("TimerComponent Destroy");
        //this.ticker.stop();
        //this.tickerSub.unsubscribe();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }
    hasStarted() {
        return this.timer.hasStarted;
    }

    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 0; }

        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }

    startTimer() {
        this.initTimer();
        this.timer.hasStarted = true;
        this.timer.hasFinished = false;
        this.timer.runTimer = true;
        this.ticker.start();
    }

    stopTimer() {
        this.ticker.stop();
        this.timer.hasStarted = false;
        this.timer.hasFinished = true;
        this.timer.runTimer = false;
    }

    pauseTimer() {
        this.ticker.stop();
        this.timer.runTimer = false;
    }

    resumeTimer() {
        this.timer.runTimer = true;
        this.ticker.start();
    }

    onTickerTick(){
        //console.log("Ticker tick");
        this.timer.secondsRemaining--;
        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
        if (this.timer.secondsRemaining <= 0) {
            this.stopTimer();
        }
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        // var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(inputSeconds / 3600);
        var minutes = Math.floor((inputSeconds - (hours * 3600)) / 60);
        var seconds = inputSeconds - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString;

        if (hours > 0 || this.timeInSeconds >= 3600) { hoursString = ((hours < 10) ? "0" + hours.toString() : hours.toString()) + ":"; }
        if (minutes > 0 || hours > 0 || this.timeInSeconds >= 60) { minutesString = ((minutes < 10) ? "0" + minutes.toString() : minutes.toString()) + ":"; }
        secondsString = (seconds < 10) ? "0" + seconds.toString() : seconds.toString();

        return hoursString + minutesString + secondsString;
    }

}