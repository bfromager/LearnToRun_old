import {Component, OnInit} from "@angular/core";
import {Mp3} from "../mp3.interface";
import {Mp3ListService} from "./mp3list.service";

//https://www.joshmorony.com/a-guide-to-styling-an-ionic-2-application/

@Component({
    selector: 'mp3List-component',
    templateUrl: 'mp3List.component.html',
})
export class Mp3ListComponent implements OnInit {

    private mp3List: Mp3[] = [];

    constructor(private mp3ListService: Mp3ListService) {
    }

    ngOnInit() {
        this.mp3ListService.mp3Subject.subscribe(
            (mp3: Mp3) => {
                this.mp3List.push(mp3);
                console.log(mp3.name);
            }
        );
        this.mp3ListService.getList();
    }
}
