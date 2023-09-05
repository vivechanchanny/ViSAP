import { Component, OnInit, Inject, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdButtonModule, MdCardModule, MdDialogModule, MdChipsModule, MdDatepickerModule, } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TagInputModule } from 'ngx-chips';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { HttpClientService } from '../common/http-client.service';
import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ImportService } from './import.service';
import { MessageService } from '../common/message.service';
import { VideoListService } from '../video-list/video-list.service';
import { ValidatorHelper } from '../common/validator-helper';

declare var $: any;
declare function unescape(s: string): string;
declare function escape(s: string): string;
@Component({
  selector: 'vis-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent extends BaseComponent implements OnInit {
  Form: FormGroup;
  title = '';
  desc = '';
  category = '';
  chips: string[];
  submitted = false;
  ccFileName: null;
  data: FormData;
  file: File;
  source: any;
  categorylist: any;
  height: string;
  formCtrl: FormControl;
  filteredOptions: Observable<string[]>;
  options: Array<any> = [];
  @Input() isStage = false;
  isEditMode;
  vidFileName: string;
  capFileName: string;
  capDirFileName: string;
  newCategoryList: string[] = [];
  @ViewChild('ytVideoID') ytVideoIDRef: ElementRef;
  @ViewChild('urlVideoID') urlVideoIDRef: ElementRef;
  @ViewChild('tempIframe') tempIframeRef: ElementRef;
  @ViewChild('vidFile') vidFileRef: ElementRef;
  @ViewChild('captionFile') captionFileRef: ElementRef;
  @ViewChild('dirUrlCcFile') dirUrlCcFileRef: ElementRef;
  @ViewChild('captionUrl') captionUrlRef: ElementRef;
  @ViewChild('dirCcFile') dirCcFileRef: ElementRef;
  @BlockUI() blockUI: NgBlockUI;

  constructor(logger: LoggerService, public dialogRef: MdDialogRef<ImportComponent>,
    @Inject(MD_DIALOG_DATA) public mddata: string, private httpClient: HttpClientService, private zone: NgZone,
    private fb: FormBuilder, private importService: ImportService, private videoList: VideoListService,
    private messageService?: MessageService) {
    super(logger);

    this.Form = fb.group({
      'title': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1),
                               ValidatorHelper.maxLength(255)])),
      'desc': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1)])),
      'category': new FormControl(null, Validators.compose([Validators.maxLength(255)])),
    });
  }

  ngOnInit() {
    this.loadCategoryList();
    this.formCtrl = new FormControl();
  }

  /**
   * Autocomplete for category field
   * @param val
   */
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  /**
   * Upload functionality of the normal videos are set here
   * @param form : title,desc,category
   */
  upload(form) {
    this.submitted = true;
    this.title = form.title;
    this.desc = form.desc;
    this.category = form.category;
    if (this.Form.valid) {

      if (form.category === undefined) {
        this.category = '';
      }
      this.file = this.vidFileRef.nativeElement.files[0];

      // Restricting only special characters in the title by validating string method.
      if (!this.validateString(this.title)) {
        this.messageService.showAlert('Title contained non supported characters.');
        return false;
      }

      const id = 0; // while creating id should be zero.
      if (!(this.tittleDuplicateCheck(id, this.title.toLowerCase()))) {
        this.messageService.showAlert('Duplicate title, a video of same title already exists. Please use a different title');
        return false;
      }

      if (this.ytVideoIDRef.nativeElement.value.trim() !== '') {
        this._logger.info('upload:upload video of the type Youtube');
        this.uploadYT();
        return false;
      }
      if (this.urlVideoIDRef.nativeElement.value.trim() !== '') {
        this._logger.info('upload:upload video of the type directurl');
        this.uploadVideoByURL();    // it supports MP4,OGG,WEBM
        return false;
      }
      this.data = new FormData();
      let replaceVid = true;
      const ccfile = this.captionFileRef.nativeElement.files[0];
       this.ccFileName = null;

      if (this.vidFileRef.nativeElement.value === '' || this.file.name.toLowerCase().indexOf('mp4') < 0) {
        this.messageService.showAlert('!Upload fails, please select MP4 videos to upload');
        return false;
      }
      if (this.validateFileName(this.file.name) === true) {
        this.messageService.showAlert('Video file name contains illegal characters.');
        this.vidFileRef.nativeElement.value('');
        return false;
      }
      // checks for illeagal cahraters in caption file name.
      if (this.captionFileRef.nativeElement.value !== '' && this.validateFileName(ccfile.name) === true) {
        this.messageService.showAlert('Caption file name contains illegal characters.');
        this.captionFileRef.nativeElement.value('');
        return false;
      }
      // caption file type(vtt) validation.
      if (this.checkCcFileType(this.captionFileRef.nativeElement) === true) {
        this.messageService.showAlert('Upload fails, please select vtt caption file to upload.');
        return false;
      }
      // appending caption file if caption file is imported.
      if (this.captionFileRef.nativeElement.value !== '') {
        this.data.append(ccfile.name, ccfile);
        this.ccFileName = ccfile.name;
      }

      if (this.getSource(this.videoList.videoList, this.file.name)) {
        replaceVid = false;
        this.messageService.showAlert('Video' + ' ' + this.file.name + ' ' + 'already exists in the repository,please upload new video');
      }

      this.data.append(this.file.name, this.file);

      this.logger.info('debug: Uploading video for the source ');
      // Uploads to repository
      if (replaceVid) {
        this.blockUI.start('');
        this.importService.upload(this.data).subscribe(result => {
          if (result === true) {
            this.getVidSS(this.file);
          } else {
            this.messageService.showAlert('video is not uploaded');
          }
        });
      }
    }
  }

  /**
   * when cancel button is clicked
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Video snapshot is captured while uploding video
   * @param file:filename
   */
  getVidSS(file) {
    const opt = this.getCanVid(file);
    setTimeout(() => {
      let w, h, cxt;
      w = opt.vid.videoWidth;
      h = opt.vid.videoHeight;
      opt.can.width = w;
      opt.can.height = h;
      cxt = opt.can.getContext('2d');
      cxt.fillRect(0, 0, w, h);
      cxt.drawImage(opt.vid, 0, 0, w, h);
      let snapshot: any = new Image();
      snapshot = opt.can.toDataURL();
      const category = this.newCategoryList;
      this.importService.save({ title: escape(this.title.trim()), snap: snapshot, videototalduration: Math.round(opt.vid.duration),
        desc: escape(this.desc.trim()), category: category, src: file.name, sourcetype: 0, caption: this.ccFileName }, 'true')
        .subscribe(result => {
          if (result === true) {
            this.messageService.showAlert('Video uploaded successfully....');
            this.cancel();
          } else {
            this.messageService.showAlert('video is not uploaded');
          }
          this.unblock();
        });
    }, 1000);
  }


  /**
   * Accepts file name as parameter and returns required snapshot attibutes need to get snapshot of the video
   * @param file:file
   */
  getCanVid(file) {
    const can = document.createElement('canvas');
    const vid = document.createElement('video');
    vid.src = window.URL.createObjectURL(file);
    vid.currentTime = 10;
    vid.muted = true;
    vid.autoplay = true;
    vid.crossOrigin = 'anonymous';
    return { can: can, vid: vid };
  }

  /**
   *  Upload functionality of the Youtube videos are set here
   */
  uploadYT() {
    let ytVideoId = this.ytVideoIDRef.nativeElement.value;
    if (ytVideoId.trim() === '') {
      this.messageService.showAlert('Upload fails, Youtube video id not entered.');
      return false;
    }
    if (ytVideoId.includes('\'')) {
      this.messageService.showAlert('Url contains single quote, please verify url.');
      return false;
    }
    // youtube id is taken from youtube  url
    const videoid = ytVideoId.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
      ytVideoId = videoid[1];
    }
    const source = this.getSource(this.videoList.videoList, ytVideoId);
    if (source) {
      this.replaceYTVideo(source, ytVideoId);
    } else {
      this.ViSAP.YTVideoUpload(ytVideoId, source, (ytPlayer) => {
        const ytDetails = this.getYTdetails(ytVideoId, ytPlayer);
        this.uploadYTVideo(ytDetails);
      });
    }
  }

  /**
   * Replacing the existing video ID
   * @param source:Existing source
   * @param ytVideoId:Youtubr ID
   */
  replaceYTVideo(source, ytVideoId) {
    this.messageService
      .confirm('Video ID ' + ytVideoId + ' already exists in the repository do you want to replace it?')
      .subscribe(yes => {
        if (yes) {
          const ytDetails = {
            _id: source._id, title: escape(this.title.trim()), snap: source.snap,
            desc: escape(this.desc.trim()), category: source.category, src: ytVideoId, videototalduration: source.videototalduration,
            yt: 'true', sourcetype: 1
          };
          this.uploadYTVideo(ytDetails);
        }
      });
  }

    /**
   * Upload /Update Youtube video
   * @param ytData :YTdetails: duraion,title.snapshot
   */
  uploadYTVideo(ytData) {
    this.blockUI.start('');
    this.importService.save(ytData, 'true').subscribe(result => {
      if (result === true) {
        this.messageService.showAlert('Video uploaded successfully....');
        this.cancel();
        $('#tempIframe').remove();
      } else {
        this.messageService.showAlert('video is not uploaded');
      }
      this.unblock();
    });
  }

  /**
   * this method gets yt details like ytDuration,snapshots,etc
   * @param videoID
   * @param source
   */
  getYTdetails(ytVideoID, ytPlayer) {
    ytPlayer.mute();
    const category = this.newCategoryList;
    const ytduration = ytPlayer.getDuration();
    const ytDetails = {
      title: escape(this.title.trim()), snap: 'http://img.youtube.com/vi/' + ytVideoID + '/0.jpg',
      desc: escape(this.desc.trim()), category: category, src: ytVideoID, videototalduration: Math.round(ytduration),
      yt: 'true', sourcetype: 1
    };
    return ytDetails;
  }


  /**
   * upload videos by giving url(mp4,ogg,webm)
   */
  uploadVideoByURL() {
    const videoURL = this.urlVideoIDRef.nativeElement.value;
    const dirUrlCcFile = this.dirUrlCcFileRef.nativeElement.files[0];
    let capName = null;
    // storing caption url and validating caption url if caption is a direct url.
    if (this.captionUrlRef.nativeElement.value !== '') {
      capName = this.captionUrlRef.nativeElement.value();
    }

    if (videoURL.trim() === '') {
      this.messageService.showAlert('Upload fails, video URL is not entered.');
      return false;
    }

    // validation for the valid URL.
    if (!this.validateURL(videoURL)) {
      this.messageService.showAlert('Please enter valid Video URL.');
      return false;
    }
    this._logger.info('uploadVideoByURL:upload video url ' + videoURL);
    // validation for different types of url(mp4,ogg,webm)
    if ((videoURL.toLowerCase().indexOf('mp4') < 0) && (videoURL.toLowerCase().indexOf('ogg') < 0)
      && (videoURL.toLowerCase().indexOf('webm') < 0)) {
      this.messageService.showAlert('Upload fails, video URL supports only .MP4,.OGG,.WEBM');
      return false;
    }

    // validating caption file type(vtt)
    if (this.checkCcFileType(this.dirUrlCcFileRef.nativeElement) === true) {
      this.messageService.showAlert('Upload fails, please select vtt caption file to upload.');
      return false;
    }

    // checking for illegal characters in caption file name
    if (this.dirUrlCcFileRef.nativeElement.value !== '') {
      if (this.validateFileName(dirUrlCcFile.name) === true) {
        this.messageService.showAlert('Caption file name contains illegal characters.');
        this.dirUrlCcFileRef.nativeElement.value('');
        return false;
      }

      const data = new FormData();
      // appending caption file to form data.
      data.append(dirUrlCcFile.name, dirUrlCcFile);
      capName = dirUrlCcFile.name;
      // storing caption file in caption repository.
      this.blockUI.start('');
      this.importService.upload(this.data).subscribe(result => {
        if (result === true) {
          // this.getVidSS(this.file);
          this._logger.info('Visap.edit:upload:Uploading caption file for direct video:  ' + capName);
        } else {
          alert('video is not saved');
        }
        this.unblock();
      });
    }
    const vid = document.createElement('video');
    vid.src = videoURL;
    const category = this.newCategoryList;
    const _video = this;
    // need to show uploading..message untill the video will upload successfully.
    // to get the directURL duration loademetadata event has been written(inside that saving to data to database).
    vid.addEventListener('loadedmetadata', function () {
      _video.importService.save({
        title: _video.title, snap: 'defaultImage.png', videototalduration: Math.round(vid.duration),
        desc: _video.desc, category: category, src: videoURL, sourcetype: 3, caption: capName
      }, 'true').subscribe(result => {
        if (result === true) {
          _video.messageService.showAlert('Video uploaded successfully.');
          _video.cancel();
        } else {
          _video.messageService.showAlert('Video is not uploaded.');
        }
      });
    }, false);
    // To show the error message for directurl videos, if the video url is not valid mp4 url.
    vid.addEventListener('error', function () {
      _video.mediaError();
    });

  }

  /**
   * On Error: while imporing video
   */
  mediaError() {
    this.messageService.showAlert('unable to import');
  }

  /**
   * validate video url
   * @param urlToValidate
   */
  validateURL(urlToValidate) {
    this.logger.info('Visap.edit:validateURL: URL check:' + urlToValidate);
    const myRegExp = /(ftp|http|https):\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!myRegExp.test(urlToValidate)) {
      return false;
    } else {
      return true;
    }

  }
  /**
   * validates video file name.
   * @param vidname
   */
  validateFileName(vidname) {
    const specialChars = '#%&*+|\:<>?\'\'\\';
    for (let i = 0; i < specialChars.length; i++) {
      if (vidname.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Restricting only special characters in the title by validating string method.
   * @param val
   */
  validateString(val) {
    this.logger.info('Visap.edit:validateString: validates string:' + val);
    const pattern = /^(.*?[a-zA-Z0-9].*)$/;
    if ((!val.match(pattern))) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * checks for caption file type(.vtt).
   * @param captionFile
   */
  checkCcFileType(captionFile) {
    const CaptionType = 'vtt';
    if (captionFile.value !== '' && captionFile.value.toLowerCase().indexOf(CaptionType) < 0) {
      return true;
    }
  }

  /**
   * Get category list.
   */
  loadCategoryList() {
    const categoryList = [];
    this.importService.category(this.isStage).subscribe(category => {
      let result: any;
      result = category;
      this.categorylist = result.Categories;

    });
  }

  /**
   * To check wheather the title is same or not
   * @param id :videoid
   * @param currentTtl :video title
   */
  tittleDuplicateCheck(id, currentTtl) {
    let isValidTittle = true;
    for (let i = 0; i < this.videoList.videoList.length; i++) {
      if ((id === 0 || id !== this.videoList.videoList[i]._id)
        && (unescape(this.videoList.videoList[i].title.toLowerCase()) === currentTtl)) {
        isValidTittle = false;
        break;
      }
    }
    return isValidTittle;
  }

  /**
   * Search returns based on sourcepassed
   * @param d:list of videos
   * @param s:source for search condition
   */
  getSource(d, s) {
    let source = null;
    if (d && d !== '') {
      source = d.filter((e, index) => {
        return e.src === s;
      })[0];
    }
    return source;
  }

  /**
   * Seraches the source based on ID
   * @param _id :video id
   */
  GetSource(_id) {
    return this.videoList.videoList ? this.videoList.videoList.filter((e, index) => {
      return e._id === _id;
    })[0] : null;
  }

  /**
   * this method checks whether object is defined or not
   * @param obj
   */
  isObjDefined(obj) {
    if (obj !== undefined) {
      return true;
    }
  }

  /**
   * Edited Tittle and desc  will be saved to database by checking the validations
   * @param form :title,desc,category
   */
  updateEditedTittleorDesc(form) {
    this.submitted = true;
    if (this.Form.valid) {
    const videoTitle = form.title;
    if (!this.validateString(videoTitle)) {
      this.messageService.showAlert('Title contained non supported characters.');
      return false;
    }
    const currentSource = this.GetSource(sessionStorage.getItem('videoid'));
    if (!this.isObjDefined(currentSource)) {
      return false;
    }
    const areSame: boolean = JSON.stringify(this.newCategoryList) === JSON.stringify(this.categorylist);
    // check if category is not updated: TODO
    if (unescape(currentSource.title) !== videoTitle || unescape(currentSource.desc) !== form.desc || !areSame) {
      if (unescape(currentSource.title) !== videoTitle && !(this.tittleDuplicateCheck(currentSource._id, videoTitle.toLowerCase()))) {
        this.messageService.showAlert('Duplicate title, a video of same title already exists. Please use a different title');
        return false;
      }
      currentSource.category = this.newCategoryList;
      currentSource.desc = escape(form.desc);
      currentSource.title = escape(videoTitle);

        this.importService.save(currentSource, 'true').subscribe(result => {
          if (result === true) {
            this.messageService.showAlert('Video details updated successfully!');
            this.cancel();
          }
        });
      } else {
        this.messageService.showAlert('No changes made to title, description and category');
    }
    }
  }

  /**
   *  category list
   * @param on addings category
   */
  onCategoryAdded(category: any) {
    // split the category by comma separated values
    if (category.value.indexOf(',') !== -1) {
      let splitCategory = category.value.split(/\s*,\s*/);
      // remove empty value after spliting
      splitCategory = splitCategory.filter(function (entry) { return entry.trim() !== ''; });
      const childCategory = this.newCategoryList.concat(splitCategory);
      // remove the duplicate vategory after comma separeted values
      const unique = childCategory.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      this.newCategoryList = unique;
    } else {
      this.newCategoryList.push(category.value);
    }

  }

  /**
   *  category list
   * @param on removing category
   */
  onCategoryRemoved(category: any) {
    this.newCategoryList.splice(this.newCategoryList.indexOf(category), 1);
  }

  /**
   * Unblock the brockdrop
   */
  unblock() {
    this.blockUI.stop();
  }

  onTabChange() {
    this.vidFileName = '';
    this.capFileName = '';
    this.capDirFileName = '';
    this.urlVideoIDRef.nativeElement.value = '';
    this.ytVideoIDRef.nativeElement.value = '';
  }

  onVidFileChange(event) {
    this.vidFileName = event.target.files[0].name;
  }

  onCapFileChange(event) {
    this.capFileName = event.target.files[0].name;
  }

  onCapDirFileChange(event) {
    this.capDirFileName = event.target.files[0].name;
  }

}
