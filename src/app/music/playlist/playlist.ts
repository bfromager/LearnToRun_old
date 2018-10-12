import {FileService} from "../../files/file.service";

export class Playlist {
    private list: string[] = [];
    private currentList: string[] = [];
    private file: FileService = new FileService();

    constructor () {
        console.log('Playlist constructor');
    }

    getList (){
        return this.list;
    }

    private initPlaylist() {
        this.currentList = this.list.slice();
    }

    public getNextFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.currentList.length == 0) {
                this.initPlaylist();
                if (this.currentList.length == 0) {
                    reject("Playlist is empty");
                }
            }
            let nextFile = this.currentList.shift();

            this.file.exists(nextFile).then((result)=>{
                console.log('file.exists : ', result);
                resolve(nextFile);
            }).catch((error)=>{
                console.log('file.exists : error ', error);
                this.getNextFile()
                    .then((aFile:string)=>{
                        resolve(aFile);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            });
        });
    }

}
