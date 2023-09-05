(function (ns) {

 ns.config={
 //web api service url's for Aelib questions.
    baseServiceURL:"/VISAP/quiz/",
 	questionServiceURL:"/VISAP/quiz/question/sync/",
	editQuestionURL:"/VISAP/quiz/question/sync/",
 	deleteQuestion:"/VISAP/quiz/question/",
 	createcopyquestionURL:"/VISAP/quiz/publish/",
    baseAssetpath: "/VISAP/visaptest/Assets/",
    
    //workspace login page url.
    LoginPage:"/visap/visapworkspace/index.html",

 	workspaceUrl:"/VISAP/visapworkspace/auth.do",
 	wsvideourl:"/VISAP/visapworkspace/video.do",
 	wsMetadataurl:"/VISAP/visapworkspace/metadata.do",
 	wsVideoSearchurl:"/VISAP/visapworkspace/videosearch.do",
 	wsFileuploadurl:"/VISAP/visapworkspace/file.do",
 	wsImageuploadurl:"/VISAP/visapworkspace/image.do",
 	wsConfigLoadurl:"/VISAP/visapworkspace/config.do",
 	wsCategorySearchurl:"/VISAP/visapworkspace/category.do",
 	wsPublishVideourl:"/VISAP/visapworkspace/publish.do",
 	getworkspaceURL:"/VISAP/visapworkspace/workspace.do",
 	wsassignurl:"/VISAP/visapworkspace/assign.do",
 	wsLogurl:"/VISAP/visapworkspace/log.do",
 	
 	wsGroup:"/VISAP/visapworkspace/group.do",
 	wsUser:"/VISAP/visapworkspace/users.do",
 	
 	wsWhiteboardTestServiceurl:"/VISAP/visapworkspace/whiteboardData.do",
 	wsTocTestServiceurl:"/VISAP/visapworkspace/tocdata.do",
 	wsTestDataServiceurl:"/VISAP/visapworkspace/testdata.do",
 	wsAelibTestServiceurl:"/VISAP/visapworkspace/aelibTestData.do",
 	wsAssignTestServiceurl:"/VISAP/visapworkspace/assignTestData.do",
 	visapTokenurl:"/VISAP/visaptest/token.do",
 	environment:"visaptest",
 	ckEditorBasePathUrl:"/VISAP/visaptest/scripts/ckeditor/",
 	gaTrakingId:"UA-83328209-1",
    identityurl:"visap/visapworkspace/index.html#/",
    questionType:"aelib",
	captionpath: "/VISAP/visaptest/Videocaption/",
	jsonFileUrl:"scripts/lang/visap-en.json",
	timeAgoScriptUrl:"scripts/locale/en.js",
	errorPage:"/visap/visaptest/error.html",
	sketchVersion:"V2.0",
	questResponse:"/VISAP/visapworkspace/questresponse.do",
    analyticsReports:"http://192.168.4.112:8080/analytics/#/sso"           
 };
 
})(window.ViTag = window.ViTag || {});

