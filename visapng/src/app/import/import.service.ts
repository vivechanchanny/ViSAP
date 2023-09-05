import { Injectable, Input } from '@angular/core';

import { LoggerService } from '../logger/logger.service';
import { HttpClientService } from '../common/http-client.service';
import { BaseService } from '../common/base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ImportService extends BaseService {
  updatevalue: string;

  /**
   * Constructor to call base class to invoke logger service and http services
   * @param logger
   * @param httpClient
   */
  constructor(logger: LoggerService, httpClient: HttpClientService) {
    super(logger, httpClient);
  }

  /**
   * Uploads file to repository
   * @param formData :filename,file
   */
  upload(formData) {
    this.updatevalue = 'insert';
    const url = this.ViSAP.config.wsFileuploadurl;
    return this.httpClient.post(url, formData).map((response: Response) => {
      if (response.toString() === '') {
        return true;
      } else {
        return false;
      }
    }).catch(this.errHandler);
  }

  /**
   * Posting data to DB once user successfully upload file to repository
   * @param opt :data  to be saved in database
   * @param isUpload ://isUpload is true only for the uploaded videos(because we are storing snapshot only for the uploaded videos)
   */
  save(opt, isUpload) {
    const data = { d: JSON.stringify([opt]), key: this.updatevalue, isStage: 'true', isUpload: isUpload };
    const url = this.ViSAP.config.wsvideourl;
    return this.httpClient.post(url, JSON.stringify(data)).map((response: Response) => {
      if (response.toString() !==  '') {
        return true;
      }
    }).catch(this.errHandler);

  }

  /**
   * Get the categories from DB
   * @param isStage
   */
  category(isStage) {
    const url = this.ViSAP.config.wsCategorySearchurl;
    const headers: Map<string, string> = new Map<string, string>();
    headers.set('isStage', 'true');
    return this.httpClient.get(url, headers).map((response: Response) => {
      if (response.toString() !== '') {
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

