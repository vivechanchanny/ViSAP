import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { BaseComponent } from '../common/base.component';
import { VideoListService } from '../video-list/video-list.service';
import { AssignService } from '../assign/assign.service';
import { MessageService } from '../common/message.service';
import { LoggerService } from '../logger/logger.service';

declare function unescape(s: string): string;
declare function escape(s: string): string;

@Component({
  selector: 'vis-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent extends BaseComponent implements OnInit {
  ownerid;
  groups;
  workspaceId;
  workspaceDetails;
  usersList: Array<any>;
  groupUsers: Array<any>;
  stage;
  assignmentData: any;
  videoid;
  currentUsers = [];
  studentUsers = [];
  assignedGroup: any[] = [];
  assignedUsers: any[] = [];
  assignArray: any[];
  title: string;

  constructor(logger: LoggerService, private videoListService: VideoListService, private assignService: AssignService,
    private dialog: MdDialog, private messageService: MessageService, public dialogRef: MdDialogRef<AssignComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) {
    super(logger);
  }

  ngOnInit() {
    this.videoid = this.data.id;
    this.stage = JSON.parse(this.data.isStage);
    this.title = unescape(this.data.title);
    this.ownerid = this.data.userid;
    this.getAssignmentInfo();
  }

  /**
   * Already assined users and group list
   */
  getAssignmentInfo() {
    this.assignService.getAssignmentDetails(this.videoid).subscribe(result => {
      if (result !== null) {
        this.assignmentData = <Array<any>>result;
        this.getUsersList();
      }
    });
  }

  /**
   * get individual members of the workspace
   */
  getUsersList() {
    this.assignService.getWorkspaceUsers(this.ownerid).subscribe(result => {
      if (result !== null) {
        this.usersList = <Array<String>>result;
        this.loadAllUsers();
        this.loadGroupUsers();
      }
    });
  }

  /**
   * get group and its members
   */
  loadGroupUsers() {
    this.assignService.getGroups(this.ownerid).subscribe(result => {
      if (result !== null && result) {
        this.groups = this.loadMappedGroups(result);
        this.getMappedUsers();
      }
    });
  }

  /**
   *  Displaying user in group.
   */
  getMappedUsers() {
    this.groups.forEach((group, index) => {
      const mappedUsers = [];
      if (group.mappedusers) {
        group.mappedusers.forEach((element, i) => {
          this.currentUsers.forEach((user, j) => {
            if (this.stage === true && user.role === 3 && user._id === element) {
              group.mappedusers[i] = user;
              mappedUsers.push(user);
            } else if (this.stage === false && user._id === element) {
              group.mappedusers[i] = user;
            }
          });
        });
        if (this.stage) {
          this.groups[index].mappedusers = mappedUsers;
        }
      }
    });
  }

  /**
   * On Assigning the video to group or individual
   */
  assign() {
    //creating assignment object    
    let assignObj = [{
      assigneduser: this.assignedUsers,
      assignedgroup: this.assignedGroup,
      videoid: this.data.id
    }]; //json object for assignment
    this.assignService.updateAssignment(assignObj).subscribe(result => {
      if (result !== null) {
        this.messageService.showAlert("Saved successfully");
        this.dialogRef.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  /**
   * Show all the members in the modal pop up and excluse the current logged in users
   */
  loadAllUsers() {

    this.excludeCurrentUser();
    if (this.usersList !== null && this.usersList !== undefined) {
      let result = [];
      let mode = null;
      this.currentUsers.forEach((data, index) => {
        if (this.stage === true)
          mode = (this.currentUsers[index].role !== 2 && this.currentUsers[index].role !== 4)
        else
          mode = (this.currentUsers[index].role !== 2)
        if (mode && this.currentUsers[index].role === 3) {
          result.push(this.currentUsers[index]);
        }
        //if(mode && this.stage =false && this.currentUsers[index].role===4)
        if (mode && (this.stage === false) && this.currentUsers[index].role === 4) {
          result.push(this.currentUsers[index]);
        }
      });
      this.currentUsers = this.loadMappedUsers(result);
    }
  }

  /**
   * set assigned property of the user
   * if the video is assigned to user
   */
  loadMappedUsers(usersList) {
    this.assignmentData.assigneduser.forEach(userid => {
      this.currentUsers.forEach((user) => {
        if (user._id === userid) {
          user.isAssigned = true;
          this.assignedUsers.push(user._id);
        }
      });
    });
    return usersList;
  }

  /**
   * set assigned property of the group
   * if the video is assigned to group
   */
  loadMappedGroups(groupList) {
    this.assignmentData.assignedgroup.forEach(groupId => {
      groupList.forEach((group) => {
        if (group._id === groupId) {
          group.isAssigned = true;
          this.assignedGroup.push(group._id);
        }
      });
    });
    return groupList;
  }

  /**
   * Filter list of user except logged in user.
   */
  excludeCurrentUser() {
    this.usersList.forEach(data => {
      if (data._id !== this.ownerid && data.role !== 2) {
        // reset userslist isAssigned propertyand its model since the
        // user list is loaded only once while loading video list 
        if (data.isAssigned) {
          delete data.isAssigned;
        }
        this.currentUsers.push(data);
      }
      if (data.role === 4) {
        this.studentUsers.push(data);
      }
    });
  }

  /**
   * 
   * @param usersList on add/remove of the users checkbox
   */
  onCheckboxUsersChange(usersList) {
    if (usersList.isAssigned == true) {
      this.assignedUsers.push(usersList._id);
    } else {
      let i = this.assignedUsers.indexOf(usersList._id);
      if (i != -1) {
        this.assignedUsers.splice(i, 1);
      }
    }
  }

  /**
   * 
   * @param GrouplIst  on add/remove group checkbox
   */
  onCheckboxGroupChange(groupList) {
    if (groupList.isAssigned == true) {
      this.assignedGroup.push(groupList._id);
    } else {
      let i = this.assignedGroup.indexOf(groupList._id);
      if (i != -1) {
        this.assignedGroup.splice(i, 1);
      }
    }

  }

  /**
   * Close modal window
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Click events to toggle expansion is avoided
   * @param event 
   */
  disbleExpansion(event: Event) {
    event.stopPropagation();
  }

}
