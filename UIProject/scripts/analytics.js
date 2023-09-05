//This file is mainly used to post the data for GA		
(function (ns) {

	//for intialization of analtyics, it requires targetname and config object 
	//Targetname may be ga or tincan
	var conf = {}
	conf.gaTrackingId = ns.config.gaTrakingId;
	conf.identityURL = window.location.host + "/" + ns.config.identityurl;  //home page url
	var Targetname = "ga";
	//These are the standard verb for different types of action.
			 ns.verbs = {
		asked: "asked",
		attempted: "attempted",
		attended: "attended",
		commented: "commented",
		completed: "completed",
		created: "created",
		exited: "exited",
		experienced: "experienced",
		failed: "failed",
		imported: "imported",
		initialized: "initialized",
		interacted: "interacted",
		launched: "launched",
		mastered: "mastered",
		passed: "passed",
		preferred: "preferred",
		progressed: "progressed",
		registered: "registered",
		responded: "responded",
		resumed: "resumed",
		scored: "scored",
		shared: "shared",
		suspended: "suspended",
		terminated: "terminated",
		voided: "voided"
	};
		  //This function will return the standard equivalent verbs for visap action types.  
		  ns.getVerbs = function (key) {
		switch (key) {
			case "import.uploaded":
			case "import.youtube":
			case "import.directURL": return ns.verbs.imported;
			case "Play.youtube":
			case "Play.uploaded":
			case "Play.directURL":
			case "Play.timeline": return ns.verbs.launched;
			case "search": return ns.verbs.asked;

			case "tag.create":
			case "link.create":
			case "createAnnotation":
			case "createHotspot":
			case "createsketch":
			case "createWhiteboard":
			case "createDefaultquestion":
			case "Timeline.create":
			case 'createAelibQuest': return ns.verbs.created;

			case "tag.update":
			case "link.update":
			case "Timeline.edit":
			case "updateannotation":
			case "updatehotspot":
			case "updatesketch":
			case "updatewhiteboard":
			case 'updateAelibQuest': return ns.verbs.interacted;

			case 'Publish': return ns.verbs.registered;
			case 'Assign': return ns.verbs.shared;

			case 'videodelete.youtube':
			case 'videodelete.uploaded':
			case 'videodelete.directURL':
			case 'delete':
			case 'deleteaelibQuest': return ns.verbs.terminated;
		}
		  }

	ns.bindgaEvents = function () {
		//This event is to initializ the analytics object
		$(document).on("init", function () {
			try {
				analytics.init(Targetname, conf);  //here targetname is ga and conf object contains gaTrackingId and identityURL
			}
			catch (ex) {
				ViTag.error("analytics:init:Error while intializing analytics object" + ex);
			}
		});

		//This event is to post the data to GA
		$(document).on("VisapLog", function (event, user, action, object) {
			try {
				//getVerbs method will return the standard equivalent verbs for different action name.  
				var actionType = ns.getVerbs(action);
				//post method requires 3 parameters,1.login user info. 2. The type of action user is performing. 3.object contains (id,name,desc).
				analytics.post(user, actionType, object);
			}
			catch (ex) {
				ViTag.error("analytics:VisapLog:Error while posting data to GA" + ex);
			}
		});
		$(document).on("VisapLogpublish", function (event, publishData) {
			//getVerbs method will return the standard equivalent verbs for different action name.
			try {
				var actionType = ns.getVerbs(publishData[0].action);
				$.each(publishData, function (index) {
					publishData[index].action = actionType;
				});
				//post method requires 3 parameters,1.login user info. 2. The type of action user is performing. 3.object contains (id,name,desc).
				analytics.post(publishData);
			}
			catch (ex) {
				ViTag.error("analytics:VisapLogpublish:Error while publishing data to GA" + ex);

			}
		});

	}
	ViTag.bindgaEvents();
})(window.ViTag = window.ViTag || {});
