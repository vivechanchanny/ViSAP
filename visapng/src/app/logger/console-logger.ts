
export class ConsoleLogger {

    info(msg) {
        console.info("INFO:" + msg);
    }

    /**
     * Log Warning messages
     * @param msg 
     */
    warn(msg) {
        console.warn("WARN:" + msg);
    }
    /**
     * Log fatal messages
     * @param msg 
     */
    fatal(msg) {
        console.error("FATAL:" + msg);
    }
    /**
     * Log Error messages
     * @param msg 
     */
    error(msg) {
        console.error("ERROR:" + msg);
    }

}