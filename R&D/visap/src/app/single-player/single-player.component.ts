import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-single-player',
    templateUrl: './single-player.component.html',
    styleUrls: [ './single-player.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlayerComponent implements OnInit {
    sources: Array<Object>;

    constructor() {
        this.sources = [
             {
                src: "http://techslides.com/demos/sample-videos/small.webm",
                type: "video/webm"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            }
           
        ];
    }

    ngOnInit() {
    }
}
