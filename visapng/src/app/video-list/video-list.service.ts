import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LoggerService } from '../logger/logger.service';
import { HttpClientService } from '../common/http-client.service';
import { BaseService } from '../common/base.service';


@Injectable()

export class VideoListService extends BaseService {

    private videoComponent = new Subject<any>();
    // Observable string streams
    response$ = this.videoComponent.asObservable();
    public videoList;

    /**
     * Constructor to call base class to invoke logger service and http services
     * @param logger
     * @param httpClient
     */
    constructor(logger: LoggerService, httpClient: HttpClientService, private router: Router) {
        super(logger, httpClient);
    }

    /**
     *  get the list of videos from the API
     */
    getVideos(isStage) {
        this.logger.info('Info: List of videos from service');
        const headers: Map<string, string> = new Map<string, string>();
        headers.set('isStage', isStage);
        return this.httpClient.get(this.ViSAP.config.wsvideourl, headers).map((response: Response) => {
            return this.videoList = response;
        });
    }

    /**
     * searching video by search key;
     * @param searchKey searching video by search key;
     */
    searchVideo(searchKey, isStage) {
        const headers: Map<string, string> = new Map<string, string>();
        headers.set('isStage', isStage);
        const jsonData = { searchKey: searchKey, isGallery: 'true' };
        return this.httpClient.post(this.ViSAP.config.wsVideoSearchurl, JSON.stringify(jsonData), headers)
        .map((response: Response) => {
            return response;
        }).catch(this.errHandler);
    }

    /**
     * Video integration
     * @param id
     */
    videoIntegrate(id) {
        this.videoComponent.next(id);
    }

    /**
    * Error handling
    * @param error
    */
    errHandler(error: Response): any {
        console.error(error);
        return Observable.throw(error || 'Error in fetching data');
    }
}
