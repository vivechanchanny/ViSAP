import { Injectable } from '@angular/core';

import { LoggerService } from '../logger/logger.service';
import { Logable } from '../logger/logable';
import { HttpClientService } from '../common/http-client.service';


@Injectable()
/**
 * Base Srvice  class
 */
export class BaseService implements Logable {

    logger: any;
    ViSAP: any;
    constructor(protected _logger: LoggerService, protected httpClient: HttpClientService) {
        this.logger = _logger;
        this.ViSAP = window['ViTag'];
    }


}
