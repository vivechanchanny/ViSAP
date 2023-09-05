import { Injectable } from '@angular/core';

@Injectable()
export class RouteInfo {

    private _details: RouteDetails;

    constructor() {
        this._details = new RouteDetails();
    }

    /**
     * Set the routes on change of the tabs
     * @param current: current route
     * @param prev: previous route
     */
    public setRoutes(current: string, prev: string) {
        this._details.currentUrl = current;
        this._details.prevUrl = prev;
        this.persistRoutes();
    }

    /**
     * get the route details
     */
    public get Details(): RouteDetails {
        if (this._details.currentUrl === undefined || this._details.currentUrl === '') {
            this.setRoutesFromPersist();
        }
        return this._details;
    }

    /**
     * Identifies if the current or previous URL is a collaboration URL
     * @param checkCurrent Specifies if the current URL is to be checked 
     * else previous URL is validated, default: false
     */
    public isCollaboration(checkCurrent: boolean = false): boolean {
        const validateUrl = checkCurrent ? this.Details.currentUrl : this.Details.prevUrl;
        if ( validateUrl === '/collaboration') {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Save to localStorage
     */
    private persistRoutes(): void {
        sessionStorage.setItem('prevUrl', this._details.prevUrl);
        sessionStorage.setItem('currentUrl', this._details.currentUrl);
    }

    /**
     * Get values from localStorage and populate _details
     */
    private setRoutesFromPersist() {
        this._details.prevUrl = sessionStorage.getItem('prevUrl');
        this._details.currentUrl = sessionStorage.getItem('currentUrl');
    }


}

/**
 * Route details class
 */
export class RouteDetails {
    public prevUrl: string;
    public currentUrl: string;
}
