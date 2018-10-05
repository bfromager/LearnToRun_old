import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CountDownComponent} from "./countdown/countDown.component";
import {Seance} from "./seance";
import {PlaylistsService} from "../music/playlist/playlists.service";
import {Playlist} from "../music/playlist/playlist";
import {MediaPlayerService} from "./mediaplayer/mediaPlayer.service";
import {AlarmService, AlarmType} from "./alarm/alarm.service";
import {Platform} from "ionic-angular";
import {PlaylistsServiceFactory} from "../music/playlist/playlists.service.factory";

@Component({
    selector: 'seance-component',
    templateUrl: 'seance.component.html',
})

export class SeanceComponent implements OnInit, OnDestroy {
    // @ViewChild('CountDownComponent') countdown: CountDownComponent;
    @ViewChild(CountDownComponent) countdown: CountDownComponent;

    private seance: Seance;
    private playlistsService: PlaylistsService;
    private playlist: Playlist;

    constructor(private mediaPlayer: MediaPlayerService, private alarm: AlarmService, private playlistsServiceFactory: PlaylistsServiceFactory, private platform: Platform){
    }

    ngOnInit() {
        this.playlistsService = this.playlistsServiceFactory.getService();
        this.playlist = this.playlistsService.getPlaylists()[0];
        this.mediaPlayer.setPlaylist(this.playlist);
    }

    ngOnDestroy() {
    }

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

}