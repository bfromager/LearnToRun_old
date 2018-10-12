import {File} from '@ionic-native/file';
import {Injectable, Injector/*, OnInit*/} from "@angular/core";
import {Platform} from "ionic-angular";
// https://angular.io/guide/dependency-injection-providers
// https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html

// @Injectable()
export class FileService /*implements OnInit*/ {
    private file: File;
    private platform: Platform;
    // private injector: Injector;

    constructor () {
        console.log('FileService constructor');

    /*}

    ngOnInit() {*/
        let injector = Injector.create({
            providers: [
                {provide: File, deps: []},
                {provide: Platform, deps: []},
            ]

        });

        this.file = injector.get(File);
        this.platform = injector.get(Platform);
        console.log(this.platform.platforms());
    }

    public exists(path: string): Promise<boolean>  {
        return new Promise((resolve, reject) => {
            let filePath = path.substring(0, path.lastIndexOf('/') + 1);
            let fileName = path.substring(path.lastIndexOf('/') + 1, path.length);

            if (this.platform.is('cordova')) {
                console.log("FileService CORDOVA");
                this.file.checkFile(filePath, fileName)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            else {
                console.log("FileService NOT cordova");
                if (fileName !== "not a file") {
                    resolve(true);
                }else{
                    reject("not a file");
                }
            }

        });
    }

}