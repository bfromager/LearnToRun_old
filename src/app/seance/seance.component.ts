import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Ticker} from "../../ticker/ticker";
import {CountDownComponent} from "./countdown/countDown.component";

@Component({
    selector: 'seance-component',
    templateUrl: 'seance.component.html',
})

export class SeanceComponent implements OnInit, OnDestroy {
    // @ViewChild('CountDownComponent') countdown: CountDownComponent;
    @ViewChild(CountDownComponent) countdown: CountDownComponent;


    btnTimerStart(){
        this.countdown.initCountDown(10);
        this.countdown.start();
    }

    btnTimerStop(){
        this.countdown.stop();
    }

    btnTimerPause(){
        this.countdown.pause();
    }

}
