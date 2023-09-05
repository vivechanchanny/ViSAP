(function(lib) {

	window.analytics = lib();

}
		(function() {

			/* Setup parameters */
			var defaultTarget = "ga";
			var defaultLRSEndpoint = "http://192.168.4.97:8081/openlrs/xAPI";
			var lrs, statement, identityURL;
			var gaTrackingId = "UA-81128923-1";
		 	var tinCanSvcUrl = "";

			/* **************************** */

			var target;
			analytics = {};			

			analytics.init = function(targetName, conf) {
				
				validate(targetName,conf);
			

				if (targetName == "")
					targetName = defaultTarget;				

				target = targets[targetName];
				target.initialise(conf);
			};

		   analytics.post = function(user, action, object) {
			   contextvalue = UuidService.newuuid();
				if (user instanceof Array) {
					dataLen = user.length;					
					if (dataLen > 0) {
						for (i = 0; i < user.length; i++) {
							validatePost(user[i].user, user[i].action, user[i].object);
							target.post(user[i].user, user[i].action, user[i].object, contextvalue);
						}
					}
				} else {
					validatePost(user, action, object);
					target.post(user, action, object, contextvalue);
				}
			};
			
		analytics.retrieve = function(user, action, object, contextvalue){
			target.retrieve(user, action, object, contextvalue);
			
		}

			var targets = {}

			targets.tincan = {

				initialise : function(conf) {
					targets.tincan.prepareDataForXapi.lrsSetUp(conf);
				},	

				post : function(user, action, object,context) {
									
					targets.tincan.prepareDataForXapi.getStatement(user, action, object,context);
					lrs.saveStatement(
									statement,
									{
										callback : function(err, xhr) {
											if (err !== null) {
												if (xhr !== null) {
													console.log("Failed to save statement: "+ xhr.responseText+ " ("+ xhr.status+ ")");
													return;
												}
												console.log("Failed to save statement: "+ err);
												return;
											}
											console.log("Statement saved");
										}
									});
				},
				
				retrieve : function(actor, verb, object,context) {

					lrs.queryStatements({
						params : targets.tincan.prepareDataForXapi.getParams(actor, verb, object,context),

						callback : function(err, sr) {
							if (err !== null) {
								console.log("Failed to query statements: "+ err);
								return;
							}
							sr.statements.forEach(myFunction);
							function myFunction(item, index) {
							    console.log( "index[" + index + "]: " + item + "<br />") ; 
							}
							
							if (sr.more !== null) {
								console.log("sr " + sr);
							}

						}
					});
				},
				prepareDataForXapi : {

					getActivity : function(object) {

						var myActivityDefinition = new TinCan.ActivityDefinition(
								{
									name : {
										"en-US" : object.actName,
										"en-GB" : object.actName
									},
									description : {
										"en-US" : object.actDescription,
										"en-GB" : object.actDescription
									}
								});

						var myActivity = new TinCan.Activity({
							id :"http://example.com/object/" + object.id,
							definition : myActivityDefinition
						});

						return myActivity;

					},

					getVerb : function(verb) {
						var myVerb = new TinCan.Verb({
							id : "http://adlnet.gov/expapi/verbs/" + verb,
							display : {
								"en-US" : verb,
								"en-GB" : verb
							}
						});
						return myVerb;
					},

					getActor : function(user) {
						var myActor = new TinCan.Agent({
							name : user.id || user.name,
							mbox : user.email,
							account : {
								homePage : identityURL,
								name : user.id
							}
						});
						return myActor;
					},
					
					getContext : function(context){						
						var myContext = new TinCan.Context({
							registration:context,							
						});
						return myContext
						
					},

					getStatement : function(user, action, object,context) {
						statement = new TinCan.Statement({
							actor : targets.tincan.prepareDataForXapi
									.getActor(user),
							verb : targets.tincan.prepareDataForXapi
									.getVerb(action),
							target : targets.tincan.prepareDataForXapi
									.getActivity(object),
							context : targets.tincan.prepareDataForXapi.getContext(context)
						});
					},
					
					getParams : function(actor, verb, object, context) {
						var params = {}
						if (actor != null)
							params.actor = actor;
						if (verb != null){
							if(verb == ""){
								params.verb = verb;
							}else{
								params.verb =  "http://adlnet.gov/expapi/verbs/" + verb;
							}
																	
						}							
						if (object != null)
							if(object == ""){
								params.object = object;
							}else{
								params.object =  "http://example.com/object/" + object;
							}
							
						
						if (context != null)
							params.context = context;
						return params;
					},
					
					includeJSToHead : function(path, loadCallback) {
						var imported = document.createElement('script');
						imported.src = path;
						if (loadCallback){
							imported.onload = loadCallback;	
						}							
						document.head.appendChild(imported);
					},

					lrsSetUp : function(conf) {
						try {

							var lrsConf = {};
							identityURL = conf.identityURL;
							// Update user provided parameters to the config
							if (conf.endpoint == undefined ||conf.endpoint == "") {
								conf.endpoint = defaultLRSEndpoint;
							}
							lrsConf.endpoint = conf.endpoint;
							if (conf.auth)
								lrsConf.auth = conf.auth;
							else if (conf.userName) {
								lrsConf.username = conf.userName;
								lrsConf.password = conf.password;
							}

							// Setting up some standard parameters to call LRS
							lrsConf.allowFail = false;

							lrs = new TinCan.LRS(lrsConf);

						} catch (ex) {
							throw ("Failed to setup LRS object: " + ex);
							console.log("Failed to setup LRS object: " + ex);
						}
					},
				}

			};

			targets.ga = {

				initialise : function(conf) {
					
					if(!(conf ==undefined) && !(conf.gaTrackingId == undefined)){
						
						 gaTrackingId= conf.gaTrackingId ;
					}
					(function(i, s, o, g, r, a, m) {
						i['GoogleAnalyticsObject'] = r;
						i[r] = i[r] || function() {
							(i[r].q = i[r].q || []).push(arguments)
						}, i[r].l = 1 * new Date();
						a = s.createElement(o),
								m = s.getElementsByTagName(o)[0];
						a.async = 1;
						a.src = g;
						m.parentNode.insertBefore(a, m)
					})(window, document, 'script',
							'https://www.google-analytics.com/analytics.js',
							'ga');

					ga('create', gaTrackingId, 'auto');
					ga('send', 'pageview', {
						'sessionControl' : 'start'
					});
				},

				post : function(user, action, object,context) {
					
					var dimensionValue = context;
					ga('set', 'dimension1', dimensionValue);

					var label = user.id || user.name;
					var category = object.id || object.name;
					ga('send', 'event', category, action, label);
				},

				retrieve : function(actor, verb, object) {

				}
			};

			validate = function(targetName, conf) {

				
				if (targets[targetName] == null ) {
					alert("Analytics target not found");
					throw "Analytics target not found";
				}else if (conf == undefined) {
					alert("conf  not defined");
					throw "conf not found";
				}else if(conf.identityURL == "" || conf.identityURL==undefined){
					alert("identityURL not provided ");
					throw "identityURL not provided";
				}else if ((targetName == "tincan" && (conf.auth == "" || conf.auth ==undefined) )&&(targetName == "tincan" && ((conf.userName == "" || conf.userName ==undefined)||(conf.password == "" || conf.password ==undefined)))) {
					alert("invalid authorization ");
					throw "invalid authorization ";
				}

			}
			
			validatePost = function(user, action, object){
				if(user == "" || user == undefined)
					throws ("user not defined");
				if((user.id == "" || user.id == undefined)&&(user.email == undefined || user.email == ""))
					throws ("Mandatory fields of user is not defined");
				if(action == "" || action == undefined)
					throws ("action not defined");
				if(action == "" || action == undefined)
					throws ("action not defined");
				if(object == "" || object == undefined || object.id == ""|| object.id == undefined)
					throws ("object not defined");
			}
			
			targets.tincan.prepareDataForXapi.includeJSToHead(tinCanSvcUrl);
			return analytics;
		}));

var UuidService = {

		correlationId: "",
		newuuid: function () {
			// http://www.ietf.org/rfc/rfc4122.txt
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";
			return s.join("");
		},
		newguid: function () {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		},

		s4: function () {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}

};