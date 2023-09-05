import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { CustomMediaComponent } from './custom-media.component';
import { FormsModule } from '@angular/forms';
import { SvgViewerComponent } from './svg-viewer/svg-viewer.component';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { YtPlayerComponent } from './yt-player/yt-player.component';
import { VgStreamingModule } from "videogular2/streaming";
import { VgBufferingModule } from "videogular2/buffering";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        VgCoreModule,
        VgControlsModule,
        YoutubePlayerModule,
        VgBufferingModule,
        VgStreamingModule
    ],
    declarations: [
        CustomMediaComponent,
        SvgViewerComponent,
        YtPlayerComponent
    ]
})
export class CustomMediaModule {
}
