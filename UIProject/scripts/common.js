//Global variables
var lblUserName = "#uName",
    lblWorkapceName = "#wrokspace",
    category = "#category",
    bgsubmenu = "#bgsubmenu",
    thumbnails = "#thumbnails",
    iframeErr = "#iframeErr";

(function(ns) {

    //-----------------------------------Private region starts--------------------------------------------------//
    var internal = {

        //this fn will create iframe-error page to display error message.
        createIframe: function() {
            $('<iframe>', {
                src: ViTag.config.errorPage,
                frameborder: 0,
                css: {
                    width: "100%", //if we dont set width/height for iframe,
                    height: "100%", // browser will set default width 300px and height 150px(2:1 ratio).
                    position: "relative"
                },
            }).appendTo(iframeErr);
        },

        //checking visap.edit/sketcher objects is loaded or not.
        checkObj: function(isGallery) {
            var objfound = false;
            if (isGallery === false && (ViTag.initEditing === undefined || ViTag.sketchInitialise === undefined))  { //if it is gallery page then no need to check objects.
                    objfound = true;
                }
            return objfound;
        }
    };

    //-----------------------------------	End of private region --------------------------------------------------//

    //get user information.
    ns.getUserDetails = function() {
        var userinfo = sessionStorage.getItem('AppUser');
        if (userinfo != null) {
            userinfo = JSON.parse(userinfo); //get login info.
        }
        return userinfo;
    };


    //displaying firstname/lastname/workspace to corresponding labels.
    ns.displayLabels = function() {
        var loginUser = ns.getUserDetails(); //get login info.
        $(lblWorkapceName).text(sessionStorage.getItem('workSpaceName')); //display workspace name.
        if (loginUser != null) {
            $(lblUserName).text(loginUser.lastname + ',' + loginUser.firstname); //display first/last name.
        }
    };
    //this fn will check whether the scripts are loaded are not. 
    //if it is not loaded then display error page with message.
    ns.checkLibraryObj = function(isGallery) {

        //check jquery and localize i18n object loaded or not.
        if (typeof jQuery === 'undefined' || typeof i18n === 'undefined') {
            window.location.href = ViTag.config.errorPage;
        }
        //check core lib scripts are loaded or not(by unique obj of core lib).
        else if (ViTag.init === undefined || internal.checkObj(isGallery) ||
            ViTag.aelib === undefined || ViTag.quiz === undefined || ViTag.Logger === undefined) {

            ns.displayLabels();
            $(bgsubmenu).hide(); //hide sub-menu bar.
            $(thumbnails).hide();
            $(category).hide(); //hide category in gallery page.
            ViTag.visapLocalize(); //initialize localization of strings.
            $(iframeErr).show();
            internal.createIframe(); //create Iframe - error page.
        } else {
            return true;
        }
    }

    ns.hideshowlinks = function() {
        var ln = sessionStorage.getItem('authT');
        //To hide the tabs based on the role
        var Role = sessionStorage.getItem('Role');
        var loginUser = JSON.parse(sessionStorage.getItem('AppUser'));
        if (ln == null) {
            $("#linksContainer").hide();
            $("#login").show();
            $("#navbar").hide();
        } else {
            if (loginUser == null || loginUser.environment !== ViTag.config.environment) //checking user enviroment.
                ViTagUI.logout();

            $("#newlogin").hide();
            $("#linksContainer").show();
            $("#login").hide();

            $("#wrokspace").text(sessionStorage.getItem('workSpaceName')); //To display workspace name.
            if (loginUser != null)
                $(lblUserName).text(loginUser.lastname + ',' + loginUser.firstname); //To display first/last name.


            if (Role === "1") {

                ViTagUI.hideLinks();
                $("#adminblock").show();
                $("#worspaceLabel").hide();
                ViTagUI.hideHeaderTabs();
            } else if (Role === "2") {
                ViTagUI.hideLinks();
                $("#wrokspace").show();
                $("#workspaceLink").hide();
                $("#workspaceTab").hide();
                $("#user").show();
                ViTagUI.hideHeaderTabs();

            } else if (Role === "3") {
                $("#tabsBlock").hide();
                $("#myspaceTab").hide();
                $("#collTab").hide();
                $("#gallertTab").hide();
                $("#workspaceTab").hide();
                $("#userTab").hide();
                $("#workspaceLink").hide();
                $("#user").hide();
                $("#instblock").show();
                $("#vidGal").show();
            } else if (Role === "4") {
                $("#linksubContainer").hide();
                $("#wrokspace").show();
                ViTagUI.hideHeaderTabs();
                ViTagUI.hideFooterLinks();
            }
        }

    };

    ns.hideLinks = function() //To hide footer links and tabs of workspace and visap.
    {
        $("#tabsBlock").hide();
        $("#wrokspace").hide();
        $("#instblock").hide();
        $("#gallertTab").hide();
    }

    ns.hideFooterLinks = function() //Hide footer links.
    {
        $("#adminblock").hide();
        $("#instblock").hide();
        $("#workspaceTab").hide();
        $("#userTab").hide();
    }



    ns.hideHeaderTabs = function() //Hide header tabs.
    {

        $("#myspaceTab").hide();
        $("#collTab").hide();
        $("#dividerLine").hide();
        $("#groupTab").hide();
        $("#vidGal").hide();
    }

})(window.ViTagUI = window.ViTagUI || {});