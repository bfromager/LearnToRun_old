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

import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {VocalService} from "../../app/seance/alarm/vocal/vocal.service";

@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html'
})
export class DebugPage implements OnInit {

    constructor(public navCtrl: NavController
            , private vocal: VocalService
    ) {
    }

    ngOnInit() {
    }

    textToSpeech(){
        this.vocal.textToSpeech("Course lente. 1 minute, 2 minute. 3 minute... 4 minute ! Millieu de la séance");
    }


}
