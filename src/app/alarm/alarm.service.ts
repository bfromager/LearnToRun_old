import {Injectable} from "@angular/core";

import {MediaPlayerService} from "../music/mediaPlayer.service";
import {FilePlayerService} from "./filePlayer.service";
import {VocalService} from "../vocal/vocal.service";

export enum AlarmType {
    WAVE = 0,
    VOCAL = 1,
}
export interface Alarm {
    type: AlarmType,
    path?: string,
    msg?: string,
}
@Injectable()
export class AlarmService {

    private alarms: Alarm[] = [];
    private isRunning = false;
    private isFaded = false;

    constructor(private mediaPlayer: MediaPlayerService, private filePlayer: FilePlayerService, private vocal: VocalService) {
    }

    trigger(alarm: Alarm){
        this.alarms.push(alarm);
        this.triggerNext();
    }

    private triggerNext(){
        if (! this.isRunning) {
            this.isRunning = true;
            let alarm = this.alarms.pop();

            if (!this.isFaded) {
                this.isFaded = true;
                this.mediaPlayer.fadeOut();
            }

            switch (alarm.type) {
                case AlarmType.WAVE : {
                    this.filePlayer.play(alarm.path).then( () => {
                            this.endTrigger();
                        });
                    break;
                }

                case AlarmType.VOCAL : {
                    this.vocal.textToSpeech(alarm.msg).then( () => {
                        this.endTrigger();
                    });
                    break;
                }
            }
        }
    }

    private endTrigger() {
        this.isRunning = false;
        if (this.alarms.length == 0) {
            this.mediaPlayer.fadeIn();
            this.isFaded = false;
        } else {
            this.triggerNext();
        }

    }
}