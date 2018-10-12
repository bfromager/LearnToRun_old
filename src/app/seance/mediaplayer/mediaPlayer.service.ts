import {Injectable} from "@angular/core";

import {MediaBase, MediaStatus} from "../../music/media/mediaBase";
import {MediaServiceFactory} from "../../music/media/media.service.factory";

import {Playlist} from "../../music/playlist/playlist";

@Injectable()
export class MediaPlayerService {

    private fileLoaded = false;
    private curFileName: string = "";
    private mediaService: MediaBase;
    private mediaStatus: MediaStatus = MediaStatus.NONE;
    private playlist: Playlist;

    constructor(private mediaServiceFactory: MediaServiceFactory) {
        this.mediaService = this.mediaServiceFactory.createNewService();
        this.mediaService.status.subscribe((status) => {
            this.onPlayStatus(status);
        });
    }

    public setPlaylist(playlist: Playlist) {
        this.playlist = playlist;
        this.playlist.getNextFile()
            .then((nextFile) => {
                this.curFileName = nextFile;
            })
            .catch((error)=>{
                alert(error)
            });
    }

    private load(file: string) {
        this.mediaService.load(file);
        this.fileLoaded = true;
    }

    play() {
        if (this.mediaStatus == MediaStatus.STARTING || this.mediaStatus == MediaStatus.RUNNING) return;
        if (this.curFileName == "") return;

        if (!this.fileLoaded) this.load(this.curFileName);
        this.mediaService.play();
    }

    pause() {
        this.mediaService.pause();
    }

    stop() {
        this.fileLoaded = false;
        this.mediaService.stop();
    }

    private onPlayStatus(status: MediaStatus) {
        console.log(status);
        this.mediaStatus = status;
        if (status == MediaStatus.FINISHED /*|| status == MediaStatus.NONE*/) {
            this.fileLoaded = false;

            this.playlist.getNextFile().then((nextFile) => {
                this.curFileName = nextFile;
                if (status == MediaStatus.FINISHED) {
                    this.play();
                }
            })
        }
    }

    fadeOut() : Promise<any> {
        return new Promise(resolve => {
            this.mediaService.fadeOut().then(()=>{
                    resolve(null)
            });
        });
    }

    fadeIn()  : Promise<any> {
        return new Promise(resolve => {
            this.mediaService.fadeIn().then(()=>{
                resolve(null)
            });
        });
    }
    // fadeOut(){
    //         this.mediaService.fadeOut().then(()=>{
    //                 console.log("fadeout done")
    //         });
    // }
    //
    // fadeIn(){
    //     this.mediaService.fadeIn().then(()=>{
    //         console.log("fadeIn done")
    //     });
    // }
}