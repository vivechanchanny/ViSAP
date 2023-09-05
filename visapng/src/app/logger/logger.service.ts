import { Injectable } from '@angular/core';
//import { Diary, Configuration } from 'diary';
import { ConsoleLogger } from './console-logger';


@Injectable()
/**
 * Configuration Service class
 */
export class LoggerService {

    logger: any;

    constructor() {
        this.logger = new ConsoleLogger();
    }

    /**
     *Log innfo messages
     * @param msg 
     */
    info(msg) {
        this.logger.info(msg);
    }

    /**
     * Log Warning messages
     * @param msg 
     */
    warn(msg) {
        this.logger.warn(msg);
    }
    /**
     * Log fatal messages
     * @param msg 
     */
    fatal(msg) {
        this.logger.fatal(msg);
    }
    /**
     * Log Error messages
     * @param msg 
     */
    error(msg) {
        this.logger.error(msg);
    }

     /**
     * Log debug messages
     * @param msg 
     */
    debug(msg) {
        this.logger.debug(msg);
    }
}
