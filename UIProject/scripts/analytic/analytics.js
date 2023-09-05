(function (ns) {

	/* Setup parameters */
	var defaultTarget = "ga";
	var target;
	//initializing GA
	ns.init = function () {
		//TODO: Dynamical load cofig.js file containing 'targetName' and 'gaTrackingId' before GA is initialised.
		if(!validateInit(targetName = 'ga',gaTrackingId= 'UA-92811654-1')){ 
			target = targets[targetName];
			target.initialise(gaTrackingId);
		}
			
	};
	//Post to GA
	ns.post = function (category, action, label) {
		if (category instanceof Array) {
			dataLen = user.length;
			if (dataLen > 0) {
				for (i = 0; i < category.length; i++) {
					if(!validatePost(category, action, label)){
					target.post(category[i].category, category[i].action, category[i].label);
					}
				}
			}
		} else {
			if(!validatePost(category, action, label)){
			target.post(category, action, label);
			}
		}
	};
	
	//Set dimensions.
	ns.setDimension=function (data) {
		if(!validateDimension(data)){
		var contextvalue = UuidService.newuuid();
		var dimensionData = getDimensionData(data, contextvalue);
		setDimensionToGA(dimensionData);
	}
    };
	//Set duration for every x-interval when user watching video.
	ns.setDuration = function(duration){
		var durationData = {'dimension5':''};
		if(duration == null || duration == undefined){
			return false;
		}else{
			durationData.dimension5 = duration;
			setDimensionToGA(durationData);
			//console.log("duration data set to google analytics..");
		}
	}

	//Set dimension to GA
	setDimensionToGA = function(dimensionData){
		for (var dimension in dimensionData) {
			ga('set', dimension, dimensionData[dimension]);
		}
		//console.log("dimention data set to google analytics..");
		};

	//Setting  up GA account
	var targets = {};
	targets.ga = {
			initialise: function (gaTrackingId) {
					//gaTrackingId = gaTrackingId;
				(function (i, s, o, g, r, a, m) {
					i['GoogleAnalyticsObject'] = r;
					i[r] = i[r] || function () {
						(i[r].q = i[r].q || []).push(arguments)
					}, i[r].l = 1 * new Date();
					a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
					a.async = 1;
					a.src = g;
					m.parentNode.insertBefore(a, m)
				})(window, document, 'script',
						'https://www.google-analytics.com/analytics.js', 'ga');
				//Setup GA context
				ga('create', gaTrackingId, 'auto');
				//initialize pageview and start sessionControl
				ga('send', 'pageview', { 'sessionControl': 'start' });
				console.log('GA initialised..');
			},

			post: function (category, action, label) {
				ga('send', 'event', category, action, label);
			},
	};
	//validate before initializing
	validateInit = function(targetName, gaTrackingId) {
		if (targetName == "" || targetName!= defaultTarget){
			targetName = defaultTarget;
		}
		// if (conf == undefined) {
		// 	throw "conf not found";
		// }
		// else if(conf.identityURL == "" || conf.identityURL==undefined){
		// 	throw "identityURL not provided";
		// }
		if(gaTrackingId=="" || gaTrackingId ==undefined){
			throw "gaTrackingId not provided";
		}
		else
		return false;

	}
	//validate before posting data to GA
	validatePost = function(category, action, label){
		if(category == "" || category == undefined)
			throw("category not found");
		else if(action == "" || action == undefined)
			throw("action not found");
		else if(label== "" || label == undefined)
			throw("actionDetails not found");
		else
		return false;
	}
	//validate before setting Dimensions  to GA
	validateDimension = function(data){
		if(data.userID == "" || data.userID == undefined)
			throw("userId not found");
		else if(data.userRole == "" || data.userRole == undefined)
			throw("userRole not found");
		else if(data.videoID=="" || data.videoID == undefined)
			throw("videoTitle is Missing");
		else
		return false;
	}
	//Getting dimension data
	getDimensionData = function (data, correlationID) {

		var dimensionValue1 = data.videoID;
		var dimensionValue2 = data.userID;
		var dimensionValue3 = data.userRole;
		var dimensionValue4 = correlationID;
		

		var dimensionDataObj = {
				'dimension1': dimensionValue1,
				'dimension2': dimensionValue2,
				'dimension3': dimensionValue3,
				'dimension4': dimensionValue4
		};
		return dimensionDataObj;
	};

})(window.analytics = window.analytics || {});

//Generating correlation ID
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