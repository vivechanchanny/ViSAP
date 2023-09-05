import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 *  Injectable service which works on HTTP related data transfer 
 */
@Injectable()
export class HttpClientService {
    authToken: string;
    constructor(private _http: Http) { }

    /**
     * Append headers to the request 
     * @param headers 
     */
    private appendAuthHeaders(headers: Headers) {
        if (this.authToken != null) {
            headers.append('X-Authorization', this.authToken);
        } else {
            //TODO:
            this.authToken = sessionStorage.getItem('authT');
            headers.append('X-Authorization', this.authToken);
        }

    }

    /**
     * Any optional headers are passed that are appended to header list
     * @param headers 
     * @param options 
     */
    private appendOptionalHeaders(headers: Headers, options: Map<string, string>) {
        if (options) {
            options.forEach((value, key) => {
                headers.append(key, value)
            });
        }
    }

    /**
     * Gets data from API services
     * @param url URL from where to get the values
     * @param headers (optional) headers to be passed while making Http call
     */
    get(url: string, headers?: Map<string, string>) {

        let headersToPass = new Headers();
        // Append Auth Headers
        this.appendAuthHeaders(headersToPass)
        // Append Optional Headers
        this.appendOptionalHeaders(headersToPass, headers);
        return this._http.get(url, {
            headers: headersToPass
        }).map(response => response.json())
            .catch(this.errHandler);

    }

    /**
     *  Post the data to API services
     * @param url
     * @param options are added to request body while making Http call
     */
    // config related things are fetched and utilised.
    post(url: string, body: any, header?: Map<string, string>) {
        const headersToPass = new Headers();
        // Append Auth Headers
        this.appendAuthHeaders(headersToPass);
        // Append Optional Headers
        this.appendOptionalHeaders(headersToPass, header);
        return this._http.post(url, body, {
            headers: headersToPass
        }).map(response => {
            return response.arrayBuffer().byteLength > 0 ? response.json() : '';
        })
        .catch(this.errHandler);
    }

    /**
     *  Auth the data to get the login details
     * @param url 
     * @param body
     */
    auth(url: string, body: any) {
        return this._http.post(url, body, {
        }).map(response => {
            return response.arrayBuffer().byteLength > 0 ? response.json() : "";
        })
            .catch(this.errHandler);

    }

    /**
     * Custom method to handle error : TODO//
     * @param error 
     */
    errHandler(error: Response): any {
        console.error(error);
        return Observable.throw(error || 'Error in fetching data');
    }

}
