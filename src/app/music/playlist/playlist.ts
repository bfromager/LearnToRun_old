
export class Playlist {
    private list = [];
    private currentList = [];

    getList (){
        return this.list;
    }

    private initPlaylist() {
        this.currentList = this.list.slice();
    }

    // private getNextExistingFile(): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         if (this.currentList.length == 0) {
    //             this.initPlaylist();
    //             if (this.currentList.length == 0) {
    //                 reject("Playlist is empty");
    //             }
    //         }
    //         let aFile = this.currentList.shift();
    //         let filePath = aFile.substring(0, aFile.lastIndexOf('/') + 1);
    //         let fileName = aFile.substring(aFile.lastIndexOf('/') + 1, aFile.length);
    //
    //         if (fileName == "not a file") {
    //             this.getNextExistingFile()
    //                 .then((_file:string)=>{
    //                     resolve(_file);
    //                 })
    //                 .catch(()=>{
    //                     reject("");
    //                 })
    //         }else{
    //             resolve(aFile);
    //         }
    //     });
    // }
    // public getNextFile(): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         this.getNextExistingFile()
    //             .then( (aFile:string) => {
    //                 resolve(aFile);
    //             })
    //             .catch ( (error) => {reject(error);});
    //     });
    // }
    public getNextFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.currentList.length == 0) {
                this.initPlaylist();
                if (this.currentList.length == 0) {
                    reject("Playlist is empty");
                }
            }
            let nextFile = this.currentList.shift();
            let filePath = nextFile.substring(0, nextFile.lastIndexOf('/') + 1);
            let fileName = nextFile.substring(nextFile.lastIndexOf('/') + 1, nextFile.length);

            if (fileName == "not a file") {
                this.getNextFile()
                    .then((aFile:string)=>{
                        resolve(aFile);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            }else{
                resolve(nextFile);
            }
        });
    }

}
