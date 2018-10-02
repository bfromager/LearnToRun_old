/*TODO

  DONE - Event fade in / fade out
  DONE - pb ratio volume MediaService <-> TextToSpeach
  DONE - changer mp3ListService en composant
  - mettre des css valides sur les composants
  - Implémenter le fileExists dans playlist.ts -> getNextFile
  - Récupérer les tags mp3
  - Dans certains cas, la liste des mp3 est vide
  - parametriser Timer.component
  - Faire un composant Seance (playlist + alarm + timer)
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

import {MediaPlayerService} from "../../app/seance/mediaPlayer.service";
import {VocalService} from "../../app/seance/alarm/vocal/vocal.service";
import {AlarmService, AlarmType} from "../../app/seance/alarm/alarm.service";
import {CountDownComponent} from "../../app/seance/countdown/countDown.component";

@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html'
})
export class DebugPage implements OnInit {
    // @ViewChild('CountDownComponent') countdown: CountDownComponent;
    @ViewChild(CountDownComponent) countdown: CountDownComponent;

    constructor(public navCtrl: NavController
            , private mediaPlayer: MediaPlayerService
            , private vocal: VocalService
            , private alarm: AlarmService
            , private platform: Platform
    ) {
    }

    ngOnInit() {
    }

    btnPlay(){
        this.mediaPlayer.play();
    }
    btnPause(){
        this.mediaPlayer.pause();
    }
    btnStop(){
        this.mediaPlayer.stop();
    }
    btnFadeIn(){
        this.mediaPlayer.fadeIn();//.then(console.log("fade done"));
    }
    btnFadeOut(){
        this.mediaPlayer.fadeOut();//.then(console.log("fade done"));
    }

    textToSpeech(){
        this.vocal.textToSpeech("Course lente. 1 minute, 2 minute. 3 minute... 4 minute ! Millieu de la séance");
    }

    btnAlarm(){
        let rootDir = "";

        if (this.platform.is('android')) {
          rootDir = '/android_asset/www/';
        }

        // this.filePlayer.play(rootDir + 'assets/sound/Alarme.wav').then(()=>{ alert("done"); });
        this.alarm.trigger({type:AlarmType.WAVE, path: rootDir + 'assets/sound/Alarme.wav'});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: 'Course lente.'});
        this.alarm.trigger({type:AlarmType.VOCAL, msg: '1 minute.'});
    }


    btnTimerStart(){
        this.countdown.initCountDown(10);
        this.countdown.start();
    }
    btnTimerStop(){
        this.countdown.stop();
    }
}
