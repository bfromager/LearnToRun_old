import {Injectable} from "@angular/core";

import {MediaPlayerService} from "../music/mediaPlayer.service";
import {FilePlayerService} from "./filePlayer.service";
import {VocalService} from "../vocal/vocal.service";

export enum AlarmType {
    WAVE = 0,
    VOCAL = 1,
    FADEOUT = 2,
    FADEIN = 3,
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
    // private isFaded = false;

    constructor(private mediaPlayer: MediaPlayerService, private filePlayer: FilePlayerService, private vocal: VocalService) {
    }

    trigger(alarm: Alarm){
        if (this.alarms.length == 0) {
            this.alarms.push({type:AlarmType.FADEOUT});
        }

        this.alarms.push(alarm);

        if (! this.isRunning) {
            this.triggerNext();
        }
    }

    private endTrigger() {
        if (this.alarms.length == 0) {
            this.mediaPlayer.fadeIn().then(()=>{
                this.triggerNext();
            });
        } else {
            this.triggerNext();
        }
    }

    private triggerNext(){
        if (this.alarms.length == 0) {
            this.isRunning = false;
            return;
        }

        this.isRunning = true;
        let alarm = this.alarms.shift();


        switch (alarm.type) {
            case AlarmType.FADEOUT : {
                this.mediaPlayer.fadeOut().then( () => {
                    this.endTrigger();
                });
                break;
            }

            // case AlarmType.FADEIN : {
            //     this.mediaPlayer.fadeIn().then( () => {
            //         this.endTrigger();
            //     });
            //     break;
            // }

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