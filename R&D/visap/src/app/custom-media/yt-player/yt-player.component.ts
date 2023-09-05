
import { Component, OnInit, ElementRef, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { IPlayable, IMediaSubscriptions } from 'videogular2/src/core/vg-media/i-playable';
import { VgStates, VgEvents } from 'videogular2/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { CustomMediaComponent } from '../custom-media.component';

@Component({
    selector: 'app-yt-player',
    templateUrl: './yt-player.component.html',
    styleUrls: ['./yt-player.component.css']
})
export class YtPlayerComponent implements OnInit, OnDestroy, IPlayable {
    private ytEvent;
    player: YT.Player;
    id: string;
    elem: any;
    time: any = { current: 0, total: 0, left: 0 };
    buffer: any = { end: 0 };
    buffered: any = { length: 1, end: end => 0 };
    canPlay: boolean = false;
    canPlayThrough: boolean = false;
    isMetadataLoaded: boolean = false;
    isWaiting: boolean = false;
    isCompleted: boolean = false;
    isLive: boolean = false;
    state: string = VgStates.VG_PAUSED;
    subscriptions: IMediaSubscriptions;
    textTracks: TextTrack[] = [];
    @Input() duration: number;
    @Input() src: string;
    timer: Observable<number>;
    timerSubs: Subscription;
    fssubscriptions: Subscription[] = [];
    playersize: any = { height: 0, width:0 };
    api;

    constructor(private ref: ElementRef,private parent: CustomMediaComponent) {
        this.elem = ref.nativeElement;
        this.id = this.elem.id;
        this.api = parent.coreapi;
        this.api.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    }

    onStateChange(event) {
        this.ytEvent = event.data;
    }
    // Save the player initial attributes once YT instance is ready 
    savePlayer(player) {
        this.player = player;
        this.playersize.width = this.elem.scrollWidth;
        this.playersize.height = this.elem.scrollHeight;
        this.player.setSize(this.elem.scrollWidth, this.elem.scrollHeight);
        // this.player.setSize(this.playersize.width, this.playersize.height);
        this.duration = this.player.getDuration();
        this.time.current = 0;
        this.time.total = this.duration;
        this.buffer.end = this.duration;
        this.buffered.end = end => this.duration;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_LOADED_METADATA));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY_THROUGH));
        this.play();// Once all the YT object imported to play automatically
    }

    ngOnInit() {
        this.timer = TimerObservable.create(0, 10);
    }

    ngOnChanges(changes: SimpleChanges) {
        //console.log(this.src);

    }

    onChangeFullscreen(){
        
      if(this.api.fsAPI.isFullscreen){
          this.player.setSize(window.innerWidth, window.innerHeight);
         
      }else{
            this.player.setSize(this.playersize.width, this.playersize.height);
         //  this.player.setSize(this.scrollWidth, this.scrollHeight);
      }
    }

  
    onComplete() {
        this.state = VgStates.VG_ENDED;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_ENDED));
        this.timerSubs.unsubscribe();
        // YT player to STOP the video when time completes
        this.player.stopVideo();
    }

    onProgress() {
        this.time.current += 0.01;
        this.currentTime = this.time.current;
        this.state = VgStates.VG_PLAYING;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));
        if (this.time.current >= this.time.total) {
            this.onComplete();
        }
    }

    play() {
        this.player.playVideo();
        this.player.seekTo(this.currentTime, true); // TODO: Need to find seekbar method      
        if (this.state === VgStates.VG_ENDED) {
            this.time.current = 0;
            this.currentTime = 0;
        }
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAY));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAYING));
        this.timerSubs = this.timer.subscribe(this.onProgress.bind(this));
    }

    set currentTime(seconds) {
        this.time.current = seconds;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));
    }

    get currentTime() {
        return this.time.current;
    }

    pause() {
        this.unsubscribe();
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
        this.state = VgStates.VG_PAUSED;
        this.player.pauseVideo();
        this.player.seekTo(this.currentTime, true); // TODO: Need to find seekbar method
    }

    unsubscribe() {
        if (this.timerSubs) {
            this.timerSubs.unsubscribe();
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    
}

