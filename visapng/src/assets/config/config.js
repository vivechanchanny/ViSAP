(function (ns) {
	var appDomain = "http://visapqa.excelindia.com";
	
	var urlPath ="";
	var myUrlPattern = 'localhost:';
	// check for relative path of the localisation url 
	if(window.location.href.indexOf(myUrlPattern) === -1){
		urlPath ="/visap/visapng/"
	}

	ns.config = {
		//web api service url's for Aelib questions.
		baseServiceURL: appDomain+"/VISAP/quiz/",
		questionServiceURL: appDomain+"/VISAP/quiz/question/sync/",
		editQuestionURL: appDomain+"/VISAP/quiz/question/sync/",
		deleteQuestion: appDomain+"/VISAP/quiz/question/",
		createcopyquestionURL: appDomain+"/VISAP/quiz/publish/",
		baseAssetpath: appDomain+"/VISAP/visaptest/Assets/",

		//workspace login page url.
		LoginPage: "/visap/visapworkspace/index.html",

		workspaceUrl: appDomain+"/VISAP/visapworkspace/auth.do",
		wsvideourl: appDomain + "/visap/visapworkspace/video.do",
		wsMetadataurl: appDomain+"/VISAP/visapworkspace/metadata.do",
		wsVideoSearchurl: appDomain+"/VISAP/visapworkspace/videosearch.do",
		wsFileuploadurl: appDomain+"/VISAP/visapworkspace/file.do",
		wsImageuploadurl: appDomain+ "/VISAP/visapworkspace/image.do",
		wsConfigLoadurl: appDomain + "/VISAP/visapworkspace/config.do",
		wsCategorySearchurl: appDomain+"/VISAP/visapworkspace/category.do",
		wsPublishVideourl: appDomain+"/VISAP/visapworkspace/publish.do",
		getworkspaceURL: appDomain+"/VISAP/visapworkspace/workspace.do",
		wsassignurl: appDomain+"/VISAP/visapworkspace/assign.do",
		wsLogurl: appDomain+"/VISAP/visapworkspace/log.do",

		wsGroup: appDomain+"/VISAP/visapworkspace/group.do",
		wsUser: appDomain+"/VISAP/visapworkspace/users.do",

		wsWhiteboardTestServiceurl: "/VISAP/visapworkspace/whiteboardData.do",
		wsTocTestServiceurl: "/VISAP/visapworkspace/tocdata.do",
		wsTestDataServiceurl: "/VISAP/visapworkspace/testdata.do",
		wsAelibTestServiceurl: "/VISAP/visapworkspace/aelibTestData.do",
		wsAssignTestServiceurl: "/VISAP/visapworkspace/assignTestData.do",
		visapTokenurl: appDomain+"/VISAP/visaptest/token.do",
		environment: "visaptest",
		ckEditorBasePathUrl: appDomain+"/VISAP/visaptest/scripts/ckeditor/",
		gaTrakingId: "UA-83328209-1",
		identityurl: "visap/visapworkspace/index.html#/",
		questionType: "aelib",
		captionpath: appDomain+"/VISAP/visaptest/Videocaption/",
		jsonFileUrl: urlPath+"/assets/scripts/lang/visap-en.json",
		timeAgoScriptUrl: urlPath+"/assets/scripts/locale/en.js",
		errorPage: "/visap/visaptest/error.html",
		sketchVersion: "V2.0",
		questResponse: "/VISAP/visapworkspace/questresponse.do",
		analyticsReports: "http://192.168.4.112:8080/analytics/#/sso",
		videoRepo:appDomain +"/VISAP/visaptest/VideoRepo/",
		snapshotRepo:  appDomain +"/VISAP/SnapshotRepo/",
		email: appDomain+"/VISAP/visapworkspace/email.do",
		reset: appDomain+"/VISAP/visapworkspace/reset.do",
		groupUrl: appDomain +"/visap/visapworkspace/index.html#/group"

	};

})(window.ViTag = window.ViTag || {});

