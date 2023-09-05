 ///This assign.js file will assign the video's to selected groups and Individuals users.
  
  var groups=null;//list of groups

(function (ns) {
 //-----------------------------------Private region starts--------------------------------------------------//
    var internal = {
        //updating the assign collection from the video owner 
    	updateAssignment:function(assignObj,fnSuccess,fnError){
    	 ViTag.info("visap.assign:The user who is assigning or unassigning the video:"+sessionStorage.getItem('AppUser'));
				  $.ajax({
                    url: ViTag.config.wsassignurl,   //this is the workspace assign.do handler
                    type: "POST",
                     async: false,
                    headers: {  'X-Authorization': sessionStorage.getItem('authT'),'X-Assign':true},
                    data: { data: JSON.stringify([assignObj]) },
                    success: fnSuccess,
                    error: fnError
                });
 		},	
 		
 		//To get the assignment details for particular video
 		getAssignment:function(){
 		 $.ajax({
                    url: ViTag.config.wsassignurl,   //this is the workspace assign.do handler
                    type: "POST",
                     async: false,
                    headers: {  'X-Authorization': sessionStorage.getItem('authT')},
                    data: { videoId: ns.Assign.videoid },
                    success: function (data) {
                   	   ns.assignmentData=$.parseJSON(data);
                    },
                    error: function () {
                    ViTagUI.initMsg("msg.getAssignment","info","assign.Saving");
                    }
                });
 		
 		},
 		//to select the checkbox based on the assigned user
 		selectAssignedUserChecbox:function(){
 		        var assignedObj=ns.assignmentData;
 		        //To make checkbox selected in the  edit mode of assignment
 		         $.each(assignedObj.assigneduser, function (i) {
 		                     $("input:checkbox[name=user]").each(function(){
 		                        if(assignedObj.assigneduser[i]===$(this).val()) //typeof assignedObj.assigneduser[i] is string
 		                              $(this).prop('checked', true);
 		                      });
 		         });
 		         
 		          $.each(assignedObj.assignedgroup, function (j) {
 		                     $("input:checkbox[name=group]").each(function(){
 		                        if(assignedObj.assignedgroup[j]===$(this).val())
 		                              $(this).prop('checked', true);
 		                      });
 		         });
 		},
 		
 		//common method for assigning and Unassigning the video from group or individuals user.
 		 getAssignmentInfo:function(){
		      $("input:checkbox[name=group]:checked").each(function(){
		            ViTagUI.Assign.assignedgroup.push($(this).val());
		      });
		      $("input:checkbox[name=user]:checked").each(function(){
		            ViTagUI.Assign.assigneduser.push($(this).val());
		      });
		      if((ViTagUI.Assign.assignedgroup.length+ViTagUI.Assign.assigneduser.length)===0){
				      return true;
		      }
       },
        
      //Get groups from workspace.
     getGroups:function(){
      
            $.ajax({
                 url:ViTag.config.wsGroup,
                async: false,
                type: "GET",
                headers: {'UserID':ns.ownerid},
 				success: function (data) {
                  groups = JSON.parse(data); 
                },
                error: function () {
                	ViTagUI.initMsg("msg.getGroups","info","assign.Saving");
                }
            });
          },
          
        //getting mapped user name by mappedId.  
        getMappedUser:function(mappedId){
        
             for(var i=0;i<ns.usersList.length;i++)
             {
                 if(ns.usersList[i]._id === mappedId)
                 return ns.usersList[i];
            }
         },
          
        //User list based on workspace.
        getWorkspaceUsers:function(){
              //Get users from workspace.
                    $.ajax({
                         url:ViTag.config.wsUser,
                        async: false,
                        type: "GET",
                        headers: {'userID':ns.ownerid},
 	          			success: function (data) {
                          ns.usersList = JSON.parse(data); 
                        },
                        error: function () {
                        ViTagUI.initMsg("msg.getGroups","info","assign.Saving");
                        }
                    });
             },
             
             
         //List of user except logged in user.   
         excludeCurrentUser:function(){
           
            ns.currentUsers=[];
            ns.studentUsers=[];
            
            $(ns.usersList).each(function(i){
                                 
               if(ns.usersList[i]._id!==ns.ownerid && ns.usersList[i].role!==2)//typeof ns.usersList[i].role is number
               {
                 //removed cuurent user and all admins role and all students role, to dispplay in collobartion assing pop up.
                  ns.currentUsers.push(ns.usersList[i]);          
               }
               if(ns.usersList[i].role===4)
               {
                 ns.studentUsers.push(ns.usersList[i]);         
                }
              });
         },
         
         //Displaying message after assign the video successfully.
	   saveMsg:function () {
	          $("#displayAssignMsg").show();
	          $("#assignModal").modal('hide'); //To hide the pop up model.
	          var msg="saved successfully";
              //passing event data to visap analytics for assign event
	          ViTag.passEventData(ViTag.Events.shared,"",{});
              $("#displayAssignMsg").css({"position":"fixed","top":"340px","text-align":"center","color":"#fff","border": "none", "borderRadius": "4px", "padding": "10px", "margin-left":"380px", "z-index":"1100","backgroundColor": "#5cb85c", "width": "350px"}).text(msg);
                    setTimeout(function () { $("#displayAssignMsg").hide(); },1000);
         },
         errorMsg: function(){
         ViTagUI.initMsg("msg.assignVideo","info","assign.Saving");
         },
         
   //Selecting or Unselecting the select-all checkbox.
        AssignSelection:function(){
               
               var group=$('input[name=group]:checked').length;
               var user=$('input[name=user]:checked').length;
               
                 var total=group+user;
                 var assignObject=ns.assignmentData;
                 var g=assignObject.assignedgroup.length;
                 var u=assignObject.assigneduser.length;
                 var selChkbox=g+u;
              
               if(total===selChkbox)
                   $("#selectAllCheckbox").prop('checked', true);
                else 
                    $("#selectAllCheckbox").prop('checked', false);
        },
        
        //selecting and deselecting of select-all checkbox.
        SelectionUsers:function(){
        
               var checkedBoxes = $('input.checkBoxGroup:checked').length;
               var totalCheckBox = $('input.checkBoxGroup').length;
             
                 if(totalCheckBox===checkedBoxes)
                 {
                    $("#selectAllCheckbox").prop('checked', true);
                 }
                 else 
                   $("#selectAllCheckbox").prop('checked', false);
        },
        mappedUsersDetails:function(mappedUserInGroups){
            var role;
           	for(var j=0;j<mappedUserInGroups.length;j++)
                {
                  var UserObj=internal.getMappedUser(mappedUserInGroups[j]);
                 
                   if(UserObj!==undefined) 
                   { 
                   	if( UserObj.role === 3)
                   	{
                   	  role = "3";
                      break;
                   	}
                   	else
                   	 role = "4";
                   }
                }
                return role;
        },
        
        assignVideoForGroups: function(isStaging){
         var markup = "";
         if(groups!==null)
          {
           $(groups).each(function(i){
            
              markup +="<div class='panel panel-default'>";
              markup +="<div class='panel-heading'>";         
              markup +="<h4 class='panel-title'>";
              markup +="<table><tr>";
              var userRole="";
              if(groups[i].mappedusers!==undefined)
              {
              	userRole = internal.mappedUsersDetails(groups[i].mappedusers);
              }
              markup +="<td><img src='images/common/video/arrow-ex-col.png' id='assignImg"+i+"' class='accordion-toggle groupname' data-toggle='collapse' data-parent='#accordionGroup' href='#collapse"+i+"' onclick=\"ViTagUI.mappedUsers('" +userRole+ "','" +isStaging+ "'," +i+ ")\"></td>";
              markup +="<td><span class='checkBoxspan'><input type='checkbox' class='checkBoxGroup' name='group' value='" +groups[i]._id + "'><span></td>";
              markup +="<td class='justify-field'><span class='accordion-toggle groupname truncate-text large-width' data-toggle='collapse' data-parent='#accordionGroup' href='#collapse"+i+"'>"+unescape(groups[i].name) +"</span></td>";
              
              markup +="</tr></table>";
              markup +="</h4></div>";
              markup +="<div id='collapse"+i+"' class='panel-collapse collapse'>";
            
            //Users within the group.
            $(groups[i].mappedusers).each(function(j){
            
                  var UserObj=internal.getMappedUser(groups[i].mappedusers[j]);
                  if(UserObj===undefined)
                   return false;
                 if(isStaging ==="true" && UserObj.role === 3)//typeof isStaging is string.//Listing only Instructors within the Group in collabortion.
                 {               
                     markup+="<div class='panel-body action-divider-assign teacher'>"+UserObj.firstname+","+UserObj.lastname+"</div>";
                 }
                 else if(isStaging==="false")//Listing Instructors and Stduents within the Group in Myspace.
                      {
                        if(UserObj.role===3) 
                            markup+="<div class='teacher panel-body action-divider-assign '>"+UserObj.firstname+","+UserObj.lastname+"</div>";
                        else
                            markup+="<div class='panel-body action-divider-assign student'>"+UserObj.firstname+","+UserObj.lastname+"</div>";
                      }
            });
               markup += "</div></div>";
           });
        }
         return markup;
        },
        
        assignVideoForIndividual: function(isStaging,markup_gp){
          var markup = markup_gp;
          if(ns.usersList!==null)
            {
             var mode=null;  
             $(ns.currentUsers).each(function(i){
                   
                   if(isStaging==="true")
                       mode=(ns.currentUsers[i].role!==2 && ns.currentUsers[i].role!==4)
                     else
                       mode=(ns.currentUsers[i].role!==2)
                 
                  if(mode && ns.currentUsers[i].role===3)
                  {
                    markup +="<div class='panel panel-default'>";
                    markup +="<div class='panel-heading'>";         
                    markup +="<h4 class='panel-title'>";
                    markup +="<table><tr>";
                    
                    markup +="<td><span class='checkBoxUser'><input type='checkbox' name='user' class='checkBoxGroup' value='" +ns.currentUsers[i]._id + "'></span></td>";
                   
                    
                    markup +="<td><span class='teacher1'><span/></td>"
                    markup +="<td class='justify-field'><span class='accordion-toggle username' data-parent='#accordionGroup' href='#collapse"+i+"'>"+unescape(ns.currentUsers[i].lastname)+","+unescape(ns.currentUsers[i].firstname) +"</span></td>";
                    
                     markup +="</tr></table>";                    
                    markup +=" </h4></div>";
                    markup +="<div id='collapse"+i+"' class='panel-collapse collapse'>";
                    markup += "</div></div>";
                  
                   } 
                    if(mode && isStaging==="false" && ns.currentUsers[i].role===4)
                    {
                     markup +="<div class='panel panel-default'>";
                     markup +="<div class='panel-heading'>";         
                     markup +="<h4 class='panel-title'>";
                     markup +="<table><tr>";
                    
                     markup +="<td><span class='checkBoxUser'><input type='checkbox' name='user' class='checkBoxGroup' value='" +ns.currentUsers[i]._id + "'></span></td>";
                    
                     markup +="<td><span class='student1'><span/></td>";
                     markup +="<td class='justify-field'><span class='accordion-toggle username' data-parent='#accordionGroup' href='#collapse"+i+"'>"+unescape(ns.currentUsers[i].lastname)+","+unescape(ns.currentUsers[i].firstname) +"</span></td>";
                     
                     markup +="</tr></table>";                    
                     markup +=" </h4></div>";
                     markup +="<div id='collapse"+i+"' class='panel-collapse collapse'>";
                     markup += "</div></div>";
                    }
              });
            }
          return markup;
        }
    };
//-----------------------------------Private region ends--------------------------------------------------//    
    
//-----------------------------------Public region starts--------------------------------------------------//
    ns.initAssignVideo = function () {
    
           internal.getWorkspaceUsers();
           internal.excludeCurrentUser();
           ViTagUI.SelectAllCheckbox();
    };
    
   //selecting all checkbox.
   ns.SelectAllCheckbox=function(){
     
          $("#selectAllCheckbox").click(function () {
               $('.checkBoxGroup:input:checkbox').not(this).prop('checked', this.checked);
           });
   };
      
    //Creating pop up UI to assign the video to groups and Individuals user.
   ns.assignVideo=function(vidId,vidName,isStaging){
       try {
           //Defining Assing class with the properties.
   	        ns.Assign={ assigneduser:[],assignedgroup:[],videoid:null };
              //Set videoid property
              ns.Assign.videoid=vidId;
              $("#accordionGroup").html('');
              internal.getGroups();
              $('#vidName').text(unescape(vidName));//to display video name.
             
              //Listing Groups while creating pop UI.
              var markup_group = internal.assignVideoForGroups(isStaging);
              
              //Listing Individuals users while creating pop UI.
              var markup_individual = internal.assignVideoForIndividual(isStaging,markup_group);
                 $("#accordionGroup").append(markup_individual);
              
              //To display message if there are  no groups and users.
              if(groups.length===0 && isStaging==="true" && ns.currentUsers.length-ns.studentUsers.length===0){//In collabaration mode.
                  $('#displaygroups').text(ViTag.getLocalizeValue('msg.checkUsers'));
              }
              else if(groups.length===0 && isStaging==="false" && ns.currentUsers.length===0)//In myspace mode.
                      $('#displaygroups').text(ViTag.getLocalizeValue('msg.checkUsers'));
           
                //to get all the assignment for the video
                internal.getAssignment();
                //after getting all the assignment details make the checkbox checked true for respective users or group
                internal.selectAssignedUserChecbox();
                internal.AssignSelection();//Selecting or Unselecting the select-all checkbox.
               //Select all checkbox functionality.
                internal.SelectionUsers();
               //Onchange of Group or User checkbox,will enable or disable select-all checkbox.            
                 $( ".checkBoxGroup" ).change(function() {
                      internal.SelectionUsers();
                  });
           }catch (err) {
             ViTag.error("assign.assignVideo:Error while Assign the Video" + err);
         }              
     };   
     
       //Checking if group contains users or not.
     ns.mappedUsers = function(userRole, isStaging, id) {
         try {
             ViTagUI.changeIconCollpase(id, "#assignImg", groups);
             if (userRole === "3" && isStaging === "true") //typeof use role is string
                 return false;
             if (userRole === "3" || userRole === "4" && isStaging === "false")
                 return false;
             else
                 ViTagUI.initMsg("msg.mappedUsers", "info", "assign.Saving");
         } catch (err) {
             ViTag.error("assign.mappedUsers:Error while mapping the  video to user or group" + err);
         }
     
     };
         
        //This method will get all the selected groups and indivisual users and it will invoke assign.do to update the assign collection.
     ns.AssigningVideo = function(assignObject, callback) { //These parameters are used for unit testing.
         try {
             if (callback)
                 internal.updateAssignment(assignObject, callback.onSave, callback.onError);
             else {
                 var assignedObj = internal.getAssignmentInfo();
                 if (assignedObj) {
                     ViTagUI.initMsg("msg.groupOrUser", "info", "assign.Saving")
                     return false;
                 }
                 //creating assignment object           
                 var assignObj = { assigneduser: ViTagUI.Assign.assigneduser,
                     assignedgroup: ViTagUI.Assign.assignedgroup,
                     videoid: ns.Assign.videoid
                 }; //json object for assignment
                 //updateAssignment method will invoke assign.do handler to update the assign collection with the new assignObject.
                 internal.updateAssignment(assignObj, internal.saveMsg, internal.errorMsg);
             }
         } catch (err) {
             ViTag.error("assign.AssigningVideo:Error while Assigning the Video" + err);
         }
     };
      //end of AssigningVideo method.

    //This method will get all the selected groups and indivisual users and it will invoke assign.do to update the assign collection.
  ns.UnAssigningVideo = function() {
    try {
        var assignedInfo = internal.getAssignmentInfo();
        if (assignedInfo) {
            ViTagUI.initMsg("msg.unAssigningVideo", "info", "assign.Saving");
            return false;
        } else {

            $("#assignModal").hide();
            //UnAssign user/group after confirmation.
            var msg = ViTag.getLocalizeValue("confirmationMsg.unAssignMsg");
            $.confirm(msg).then(function(istrue) {
                if (istrue) {
                    var user = [],
                        group = [""]; //user arrray to store all the selected user id's and group array is to store the selected group id's
                    var assignObj = {
                        assigneduser: user,
                        assignedgroup: group,
                        videoid: ns.Assign.videoid
                    }; //json object for assignment 
                    internal.updateAssignment(assignObj, internal.saveMsg, internal.errorMsg);
                } else {
                    $("#assignModal").show();
                    return false;
                }
            });
        }
    } catch (err) {
        ViTag.error("assign.UnAssigningVideo:Error while UnAssigning the Video" + err);
    }
  };
    //end of UnAssigningVideo method
 
 //-----------------------------------Public region ends--------------------------------------------------//
     
})(window.ViTagUI = window.ViTagUI || {});