import { Injectable, Input } from '@angular/core';

import { LoggerService } from '../logger/logger.service';
import { HttpClientService } from '../common/http-client.service';
import { BaseService } from '../common/base.service';


@Injectable()
export class BookmarkListService extends BaseService {
    tags;
    links;
    /**
     * Constructor to call base class to invoke logger service and http services
     * @param logger
     * @param httpClient
     */
    constructor(logger: LoggerService, httpClient: HttpClientService) {
        super(logger, httpClient);

    }
    /**
     * Initialise the tags list of the current videos which is being played
     * @param videoData :videoData : current video source metadata
     */
    setTags(videoData) {
        this.tags = videoData.tags;
    }

    /**
     * Set the links of the current videos
     * @param videoData : current video source metadata
     */
    setLinks(videoData) {
        this.links = videoData.links;

    }

    /**
     * Get the current videos tags list
     */
    getTags() {
        return this.ViSAP.CurrentTags();
    }

    /**
     * Get the current videos link list
     */
    getLinks() {
        return  this.ViSAP.CurrentLinks();
    }


}
