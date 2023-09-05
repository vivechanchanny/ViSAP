import { Injectable } from '@angular/core';

import { LoggerService } from "../logger/logger.service";
import { HttpClientService } from "../common/http-client.service";
import { BaseService } from "../common/base.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AssignService extends BaseService {
  UserID;
  constructor(logger: LoggerService, httpClient: HttpClientService) {
    super(logger, httpClient);
   }
  

   getWorkspaceName(){
    let url = this.ViSAP.config.getworkspaceURL;
    const headers: Map<string, string> = new Map<string, string>();
    headers.set('X-UserToken', "true");
    return this.httpClient.get(url,headers).map((response: Response) => {
      if (response.toString() !== "") {
        return response;
      } else {
        return false;
      }
    }).catch(this.errHandler);
   }


   getWorkspaceUsers(userId){
    let url = this.ViSAP.config.wsUser;
    const headers: Map<string, string> = new Map<string, string>();
    headers.set('userID',userId);
    return this.httpClient.get(url,headers).map((response: Response) => {
      if (response.toString() !== "") {
        return response;
      } else {
        return false;
      }
    }).catch(this.errHandler);
   }


   getOwnerid(){
    let url = this.ViSAP.config.workspaceUrl;
    return this.httpClient.get(url).map((response: Response) => {
      if (response.toString() !== "") {
        return response;
      } else {
        return false;
      }
    }).catch(this.errHandler);
   }

   getGroups(ownerid){
    let url = this.ViSAP.config.wsGroup;
    const headers: Map<string, string> = new Map<string, string>();
    headers.set('UserID', ownerid);
    return this.httpClient.get(url,headers).map((response: Response) => {
      if (response.toString() !== "") {
        return response;
      } else {
        return false;
      }
    }).catch(this.errHandler);
   }

   getAssignmentDetails(videoId) {
    let url = this.ViSAP.config.wsassignurl;
    const headers: Map<string, string> = new Map<string, string>();
    headers.set('videoId', videoId);
    return this.httpClient.get(url,headers).map((response: Response) => {
      if (response.toString() !== "") {
        return response;
      } else {
        return false;
      }
    }).catch(this.errHandler);
   }

   updateAssignment(assignObj){
    let url = this.ViSAP.config.wsassignurl;
    const headers: Map<string, string> = new Map<string, string>();
    headers.set('X-Assign','true');
    return  this.httpClient.post(url, JSON.stringify(assignObj),headers).map((response: Response) => {
      if (response.toString() !== "") {
        return response;
      } else {
        return false;
      }
    }).catch(this.errHandler);
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
