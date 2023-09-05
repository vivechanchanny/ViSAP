import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from "../common/base.component";
import { LoggerService } from "../logger/logger.service";
import { ActionService } from "../common/action.service";
import { ValidatorHelper } from '../common/validator-helper';

@Component({
  selector: 'vis-actions-links',
  templateUrl: './actions-links.component.html',
  styleUrls: ['./actions-links.component.css']
})
export class ActionsLinksComponent extends BaseComponent implements OnInit {
  submitted;
  Form: FormGroup;
  linkname: string;
  linkurl: string ;
  linkEditedTime: any = null;
  previouslink: string = "";
  callbackObject: any;
  isEdit:boolean = false;
  links: any;
  constructor(logger: LoggerService, private fb: FormBuilder, private action: ActionService) {
    super(logger);
    this.Form = fb.group({
      'linkname': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1),
                                   ValidatorHelper.maxLength(255)])),
      'linkurl': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1),
                                   ValidatorHelper.validateUrl()]))
    });
  }

  /**
   * Page initialisation
   */
  ngOnInit() {
   this.showLinks();
  }

  /**
   * Create/Update links
   * @param linkdata
   */
  onSave(linkdata, isValid) {
    this.submitted = true;
    let linkExist = this.checkLinksExist();
    if (isValid && !linkExist) {
      let linkTime;
      this.linkEditedTime ? linkTime = this.linkEditedTime : linkTime = this.ViSAP.getCurrentTime();
      var url = this.linkurl;
      let datatopass = { n: linkdata.linkname, u: url };
      this.ViSAP.removePreviousLink(this.previouslink);
      this.action.save(this.ViSAP.AddLinks, datatopass);
      this.resetlinkValues();
      this.showLinks();
    }
  }

  /**
   * Once user click in edit to set the edited values on the text field
   * @param linksData 
   */
  onEdit(linksData) {
    this.isEdit = true;
    this.previouslink = this.linkname = linksData.n;
    this.linkurl = linksData.u;
    this.linkEditedTime = linksData.t;
   
  }

  /**
   *  Deletion of the link
   * @param linksData : data needed to compare and delete the links
   */
  onDlelete(linksData) {
     this.action.delete(this.ViSAP.RemoveLink,linksData.n);
     this.resetlinkValues();
  }

   /**
   *  cancel the action an resume to play mode.
   */
  cancel() {
    this.Form.reset('');
    this.action.cancel();
  }

  /**
   * reset links input parameters and edited values
   */
  resetlinkValues() {
    this.linkname = null;
    this.previouslink = "";
    this.linkEditedTime = null;
    this.submitted = false;
    this.linkurl = null;
    this.isEdit = false;
  }

  
  /**
   * check links is alredy present or not
   */
  checkLinksExist(){
   var isExist= this.action.checkBookmarkExist(this.isEdit,this.previouslink,this.linkname,this.ViSAP.checkForLinkExist);
   return isExist;
  }

  /**
   * List of links to edit/delete
   */
  showLinks(){
    this.links = this.ViSAP.CurrentLinks();
  }

    /**
   * Navigate url to link
   * @param url 
   */
  onNavigate(url){
    window.open(url, "_blank");
}



}
