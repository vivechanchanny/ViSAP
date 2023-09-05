import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { PlayerComponent } from '../player/player.component';
import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
 

@Component({
  selector: 'vis-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent extends BaseComponent implements OnInit {
  isStage = false;
  @ViewChild(PlayerComponent) player: PlayerComponent;

  constructor(logger: LoggerService, private router?: Router) {
    super(logger);
  }

  /**
   *  On nginit
   */
  ngOnInit() {
  }
  /**
 *  Invoke visap player instance and initialise th player component
 * @param videoid
 */
  onPlayEvent(videoid: string) {

    this.logger.info('Info: Playing a video:');
    this.router.navigate(['/play', videoid]);
  }








}
