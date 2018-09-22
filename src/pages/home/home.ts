import {Component, OnInit} from '@angular/core';
import {NavController/*, Platform*/} from 'ionic-angular';

import {Mp3ListService} from "../../app/music/mp3list.service";
import {MediaPlayerService} from "../../app/music/mediaPlayer.service";
import {Mp3} from "../../app/music/mp3.interface";
import {VocalService} from "../../app/vocal/vocal.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private mp3List: Mp3[] = [];

  constructor(public navCtrl: NavController
            , private mp3ListService: Mp3ListService
            , private mediaPlayer: MediaPlayerService
            , private vocal: VocalService
  ) {
  }

  ngOnInit() {
      console.log("OnInit");

      this.mp3ListService.mp3Subject.subscribe(
          (mp3: Mp3) => {
            this.mp3List.push(mp3);
            console.log(mp3.name);
          }
      );
      this.mp3ListService.getList();
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
      this.mediaPlayer.fadeIn();
  }
  btnFadeOut(){
      this.mediaPlayer.fadeOut();
  }

  textToSpeech(){
      this.vocal.textToSpeech("Course lente. 1 minute, 2 minute. 3 minute... 4 minute ! Millieu de la séance");
  }
}
