(function (ns) {

 ns.config={
 //web api service url's for Aelib questions.
    baseServiceURL:"http://localhost/quiz/",
 	questionServiceURL:"/quiz/question/sync/",
	editQuestionURL:"http://localhost/quiz/question/sync/",
 	deleteQuestion:"/quiz/question/",
 	createcopyquestionURL:"http://localhost/quiz/publish/",
    baseAssetpath: "http://localhost/visaptest/Assets/",

 	workspaceUrl:"http://localhost/visapworkspace/auth.do",
 	wsvideourl:"http://localhost/visapworkspace/video.do",
 	wsMetadataurl:"http://localhost/visapworkspace/metadata.do",
 	wsVideoSearchurl:"http://localhost/visapworkspace/videosearch.do",
 	wsFileuploadurl:"http://localhost/visapworkspace/file.do",
 	wsImageuploadurl:"http://localhost/visapworkspace/image.do",
 	wsConfigLoadurl:"http://localhost/visapworkspace/config.do",
 	wsCategorySearchurl:"http://localhost/visapworkspace/category.do",
 	wsPublishVideourl:"http://localhost/visapworkspace/publish.do",
 	getworkspaceURL:"http://localhost/ViSapWorkspace/workspace.do",
 	wsassignurl:"http://localhost/ViSapWorkspace/assign.do",
 	
 	wsGroup:"http://localhost/ViSapWorkspace/group.do",
 	wsUser:"http://localhost/ViSapWorkspace/users.do",
 	
 	wsWhiteboardTestServiceurl:"http://localhost/visapworkspace/whiteboardData.do",
 	wsTocTestServiceurl:"http://localhost/visapworkspace/tocdata.do",
 	wsTestDataServiceurl:"http://localhost/visapworkspace/testdata.do",
 	wsAelibTestServiceurl:"http://localhost/visapworkspace/aelibTestData.do",
 	wsAssignTestServiceurl:"http://localhost/visapworkspace/assignTestData.do"

 };
 
})(window.ViTag = window.ViTag || {});

