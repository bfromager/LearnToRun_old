import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {TextToSpeech} from "@ionic-native/text-to-speech";

@Injectable()
export class VocalService {

    private tts: TextToSpeech = null;

    constructor (private platform: Platform) {
        if (this.platform.is('cordova') && (this.platform.is('android') || this.platform.is('ios') || this.platform.is('windows'))) {
            this.tts = new TextToSpeech();
        }
    }

    textToSpeech(text: string){
        // "Course lente. 1 minute, 2 minute. 3 minute... 4 minute ! Millieu de la séance"
        if (this.tts != null) {
            this.tts.speak({
                text: text,
                rate: 1.5,
                locale: "fr-FR"
            })
                .then(() => console.log("textToSpeech", 'Success'))
                .catch((reason: any) => alert(reason));
        } else {
            console.log("textToSpeech", text);
        }
    }

}
