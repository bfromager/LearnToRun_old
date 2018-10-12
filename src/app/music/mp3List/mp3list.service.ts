// https://forum.ionicframework.com/t/how-do-i-retrieve-and-save-internal-audio-mp3-locations/76932
// https://stackoverflow.com/questions/34384319/ionic-cordova-get-all-mp3-files-from-sdcard

// https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

// https://stackoverflow.com/questions/28003362/how-to-get-mp3-info-in-cordova
// https://github.com/cfjedimaster/Cordova-Examples/tree/master/mp3reader
// https://www.raymondcamden.com/2015/04/29/working-with-mp3s-id3-and-phonegapcordova/

import {File} from '@ionic-native/file';
import {Platform} from "ionic-angular";
import {Subject} from "rxjs/Subject";
import {Mp3} from "../mp3.interface";
import {Injectable} from "@angular/core";

@Injectable()
export class Mp3ListService {
    mp3Subject = new Subject<Mp3>();

    constructor(private platform: Platform, private file: File) {
    }

    getList() {
        this.listMp3Files('Music');
        // if (this.platform.is('android')) {
        //     this.listMp3Files('Music');
        // }
        // else {
        // }
    }
    listMp3Files(path: string) {
        let root : string;
        if (this.platform.is('android')) {
            root = this.file.externalRootDirectory;
        }
        else {
            root = this.file.applicationDirectory;
            console.log(root);
        }

        this.file.listDir(root, path)
            .then(result => {
                for (let item of result) {
                    if (item.isDirectory == true && item.name != '.' && item.name != '..') {
                        this.listMp3Files(path + '/' + item.name);
                    }
                    else if (item.isFile == true && item.name.substr(item.name.lastIndexOf('.') + 1).toLowerCase() == 'mp3') {
                        //File found
                        this.mp3Subject.next(<Mp3>{
                            name: item.name,
                            path: item.fullPath
                        });
                    }
                }
            })
            .catch (error => {
                this.mp3Subject.next(<Mp3>{
                    name: "No such directory",
                    path: error
                });
            });
    }
}
