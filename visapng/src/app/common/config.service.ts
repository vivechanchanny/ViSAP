import { Injectable, Input } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { BaseService } from '../common/base.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
/**
 * Configuration Service class
 */
export class ConfigService extends BaseService {
    data;
    constructor(logger: LoggerService, httpClient: HttpClientService) {
        super(logger, httpClient);

    }


    /**
     * config related things are fetched and utilised.
     */
    loadConfig() {
        const URLvalues = {
                videoRepositoryURL: 'videoRepositoryURL',
                snapshotRepositoryURL: 'snapshotRepositoryURL',
                displayCarousel: 'displayCarousel',
                postingVidTmInterval: 'postingVidTmInterval'
            };
        const url = this.ViSAP.config.wsConfigLoadurl;
        const data = JSON.stringify(URLvalues);
        return this.httpClient.post(url, data);
    }

    /**
     * Get the configuration data when ever needed by any other component
     */
    getConfigData() {
        return this.data;
    }



}
