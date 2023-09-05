import { Component,Input } from '@angular/core';
import { VgAPI } from 'videogular2/core';

export interface IMedia {
    title: string;
    src: string;
    type: string;
}

@Component({
    selector: 'app-custom-media',
    templateUrl: './custom-media.component.html',
    styleUrls: ['./custom-media.component.css']
})

export class CustomMediaComponent {
    src: string;
    durations: number[] = [5, 10, 20];
    duration = 5;
    currentIndex = 0;
    @Input() public coreapi;
    api: VgAPI;
    playlist: Array<IMedia> = [
        {
            title: 'Next Moon Mission',
            src: '../../assets/videos/NextMoonMission.mp4',
            type: 'video/mp4'
        },
        {
            title: 'YT TEST',
            src: 'B_asLPAZjWE',
            type: 'youtube'
        },
        
        {
            title: 'earthView',
            src: '../../assets/videos/earthView.mp4',
            type: 'video/mp4'
        },
        {
            title: 'CARS YT',
            src: 'EUd2N0U0_xk',
            type: 'youtube'
        },
        {

            title: 'Ryetec',
            src: 'http://techslides.com/demos/sample-videos/small.webm',
            type: 'streaming'
           
        }
    ];

    currentItem: IMedia = this.playlist[this.currentIndex];
    constructor() {
    }


    onPlayerReady(api: VgAPI) {
        //this.api = api;
        this.coreapi = this.api = api;
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(item: IMedia, index: number) {
         this.api.play();
        this.currentIndex = index;
        this.currentItem = item;
       
    }


}
