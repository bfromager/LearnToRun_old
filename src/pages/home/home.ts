import {Component, OnInit} from '@angular/core';
import {NavController/*, Platform*/} from 'ionic-angular';

import {Mp3ListService} from "../../app/music/mp3list.service";
import {MediaPlayerService} from "../../app/music/mediaPlayer.service";
import {Mp3} from "../../app/music/mp3.interface";
import {TextToSpeech} from "@ionic-native/text-to-speech";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private mp3List: Mp3[] = [];

  private tts: TextToSpeech = new TextToSpeech();

  constructor(public navCtrl: NavController
            , private mp3ListService: Mp3ListService
            , private mediaPlayer: MediaPlayerService
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
      // this.tts.speak({
      //   text: "Course lente. 1 minute, 2 minute. 3 minute... 4 minute ! Millieu de la séance",
      //   locale: "fr-FR"
      // })
      // .then(() => console.log('Success'))
      // .catch((reason: any) => console.log(reason));
    this.tts.speak({
      text: "Course lente. 1 minute, 2 minute. 3 minute... 4 minute ! Millieu de la séance",
      rate: 1.5,
      locale: "fr-FR"
    })
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
    // this.tts.speak({
    //   text: "Course lente. 1 minute, 2 minute. 3 minute... 4 minute ! Millieu de la séance",
    //   rate: 1,
    //   locale: "fr-FR"
    // })
    //     .then(() => console.log('Success'))
    //     .catch((reason: any) => console.log(reason));
  }
}
