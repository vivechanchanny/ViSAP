require.config({
    paths: {
        templateBasePath: "com/es/Default_Templates"
    },
    theme: "default",
    resourceBundle: "default",
    assessmentConfig: {
        is_trackable: !1,
        single_ques_quiz: !1,
        is_persistable: !1
    },
    glossaryConfig: {
        lineCount: 2
    },
    allowBookTheme: !1,
    fitToWidth: !0,
    readerCss: ["com/external/videojs/video-js.css", "css/widget_global.css", "css/widget_color.css", "css/widgets_fonts.css", "css/widgets_glossary.css", "css/widget.css", "css/widgets_slidernav.css", "com/external/galleria/galleria.classic.css", "themes/jbl/css/widgets_theme.css"],
    iframeCss: ["css/widget_global.css", "css/widget_color.css", "css/widgets_iFrameWidget.css", "com/external/videojs/video-js.css", "themes/jbl/css/widgets_iframeTheme.css"],
    iframeCss_android4: ["widgets_iframeTheme-4.2.2", "widgets_theme-4.2.2"]
}), define("main-config", function() {}), define("com/es/widgets/WidgetConstants", [], function() {
    return window.WIDGET_CONSTANTS || (window.WIDGET_CONSTANTS = {
        VERSION: "1.0.56.7",
        GALLERY_WIDGET: "gallery",
        IMAGE_WIDGET: "image",
        VIDEO_WIDGET: "video",
        AUDIO_WIDGET: "audio",
        TIP_WIDGET: "tip",
        HTML_WIDGET: "HTML",
        FILE_WIDGET: "file",
        ASSESSMENT_WIDGET: "assessment",
        LEARNOSITY_WIDGET: "learnosity",
        LEARNOSITY_SERVICE_BASE_URL: "",
        LEARNOSITY_ACCESS_TOKEN: "",
        LEARNOSITY_STANDALONE: !1,
        HODDERASSESS_WIDGET: "HDLAssess",
        HDLREPORTS_WIDGET: "HDLReports",
        EOW_WIDGET: "eow",
        EOW_SERVICE_BASE_URL: "",
        EOW_LDL_SERVER: "",
        EOW_LDL_SERVICE_URL: "",
        EOW_GROUPS: "",
        EOW_STANDALONE: !1,
        EOW_RDR_HTML_PATH: "",
        EOW_CLOSE_ETA_POPUP: "closeETAPopup",
        SEEK: 5,
        DATA_MODE_TRANSPARENT: "transparent",
        DATA_MODE_OPAQUE: "opaque",
        DATA_MODE_INLINE: "inline",
        DATA_MODE_COMPACT: "compact",
        DATA_MODE_POSTER: "poster",
        DATA_BORDER_SHOW: "show",
        DATA_BORDER_HIDDEN: "hidden",
        DATA_HASVIEW_YES: "yes",
        DATA_HASVIEW_NO: "no",
        DATA_BORDER_YES: "yes",
        DATA_BORDER_NO: "no",
        DATA_BORDER_TRUE: "true",
        DATA_BORDER_FALSE: "false",
        DATA_LAYOUT_REFLOW: "reflow",
        DATA_LAYOUT_FIXED: "fixed",
        MIN_WIDTH: 150,
        MIN_HEIGHT: 150,
        AUDIO_MIN_WIDTH: 254,
        AUDIO_MIN_HEIGHT: 202,
        AUDIO_MAX_WIDTH: 300,
        VIDEO_MIN_WIDTH: 300,
        VIDEO_MIN_HEIGHT: 200,
        IMAGE_MIN_WIDTH: 250,
        IMAGE_MIN_HEIGHT: 250,
        TIP_MIN_WIDTH: 300,
        TIP_MIN_HEIGHT: 95,
        HTML_MIN_WIDTH: 300,
        HTML_MIN_HEIGHT: 95,
        TP_MIN_WIDTH: 300,
        TP_MIN_HEIGHT: 95,
        FILE_MIN_WIDTH: 300,
        FILE_MIN_HEIGHT: 95,
        IMAGE_GAL_MIN_WIDTH: 250,
        IMAGE_GAL_MIN_HEIGHT: 250,
        ASSESSMENT_MIN_WIDTH: 300,
        ASSESSMENT_MIN_HEIGHT: 200,
        ASSETS_URL: "",
        DOWNLOADED_ASSETS_URL: "",
        DOWNLOAD_SUPPORTED: !1,
        CONTENT_BASE_URL: "",
        DESCRIPTION_EXPAND: "More",
        DESCRIPTION_COLLAPSE: "Less",
        LOCALE_COOKIE_NAME: "myAppLocaleCookie",
        NETWORK_AVAILABLE: !0,
        USER_ID: "",
        USER_NAME: "",
        USER_ROLE: "",
        BOOK_ID: "",
        BOOK_ISBN_NO: "",
        BOOK_TITLE: "",
        BOOK_TYPE: "",
        APPLICATION_TYPE: "Reader",
        LOCALE: "",
        USER_LOGIN_TIME: "",
        USER_LOGIN_TYPE: "",
        EDITOR_LABEL: "Editor",
        HODDERASSESS_BASE_URL: "http://10.12.65.70:8080/pubportal/QA/",
        HODDERASSESS_HTML_LAUNCH_URL: "testingPage.html",
        ACCESS_TOKEN: "",
        CLOSE_WIDGET_POPUP: "closeWidgetPopup",
        HDL_ASSESS_PROPERTIES: null,
        HDL_REPORTS_PROPERTIES: null,
        HDL_WIDGET_CODE_BASE_PATH: "com/external/Widget_HodderCodeBase/Hodder_HTML5_Assessment/www/index.html",
        HDL_REPORT_WIDGET_CODE_BASE_PATH: "com/external/Widget_HodderCodeBase/Hodder_HTML5_Assessment//www/reportCard.html",
        HOME_PAGE_URL: "",
        PRINT_MODE: !1,
        THIRD_PARTY_PATH: {
            saras: "com/external/saras/index.html"
        }
    }), window.WIDGET_CONSTANTS
}), define("com/es/widgets/WidgetUtils", [], function() {
    var e = new Object;
    return e.log = function(e) {}, e.isTouchDevice = function() {
        var e = String(document.documentElement.ontouchmove) != "undefined" ? !0 : !1;
        return e
    }, e.isPhone = function() {
        return window.innerWidth < 768 ? !0 : !1
    }, e.isiPhoneOriPod = function() {
        var e = navigator.userAgent,
            t = e.match(/iPhone/i),
            n = e.match(/iPod/i);
        return t || n ? !0 : !1
    }, e.fillRange = function(e, t) {
        var n = $(e).parent().css("color"),
            r = $(e).css("color");
        t *= 100;
        var i = "background: -webkit-linear-gradient(left, " + n + " 0%, " + n + " " + t + "%, " + r + " " + t + "%, " + r + " 100%);";
        i += "background: -moz-linear-gradient(left, " + n + " 0%, " + n + " " + t + "%, " + r + " " + t + "%, " + r + " 100%);", i += "background: -o-linear-gradient(left, " + n + " 0%, " + n + " " + t + "%, " + r + " " + t + "%, " + r + " 100%);";
        var s = $(e).attr("style"),
            o = s ? s + " " + i : i;
        $(e).attr("style", o)
    }, e.isIE = function() {
        if (navigator.userAgent.indexOf("MSIE") != -1) var e = /MSIE (\d+\.\d+);/;
        else var e = /Trident.*rv[ :]*(\d+\.\d+)/;
        var t = e.test(navigator.userAgent);
        return t
    }, e.getIEVersion = function() {
        var e = window.navigator.userAgent,
            t = e.indexOf("MSIE "),
            n = 0;
        return t > 0 && (n = parseInt(e.substring(t + 5, e.indexOf(".", t)))), n
    }, e.isAndriod = function() {
        var e = navigator.userAgent.toLowerCase(),
            t = e.indexOf("android") > -1;
        return t
    }, e.isIOS = function() {
        var e = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
        return e
    }, e.getAndroidVersion = function() {
        var e = navigator.userAgent.toLowerCase(),
            t = e.indexOf("android"),
            n = 0;
        return t != -1 && (n = parseFloat(e.match(/android\s+([\d\.]+)/)[1])), n
    }, e.parseHTML = function(e, t, n) {
        if ($.parseHTML) return $.parseHTML(e);
        if (!e || typeof e != "string") return null;
        typeof t == "boolean" && (n = t, t = !1), t = t || document;
        var r = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            i = r.exec(e),
            s = !n && [];
        return i ? [t.createElement(i[1])] : (i = $.buildFragment([e], t, s), s && $(s).remove(), $.merge([], i.fragment.childNodes))
    }, e.setCookie = function(e, t, n) {
        if (n) {
            var r = new Date;
            r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
            var i = "; expires=" + r.toGMTString()
        } else var i = "";
        document.cookie = e + "=" + t + i + "; path=/"
    }, e.getCookie = function(e) {
        var t = e + "=",
            n = document.cookie.split(";");
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            while (i.charAt(0) == " ") i = i.substring(1, i.length);
            if (i.indexOf(t) == 0) return i.substring(t.length, i.length)
        }
        return null
    }, e.delCookie = function(t) {
        e.setCookie(t, "", -1)
    }, e.setLangCode = function(t, n) {
        var r = "en",
            i, s, o, u, a, f, l = String(document.documentElement.ontouchmove) != "undefined" ? !0 : !1;
        l ? i = localStorage.getItem(WIDGET_CONSTANTS.LOCALE_COOKIE_NAME) : i = e.getCookie(WIDGET_CONSTANTS.LOCALE_COOKIE_NAME), s = i && i.toString().length > 0 ? i : r, f = require.s.contexts._.config.resourceBundle ? require.s.contexts._.config.resourceBundle : "default", o = s ? require.toUrl("./resourceBundle/" + f + "/Strings/Strings_" + s + "/" + n) : "", s !== "en" && (u = require.toUrl("./resourceBundle/" + f + "/Strings/Strings_" + r + "/" + n)), a = function(e) {
            window[t] = e, t === "AppLang" && (window[t].VERSION += WIDGET_CONSTANTS.VERSION)
        }, $.ajax({
            async: !1,
            url: o,
            dataType: "json"
        }).done(function(e, t, n) {
            a(e), WIDGET_CONSTANTS.LOCALE = s
        }).fail(function(e, t) {
            console.error("Failed to load url: " + o + " with message: " + t), t === "error" && u && $.ajax({
                async: !1,
                url: u,
                dataType: "json"
            }).done(function(e, t, n) {
                a(e), WIDGET_CONSTANTS.LOCALE = r
            }).fail(function(e, t) {
                console.error("Failed to load url: " + u + " with message: " + t)
            })
        })
    }, e.getOffset = function(e) {
        return {
            left: e.get(0).offsetLeft,
            top: e.get(0).offsetTop
        }
    }, e.getCleanURL = function(e) {
        var t;
        return e.indexOf("file:///") >= 0 ? (t = e.substr(e.indexOf("file:///") + 8), t = t.replace(/([^:]\/)\/+/g, "$1"), t = "file:///" + t) : t = e.replace(/([^:]\/)\/+/g, "$1"), t
    }, e.showLoader = function() {
        $("#loading-indicator").modal({
            show: !0,
            keyboard: !1,
            backdrop: "static"
        }), $(".modal-backdrop").last().css("z-index", "9000")
    }, e.hideLoader = function() {
        $("#loading-indicator").modal("hide")
    }, e.sortObjByKey = function(e) {
        var t = e,
            n = [],
            r, i, s, o = {};
        for (r in t) t.hasOwnProperty(r) && n.push(r);
        n.sort(), s = n.length;
        for (i = 0; i < s; i++) r = n[i], o[r] = t[r];
        return o
    }, e.injectCSSFile = function(t) {
        var n = document.getElementsByTagName("head")[0],
            r = require.s.contexts._.config.readerCss;
        for (i = 0; i < r.length; i++) {
            var s = document.createElement("link");
            s.rel = "stylesheet", s.type = "text/css", s.href = "widgets/" + r[i], n.appendChild(s)
        }
        iframeHeadTag = t.document.getElementsByTagName("head")[0];
        var o = window.location.origin,
            u = window.location.pathname.split("/");
        u.pop();
        var a = u.join("/") + "/widgets/",
            f = require.s.contexts._.config.iframeCss;
        for (i = 0; i < f.length; i++) {
            var s = document.createElement("link");
            s.rel = "stylesheet", s.type = "text/css", s.href = o + a + "/" + f[i], iframeHeadTag.appendChild(s)
        }
        if (parseFloat(e.getAndroidVersion()) < 4.4 && e.isAndriod()) {
            var l = require.s.contexts._.config.iframeCss_android4;
            for (i = 0; i < l.length; i++) {
                var s = document.createElement("link");
                s.rel = "stylesheet", s.type = "text/css", s.href = o + a + "/" + l[i], iframeHeadTag.appendChild(s)
            }
        }
    }, e.getSvcParams = function(e) {
        var t = {};
        return e.data && (t.data = e.data), e.type && (t.type = e.type), e.url && (t.url = e.url), e.contentType && (t.contentType = e.contentType), e.success && (t.success = e.success), e.error && (t.error = e.error), e.context && (t.context = e.context), e.crossDomain && (t.crossDomain = e.crossDomain), e.headers && (t.headers = e.headers), e.mimeType && (t.mimeType = e.mimeType), e.statusCode && (t.statusCode = e.statusCode), t
    }, e.getWidgetProperties = function(e) {
        var t = window.location.pathname.split("/")[1],
            n = window.location.origin + "/" + t + "/pubservice/";
        $.get(n + "/widget/props.excel?type=" + e.type, function(e, t) {}).done(function(t) {
            console.log("second success", t), e.successCallback(t)
        }).fail(function() {
            console.log("error")
        })
    }, e
}), define("com/es/utilities/AppLang", ["com/es/widgets/WidgetUtils"], function(e) {
    var t = {
        langGlobalObj: "AppLang",
        fileName: "editorStrings.json"
    };
    return e.setLangCode(t.langGlobalObj, t.fileName), !1
}), define("com/es/utilities/AppEvent", [], function() {
    var e = {
        CLICK: "click",
        CHANGE: "change",
        KEYPRESS: "keypress",
        KEYDOWN: "keydown",
        KEYUP: "keyup",
        TIME_UPDATE: "timeupdate",
        ASSET_SELECTED: "onAssetSelected",
        ASSETPOPUP_CANCEL_CLICKED: "onAssetpopUpCancelClick",
        CONFIG_UPDATED: "onConfigUpdated",
        CONTEXTMENU_ITEM_SELECTED: "onContextMenuItemClick",
        SHOW_CONTEXTMENU_CLICKED: "onShowContextMenuClick",
        SAVE_CONTENT: "onSavePageInitiated",
        ON_MODE_SELECT: "onModeSelected",
        TOC_ITEM_SELECT: "onTocItemSelected",
        TOC_ITEM_CLICK: "onTocItemClick",
        EDIT_TOC_CLICK: "onEditTocClick",
        DONE_TOC_CLICK: "onDoneTocClick",
        TOC_TREE_ITEM_RENAMED: "onTOCTreeItemRenamed",
        WIDGET_ADDED: "onWidgetAdd",
        DIRTY_STATE_CHANGED: "onDirtyStateChanged",
        EDIT_LINK_CLICKED: "onEditLinkClick",
        SHOW_GLOSSARY: "showGlossary",
        OPTION_ADDED: "optionAdded",
        FIB_ANSWER_ADDED: "onFibActivityAppend",
        ADD_ASSET: "onAssetAdd",
        DONE_LINK_POPUP_CLICK: "onDoneLinkPopupClick",
        TOC_EDITABLE_NODE_CLICKED: "onTOCTreeEditableItemClick",
        TOC_EDITABLE_NODE_BLURRED: "onTOCTreeEditableItemBlur",
        TOC_RENDER_COMPLETE: "onTOCRenderComplete",
        REPORTING_READY: "reporting_ready",
        EDITOR_READY: "qa_editor_ready",
        RENDERER_READY: "qa_renderer_ready",
        QUESTION_CREATED: "question_created",
        GLOSSARY_EDITOR_READY: "glossary_editor_ready",
        TOCEDITOR_READY: "toc_editor_ready",
        QUIZ_CREATOR_READY: "quiz_creator_ready",
        INPUT_PROPERTY_CHANGE: "input propertychange"
    };
    window.AppEvent = e
}), define("com/es/quizEditor/QuizEditorConstants", [], function() {
    return window.QUIZ_EDITOR_CONSTANTS || (window.QUIZ_EDITOR_CONSTANTS = {
        BOOK_ID: "",
        ROOT_URL: "",
        ROOT_PATH: "",
        SERVICE_BASE_URL: "",
        QUESTION_ASSET_BASE_PATH: "",
        MCQ_SINGLE_RESPONSE_QUESTION_TYPE_ID: 101,
        MCQ_MULTIPLE_RESPONSE_QUESTION_TYPE_ID: 102,
        FIB_TEXT_QUESTION_TYPE_ID: 103,
        FIB_TAP_AND_PLACE_QUESTION_TYPE_ID: 104,
        FIB_DROP_DOWN_QUESTION_TYPE_ID: 105,
        MATCHING_QUESTION_TYPE_ID: 106,
        GROUPING_QUESTION_TYPE_ID: 107,
        TRUE_OR_FALSE_QUESTION_TYPE_ID: 108,
        COLLECTION_QUESTION_TYPE_ID: 109,
        ALL_QUESTION_TYPE_ID: 0,
        QUES_ID: "",
        MAX_TITLE_LENGTH: 500
    }), window.QUIZ_EDITOR_CONSTANTS
}),
function() {
    var e = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
        t = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        n = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        r = typeof location != "undefined" && location.href,
        i = r && location.protocol && location.protocol.replace(/\:/, ""),
        s = r && location.hostname,
        o = r && (location.port || void 0),
        u = [];
    define("com/es/text", [], function() {
        var a, f, l;
        return typeof window != "undefined" && window.navigator && window.document ? f = function(e, t) {
            var n = a.createXhr();
            n.open("GET", e, !0), n.onreadystatechange = function() {
                n.readyState === 4 && t(n.responseText)
            }, n.send(null)
        } : typeof process != "undefined" && process.versions && process.versions.node ? (l = require.nodeRequire("fs"), f = function(e, t) {
            t(l.readFileSync(e, "utf8"))
        }) : typeof Packages != "undefined" && (f = function(e, t) {
            var n = new java.io.File(e),
                r = java.lang.System.getProperty("line.separator"),
                n = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(n), "utf-8")),
                i, s, o = "";
            try {
                i = new java.lang.StringBuffer, (s = n.readLine()) && s.length() && s.charAt(0) === 65279 && (s = s.substring(1));
                for (i.append(s);
                    (s = n.readLine()) !== null;) i.append(r), i.append(s);
                o = String(i.toString())
            } finally {
                n.close()
            }
            t(o)
        }), a = {
            version: "0.27.0",
            strip: function(e) {
                if (e) {
                    var e = e.replace(t, ""),
                        r = e.match(n);
                    r && (e = r[1])
                } else e = "";
                return e
            },
            jsEscape: function(e) {
                return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
            },
            createXhr: function() {
                var t, n, r;
                if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                for (n = 0; n < 3; n++) {
                    r = e[n];
                    try {
                        t = new ActiveXObject(r)
                    } catch (i) {}
                    if (t) {
                        e = [r];
                        break
                    }
                }
                if (!t) throw Error("createXhr(): XMLHttpRequest not available");
                return t
            },
            get: f,
            parseName: function(e) {
                var t = !1,
                    n = e.indexOf("."),
                    r = e.substring(0, n),
                    e = e.substring(n + 1, e.length),
                    n = e.indexOf("!");
                return n !== -1 && (t = e.substring(n + 1, e.length), t = t === "strip", e = e.substring(0, n)), {
                    moduleName: r,
                    ext: e,
                    strip: t
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(e, t, n, r) {
                var i = a.xdRegExp.exec(e),
                    s;
                return i ? (e = i[2], i = i[3], i = i.split(":"), s = i[1], i = i[0], (!e || e === t) && (!i || i === n) && (!s && !i || s === r)) : !0
            },
            finishLoad: function(e, t, n, r, i) {
                n = t ? a.strip(n) : n, i.isBuild && i.inlineText && (u[e] = n), r(n)
            },
            load: function(e, t, n, u) {
                var f = a.parseName(e),
                    l = f.moduleName + "." + f.ext,
                    c = t.toUrl(l),
                    h = u && u.text && u.text.useXhr || a.useXhr;
                !r || h(c, i, s, o) ? a.get(c, function(t) {
                    a.finishLoad(e, f.strip, t, n, u)
                }) : t([l], function(e) {
                    a.finishLoad(f.moduleName + "." + f.ext, f.strip, e, n, u)
                })
            },
            write: function(e, t, n) {
                if (t in u) {
                    var r = a.jsEscape(u[t]);
                    n.asModule(e + "!" + t, "define(function () { return '" + r + "';});\n")
                }
            },
            writeFile: function(e, t, n, r, i) {
                var t = a.parseName(t),
                    s = t.moduleName + "." + t.ext,
                    o = n.toUrl(t.moduleName + "." + t.ext) + ".js";
                a.load(s, n, function() {
                    var t = function(e) {
                        return r(o, e)
                    };
                    t.asModule = function(e, t) {
                        return r.asModule(e, o, t)
                    }, a.write(e, s, t, i)
                }, i)
            }
        }
    })
}(), define("com/es/text!templateBasePath/Editor/quiz/baseTemplate.html", [], function() {
    return '<div class="quiz-editor-popup">\r\n	<div class="header modal-header question-tabs">				\r\n				<span type="button" id="editBtn" class="active" ><%=AppLang.EDIT_LABEL%> </span>\r\n				<span type="button" id="previewBtn" class="" ><%=AppLang.SAVE_AND_PREVIEW%> </span>\r\n	</div>	\r\n	<div id="modal-body" class="quiz-container">\r\n		<div class="activity-container"> </div>\r\n		<div class="preview-container-title" style="display: none"> </div>\r\n		<div class="preview-container" style="display: none"> </div>\r\n		<div class="modal-footer activityFooter">	\r\n			<div>\r\n				 <button type="button" class="doneBtn"><%=AppLang.SAVE_LABEL%> </button>		       			\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'
}), define("com/es/text!templateBasePath/Editor/popups/popUpTemplate.html", [], function() {
    return '<div class="popUpContainer">\r\n	<div id="loading-indicator" class="modal-dialog loading-indicator" >\r\n	    	<img class="preloader"/>\r\n	</div>\r\n	<!--div id="js-alert" class="modal-dialog alert alert-warning js-alert fade">\r\n	    <p class="js-alert-text"></p>\r\n	</div-->\r\n\r\n	<div id="js-alert" class="modal popup-alert-cover fade in" tabindex="-1" role="dialog">\r\n	    <div class="modal-dialog popup-alert modal-sm">\r\n	      <div class="modal-content">\r\n	        <!--div class="modal-header">\r\n	          <h4 class="modal-title alert-text" id="js-alert-text"></h4>\r\n	        </div-->\r\n	        <div class="modal-body">\r\n	          <p id="js-alert-text" class="alert-text"></p>\r\n	          <button type="button" class="btn btn-default cancelbtn" data-dismiss="modal" aria-label="Close">Close</button>\r\n	        </div>\r\n	      </div>\r\n	    </div>\r\n	</div>\r\n\r\n\r\n	\r\n	<div id="toastContainer" class="modal-dialog toastContainer" >\r\n	    <div id="toastMsg" class="modal-content">\r\n		</div>\r\n	</div>\r\n	<div id="confirmPopupCover" class="modal fade in">		\r\n	</div>\r\n</div>'
}), define("com/es/text!templateBasePath/Editor/quiz/FIBDropdownTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n	<div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<%=title %>\r\n	</div>\r\n    <span class="activityType"><%=AppLang.EDIT_FIB_DROPDOWN%></span>\r\n</div>\r\n\r\n<div class="rubric-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n	<div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% _.each(rubric, function(item, i){ %>\r\n			<%=item.data %>\r\n			 <% }); %>\r\n	</div>\r\n</div>\r\n\r\n\r\n<div class="question-text-Wrapper">\r\n<span class="formLabel"><%=AppLang.QUESTION_TEXT_LABEL_FIB%></span>\r\n<div class="question-option-Wrapper questionContentWrapper" id="question-option-Wrapper">\r\n	<div class="question-option fib-dropdown add-img questionText formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% var gapCount = 0 %>\r\n		<% _.each(questionBody, function(item, i){ %>\r\n		<% if(item == "GAP"){ %>\r\n			<div data-name="fillup" class="data-values-activity-fill FIB_dropdown" contenteditable="false"><span id="dd<%=gapCount%>" class=" FIBtext spantext" contenteditable="false"><%=options[gapCount][answers[gapCount][0]].data%></span><div class="close-pop remove-option"></div></div>\r\n			<% gapCount++ %>\r\n		<%	}else{	%>\r\n				<%if(item.type === "text" && (item.data)){%>\r\n					<%=item.data%>\r\n					<%} else if(item.type === "image"){%>					\r\n								<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />													\r\n					<% } %>\r\n			<%	}%>\r\n			<% }); %>\r\n	</div>\r\n</div>\r\n</div>\r\n    		\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>	\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>	\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>  '
}), define("com/es/text!templateBasePath/Editor/quiz/FIBDropdown_option_template.html", [], function() {
    return '<div class="add_dropdown_options editor-popup modal in" data-backdrop="static">\r\n	<div class="modal-dialog">\r\n		<div class="modal-content">\r\n			<div class="header modal-header">\r\n	            <ul class="answerOptions">\r\n                    <li class="text-left"><div class="title modal-title"><%=AppLang.ADD_ALTERNATIVES_LABEL%></div></li>\r\n                    <li class="text-right"><button class="addIcon btn-add"><%=AppLang.ADD_TEXT%> </button></li>\r\n                </ul>\r\n			</div>	\r\n			<div id="modal-body" class="quiz-container popup-content-spacing">\r\n				<div class="activity-container"> \r\n					<div id="question-options">\r\n						<ul>\r\n							<% _.each(options, function(item, i){ %>\r\n								<li class=\'option-div\' id="li<%=i %>">	\r\n										<span class="dragIcon"></span>			\r\n										<!-- <div class="numbering"><%=i+1 %>)</div>-->\r\n                                     <div class="formPlaceholder">\r\n											 <input type=\'radio\' id="option<%=i%>" class="css-radio"  value=\'<%=i %>\' name=\'options\' <%= (answers.indexOf(i)	 											 > -1)?"checked=true":"" %>></input>\r\n                                             <label class="css-radio-label" for="option<%=i%>" ></label>\r\n										<div class="option-text add-img " contenteditable="true" spellcheck="false" role="textbox">\r\n												<%=item.data %>\r\n										 	</div>				 \r\n                                            </div>\r\n										 <div class="addremove-btn">\r\n						        			\r\n						        			<span class="removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>\r\n						       			 </div>	   		\r\n								</li>\r\n							 <% }); %>\r\n						</ul>\r\n					</div>\r\n\r\n					</div>\r\n	   \r\n				<div class="modal-footer activityFooter">	\r\n					<div>\r\n						 <button type="button" class="cancelBtn" ><%=AppLang.CANCEL_LABEL%> </button>\r\n		       			 <button type="button" class="doneBtn"  ><%=AppLang.DONE_LABEL%> </button>	\r\n					</div>\r\n				</div>\r\n			</div> \r\n		</div>\r\n	</div>\r\n</div> \r\n\r\n    	'
}), define("com/es/quizEditor/models/QuestionEditorModel", [], function() {
    var e = Backbone.Model.extend({
        defaults: {
            id: null,
            metadata: "",
            answers: [],
            heading: [],
            leftCol: [],
            modelParagraph: "",
            options: [],
            optionsLayout: "",
            questionBody: [],
            questionLayout: "",
            responseType: "BUTTON",
            rightCol: [],
            rubric: [],
            questionMedia: [],
            optionsMedia: [],
            title: "",
            maxpoints: [""],
            type: ""
        },
        url: function() {
            return "./com/es/quizEditor/data/MCQ_DefaultQuestionData.json"
        },
        sync: function(e, t, n) {
            n || (n = {});
            var r;
            switch (e) {
                case "create":
                    r = "POST", questionData = t;
                    break;
                case "update":
                    r = "PUT", questionData = t;
                    break;
                case "delete":
                    break;
                case "read":
                    r = "get", questionData = {}
            }
            $.ajax({
                url: this.url,
                type: r,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                headers: {'X-Authorization': sessionStorage.getItem('authT') },
                data: JSON.stringify(questionData),
                success: n.success,
                error: n.error
            })
        }
    });
    return e
}), define("com/es/utilities/services", ["com/es/utilities/utils"], function(e) {
    var t = new Object;
    return t.getBookMetadata = function(e) {
        var t = e.model,
            n = e.successCallback,
            r = e.errorCallback;
        bookId = e.id, t.url = AppConst.SERVICE_BASE_URL + "book/" + bookId + "/details", t.fetch({
            success: function(e) {
                n(e)
            },
            error: function(e) {
                r(e)
            }
        })
    }, t.tocData = function(e) {
        e.tocCollection.url = e.id + "/TOCData.json", e.tocCollection.fetch({
            success: function(t) {
                e.successCallback(t)
            },
            error: function(t) {
                e.errorCallback(t)
            }
        })
    }, t.getAssetList = function(t) {
        var n;
        t.assetListCollection.url = t.url, n = {
            type: t.type,
            term: t.term,
            sortedby: t.sortedby,
            pageSize: t.pageSize,
            pageIndex: t.pageIndex
        }, e.log("popupparams", t), t.assetListCollection.fetch({
            type: "POST",
            data: n,
            success: function(e) {
                t.successCallback(e)
            },
            error: function(e) {
                t.errorCallback(e)
            }
        })
    }, t.getSelectedAssetData = function(e) {
        var t = "epub_content/assets/" + e.path;
        $.getJSON(t, {}).done(function(t) {
            e.successCallback(t)
        }).fail(function(t, n, r) {
            e.errorCallback(r)
        })
    }, t.saveAndPublish = function(e) {
        var t = unescape(AppConst.PAGE_NAME).split("#")[0],
            n = {
                data: encodeURIComponent(e.data),
                page: t,
                enrichment: encodeURIComponent(e.enrichment),
                quiz: encodeURIComponent(e.quiz)
            };
        $.ajax({
            type: "POST",
            url: AppConst.SERVICE_BASE_URL + "book/" + AppConst.BOOK_ID + "/save",
            data: n,
            success: function(t) {
                e.successCallback(e.callback, e.status)
            },
            error: function(t, n, r) {
                e.errorCallback(n)
            }
        })
    }, t.getUserInfo = function(e) {
        var t = e.model,
            n = e.successCallback,
            r = e.errorCallback;
        t.url = AppConst.SERVICE_BASE_URL + AppConst.USER_SERVICE_SUB_URL + e.id, t.fetch({
            success: function(e) {
                n(e)
            },
            error: function(e) {
                r(e)
            }
        })
    }, t.getLinkList = function(e) {
        var t = e.linkCollection,
            n = e.successCallback,
            r = e.errorCallback;
        t.url = "epub_content/assetLists/linkList.json", t.fetch({
            success: function(e) {
                n(e)
            },
            error: function(e) {
                r(e)
            }
        })
    }, t.getGlossaryData = function(e) {
        var t = e.glossaryCollection,
            n = e.successCallback,
            r = e.errorCallback;
        t.url = "epub_content/glossary.json", t.fetch({
            success: function(e) {
                n(e)
            },
            error: function(e) {
                r(e)
            }
        })
    }, t.getOPFData = function(e) {
        $.ajax({
            type: "GET",
            url: e.baseUrl,
            dataType: "xml",
            success: function(t) {
                var n = new X2JS,
                    r = n.xml2json(t),
                    i = r.package;
                e.successCallback(i)
            },
            error: function(t) {
                e.errorCallback(t)
            }
        })
    }, t.getSpineData = function(e) {
        $.ajax({
            type: "GET",
            url: e.baseUrl,
            dataType: "xml",
            success: function(t) {
                var n = new X2JS,
                    r = n.xml2json(t),
                    i = r.package.manifest.item;
                e.successCallback(i)
            },
            error: function(t) {
                e.errorCallback(t)
            }
        })
    }, t.unlockBook = function(e) {
        $.ajax({
            type: "GET",
            url: AppConst.SERVICE_BASE_URL + "book/unlock/" + AppConst.BOOK_ID + "?userId=" + e.userID,
            success: function(t) {
                e.successCallback(t)
            },
            error: function(t, n, r) {
                e.failureCallback(n)
            }
        })
    }, t.saveTOCData = function(e) {
        var t = JSON.stringify(e.data),
            n = {
                data: t,
                isSampleBookDefined: e.isSampleBookDefined
            };
        $.ajax({
            type: "POST",
            url: AppConst.SERVICE_BASE_URL + "book/" + AppConst.BOOK_ID + "/toc",
            data: n,
            success: function(t) {
                e.success()
            },
            error: function(t, n, r) {
                console.log("error in saving updated toc data"), e.error()
            }
        })
    }, t.redirectLibrary = function(n) {
        if (n) {
            var r = {
                userID: AppConst.USER_ID,
                successCallback: function(t) {
                    var n = jQuery.parseJSON(t);
                    if (n.status == "true") {
                        var r = window.location.href,
                            i;
                        i = r.substring(0, r.indexOf("/QA/") + 1), i += "bookdefault.excel", window.location.href = i
                    } else e.showToasterMessage(AppLang.UNABLE_TO_UNLOCK_FILE_FOR_USER_MESSAGE + AppConst.USER_ID, 2e3, function() {
                        var e = window.location.href,
                            t;
                        t = e.substring(0, e.indexOf("/QA/") + 1), t += "bookdefault.excel", window.location.href = t
                    })
                },
                failureCallback: function(e) {
                    console.log("Error occured: ", e)
                }
            };
            t.unlockBook(r)
        } else {
            var i = window.location.href,
                s;
            s = i.substring(0, i.indexOf("/QA/") + 1), s += "bookdefault.excel", window.location.href = s
        }
    }, t.redirectLogout = function() {
        var e = window.location.href,
            t;
        t = e.substring(0, e.indexOf("/QA/") + 1), window.location.href = t + AppConst.LOGOUT_SERVICE_SUB_URL
    }, t.fetchGlossaryData = function(e) {
        e.glossaryCollection.url = "/pubportal/QA/com/es/data/glossary.json", e.glossaryCollection.fetch({
            success: function(t) {
                e.successCallback(t)
            },
            error: function(t) {
                e.errorCallback(t)
            }
        })
    }, t.fetchQuestionData = function(e) {
        $.ajax({
            type: "GET",
            url: e.url,
            success: function(t) {
                t = typeof t == "string" ? JSON.parse(t) : t, e.successCallback(t)
            },
            error: function(t, n, r) {
                e.errorCallback(n)
            }
        })
    }, t.fetchLrnActivity = function(e) {
        var t = {
            type: "GET",
            url: e.url,
            success: function(t) {
                t = typeof t == "string" ? JSON.parse(t) : t, e.successCallback(t)
            },
            error: function(t, n, r) {
                e.errorCallback(n)
            }
        };
        WIDGET_CONSTANTS.APPLICATION_TYPE === "Reader" && (t.headers = {
            userId: WIDGET_CONSTANTS.USER_ID
        }), $.ajax(t)
    }, t.fetchLrnSignature = function(e) {
        var t = {
            security: e.data.securityObj,
            request: e.data.requestObj
        }, n = null,
            r;
        t = JSON.stringify(t), WIDGET_CONSTANTS.APPLICATION_TYPE === "Editor" ? n = "application/json" : n = "text/plain", r = {
            type: "POST",
            data: t,
            url: e.url,
            contentType: n,
            success: function(t) {
                t = typeof t == "string" ? JSON.parse(t) : t, e.successCallback(t)
            },
            error: function(t, n, r) {
                e.errorCallback(n)
            }
        }, WIDGET_CONSTANTS.APPLICATION_TYPE === "Reader" && (r.headers = {
            userId: WIDGET_CONSTANTS.USER_ID
        }), $.ajax(r)
    }, t.fetchEowData = function(e) {
        var t = {
            type: "POST",
            data: JSON.stringify(e.data),
            url: e.url,
            contentType: "application/json",
            success: function(t) {
                t = typeof t == "string" ? JSON.parse(t) : t, e.successCallback(t)
            },
            error: function(t, n, r) {
                e.errorCallback(n)
            }
        };
        $.ajax(t)
    }, t
}), define("com/es/text!templateBasePath/Editor/popups/confirmationPopupTemplate.html", [], function() {
    return '\r\n	<div class="confirmPopup modal-dialog">\r\n		<div class="modal-content">\r\n			<div class="header modal-header">\r\n				<div class="title modal-title"><%=AppLang.CONFIRMATION_POPUP_TITLE%></div>\r\n			</div>		\r\n			\r\n			<div class="modal-body message">\r\n				<%=AppLang.CONFIMATION_MESSAGE%>\r\n			</div>\r\n			\r\n			<div class="bottomBar modal-footer">\r\n				<div>\r\n					<button type="button" id="yes" class=" btn btn-default" ><%=AppLang.CONFIRMATION_POPUP_YES%></button>\r\n					<button type="button" id="no" class=" btn btn-primary" ><%=AppLang.CONFIRMATION_POPUP_NO%></button>\r\n	       			<button type="button" id="cancel" class=" btn btn-primary" ><%=AppLang.CONFIRMATION_POPUP_CANCEL%></button>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n\r\n'
}), define("com/es/utilities/utils", ["com/es/utilities/services", "com/es/text!templateBasePath/Editor/popups/confirmationPopupTemplate.html", "com/es/widgets/WidgetUtils"], function(e, t, n) {
    var r = new Object;
    return r.DEFAULT_TOASTER_DURATION = 1e3, r.log = function(e) {}, r.rewriteProperty = function(e, t, n) {
        if (typeof e != "object") return e;
        for (var r in e) e.hasOwnProperty(r) && (e[r.replace(t, n)] = this.rewriteProperty(e[r], t, n), r.indexOf(t) > -1 && delete e[r]);
        return e
    }, r.showLoader = function() {
        $("#loading-indicator").modal({
            show: !0,
            keyboard: !1,
            backdrop: "static"
        }), $(".modal-backdrop").last().css("z-index", "9000")
    }, r.hideLoader = function() {
        $("#loading-indicator").modal("hide")
    }, r.showAlert = function(e) {
        if (!e) return !1;
        var t = e.toLowerCase().toString(),
            n = $("#js-alert"),
            r = $(".alert-text", n);
        r.html(t), n.modal({
            show: !0,
            keyboard: !1,
            backdrop: "static"
        }), n.on("hidden.bs.modal", function(e) {
            r && r.html(""), $(this).off("hidden.bs.modal")
        })
    }, r.hideAlert = function() {}, r.showToasterMessage = function(e, t, n, i) {
        if (t == undefined || t == null || t == "") t = r.DEFAULT_TOASTER_DURATION;
        $("#toastMsg").text(e);
        var s = $(window).height() / 2 - $("#toastContainer").outerHeight() / 2;
        $("#toastContainer").css({
            top: s,
            margin: "auto"
        }), $(".popUpContainer").addClass("onshow"), $("#toastContainer").modal("show"), r.myTimer = setTimeout(r.hideToasterMessage.bind(r, n, i), t)
    }, r.hideToasterMessage = function(e, t) {
        clearTimeout(r.myTimer), $("#toastContainer").modal("hide"), $(".popUpContainer").removeClass("onshow"), e != undefined && e != null && e(t)
    }, r.showConfirmPopUp = function(e, n, r, i) {
        var s = $("#confirmPopupCover"),
            o = _.template(t, {});
        $("#confirmPopupCover").attr("tabindex", "-1"), s.html("").append(o), r != undefined && r != undefined && r != undefined && _.each(r, function(e) {
            s.find("#" + e).remove()
        }), $(".title", s).html(n), $(".message", s).html(e), $(".bottomBar", s).find(".btn").unbind().bind(AppEvent.CLICK, function(e) {
            s.modal("hide"), i(e.target.id)
        }), s.off("hidden.bs.modal").on("hidden.bs.modal", function() {
            $(".bottomBar", s).find(".btn").unbind(), s.html(""), $("body").css("overflow", "auto")
        }), $("body").css("overflow", "hidden"), s.modal("show")
    }, r.loadJsCssFile = function(e, t, n, r) {
        var i, s;
        s = e.get(0).contentWindow, r == "js" ? (i = s.document.createElement("script"), i.setAttribute("type", "text/javascript"), i.setAttribute("src", t + "/" + n + ".js")) : r == "css" && (i = s.document.createElement("link"), i.setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), i.setAttribute("href", t + "/" + n + ".css")), typeof i != "undefined" && s.document.getElementsByTagName("head")[0].appendChild(i)
    }, r.checkAddJsCssFile = function(e, t, n, i) {
        var s, o, u, a, f, l = !1;
        o = e.get(0).contentWindow, i == "js" ? s = t + "/" + n + ".js" : i == "css" && (s = t + "/" + n + ".css"), u = i == "js" ? "script" : i == "css" ? "link" : "none", a = i == "js" ? "src" : i == "css" ? "href" : "none", f = o.document.getElementsByTagName(u), l || r.loadJsCssFile(e, t, n, i)
    }, r.getIframePageHtml = function() {
        var e = ["jquery-ui.css", "widgets.css", "widgets_iFrameWidgetEditor.css", "widgets_iFrameWidget.css", "widget_color.css", "widget_global.css", "iframeTheme"],
            t = document.getElementById("authoringIframe"),
            n = t.contentWindow.document.documentElement,
            i = $("body", $(t).contents()).width(),
            s = jQuery(n).clone(),
            o = r.removeExtraContent(e, s, i),
            u = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html>' + o.prop("outerHTML");
        return u
    }, r.removeCssFile = function(e, t) {
        return _.each(e, function(e) {
            $('link[href*="' + e + '"]', t).remove()
        }), t
    }, r.removeExtraContent = function(e, t, n) {
        var i = $("#authoringIframe").contents(),
            s = ["block"];
        $("#tinyhippos-injected", t).remove(), $("body", t).removeAttr("contenteditable"), $("body", t).removeAttr("dropzone"), $(".widget-ui", t).remove();
        var o = $(".widget-placeholder", t);
        o.find(".dummyWidget").remove(), o.find(".ui-resizable-handle").remove(), o.find(".move-icon").remove(), o.removeAttr("draggable"), o.removeAttr("contenteditable"), o.removeClass("ui-resizable"), o.removeClass("widgetFrame");
        var u = o.length;
        if (AppConst.BOOK_TYPE == "reflowable") {
            o.css("height", "");
            for (var a = 0; a < u; a++) {
                var f = $(o[a]),
                    l = $("div[id='" + f.get(0).id + "']", i),
                    c = l.parent(),
                    h = 0;
                while (c.css("display").toLowerCase() == "inline") h++, c = c.parent();
                var p = c.width(),
                    d = l.width();
                f.data("align") == "fitToWidth" && (f.data("type") == "image" || f.data("type") == "imageGal" || f.data("type") == "video" || f.data("type") == "assessment" && f.data("mode") == "poster") ? (d = $("#ui-" + f.get(0).id + " img", i).width() / $("#" + f.get(0).id, i).width() * 100 + "%", f.attr("data-width", d), f.css("height", f.data("height"))) : d = d / p * 100 + "%", f.css("width", d)
            }
        } else
            for (var a = 0; a < u; a++) {
                var f = $(o[a]);
                if (f.data("mode") == "compact" && f.data("border")) {
                    var d = $("#div-border-ui-" + f.attr("id"), $("#authoringIframe").contents()).width(),
                        v = $("#div-border-ui-" + f.attr("id"), $("#authoringIframe").contents()).height();
                    $("#div-border-ui-" + f.attr("id"), t).remove(), f.css("width", d), f.css("height", v)
                }
            }
        var m = r.removeCssFile(e, t);
        return m
    }, r.getDateFormat = function(e) {
        var t = new Date(e),
            n = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            r = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            i = n[t.getDay()],
            s = r[t.getMonth()],
            o = i + ", " + s + " " + t.getDate() + ", " + t.getFullYear();
        return o
    }, r.clone = function(e) {
        if (Object.prototype.toString.call(e) === "[object Array]") {
            var t = [],
                n = 0,
                r = e.length;
            for (; n < r; n++) t[n] = arguments.callee(e[n]);
            return t
        }
        if (typeof e == "object") {
            var t = {}, n;
            for (n in e) t[n] = arguments.callee(e[n]);
            return t
        }
        return e
    }, r.isTouchDevice = function() {
        var e = String(document.documentElement.ontouchmove) != "undefined" ? !0 : !1;
        return e
    }, r.string2Bin = function(e) {
        var t = [];
        for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n) & 255);
        return t
    }, r.arrayBufferToBinaryString = function(e) {
        var t = "",
            n = new Uint8Array(e),
            r = n.byteLength;
        for (var i = 0; i < r; i++) t += String.fromCharCode(n[i]);
        return t
    }, r.string2ArrayBuffer = function(e) {
        var t = new ArrayBuffer(e.length),
            n = new Uint8Array(t);
        for (var r = 0; r < e.length; r++) n[r] = e.charCodeAt(r);
        return t
    }, r.bin2String = function(e) {
        return String.fromCharCode.apply(String, e)
    }, r.encode_utf8 = function(e) {
        return unescape(encodeURIComponent(e))
    }, r.makeOptionsSortable = function(e, t, n) {
        $(e).addClass("sortableOptions"), $(e).sortable({
            handle: "span.dragIcon",
            containment: t,
            update: function(e, t) {
                n && n()
            },
            start: function() {}
        })
    }, r.getURlQueryStringParams = function() {
        var e = [],
            t, n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        for (var r = 0; r < n.length; r++) t = n[r].split("="), e.push(t[0]), e[t[0]] = t[1];
        return e
    }, r.removeNbsp = function(e) {
        var t;
        return e ? t = e.replace(/&nbsp;/g, "").trim() : t = "", t
    }, r.userInputValidator = function(e, t) {
        var n = !1,
            r = "";
        return t ? e.find("img").length > 0 ? (n = !0, n) : (r = e.text().replace(/&nbsp;/g, "").trim(), r = r.replace("​", ""), r ? (n = !0, n) : (n = !1, n)) : (r = e.text().replace(/&nbsp;/g, "").trim(), r = r.replace("​", ""), r ? (n = !0, n) : (n = !1, n))
    }, r.sortObjByKey = function(e) {
        var t = e,
            n = [],
            r, i, s, o = {};
        for (r in t) t.hasOwnProperty(r) && n.push(r);
        n.sort(), s = n.length;
        for (i = 0; i < s; i++) r = n[i], o[r] = t[r];
        return o
    }, r.isIE = function() {
        var e = navigator.userAgent.toLowerCase(),
            t = e.indexOf("msie") > -1;
        return t
    }, r.isPhone = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? !0 : !1
    }, r.getQuestionTypeById = function(e) {
        var t = [{
            quesTypeID: 101,
            quesType: "MCQ Single Response"
        }, {
            quesTypeID: 102,
            quesType: "MCQ Multiple Response"
        }, {
            quesTypeID: 103,
            quesType: "FIB Text"
        }, {
            quesTypeID: 104,
            quesType: "FIB Tap and Place"
        }, {
            quesTypeID: 105,
            quesType: "FIB Drop Down"
        }, {
            quesTypeID: 106,
            quesType: "Matching"
        }, {
            quesTypeID: 107,
            quesType: "Grouping"
        }, {
            quesTypeID: 108,
            quesType: "True or False"
        }, {
            quesTypeID: 109,
            quesType: "Collection"
        }],
            n = "";
        return n = _.findWhere(t, {
            quesTypeID: parseInt(e)
        }) ? _.findWhere(t, {
            quesTypeID: parseInt(e)
        }).quesType : "", n
    }, r.mouseWheel = function(e) {
        $(e).on("mousewheel DOMMouseScroll", function(e) {
            var t = e.originalEvent,
                n = t.wheelDelta || -t.detail;
            this.scrollTop += (n < 0 ? 1 : -1) * 30, e.preventDefault()
        })
    }, r.checkProtocol = function(e) {
        var e = e,
            t = e.split("http:"),
            n = "https:";
        if (window.location.protocol === n) {
            var r = n + t[1];
            return r
        }
        return e
    }, r
}), define("com/es/quizEditor/views/DropdownOptionsEditView", ["com/es/text!templateBasePath/Editor/quiz/FIBDropdown_option_template.html", "com/es/utilities/utils"], function(e, t) {
    var n = Backbone.View.extend({
        el: null,
        data: null,
        isDirty: !1,
        events: {},
        initialize: function(e) {
            _.extend(this, Backbone.Events), _.bindAll(this, "render", "addOption", "removeOption", "updateOptions", "handleDoneClick", "handleCancelClick")
        },
        render: function(n) {
            this.options = n || {};
            var r = _.template(e, this.options.data);
            $(this.options.container).after(r), this.el = $(".add_dropdown_options");
            var i = this;
            $(this.el).on(AppEvent.CLICK, ".addIcon", this.addOption), $(this.el).on(AppEvent.CLICK, ".removeIcon", this.removeOption), $(this.el).on(AppEvent.CLICK, ".doneBtn", this.handleDoneClick), $(this.el).on(AppEvent.CLICK, ".cancelBtn", this.handleCancelClick), $(this.el).on(AppEvent.CHANGE, i.correctOptionChanged.bind(i)), $(".option-div").on(AppEvent.INPUT_PROPERTY_CHANGE, function() {
                i.isDirty = !0
            }), t.makeOptionsSortable("div#question-options > ul", "#question-options", this.updateOptions), $(this.el).modal("show")
        },
        correctOptionChanged: function() {
            this.isDirty = !0
        },
        addOption: function(e) {
            this.isDirty = !0;
            var t = $("ul", "#question-options").children().first(),
                n = t.clone(),
                r = parseInt($("ul", "#question-options").children().length);
            $(n.children().get(1)).find("input").attr("id", "option" + parseInt(r + 1)), $(n.children().get(1)).find("label").attr("for", "option" + parseInt(r + 1)), n.find(".option-text").html(AppLang.NEW_OPTION_LABEL), n.find("input[name=options]").removeAttr("checked"), t.before(n), this.updateOptions()
        },
        removeOption: function(e) {
            this.isDirty = !0;
            var n = $(".option-div", this.el);
            if (n.length > 2) {
                var r = $(e.target.parentNode.parentNode);
                r.remove(), this.updateOptions()
            } else t.showToasterMessage(AppLang.DROPDOWN_MIN_OPTION_TEXT)
        },
        updateOptions: function() {
            this.isDirty = !0;
            var e = $(".option-div", this.el);
            _.each(e, function(e, t) {
                $(e).attr("id", "li" + t), $(e).find(".numbering").html(t + 1 + ")"), $(e).find("input[name=options]").val(t)
            })
        },
        handleDoneClick: function() {
            this.isDirty = !1;
            var e = $("input[name=options]", this.el),
                n = $("input[name=options]:checked", this.el);
            if (n.length < 1) {
                t.showToasterMessage(AppLang.DROPDOWN_SELECT_ANSWER_TEXT);
                return
            }
            var r = [];
            _.each(n, function(e) {
                r.push(parseInt($(e).val()))
            });
            var i = $(".option-text", this.el),
                s = [];
            for (var o = 0; o < i.length; o++) {
                var u = / style.*?=.*('|").*?('|")/ig,
                    a = $(i[o]).html().replace(/&nbsp;/g, " ").replace(u, "").trim();
                if (a == AppLang.NEW_OPTION_LABEL) {
                    t.showToasterMessage(AppLang.EDIT_OPTION_TEXT);
                    return
                }
                if (a == "") {
                    t.showToasterMessage(AppLang.BLANK_OPTION_TEXT);
                    return
                }
                s.push({
                    data: a,
                    type: "text"
                })
            }
            var f = s[r[0]].data;
            $(this.options.elem).attr("data-options", JSON.stringify(s)), $(this.options.elem).attr("data-answers", JSON.stringify(r)), $(".selectedFIB").removeClass("selectedFIB"), $(this.el).modal("hide");
            var l = this;
            _.delay(function() {
                $(l.el).remove()
            }, 100);
            var a = {
                answer: f,
                elem: this.options.elem
            };
            this.trigger("options_updated", a)
        },
        handleCancelClick: function() {
            var e = this;
            this.isDirty === !0 ? t.showConfirmPopUp(AppLang.SAVE_WIDGET_CONFIMATION_MESSAGE, "Confirm", ["cancel"], function(t) {
                if (t.toLowerCase() !== "yes") return;
                e.isDirty = !1, $(".selectedFIB").removeClass("selectedFIB"), _.delay(function() {
                    $(e.el).modal("hide"), _.delay(function() {
                        $(e.el).remove()
                    }, 100)
                }, 70)
            }) : (e.isDirty = !1, $(".selectedFIB").removeClass("selectedFIB"), _.delay(function() {
                $(e.el).modal("hide"), _.delay(function() {
                    $(e.el).remove()
                }, 100)
            }, 70))
        }
    });
    return n
}), define("com/es/quizEditor/views/FIBDropDownEditView", ["com/es/text!templateBasePath/Editor/quiz/FIBDropdownTemplate.html", "com/es/text!templateBasePath/Editor/quiz/FIBDropdown_option_template.html", "com/es/quizEditor/models/QuestionEditorModel", "com/es/quizEditor/views/DropdownOptionsEditView", "com/es/utilities/utils", "com/es/utilities/services"], function(e, t, n, r, i, s) {
    var o = function(t) {
        var o = null,
            u = null,
            a = null,
            f = null,
            l = "",
            c = null,
            h = [],
            p = !1,
            d = function() {
                var t = f.attributes,
                    n = _.template(e, t);
                $(".activity-container", u).html(n), $(".header > div.title", u).html(AppLang.EDIT_ACTIVITY + AppLang.EDIT_FIB_DROPDOWN), c = new r, c.on("options_updated", b);
                var i = $(".FIB_dropdown", u);
                _.each(i, function(e, n) {
                    $(e).attr("data-options", JSON.stringify(t.options[n])), $(e).attr("data-answers", JSON.stringify(t.answers[n]))
                }), o.trigger("render_complete")
            }, v = function(e, t, n) {
                $(t).addClass("FIB_dropdown"), $(t).find(".spantext").addClass("FIBtext");
                var r = [{
                    data: n,
                    type: "text"
                }, {
                    data: AppLang.NEW_OPTION_LABEL,
                    type: "text"
                }];
                $(t).attr("data-options", JSON.stringify(r)), $(t).attr("data-answers", "[0]")
            }, m = function(e) {
                l = e;
                var t = function(t) {
                    e ? f = new n(t.questionsData[0]) : f = new n(t), d()
                }, r = function(e) {
                        console.log(e)
                    }, i = require.toUrl("./com/es/quizEditor/data/FIBDropdownDefaultQuestionData.json"),
                    o = e ? e : i,
                    u = {
                        url: o,
                        successCallback: t,
                        errorCallback: r
                    };
                s.fetchQuestionData(u)
            }, g = function(e) {
                if (p == 1) return;
                p = !0;
                var t = e.target;
                $(t).hasClass("FIBtext") && (t = t.parentNode), $(t).addClass("selectedFIB");
                if (!$(t).attr("data-options")) var n = {
                    options: [{
                        data: "Option 1",
                        type: "text"
                    }, {
                        data: "Option 2",
                        type: "text"
                    }],
                    answers: []
                };
                else var n = {
                    options: JSON.parse($(t).attr("data-options")),
                    answers: JSON.parse($(t).attr("data-answers"))
                };
                var r = {
                    elem: t,
                    container: u,
                    data: n
                };
                $(e.target).parent().parent().hasClass("question-option") ? $(e.target).parent().parent().blur() : $(e.target).parent().parent().hasClass("question-option-Wrapper") && $(e.target).parent().blur(), _.delay(function() {
                    c.render(r), _.delay(y, 500)
                }, 150), $(".add_dropdown_options").modal("show")
            }, y = function() {
                p = !1
            }, b = function(e) {
                $(e.elem).find(".spantext").html(e.answer)
            }, w = function(e, t, n) {
                var r = 0,
                    i = e.length,
                    s, o = [];
                n || (t = t.toLowerCase(), e = e.toLowerCase());
                while ((s = t.indexOf(e, r)) > -1) o.push(s), r = s + i;
                return o
            }, E = function() {
                activityDiv = $(".activity-container", u);
                var e = $(".question-title", activityDiv).html().trim(),
                    t = !1;
                e = i.removeNbsp(e), t = i.userInputValidator($(".question-title", activityDiv), !1);
                if (!t) return i.showToasterMessage(AppLang.BLANK_TITLE), !1;
                var n = [],
                    r = !1,
                    s = "",
                    o;
                h = [];
                var a = $(".question-option", activityDiv).clone(),
                    l = $(a).find("img"),
                    c = $(a).find(".data-values-activity-fill");
                _.each(c, function(e) {
                    c.after("[GAP]"), c.remove()
                }), _.each(l, function(e) {
                    var t = {}, r = $(e);
                    n.push(r.attr("src")), t.id = r.attr("data-id"), t.name = r.attr("src").substr(r.attr("src").lastIndexOf("/") + 1, r.attr("src").length), h.push(t)
                }), _.each(l, function(e) {
                    l.after("[IMAGE]"), l.remove()
                });
                var p = $(a).html();
                t = i.userInputValidator($(a), !0);
                if (!t) return i.showToasterMessage(AppLang.BLANK_QUESTION_TEXT), !1;
                if (r) return i.showToasterMessage(AppLang.BLANK_FIB_TEXT), !1;
                var d = p.split("[GAP]"),
                    v = [];
                for (var m = 0; m < d.length; m++)
                    if (m != d.length - 1 && d[m] == "") v.push("GAP");
                    else {
                        var g = d[m].indexOf("[IMAGE]"),
                            y = d[m],
                            b = "",
                            w = 0;
                        if (g >= 0) {
                            while (g >= 0) {
                                b = y.substr(w, g), b = i.removeNbsp(b), y = y.substr(g + 7, y.length), g = y.indexOf("[IMAGE]"), v.push({
                                    data: b,
                                    type: "text"
                                }), o = n.shift();
                                var E;
                                $("img[src='" + o + "']").length > 0 && (E = $($("img[src='" + o + "']").get(0)).attr("data-id")), s = o.substr(o.lastIndexOf("/") + 1, o.length), v.push({
                                    data: s,
                                    type: "image",
                                    id: E
                                })
                            }
                            y = i.removeNbsp(y), v.push({
                                data: y,
                                type: "text"
                            })
                        } else d[m] = i.removeNbsp(d[m]), v.push({
                            data: d[m],
                            type: "text"
                        });
                        m != d.length - 1 && v.push("GAP")
                    }
                var S = $(".rubric-text", activityDiv).html().trim(),
                    x = [];
                S != "" && (S = i.removeNbsp(S), x = [{
                    data: S,
                    type: "text"
                }]);
                var T = $(".metadata", activityDiv).html().trim();
                T = i.removeNbsp(T);
                var N = [],
                    C = [],
                    c = $(".FIB_dropdown", u);
                if (c.length === 0) return i.showToasterMessage(AppLang.BLANK_MIN_TEXT), !1;
                _.each(c, function(e, t) {
                    C.push(JSON.parse($(e).attr("data-options"))), N.push(JSON.parse($(e).attr("data-answers")))
                }), QUIZ_EDITOR_CONSTANTS.QUES_ID && (f.attributes.id = QUIZ_EDITOR_CONSTANTS.QUES_ID);
                var k = f.attributes;
                return k.answers = N, k.options = C, k.questionBody = v, k.rubric = x, k.title = e, k.metadata = T, f.attributes = k, f.attributes
            }, S = function(e, t) {
                var n, r, s, u;
                r = function(e) {
                    e.status === !0 ? o.trigger(AppEvent.QUESTION_CREATED, e.url) : e.status === !1 && i.showToasterMessage(AppLang.QUESTION_SAVE_ERROR)
                }, s = function(e) {
                    console.log(e)
                }, u = {
                    url: QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID,
                    success: r,
                    error: s
                }, l = t, l ? (n = "update", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/video/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "/question/" + QUIZ_EDITOR_CONSTANTS.QUES_ID) : (n = "create", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID), h = _.uniq(h, function(e) {
                    return JSON.stringify(e)
                });
                var a = {};
                a.title = f.get("title"), a.questionType = QUIZ_EDITOR_CONSTANTS.FIB_DROP_DOWN_QUESTION_TYPE_ID, a.assetIds = h, a.questionsData = e, f.sync(n, a, u)
            }, x = function(e) {
                e.stopPropagation();
                if ($(e.target).siblings().hasClass("FIBtext")) {
                    var t = $(e.target).siblings().text();
                    $(e.target).parent().after(" " + t).remove()
                }
            }, T = function(e) {
                parseInt($(".question-title").text().length) >= QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && e.preventDefault()
            }, N = Backbone.View.extend({
                events: {
                    "click .FIB_dropdown": g,
                    "click .data-values-activity-fill > .remove-option": x,
                    "keypress .question-title": T
                },
                initialize: function(e) {
                    o = this, a = e || {}, u = a.el
                },
                fetchData: m,
                syncData: S,
                handleDoneClick: E,
                fibAnswerAdded: v
            });
        return new N(t)
    };
    return o
}), define("com/es/text!templateBasePath/Editor/quiz/FIBTextTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n	<div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<%=title%>\r\n	</div>\r\n    <span class="activityType"><%=AppLang.EDIT_FIB_TEXT%></span>\r\n</div>\r\n\r\n\r\n<div class="rubric-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n	<div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% _.each(rubric, function(item, i){ %>\r\n			<%=item.data %>\r\n			 <% }); %>\r\n	</div>\r\n</div>\r\n\r\n<div class="question-text-Wrapper">\r\n<span class="formLabel"><%=AppLang.QUESTION_TEXT_LABEL_FIB%></span>\r\n<div class="question-option-Wrapper questionContentWrapper " id="question-option-Wrapper">\r\n	<div class="question-option fib-option add-img questionText formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% var gapCount = 0 %>\r\n		<% _.each(questionBody, function(item, i){ %>\r\n		<% if(item === "GAP"){ %>\r\n			<div data-name="fillup" class="data-values-activity-fill fib-text-blank" contenteditable="false"><span class="FIBtext spantext" contenteditable="false"><%=answers[gapCount][0]%></span><div class="close-pop remove-option"></div></div>\r\n			<% gapCount++ %>\r\n		<%	}else{	%>\r\n				<%if(item.type === "text" && (item.data)){%>\r\n					<%=item.data%>\r\n					<%} else if(item.type === "image"){%>					\r\n								<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />													\r\n					<% } %>\r\n			<%	}%>\r\n			<% }); %>\r\n	</div>\r\n</div>\r\n</div>\r\n\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>	\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>	\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>'
}), define("com/es/text!templateBasePath/Editor/quiz/FIBText_option_template.html", [], function() {
    return '<div class="add_fib_options editor-popup modal in" data-backdrop="static">\r\n	<div class="modal-dialog">\r\n		<div class="modal-content">\r\n			<div class="header modal-header">\r\n            <ul class="answerOptions">\r\n            	<li class="text-left"><div class="title modal-title"><%=AppLang.ADD_LABEL%></div></li>\r\n                <li class="text-right"><button class="addIcon btn-add"><%=AppLang.ADD_TEXT%> </button></li>\r\n            </ul>\r\n			</div>	\r\n			<div id="modal-body" class="quiz-container popup-content-spacing">\r\n				<div class="activity-container"> \r\n					<div id="question-options">\r\n						<ul>\r\n							<% _.each(options, function(item, i){ %>\r\n								<li class=\'option-div\' id="li<%=i %>">	\r\n									<!--<span class="dragIcon"></span>	-->		\r\n									<!--<div class="numbering"><%=i+1 %>)</div>-->\r\n									<div class="option-text add-img formPlaceholder" contenteditable="true" spellcheck="false" role="textbox"><%=item%></div>				 \r\n									<div class="addremove-btn">										\r\n										<span class="removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>\r\n									</div>	   		\r\n								</li>\r\n							<% }); %>\r\n						</ul>\r\n					</div>\r\n				</div>\r\n				<div class="modal-footer activityFooter">	\r\n					<div>\r\n						<button type="button" class="cancelBtn" ><%=AppLang.CANCEL_LABEL%> </button>\r\n		       			<button type="button" class="doneBtn"  ><%=AppLang.DONE_LABEL%> </button>	\r\n					</div>\r\n				</div>\r\n			</div> \r\n		</div>\r\n	</div>\r\n</div>'
}), define("com/es/quizEditor/views/FIBOptionsEditView", ["com/es/text!templateBasePath/Editor/quiz/FIBText_option_template.html", "com/es/utilities/utils"], function(e, t) {
    var n = function(n) {
        var r = null,
            i = null,
            s = !1,
            o = function(n) {
                i = n || {};
                var o = _.template(e, i.data);
                $(i.container).after(o), r = $(".add_fib_options"), t.makeOptionsSortable("div#question-options > ul", "#question-options", f), $(r).modal("show"), $(r).on(AppEvent.CLICK, ".addIcon", u), $(r).on(AppEvent.CLICK, ".removeIcon", a), $(r).on(AppEvent.CLICK, ".doneBtn", l), $(r).on(AppEvent.CLICK, ".cancelBtn", c), $(".option-text").on(AppEvent.INPUT_PROPERTY_CHANGE, function() {
                    s = !0
                })
            }, u = function(e) {
                s = !0;
                var t = $("ul", "#question-options").children().first(),
                    n = t.clone();
                n.find(".option-text").html(AppLang.NEW_OPTION_LABEL), t.before(n), f()
            }, a = function(e) {
                s = !0;
                var n = $(".option-div", r);
                if (n.length > 1) {
                    var i = $(e.target.parentNode.parentNode);
                    i.remove(), f()
                } else t.showToasterMessage(AppLang.FIB_MIN_OPTION_TEXT)
            }, f = function() {
                s = !0;
                var e = $(".option-div", r);
                _.each(e, function(e, t) {
                    $(e).attr("id", "li" + t), $(e).find(".numbering").html(t + 1 + ")")
                })
            }, l = function() {
                s = !1;
                var e = $(".option-text", r),
                    n = [];
                for (var o = 0; o < e.length; o++) {
                    var u = / style.*?=.*('|").*?('|")/ig,
                        a = $(e[o]).html().replace(/&nbsp;/g, " ").replace(u, "").trim();
                    if (a == AppLang.NEW_OPTION_LABEL) return t.showToasterMessage(AppLang.EDIT_OPTION_TEXT), !1;
                    if (a == "") return t.showToasterMessage(AppLang.BLANK_OPTION_TEXT), !1;
                    n.push(a), n = n.reverse()
                }
                $(i.elem).attr("data-options", JSON.stringify(n)), $(i.elem).find(".FIBtext").html(JSON.parse($(i.elem).attr("data-options"))[0]), $(".fib-text-blank", $(".question-option")).removeClass("selectedFIB"), $(r).modal("hide"), _.delay(function() {
                    $(r).remove()
                }, 100)
            }, c = function() {
                s === !0 ? t.showConfirmPopUp(AppLang.SAVE_WIDGET_CONFIMATION_MESSAGE, "Confirm", ["cancel"], function(e) {
                    if (e.toLowerCase() !== "yes") return;
                    $(".fib-text-blank", $(".question-option")).removeClass("selectedFIB"), $(r).modal("hide"), _.delay(function() {
                        $(r).remove()
                    }, 100)
                }) : ($(".fib-text-blank", $(".question-option")).removeClass("selectedFIB"), $(r).modal("hide"), _.delay(function() {
                    $(r).remove()
                }, 100))
            }, h = Backbone.View.extend({
                events: {},
                initialize: function() {},
                render: o
            });
        return new h(n)
    };
    return n
}), define("com/es/quizEditor/views/FIBEditView", ["com/es/text!templateBasePath/Editor/quiz/FIBTextTemplate.html", "com/es/quizEditor/models/QuestionEditorModel", "com/es/quizEditor/views/FIBOptionsEditView", "com/es/utilities/utils", "com/es/utilities/services"], function(e, t, n, r, i) {
    var s = function(s) {
        var o = null,
            u = null,
            a = null,
            f = !1,
            l = "",
            c = null,
            h = [],
            p = !1,
            d = function() {
                var t = a.attributes,
                    r = _.template(e, t);
                $(".activity-container", o).html(r), $(".header > div.title", o).html(AppLang.EDIT_ACTIVITY + AppLang.EDIT_FIB_TEXT), c = new n;
                var i = $(".fib-text-blank", o);
                _.each(i, function(e, n) {
                    $(e).attr("data-options", JSON.stringify(t.answers[n]))
                }), _instance.trigger("render_complete")
            }, v = function(e, t, n) {
                $(t).addClass("fib-text-blank"), $(t).find(".spantext").addClass("FIBtext"), $(t).attr("data-options", JSON.stringify([n]))
            }, m = function(e) {
                l = e;
                var n = function(n) {
                    e ? a = new t(n.questionsData[0]) : a = new t(n), d()
                }, r = function(e) {
                        console.log(e)
                    }, s = require.toUrl("./com/es/quizEditor/data/FIBTextDefaultQuestionData.json"),
                    o = e ? e : s,
                    u = {
                        url: o,
                        successCallback: n,
                        errorCallback: r
                    };
                i.fetchQuestionData(u)
            }, g = function(e) {
                if (p == 1) return;
                p = !0;
                var t = e.target;
                $(e.target).hasClass("fib-text-blank") ? $(e.target).addClass("selectedFIB") : $(e.target.parentNode).addClass("selectedFIB"), $(t).hasClass("FIBtext") && (t = t.parentNode);
                if (!$(t).attr("data-options")) {
                    r.showAlert("FIB must have a value/text");
                    return
                }
                var n = {
                    options: JSON.parse($(t).attr("data-options"))
                };
                n.options = n.options.reverse();
                var i = {
                    elem: t,
                    container: o,
                    data: n
                };
                $(e.target).parent().parent().hasClass("question-option") ? $(e.target).parent().parent().blur() : $(e.target).parent().parent().hasClass("question-option-Wrapper") && $(e.target).parent().blur(), _.delay(function() {
                    c.render(i), _.delay(y, 500)
                }, 150)
            }, y = function() {
                p = !1
            }, b = function() {
                var e = !1,
                    t = $(".question-title", n).html().trim();
                t = r.removeNbsp(t), e = r.userInputValidator($(".question-title", n), !1);
                if (!e) return r.showToasterMessage(AppLang.BLANK_TITLE), !1;
                var n = $(".activity-container", o),
                    i = [];
                f = !1, h = [];
                var s = $(".question-option", n).clone(),
                    u = $(s).find(".data-values-activity-fill");
                _.each(u, function(e) {
                    u.after("[GAP]"), u.remove()
                });
                var l = w(s),
                    c = $(s).html();
                e = r.userInputValidator($(s), !0);
                if (!e) return r.showToasterMessage(AppLang.BLANK_QUESTION_TEXT), !1;
                if (f) return r.showToasterMessage(AppLang.BLANK_FIB_TEXT), !1;
                var p = c.split("[GAP]"),
                    d = E(p, l),
                    v = $(".rubric-text", n).html().trim();
                v = r.removeNbsp(v);
                var m = [{
                    data: v,
                    type: "text"
                }],
                    u = $(".fib-text-blank", o);
                if (u.length === 0) return r.showToasterMessage(AppLang.BLANK_MIN_TEXT), !1;
                _.each(u, function(e, t) {
                    var n = $(e).attr("data-options");
                    n = JSON.parse(n);
                    var s = [];
                    for (var t = 0; t < n.length; t++) n[t] = r.removeNbsp(n[t]), s.push(n[t]);
                    i.push(s)
                }), QUIZ_EDITOR_CONSTANTS.QUES_ID && (a.attributes.id = QUIZ_EDITOR_CONSTANTS.QUES_ID);
                var g = $(".metadata", n).html().trim();
                g = r.removeNbsp(g);
                var y = a.attributes;
                return y.answers = i, y.questionBody = d, y.rubric = m, y.metadata = g, a.attributes.title = t, a.attributes = y, a.attributes
            }, w = function(e) {
                var t = $(e).find("img"),
                    n = [];
                return _.each(t, function(e) {
                    var t = {}, r = $(e);
                    n.push(r.attr("src")), t.id = r.attr("data-id"), t.name = r.attr("src").substr(r.attr("src").lastIndexOf("/") + 1, r.attr("src").length), h.push(t)
                }), _.each(t, function(e) {
                    t.after("[IMAGE]"), t.remove()
                }), n
            }, E = function(e, t) {
                var n = [],
                    i = {}, s = {};
                for (var o = 0; o < e.length; o++)
                    if (e[o].indexOf("[IMAGE]") > -1) {
                        var u = e[o].split("[IMAGE]");
                        for (var a = 0; a < u.length; a++) {
                            u[a] = r.removeNbsp(u[a]), i = {
                                data: u[a],
                                type: "text"
                            }, n.push(i);
                            if (a < u.length - 1) {
                                var f = t.shift(),
                                    l;
                                $("img[src='" + f + "']").length > 0 && (l = $($("img[src='" + f + "']").get(0)).attr("data-id"));
                                var c = f.substr(f.lastIndexOf("/") + 1, f.length);
                                s = {
                                    data: c,
                                    type: "image",
                                    id: l
                                }, n.push(s)
                            }
                        }
                        o < e.length - 1 && n.push("GAP")
                    } else e[o] = r.removeNbsp(e[o]), i = {
                        data: e[o],
                        type: "text"
                    }, n.push(i), o < e.length - 1 && n.push("GAP");
                return n
            }, S = function(e, t) {
                var n, i, s, o;
                i = function(e) {
                    e.status === !0 ? _instance.trigger(AppEvent.QUESTION_CREATED, e.url) : e.status === !1 && r.showToasterMessage(AppLang.QUESTION_SAVE_ERROR)
                }, s = function(e) {
                    console.log(e)
                }, o = {
                    url: QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID,
                    success: i,
                    error: s
                }, l = t, l ? (n = "update", a.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/video/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "/question/" + QUIZ_EDITOR_CONSTANTS.QUES_ID) : (n = "create", a.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID), h = _.uniq(h, function(e) {
                    return JSON.stringify(e)
                });
                var u = {};
                u.title = a.get("title"), u.questionType = QUIZ_EDITOR_CONSTANTS.FIB_TEXT_QUESTION_TYPE_ID, u.assetIds = h, u.questionsData = e, a.sync(n, u, o)
            }, x = function(e) {
                e.stopPropagation();
                if ($(e.target).siblings().hasClass("FIBtext")) {
                    var t = $(e.target).siblings().text();
                    $(e.target).parent().after(" " + t).remove()
                }
            }, T = function(e) {
                parseInt($(".question-title").text().length) >= QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && e.preventDefault()
            }, N = Backbone.View.extend({
                events: {
                    "click .fib-text-blank": g,
                    "click .data-values-activity-fill > .remove-option": x,
                    "keypress .question-title": T
                },
                initialize: function(e) {
                    _instance = this, u = e || {}, o = u.el
                },
                fetchData: m,
                syncData: S,
                handleDoneClick: b,
                fibAnswerAdded: v
            });
        return new N(s)
    };
    return s
}), define("com/es/text!templateBasePath/Editor/quiz/MCQSingleResponseTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n    <span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n    <div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n    	<%=title %>\r\n    </div>\r\n    <span class="activityType"><%=AppLang.EDIT_MCQ_SINGLE%></span>\r\n</div>\r\n\r\n<div class="rubric-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n	<div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(rubric[0]){ %>	\r\n			<%=rubric[0].data %>\r\n		<% } %>		\r\n	</div>\r\n</div>\r\n\r\n<div class="question-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TEXT_LABEL%></span>\r\n	<div class="question-text add-img formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% _.each(questionBody, function(item, i){ %>\r\n			<%if(item.type === "text" && (item.data)){%>\r\n			<%=item.data%>\r\n			<%} else if(item.type === "image"){%>					\r\n						<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />					\r\n			<% } %>\r\n			 <% }); %>\r\n	</div>\r\n</div>\r\n\r\n<ul class="answerOptions">\r\n<li class="formLabel text-left"><%=AppLang.ANSWER_OPTIONS_LABEL%></li>\r\n<li class="text-right"><button class="btn-add addIcon"><%=AppLang.ADD_LABEL%></button></li>\r\n</ul>\r\n\r\n<div class="question-option-Wrapper" id="question-options">\r\n	<ul>\r\n		<% _.each(options, function(listItem, i){ %>\r\n			<li class=\'option-div\' id="li<%=(i) %>">		\r\n					<span class="dragIcon"></span>		\r\n					 <!--<div class="numbering"><%=i+1 %>)</div>-->\r\n                     <div class="formPlaceholder">\r\n					 <input type=\'radio\' class="css-radio" id="option<%=(i)%>" \r\n                     value=\'<%=(i) %>\' name=\'options\' <%= (answers.indexOf(i+1) > -1)?"checked=true": "" %>></input>\r\n                     <label class="css-radio-label" for="option<%=i%>"></label>\r\n					 <div class="option-text editable add-img" contenteditable="true" spellcheck="false" role="textbox">\r\n						 <% _.each(listItem, function(item, i){ %>\r\n							<%if(item.type === "text" && (item.data)){%>\r\n								<%=item.data%>\r\n								<%} else if(item.type === "image"){%>					\r\n											<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />																\r\n								<% } %>\r\n\r\n						 <% }); %>\r\n					 	</div>				 \r\n					 </div>\r\n                     <div class="addremove-btn">\r\n	        			<span class="removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>\r\n	       			 </div>	   		\r\n			</li>\r\n		 <% }); %>\r\n	</ul>\r\n</div>\r\n\r\n\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>	\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>		\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>\r\n\r\n    	'
}), define("com/es/text!templateBasePath/Editor/quiz/MCQMultipleResponseTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n	<div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<%=title %>\r\n	</div>\r\n    <span class="activityType"><%=AppLang.EDIT_MCQ_MULTIPLE%></span>\r\n</div>\r\n\r\n<div class="rubric-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n	<div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(rubric[0]){ %>	\r\n			<%=rubric[0].data %>\r\n		<% } %>		\r\n	</div>\r\n</div>\r\n\r\n\r\n<div class="question-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TEXT_LABEL%></span>\r\n	<div class="question-text add-img formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% _.each(questionBody, function(item, i){ %>\r\n			<%if(item.type === "text" && (item.data)){%>\r\n				<%=item.data%>\r\n				<%} else if(item.type === "image"){%>					\r\n							<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />						\r\n						 \r\n				<% } %>\r\n			 <% }); %>\r\n	</div>\r\n</div>\r\n\r\n\r\n<ul class="answerOptions">\r\n<li class="formLabel text-left"><%=AppLang.ANSWER_OPTIONS_LABEL%></li>\r\n<li class="text-right"><button class="btn-add addIcon"><%=AppLang.ADD_LABEL%></button></li>\r\n</ul>\r\n\r\n<div class="question-option-Wrapper" id="question-options">\r\n	<ul>\r\n		<% _.each(options, function(listItem, i){ %>\r\n			<li class=\'option-div\' id="li<%=(i) %>">		\r\n					<span class="dragIcon"></span>		\r\n					<!-- <div class="numbering"><%=i+1 %>)</div>-->\r\n                    <div class="formPlaceholder">\r\n						 <input type=\'checkbox\' class="css-checkbox" id="option<%=(i)%>" value=\'<%=(i) %>\' name=\'options\' <%= (answers.indexOf(i+1) >  				\r\n                         -1)?"checked=true": "" %>></input>\r\n                     <label  for="option<%=(i)%>" class="css-label" ></label>\r\n					 <div class="option-text add-img" contenteditable="true" spellcheck="false" role="textbox">\r\n						 <% _.each(listItem, function(item, i){ %>\r\n							<%if(item.type === "text" && (item.data)){%>\r\n								<%=item.data%>\r\n								<%} else if(item.type === "image"){%>					\r\n											<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />						\r\n										\r\n								<% } %>\r\n						 <% }); %>\r\n					 	</div>\r\n                     </div>\r\n					 <div class="addremove-btn">\r\n	        			<!--<span class="addIcon"><%=AppLang.ADD_LABEL%></span>-->\r\n	        			<span class="removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>\r\n	       			 </div>	   		\r\n			</li>\r\n		 <% }); %>\r\n	</ul>\r\n</div>\r\n\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>	\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>	\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>    	'
}), define("com/es/quizEditor/views/MCQEditView", ["com/es/text!templateBasePath/Editor/quiz/MCQSingleResponseTemplate.html", "com/es/text!templateBasePath/Editor/quiz/MCQMultipleResponseTemplate.html", "com/es/quizEditor/models/QuestionEditorModel", "com/es/utilities/utils", "com/es/utilities/services"], function(e, t, n, r, i) {
    var s = function(s) {
        var o = null,
            u = null,
            a = null,
            f = null,
            l = !1,
            c = "",
            h = [],
            p = function() {
                var n = l ? t : e,
                    i = _.template(n, f.attributes);
                $(".activity-container", u).html(i);
                var s = l ? AppLang.EDIT_MCQ_MULTIPLE : AppLang.EDIT_MCQ_SINGLE;
                $(".header > div.title", u).html(AppLang.EDIT_ACTIVITY + s), r.makeOptionsSortable(".question-option-Wrapper >ul", "#question-options", b), o.trigger("render_complete")
            }, d = function(e) {
                $(".sortableOptions").sortable({
                    cancel: ".disable-sort"
                })
            }, v = function(e) {
                c = e;
                var t = new n,
                    s = function(n) {
                        e && (t.attributes = n.questionsData[0]), f = t, p()
                    }, o = function(e) {
                        r.log(e)
                    }, u = l ? require.toUrl("./com/es/quizEditor/data/MCQ_MultipeDefaultQuestionData.json") : require.toUrl("./com/es/quizEditor/data/MCQ_SingleDefaultQuestionData.json"),
                    a = e ? e : u;
                t.url = a;
                if (e) {
                    var h = {
                        url: a,
                        successCallback: s,
                        errorCallback: o
                    };
                    i.fetchQuestionData(h)
                } else {
                    var h = {
                        url: a,
                        success: s,
                        error: o
                    };
                    t.fetch(h)
                }
            }, m = function(e, t) {
                var n, i, s, u;
                i = function(e) {
                    e.status === !0 ? o.trigger(AppEvent.QUESTION_CREATED, e.url) : e.status === !1 && r.showToasterMessage(AppLang.QUESTION_SAVE_ERROR)
                }, s = function(e) {
                    console.log(e)
                }, u = {
                    url: QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "/question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID,
                    success: i,
                    error: s
                }, c = t, c ? (n = "update", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/video/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "/question/" + QUIZ_EDITOR_CONSTANTS.QUES_ID) : (n = "create", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID), h = _.uniq(h, function(e) {
                    return JSON.stringify(e)
                });
                var a = {};
                a.title = f.get("title"), l ? a.questionType = QUIZ_EDITOR_CONSTANTS.MCQ_MULTIPLE_RESPONSE_QUESTION_TYPE_ID : a.questionType = QUIZ_EDITOR_CONSTANTS.MCQ_SINGLE_RESPONSE_QUESTION_TYPE_ID, a.assetIds = h, a.questionsData = e, f.sync(n, a, u)
            }, g = function(e) {
                var t = $("ul", ".question-option-Wrapper").children().first(),
                    n = t.clone(),
                    r = parseInt($("ul", ".question-option-Wrapper").children().length),
                    i = 0;
                while ($("#option" + i).length > 0) i++;
                $(n.children().get(1)).find("input").attr("id", "option" + parseInt(i)), $(n.children().get(1)).find("label").attr("for", "option" + parseInt(i)), n.find(".option-text").html(AppLang.NEW_OPTION_LABEL), n.find("input[name=options]").removeAttr("checked"), t.before(n), b(), o.trigger(AppEvent.OPTION_ADDED, n)
            }, y = function(e) {
                var t = $(".option-div", u),
                    n = l ? 3 : 2;
                if (t.length > n) {
                    var i = $(e.target.parentNode.parentNode);
                    i.remove(), b()
                } else {
                    var s = l ? AppLang.MCQ_MULTIPLE_MIN_OPTION_TEXT : AppLang.MCQ_SINGLE_MIN_OPTION_TEXT;
                    r.showToasterMessage(s)
                }
            }, b = function() {
                var e = $(".option-div", u);
                _.each(e, function(e, t) {
                    $(e).attr("id", "li" + t), $(e).find(".numbering").html(t + 1 + ")"), $(e).find("input[name=options]").val(t)
                })
            }, w = function() {
                var e = !1,
                    t = $(".question-title", i).html().trim();
                t = r.removeNbsp(t), e = r.userInputValidator($(".question-title", i), !1);
                if (!e) return r.showToasterMessage(AppLang.BLANK_TITLE), !1;
                var n = $(".metadata", i).html().trim();
                n = r.removeNbsp(n);
                var i = $(".activity-container", u),
                    s = l ? 2 : 1;
                h = [];
                var o = $("input[name=options]:checked", i);
                if (o.length < s) return r.showToasterMessage(AppLang.SELECT_ATLEAST_TEXT + s + AppLang.OPTION_TEXT), !1;
                var a = [];
                _.each(o, function(e) {
                    a.push(parseInt($(e).val()) + 1)
                });
                var c = f.attributes,
                    p = $(".rubric-text", i).html().trim(),
                    d = [];
                p != "" && (p = r.removeNbsp(p), d = [{
                    data: p,
                    type: "text"
                }]);
                var v = $(".question-text", i).html();
                v = r.removeNbsp(v), e = r.userInputValidator($(".question-text", i), !0);
                if (!e) return r.showToasterMessage(AppLang.BLANK_QUESTION_TEXT), !1;
                var m = x(".question-text", i),
                    g = $(".option-text", i);
                for (var y = 0; y < g.length; y++) {
                    e = r.userInputValidator($(g[y]), !0);
                    if (!e) return r.showToasterMessage(AppLang.BLANK_OPTION_TEXT), !1
                }
                var b = [];
                for (var y = 0; y < g.length; y++) {
                    var w = x(g[y], i);
                    b.push(w)
                }
                return QUIZ_EDITOR_CONSTANTS.QUES_ID && (c.id = QUIZ_EDITOR_CONSTANTS.QUES_ID), c.rubric = d, c.answers = a, c.questionBody = m, c.options = b, c.metadata = n, f.attributes.title = t, f.attributes = c, f.attributes
            }, E = function(e) {
                $(e.target).parent().addClass("selectedDiv")
            }, S = function(e) {
                $(e.target).parent().removeClass("selectedDiv")
            }, x = function(e, t) {
                var n = [],
                    i = [],
                    s = $(e, t).clone(),
                    o = $(s).find("img"),
                    u = null,
                    a = null;
                _.each(o, function(e) {
                    var t = {}, n = $(e).attr("src");
                    i.push(n), t.id = $(e).attr("data-id"), t.name = n.substr(n.lastIndexOf("/") + 1, n.length), h.push(t)
                }), _.each(o, function(e) {
                    o.after("[IMAGE]"), o.remove()
                });
                var f = $(s).html(),
                    l = f.split("[IMAGE]");
                for (var c = 0; c < l.length; c++) {
                    l[c] = r.removeNbsp(l[c]), u = {
                        data: l[c],
                        type: "text"
                    }, n.push(u);
                    if (c < l.length - 1) {
                        var p = i.shift(),
                            d;
                        $("img[src='" + p + "']").length > 0 && (d = $($("img[src='" + p + "']").get(0)).attr("data-id"));
                        var v = p.substr(p.lastIndexOf("/") + 1, p.length);
                        a = {
                            data: v,
                            type: "image",
                            id: d
                        }, n.push(a)
                    }
                }
                return n
            }, T = function(e) {
                parseInt($(".question-title").text().length) >= QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && e.preventDefault()
            }, N = Backbone.View.extend({
                events: {
                    "click .addIcon": g,
                    "click .removeIcon": y,
                    "click .option-text": d,
                    "focus .option-text": E,
                    "blur .option-text": S,
                    "keypress .question-title": T
                },
                initialize: function(e) {
                    a = e || {}, u = a.el, l = a.type == QUIZ_EDITOR_CONSTANTS.MCQ_MULTIPLE_RESPONSE_QUESTION_TYPE_ID ? !0 : !1, o = this
                },
                fetchData: v,
                syncData: m,
                handleDoneClick: w
            });
        return new N(s)
    };
    return s
}), define("com/es/text!templateBasePath/Editor/quiz/MCQBinaryTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n    <span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n    <div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n    	<%=title %>\r\n    </div>\r\n    <span class="activityType"><%=AppLang.EDIT_BINARY%></span>\r\n</div>\r\n\r\n<div class="rubric-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n	<div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(rubric[0]){ %>	\r\n			<%=rubric[0].data %>\r\n		<% } %>		\r\n	</div>\r\n</div>\r\n\r\n<div class="question-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TEXT_LABEL%></span>\r\n	<div class="question-text add-img formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% _.each(questionBody, function(item, i){ %>\r\n		<%if(item.type === "text" && (item.data !== "<br />")){%>\r\n			<%=item.data %>\r\n			<%} else if(item.type === "image"){%>\r\n			<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />	\r\n			<%}%>\r\n			 <% }); %>\r\n	</div>\r\n</div>\r\n\r\n<ul class="answerOptions">\r\n<li class="formLabel text-left"><%=AppLang.STATEMENTS_LABEL%></li>\r\n<li class="text-right"><button class="addIcon btn-add"><%=AppLang.ADD_STATEMENT_LABEL%></button></li>\r\n</ul>\r\n\r\n<div class="question-option-Wrapper" id="question-options">\r\n	<ul><%var j = 0;%>\r\n		<% _.each(options, function(listItem, i){  %>\r\n			<%if(listItem.data !== "<br />" && (listItem.data !== "")){%>\r\n				<li class=\'option-div\' id="li<%=i %>">	\r\n						<span class="dragIcon"></span>\r\n						 <!--<div class="numbering"><%=i+1 %>)</div>-->\r\n						  <div class="option-text add-img formPlaceholder mcqBinaryEditView" contenteditable="true" spellcheck="false" role="textbox">						\r\n								<%if(listItem.type === "text" && (listItem.data !== "<br />")){ %>								\r\n									<%=listItem.data%>									\r\n									<%} else if(listItem.type === "image"){%>					\r\n												<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+listItem.data%> class="question-image" data-id=<%=listItem.id%> />						\r\n											\r\n									<% } %>						 \r\n						 	</div>	\r\n						 		\r\n						 	<div class="true-false-btn" id="tfb-<%=i %>">					 		\r\n						 	<%	if(answers[j] == "0" || answers[j] == 0){ %>\r\n							 		<span class="qr-correct selected" data-op="0"><%=AppLang.TRUE_LABEL%></span>\r\n							 		<span class="qr-incorrect" data-op="1"><%=AppLang.FALSE_LABEL%></span> \r\n							 		<%j++%>\r\n						 	<%	}else if(answers[j] == "1" || answers[j] == 1){ %>\r\n							 		<span class="qr-correct" data-op="0"><%=AppLang.TRUE_LABEL%></span>\r\n							 		<span class="qr-incorrect selected"  data-op="1"><%=AppLang.FALSE_LABEL%></span> \r\n							 		<%j++%>\r\n							 		\r\n						 	<%	}else {%>\r\n						 		<span class="qr-correct" data-op="0"><%=AppLang.TRUE_LABEL%></span>\r\n							 	<span class="qr-incorrect"  data-op="1"><%=AppLang.FALSE_LABEL%></span> 						 		\r\n						 	<%	}%>\r\n						 	</div>			 \r\n						 <div class="addremove-btn">\r\n		        			\r\n		        			<span class="removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>\r\n		       			 </div>	   		\r\n				</li>\r\n			<%}%>\r\n		<% }); %>\r\n	</ul>\r\n</div>\r\n\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>	\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>    	'
}), define("com/es/quizEditor/views/MCQBinaryEditView", ["com/es/text!templateBasePath/Editor/quiz/MCQBinaryTemplate.html", "com/es/quizEditor/models/QuestionEditorModel", "com/es/utilities/utils", "com/es/utilities/services"], function(e, t, n, r) {
    var s = function(s) {
        var o = null,
            u = null,
            a = null,
            f = null,
            l = "",
            c = [],
            h = function() {
                var t = f.attributes,
                    r = _.template(e, t);
                $(".activity-container", u).html(r), $(".header > div.title", u).html(AppLang.EDIT_ACTIVITY + AppLang.EDIT_BINARY), n.makeOptionsSortable(".question-option-Wrapper >ul", "#question-options", y), o.trigger("render_complete")
            }, p = function(e) {
                l = e;
                var n = function(n) {
                    e ? f = new t(n.questionsData[0]) : f = new t(n), h()
                }, i = function(e) {
                        console.log(e)
                    }, s = require.toUrl("./com/es/quizEditor/data/MCQ_BinaryDefaultQuestionData.json"),
                    o = e ? e : s,
                    u = {
                        url: o,
                        successCallback: n,
                        errorCallback: i
                    };
                r.fetchQuestionData(u)
            }, d = function(e, t) {
                var r, i, s, u;
                i = function(e) {
                    e.status === !0 ? o.trigger(AppEvent.QUESTION_CREATED, e.url) : e.status === !1 && n.showToasterMessage(AppLang.QUESTION_SAVE_ERROR)
                }, s = function(e) {
                    console.log(e)
                }, u = {
                    url: QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID,
                    success: i,
                    error: s
                }, l = t, l ? (r = "update", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/video/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "/question/" + QUIZ_EDITOR_CONSTANTS.QUES_ID) : (r = "create", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID), c = _.uniq(c, function(e) {
                    return JSON.stringify(e)
                });
                var a = {};
                a.title = f.get("title"), a.questionType = QUIZ_EDITOR_CONSTANTS.TRUE_OR_FALSE_QUESTION_TYPE_ID, a.assetIds = c, a.questionsData = e, f.sync(r, a, u)
            }, v = function(e) {
                var t = $("ul", ".question-option-Wrapper").children().first(),
                    n = t.clone();
                n.find(".option-text").html(AppLang.NEW_STATEMENT_LABEL), n.find(".selected").removeClass("selected"), n.find(".qr-correct").addClass("selected"), t.before(n), y(), o.trigger(AppEvent.OPTION_ADDED, n)
            }, m = function(e) {
                var t = $(".option-div", u);
                if (t.length > 1) {
                    var r = $(e.target.parentNode.parentNode);
                    r.remove(), y()
                } else n.showToasterMessage(AppLang.BINARY_MIN_STATEMENT_TEXT)
            }, g = function(e) {
                var t = e.target.parentNode;
                $(t).find(".selected").removeClass("selected"), $(e.target).addClass("selected")
            }, y = function() {
                var e = $(".option-div", u);
                _.each(e, function(e, t) {
                    $(e).attr("id", "li" + t), $(e).find(".numbering").html(t + 1 + ")")
                })
            }, b = function(e) {
                $(e).find(".addIcon").bind(AppEvent.CLICK, v), $(e).find(".removeIcon").bind(AppEvent.CLICK, m), $(e).find(".true-false-btn > span").bind(AppEvent.CLICK, g)
            }, w = function() {
                var e = $(".activity-container", u),
                    t = [],
                    r = [],
                    i = [],
                    s = !1,
                    o = f.attributes;
                c = [];
                var a = $(".rubric-text", e).html().trim(),
                    l = [];
                a != "" && (a = n.removeNbsp(a), l = [{
                    data: a,
                    type: "text"
                }]);
                var h = $(".question-title", e).html().trim();
                h = n.removeNbsp(h), s = n.userInputValidator($(".question-title", e), !1);
                if (!s) return n.showToasterMessage(AppLang.BLANK_TITLE), !1;
                var p = $(".question-text", e).html().trim();
                p = n.removeNbsp(p), s = n.userInputValidator($(".question-text", e), !0);
                if (!s) return n.showToasterMessage(AppLang.BLANK_QUESTION_TEXT), !1;
                var d = E(".question-text", e),
                    v = $(".option-div", e);
                for (var m = 0; m < v.length; m++) {
                    var g = v[m],
                        y = $(g).find(".option-text").html();
                    y = n.removeNbsp(y), s = n.userInputValidator($(g).find(".option-text"), !0);
                    if (!s) return n.showToasterMessage(AppLang.BINARY_BLANK_QUESTION_TEXT), !1;
                    i = E($(g).find(".option-text"), e), r = r.concat(i), r.push({
                        data: "<br />",
                        type: "text"
                    });
                    var b = $(g).find(".true-false-btn >span.selected").attr("data-op");
                    if (!b) return n.showToasterMessage(AppLang.BINARY_BLANK_ANSWER_TEXT), !1;
                    t.push(b)
                }
                var w = $(".metadata", e).html().trim();
                return w = n.removeNbsp(w), QUIZ_EDITOR_CONSTANTS.QUES_ID && (o.id = QUIZ_EDITOR_CONSTANTS.QUES_ID), o.title = h, o.rubric = l, o.answers = t, o.questionBody = d, o.options = r, o.metadata = w, f.attributes = o, f.attributes
            }, E = function(e, t) {
                var r = [],
                    i = [],
                    s = $(e, t).clone(),
                    o = $(s).find("img"),
                    u = null,
                    a = null;
                _.each(o, function(e) {
                    var t = {}, n = $(e);
                    i.push(n.attr("src")), t.id = n.attr("data-id"), t.name = n.attr("src").substr(n.attr("src").lastIndexOf("/") + 1, n.attr("src").length), c.push(t)
                }), _.each(o, function(e) {
                    o.after("[IMAGE]"), o.remove()
                });
                var f = $(s).html(),
                    l = f.split("[IMAGE]");
                for (var h = 0; h < l.length; h++) {
                    l[h] = n.removeNbsp(l[h]), u = {
                        data: l[h],
                        type: "text"
                    }, r.push(u);
                    if (h < l.length - 1) {
                        var p = i.shift(),
                            d;
                        $("img[src='" + p + "']").length > 0 && (d = $($("img[src='" + p + "']").get(0)).attr("data-id"));
                        var v = p.substr(p.lastIndexOf("/") + 1, p.length);
                        a = {
                            data: v,
                            type: "image",
                            id: d
                        }, r.push(a)
                    }
                }
                return r
            }, S = function(e) {
                if ($(e.target).find("img").length > 0) {
                    for (i = 1; i <= Object.keys(CKEDITOR.instances).length; i++) $("#cke_editor" + i).css("display", "none");
                    n.showConfirmPopUp(AppLang.ADD_TEXT_CONFIRMATiON_MESSAGE, "Confirm", ["cancel"], function(t) {
                        if (t.toLowerCase() === "yes") $(e.target).children().remove();
                        else {
                            var n = $(e.target).children();
                            $(e.target).html(""), $(e.target).html(n)
                        }
                    })
                }
            }, x = function(e) {
                parseInt($(".question-title").text().length) >= QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && e.preventDefault()
            }, T = Backbone.View.extend({
                events: {
                    "click .addIcon": v,
                    "click .removeIcon": m,
                    "click .true-false-btn > span": g,
                    "input .option-text": S,
                    "keypress .question-title": x
                },
                initialize: function(e) {
                    a = e || {}, u = a.el, o = this
                },
                fetchData: p,
                syncData: d,
                handleDoneClick: w
            });
        return new T(s)
    };
    return s
}), define("com/es/text!templateBasePath/Editor/quiz/MatchingTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n	<div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<%=title %>\r\n	</div>\r\n    <span class="activityType"><%=AppLang.EDIT_MATCHING%></span>\r\n</div>\r\n\r\n<div class="rubric-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n	<div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% _.each(rubric, function(item, i){ %>\r\n			<%=item.data %>\r\n			 <% }); %>\r\n	</div>\r\n</div>\r\n\r\n<div class="question-text-Wrapper">\r\n	\r\n    <ul class="answerOptions">\r\n    <li class="formLabel text-left"><%=AppLang.QUESTION_TEXT_LABEL%></li>\r\n	<li class="text-right"><button class="addIcon btn-add"><%=AppLang.ADD_STATEMENT_LABEL%></button></li>\r\n    </ul>\r\n    \r\n    \r\n	<div class="question-option-Wrapper"  id="question-options">\r\n	<ul>\r\n		<% _.each(options, function(listItem, i){ %>\r\n			<li class=\'option-div\' id="li<%=i %>">\r\n			<span class="dragIcon"></span>				\r\n					 <!--<div class="numbering"><%=i+1 %>)</div>-->\r\n					 <div id="opt<%=i %>" class="matchingOptions">\r\n					 	<!--div class="leftCol add-img formPlaceholder"  contenteditable="true"><%=questionBody[i].data%></div-->\r\n					 	<div class="leftCol add-img formPlaceholder"  contenteditable="true">\r\n					 		<%if(questionBody[i].type === "text" && (questionBody[i].data)){%>\r\n								<%=questionBody[i].data%>\r\n								<%} else if(questionBody[i].type === "image"){%>					\r\n											<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+questionBody[i].data%> class="question-image" data-id=<%=questionBody[i].id%> />						\r\n										\r\n								<% } %>	\r\n					 	</div>\r\n					 	<!--div class="rightCol add-img formPlaceholder"  contenteditable="true"><%=listItem.data%></div-->\r\n					 	<div class="rightCol add-img formPlaceholder"  contenteditable="true">\r\n					 		<%if(listItem.type === "text" && (listItem.data)){%>\r\n								<%=listItem.data%>\r\n								<%} else if(listItem.type === "image"){%>					\r\n											<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+listItem.data%> class="question-image" data-id=<%=listItem.id%> />						\r\n										\r\n								<% } %>	\r\n					 	</div>\r\n					 </div>				 \r\n					 <div class="addremove-btn">\r\n	        			<span class="removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>\r\n	       			 </div>	   		\r\n			</li>\r\n		 <% }); %>\r\n	</ul>\r\n	</div>\r\n</div>\r\n\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>	\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>    	'
}), define("com/es/quizEditor/views/MatchingEditView", ["com/es/text!templateBasePath/Editor/quiz/MatchingTemplate.html", "com/es/quizEditor/models/QuestionEditorModel", "com/es/utilities/utils", "com/es/utilities/services"], function(e, t, n, r) {
    var s = function(s) {
        var o = null,
            u = null,
            a = null,
            f = null,
            l = "",
            c = [],
            h = function() {
                var t = f.attributes,
                    r = _.template(e, t);
                $(".activity-container", u).html(r), $(".activity-container", u).addClass("matchingEditView"), $(".header > div.title", u).html(AppLang.EDIT_ACTIVITY + AppLang.EDIT_MATCHING), n.makeOptionsSortable(".question-option-Wrapper >ul", "#question-options", g), o.trigger("render_complete")
            }, p = function(e) {
                l = e;
                var n = function(n) {
                    e ? f = new t(n.questionsData[0]) : f = new t(n), h()
                }, i = function(e) {
                        console.log(e)
                    }, s = require.toUrl("./com/es/quizEditor/data/MatchingDefaultQuestionData.json"),
                    o = e ? e : s,
                    u = {
                        url: o,
                        successCallback: n,
                        errorCallback: i
                    };
                r.fetchQuestionData(u)
            }, d = function(e, t) {
                var r, i, s, u;
                i = function(e) {
                    e.status === !0 ? o.trigger(AppEvent.QUESTION_CREATED, e.url) : e.status === !1 && n.showToasterMessage(AppLang.QUESTION_SAVE_ERROR)
                }, s = function(e) {
                    console.log(e)
                }, u = {
                    url: QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID,
                    success: i,
                    error: s
                }, l = t, l ? (r = "update", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/video/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "/question/" + QUIZ_EDITOR_CONSTANTS.QUES_ID) : (r = "create", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID), c = _.uniq(c, function(e) {
                    return JSON.stringify(e)
                });
                var a = {};
                a.title = f.get("title"), a.questionType = QUIZ_EDITOR_CONSTANTS.MATCHING_QUESTION_TYPE_ID, a.assetIds = c, a.questionsData = e, f.sync(r, a, u)
            }, v = function(e) {
                var t = $("ul", ".question-option-Wrapper").children().first(),
                    n = t.clone();
                n.find(".leftCol").html(AppLang.NEW_QUESTION_LABEL), n.find(".rightCol").html(AppLang.NEW_ANSWER_LABEL), t.before(n), g(), o.trigger(AppEvent.OPTION_ADDED, n)
            }, m = function(e) {
                var t = $(".option-div", u);
                if (t.length > 2) {
                    var r = $(e.target.parentNode.parentNode);
                    r.remove(), g()
                } else n.showToasterMessage(AppLang.MATCHING_MIN_QUESTION_TEXT)
            }, g = function() {
                var e = $(".option-div", u);
                _.each(e, function(e, t) {
                    $(e).attr("id", "li" + t), $(e).find(".numbering").html(t + 1 + ")")
                })
            }, y = function(e) {
                $(e).find(".addIcon").bind(AppEvent.CLICK, v), $(e).find(".removeIcon").bind(AppEvent.CLICK, m)
            }, b = function() {
                var e = $(".activity-container", u),
                    t = f.attributes,
                    r = !1;
                c = [];
                var i = $(".question-title", e).html().trim();
                i = n.removeNbsp(i), r = n.userInputValidator($(".question-title", e), !1);
                if (!r) return n.showToasterMessage(AppLang.BLANK_TITLE), !1;
                var s = $(".metadata", e).html().trim();
                s = n.removeNbsp(s);
                var o = $(".rubric-text", e).html().trim();
                o = n.removeNbsp(o);
                var a = [{
                    data: o,
                    type: "text"
                }],
                    l = $(".option-div", e),
                    h = [],
                    p = [];
                for (var d = 0; d < l.length; d++) {
                    var v = $(l[d]).find(".leftCol").html();
                    v = n.userInputValidator($(l[d]).find(".leftCol"), !0);
                    var m = $(l[d]).find(".rightCol").html().trim();
                    m = n.userInputValidator($(l[d]).find(".rightCol"), !0);
                    var g = $(l[d]).html();
                    if (!v || !m) return n.showToasterMessage(AppLang.BLANK_QUESTION_OR_ANSWER_TEXT), !1;
                    var y = w($(l[d]).find(".leftCol"));
                    if (y.length == 0) return n.showToasterMessage(AppLang.BLANK_QUESTION_OR_ANSWER_TEXT), !1;
                    p = p.concat(y);
                    var b = w($(l[d]).find(".rightCol"));
                    if (b.length == 0) return n.showToasterMessage(AppLang.BLANK_QUESTION_OR_ANSWER_TEXT), !1;
                    h = h.concat(b)
                }
                return QUIZ_EDITOR_CONSTANTS.QUES_ID && (t.id = QUIZ_EDITOR_CONSTANTS.QUES_ID), t.title = i, t.rubric = a, t.questionBody = p, t.options = h, t.metadata = s, f.attributes = t, f.attributes
            }, w = function(e) {
                var t = e.clone(),
                    r = [],
                    i = [],
                    s = $(t).find("img"),
                    o = null,
                    u = null;
                _.each(s, function(e) {
                    var t = {}, n = $(e);
                    i.push(n.attr("src")), t.id = n.attr("data-id"), t.name = n.attr("src").substr(n.attr("src").lastIndexOf("/") + 1, n.attr("src").length), c.push(t)
                }), _.each(s, function(e) {
                    s.after("[IMAGE]"), s.remove()
                });
                var a = $(t).html(),
                    f = a.split("[IMAGE]");
                for (var l = 0; l < f.length; l++) {
                    f[l] !== "" && (a.indexOf("[IMAGE]") > -1 && l == f.length - 1 || (f[l] = n.removeNbsp(f[l]), o = {
                        data: f[l],
                        type: "text"
                    }, r.push(o)));
                    if (l < f.length - 1) {
                        var h = i.shift(),
                            p;
                        $("img[src='" + h + "']").length > 0 && (p = $($("img[src='" + h + "']").get(0)).attr("data-id"));
                        var d = h.substr(h.lastIndexOf("/") + 1, h.length);
                        u = {
                            data: d,
                            type: "image",
                            id: p
                        }, r.push(u)
                    }
                }
                return r
            }, E = function(e) {
                if ($(e.target).find("img").length > 0) {
                    for (i = 1; i <= Object.keys(CKEDITOR.instances).length; i++) $("#cke_editor" + i).css("display", "none");
                    n.showConfirmPopUp(AppLang.ADD_TEXT_CONFIRMATiON_MESSAGE, "Confirm", ["cancel"], function(t) {
                        if (t.toLowerCase() === "yes") $(e.target).children().remove();
                        else {
                            var n = $(e.target).children();
                            $(e.target).html(""), $(e.target).html(n)
                        }
                    })
                }
            }, S = function(e) {
                parseInt($(".question-title").text().length) >= QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && e.preventDefault()
            }, x = Backbone.View.extend({
                events: {
                    "click .addIcon": v,
                    "click .removeIcon": m,
                    "input .leftCol": E,
                    "input .rightCol": E,
                    "keypress .question-title": S
                },
                initialize: function(e) {
                    a = e || {}, u = a.el, o = this
                },
                fetchData: p,
                syncData: d,
                handleDoneClick: b
            });
        return new x(s)
    };
    return s
}), define("com/es/text!templateBasePath/Editor/quiz/GroupingTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n    <span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n    <div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n    	<%=title %>\r\n    </div>\r\n    <span class="activityType"><%=AppLang.EDIT_GROUPING%></span>\r\n</div>\r\n\r\n<div class="rubric-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n	<div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% _.each(rubric, function(item, i){ %>\r\n			<%=item.data %>\r\n			 <% }); %>\r\n	</div>\r\n</div>\r\n\r\n\r\n<ul class="answerOptions">\r\n<li class="formLabel text-left"><span class="formLabel"><%=AppLang.GROUPS_LABEL%></span></li>\r\n<li class="text-right"><button class="addGroupIcon btn-add"><%=AppLang.ADD_GROUP_LABEL%></button></li>\r\n</ul>\r\n\r\n\r\n<div class="question-groups-Wrapper">\r\n	<div id="question-groups">\r\n		<ul  id="groups-ul">\r\n			<% _.each(options, function(listItem, i){ %>\r\n				<li class=\'group-div\' id="group<%=i %>">\r\n					<div class="numbering"><%=String.fromCharCode(65+i) %></div>		\r\n							\r\n					<div class="group add-img" contenteditable="true" tabindex="0" spellcheck="false" role="textbox">				\r\n							<%=listItem.data %>					\r\n					</div>			 						\r\n		        	<span class="removeGroupIcon removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>    			 		\r\n				</li>\r\n			<% }); %>\r\n		</ul>\r\n	\r\n	</div>\r\n</div>\r\n\r\n<ul class="answerOptions">\r\n	<li class="text-left formLabel"><%=AppLang.STATEMENTS_LABEL%></li>\r\n    <li class="text-right"><button class="addIcon btn-add"><%=AppLang.ADD_STATEMENT_LABEL%></button></li>\r\n</ul>\r\n\r\n\r\n<div class="question-options-Wrapper">\r\n	<div id="question-options">\r\n		<ul id="options-ul">\r\n			<% _.each(questionBody, function(listItem, i){ %>\r\n				<li class=\'option-div\' id="option<%=i %>">	\r\n					<span class="dragIcon"></span>\r\n<!--					<div class="numbering"><%=i+1 %>)</div>			\r\n-->					<div class="option add-img formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox">								<%if(listItem[0].type === "text" && (listItem[0].data)){%>\r\n								<%=listItem[0].data%>\r\n								<%} else if(listItem[0].type === "image"){%>					\r\n											<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+listItem[0].data%> class="question-image" data-id=<%=listItem[0].id%> />																\r\n								<% } %>				\r\n					</div>	\r\n					<select class="ans-selector">		\r\n						<% _.each(options, function (opt, j) {%>            				          				 \r\n              				<option value="<%=j+1%>"><%=String.fromCharCode(65+j)%></option> \r\n           				<% });	%>				\r\n					</select>\r\n					<span class="removeOptionIcon removeIcon"><!--<%=AppLang.REMOVE_LABEL%>--></span>  		\r\n				</li>\r\n			 <% }); %>\r\n		</ul>\r\n		\r\n	</div>\r\n</div>\r\n\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>	\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>    	'
}), define("com/es/quizEditor/views/GroupingEditView", ["com/es/text!templateBasePath/Editor/quiz/GroupingTemplate.html", "com/es/quizEditor/models/QuestionEditorModel", "com/es/utilities/utils", "com/es/utilities/services"], function(e, t, n, r) {
    var s = function(s) {
        var o = null,
            u = null,
            a = null,
            f = null,
            l = "",
            c = [],
            h = function() {
                var t = f.attributes,
                    r = _.template(e, t);
                $(".activity-container", u).html(r), $(".activity-container", u).addClass("groupingEditView"), E(t.answers), $(".header > div.title", u).html(AppLang.EDIT_ACTIVITY + AppLang.EDIT_GROUPING), n.makeOptionsSortable(".question-options-Wrapper > div#question-options > ul", "#question-options", g), o.trigger("render_complete")
            }, p = function(e) {
                l = e;
                var n = function(n) {
                    e ? f = new t(n.questionsData[0]) : f = new t(n), h()
                }, i = function(e) {
                        console.log(e)
                    }, s = require.toUrl("./com/es/quizEditor/data/GroupingDefaultQuestionData.json"),
                    o = e ? e : s,
                    u = {
                        url: o,
                        successCallback: n,
                        errorCallback: i
                    };
                r.fetchQuestionData(u)
            }, d = function(e, t) {
                var r, i, s, u;
                i = function(e) {
                    e.status === !0 ? o.trigger(AppEvent.QUESTION_CREATED, e.url) : e.status === !1 && n.showToasterMessage(AppLang.QUESTION_SAVE_ERROR)
                }, s = function(e) {
                    console.log(e)
                }, u = {
                    url: QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID,
                    success: i,
                    error: s
                }, l = t, l ? (r = "update", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/video/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "/question/" + QUIZ_EDITOR_CONSTANTS.QUES_ID) : (r = "create", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID), c = _.uniq(c, function(e) {
                    return JSON.stringify(e)
                });
                var a = {};
                a.title = f.get("title"), a.questionType = QUIZ_EDITOR_CONSTANTS.GROUPING_QUESTION_TYPE_ID, a.assetIds = c, a.questionsData = e, f.sync(r, a, u)
            }, v = function(e) {
                var t = $("ul", "#question-options").children().last(),
                    n = t.clone();
                n.find(".option").html(AppLang.NEW_OPTION_LABEL), $("#options-ul", u).prepend(n), g(), o.trigger(AppEvent.OPTION_ADDED, n)
            }, m = function(e) {
                var t = $(".option-div", u);
                if (t.length > 1) {
                    var r = $(e.target.parentNode);
                    r.remove();
                    var i = $(e.target.parentNode).attr("id").split("option")[1];
                    g()
                } else n.showToasterMessage(AppLang.GROUPING_MIN_OPTION_TEXT)
            }, g = function() {
                var e = $(".option-div", u);
                _.each(e, function(e, t) {
                    $(e).attr("id", "option" + t), $(e).find(".numbering").html(t + 1 + ")")
                })
            }, y = function(e) {
                var t = $(".group-div", u).length;
                if (t >= 7) {
                    n.showToasterMessage(AppLang.GROUPING_MAX_GROUP_TEXT);
                    return
                }
                var r = $($(".group-div", u).get(0)),
                    i = r.clone();
                i.attr("id", "group" + t), i.find(".group").html(AppLang.NEW_GROUP_LABEL), $("#groups-ul", u).append(i);
                var s = parseInt($($(".ans-selector option:last-child", u)).val()),
                    a = String.fromCharCode(65 + s);
                $(i).find(".numbering").html(a), $(".ans-selector", u).append("<option value=" + (s + 1) + ">" + a + "</option>"), o.trigger(AppEvent.OPTION_ADDED, i)
            }, b = function(e) {
                var t = $(".group", u);
                if (t.length > 2) {
                    var r = $(e.target.parentNode);
                    r.remove(), w(), $(".ans-selector option:last-child", u).remove()
                } else n.showToasterMessage(AppLang.GROUPING_MIN_GROUP_TEXT)
            }, w = function() {
                var e = $(".group-div", u);
                _.each(e, function(e, t) {
                    var n = String.fromCharCode(65 + t);
                    $(e).attr("id", "group" + t), $(e).find(".numbering").html(n)
                })
            }, E = function(e) {
                var t = $(".option-div", u);
                _.each(t, function(t, n) {
                    var r = e[n];
                    $(t).find(".ans-selector option[value=" + r + "]").attr("selected", "selected")
                })
            }, S = function(e) {
                $(e).find(".addIcon").bind(AppEvent.CLICK, v), $(e).find(".removeOptionIcon").bind(AppEvent.CLICK, m)
            }, x = function(e) {
                $(e).find(".addGroupIcon").bind(AppEvent.CLICK, y), $(e).find(".removeGroupIcon").bind(AppEvent.CLICK, b)
            }, T = function() {
                var e = $(".activity-container", u),
                    t = f.attributes,
                    r = !1;
                c = [];
                var i = $(".question-title", e).html().trim();
                i = n.removeNbsp(i), r = n.userInputValidator($(".question-title", e), !1);
                if (!r) return n.showToasterMessage(AppLang.BLANK_TITLE), !1;
                var s = $(".metadata", e).html().trim();
                s = n.removeNbsp(s);
                var o = $(".rubric-text", e).html().trim();
                o = n.removeNbsp(o);
                var a = [{
                    data: o,
                    type: "text"
                }],
                    l = [],
                    h = [],
                    p = [],
                    d = $(".group", e);
                for (var v = 0; v < d.length; v++) {
                    var m = $(d[v]).html().trim();
                    m = n.removeNbsp(m), r = n.userInputValidator($(d[v]), !1);
                    if (!r) return n.showToasterMessage(AppLang.BLANK_GROUP_TEXT), !1;
                    var g = k($(d[v]));
                    l = l.concat(g)
                }
                var y = $(".option-div", e);
                for (var v = 0; v < y.length; v++) {
                    r = n.userInputValidator($(y[v]).find(".option"), !0);
                    if (!r) return n.showToasterMessage(AppLang.BLANK_OPTION_TEXT), !1;
                    var b = k($(y[v]).find(".option"));
                    if (b.length == 0 || b["0"].data == "") return n.showToasterMessage(AppLang.BLANK_OPTION_TEXT), !1;
                    h.push(b);
                    var w = parseInt($(y[v]).find(".ans-selector option:selected").val());
                    p.push(w)
                }
                return QUIZ_EDITOR_CONSTANTS.QUES_ID && (t.id = QUIZ_EDITOR_CONSTANTS.QUES_ID), t.title = i, t.rubric = a, t.questionBody = h, t.options = l, t.answers = p, t.metadata = s, f.attributes = t, f.attributes
            }, N = function(e) {
                $(e.target).hasClass("group-div") ? $(e.target).addClass("selectedDiv") : $(e.target).parent().addClass("selectedDiv")
            }, C = function(e) {
                $(e.target).parent().removeClass("selectedDiv")
            }, k = function(e) {
                var t = e.clone(),
                    r = [],
                    i = [],
                    s = $(t).find("img"),
                    o = null,
                    u = null;
                _.each(s, function(e) {
                    var t = {}, n = $(e);
                    i.push(n.attr("src")), t.id = n.attr("data-id"), t.name = n.attr("src").substr(n.attr("src").lastIndexOf("/") + 1, n.attr("src").length), c.push(t)
                }), _.each(s, function(e) {
                    s.after("[IMAGE]"), s.remove()
                });
                var a = $(t).html().trim(),
                    f = a.split("[IMAGE]");
                for (var l = 0; l < f.length; l++) {
                    f[l] !== "" && (a.indexOf("[IMAGE]") > -1 && l == f.length - 1 || (f[l] = n.removeNbsp(f[l]), o = {
                        data: f[l],
                        type: "text"
                    }, r.push(o)));
                    if (l < f.length - 1) {
                        var h = i.shift(),
                            p;
                        $("img[src='" + h + "']").length > 0 && (p = $($("img[src='" + h + "']").get(0)).attr("data-id"));
                        var d = h.substr(h.lastIndexOf("/") + 1, h.length);
                        u = {
                            data: d,
                            type: "image",
                            id: p
                        }, r.push(u)
                    }
                }
                return r
            }, L = function(e) {
                if ($(e.target).find("img").length > 0) {
                    for (i = 1; i <= Object.keys(CKEDITOR.instances).length; i++) $("#cke_editor" + i).css("display", "none");
                    n.showConfirmPopUp(AppLang.ADD_TEXT_CONFIRMATiON_MESSAGE, "Confirm", ["cancel"], function(t) {
                        if (t.toLowerCase() === "yes") $(e.target).children().remove();
                        else {
                            var n = $(e.target).children();
                            $(e.target).html(""), $(e.target).html(n)
                        }
                    })
                }
            }, A = function(e) {
                parseInt($(".question-title").text().length) >= QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && e.preventDefault()
            }, O = Backbone.View.extend({
                events: {
                    "click .addIcon": v,
                    "click .removeOptionIcon": m,
                    "click .addGroupIcon": y,
                    "click .removeGroupIcon": b,
                    "input .group": L,
                    "input .option": L,
                    "focus .group-div": N,
                    "blur .group-div": C,
                    "keypress .question-title": A
                },
                initialize: function(e) {
                    a = e || {}, u = a.el, o = this
                },
                fetchData: p,
                syncData: d,
                handleDoneClick: T
            });
        return new O(s)
    };
    return s
}), define("com/es/text!templateBasePath/Editor/quiz/FIBTapPlaceTemplate.html", [], function() {
    return '<div class="question-title-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TITLE_LABEL%></span>\r\n    <div class="question-title formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n    	<%=title %>\r\n    </div>\r\n    <span class="activityType"><%=AppLang.EDIT_FIB_TAPPLACE%></span>\r\n</div>\r\n\r\n<div class="rubric-text-Wrapper">\r\n    <span class="formLabel"><%=AppLang.QUESTION_RUBRIC_LABEL%></span>\r\n        <div class="rubric-text formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n            <% if(rubric[0]){ %>	\r\n                <%=rubric[0].data %>\r\n            <% } %>		\r\n        </div>\r\n</div>\r\n\r\n<div class="question-text-Wrapper">\r\n<%=AppLang.OPTIONS_LABEL%>\r\n<div class="question-option-Wrapper option-list" id="option-list-wrapper">\r\n	<div class="question-option fib-option add-img" tabindex="0" spellcheck="false" role="textbox" >\r\n	</div>\r\n	\r\n</div>\r\n</div>\r\n\r\n<div class="question-text-Wrapper">\r\n	<span class="formLabel"><%=AppLang.QUESTION_TEXT_LABEL%></span>\r\n	<div class="question-option-Wrapper questionContentWrapper" id="question-option-Wrapper">\r\n		<div class="question-option fib-option add-img question-text questionText formPlaceholder" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n			<% var gapCount = 0 %>\r\n			<% _.each(questionBody, function(item, i){ %>\r\n			<% if(item == "GAP"){ %>\r\n				<div data-name="fillup" class="data-values-activity-fill" contenteditable="false"><span class="spantext" contenteditable="false"><%=options[answers[gapCount][0] - 1].data %></span><div class="close-pop remove-option"></div></div>\r\n				<% gapCount++ %>\r\n			<%	}else{	%>\r\n					<%if(item.type === "text" && (item.data)){%>\r\n				<%=item.data%>\r\n				<%} else if(item.type === "image"){%>					\r\n							<img src=<%=QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH+item.data%> class="question-image" data-id=<%=item.id%> />						\r\n						\r\n				<% } %>				\r\n				<%	}%>\r\n				<% }); %>\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n\r\n<div class="metadata-Wrapper">\r\n	<span class="formLabel"><%=AppLang.METADATA_LABEL%></span>	\r\n	<div class="rubric-text formPlaceholder metadata" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" >\r\n		<% if(metadata){ %>	\r\n			<%=metadata %>\r\n		<% } %>	\r\n	</div>\r\n	<span class="formLabel metadata-additional-info"><%=AppLang.METADATA_ADDITIONAL_INFO%></span>\r\n</div>'
}), define("com/es/text!templateBasePath/Editor/quiz/FibDataActivitySelectedTemplate.html", [], function() {
    return '<div class="option-selected">\r\n	<span class="optionBadge"><%=usage%></span>\r\n    <span class="option-selected-item"><%=optionText%></span>\r\n    <div class="close-pop remove-option"></div>\r\n</div>'
}), define("com/es/text!templateBasePath/Editor/quiz/AddDistractionTemplate.html", [], function() {
    return '<div class="extra-options">\n    <div class="options-container">\n        <div class="option-box">\n            <span class="option-text add-img formPlaceholder" contenteditable="true"  ></span>\n            <button class="addOptionIcon btn-add"><%=AppLang.ADD_DISTRACTORS_LABEL%></button>\n        </div>\n	</div>\n</div>'
}), define("com/es/quizEditor/views/FIBTapPlaceEditView", ["com/es/text!templateBasePath/Editor/quiz/FIBTapPlaceTemplate.html", "com/es/text!templateBasePath/Editor/quiz/FibDataActivitySelectedTemplate.html", "com/es/text!templateBasePath/Editor/quiz/AddDistractionTemplate.html", "com/es/quizEditor/models/QuestionEditorModel", "com/es/utilities/utils", "com/es/utilities/services"], function(e, t, n, r, i, s) {
    var o = function(o) {
        var u = null,
            a = null,
            f = null,
            l = !1,
            c = "",
            h = "",
            p = "",
            d = "",
            v = [],
            m = function() {
                p = f.attributes;
                var t = _.template(e, p);
                h = $(".activity-container", u), h.html(t), $(".header > div.title", u).html(AppLang.EDIT_ACTIVITY + AppLang.EDIT_FIB_TAPPLACE), $(CKEDITOR).unbind(AppEvent.FIB_ANSWER_ADDED).bind(AppEvent.FIB_ANSWER_ADDED, N.bind(a)), a.trigger("render_complete"), f.on("change:options", E, a), d = f.get("options"), E()
            }, g = function(e) {
                c = e;
                var t = function(t) {
                    e ? f = new r(t.questionsData[0]) : f = new r(t), m()
                }, n = function(e) {
                        console.log(e)
                    }, i = require.toUrl("./com/es/quizEditor/data/FIBTapPlaceDefaultQuestionData.json"),
                    o = e ? e : i,
                    u = {
                        url: o,
                        successCallback: t,
                        errorCallback: n
                    };
                s.fetchQuestionData(u)
            }, y = function() {
                var e = [],
                    t = [],
                    n = !1;
                l = !1;
                var r = "",
                    s, o = [],
                    u = $(".question-title", h).html().trim(),
                    a = $("#question-option-Wrapper .question-option.fib-option", h).clone();
                u = i.removeNbsp(u), n = i.userInputValidator($(".question-title", h), !1);
                if (!n) return i.showToasterMessage(AppLang.BLANK_TITLE), !1;
                n = i.userInputValidator($(a), !0);
                if (!n) return i.showToasterMessage(AppLang.BLANK_QUESTION_TEXT), !1;
                var c = $(a).find("img"),
                    p = $(a).find(".data-values-activity-fill");
                if (p.length === 0) return i.showToasterMessage(AppLang.BLANK_MIN_TEXT), !1;
                var d = $("#option-list-wrapper .option-selected-item", h);
                v = [], _.each(p, function(e) {
                    var t = $(e).find(".spantext").html();
                    t === "" && (l = !0), o.push(t), p.after("[GAP]"), p.remove()
                }), _.each(c, function(e) {
                    var n = {}, r = $(e);
                    t.push(r.attr("src")), n.id = r.attr("data-id"), n.name = r.attr("src").substr(r.attr("src").lastIndexOf("/") + 1, r.attr("src").length), v.push(n)
                }), _.each(c, function(e) {
                    c.after("[IMAGE]"), c.remove()
                });
                if (l) return i.showToasterMessage(AppLang.BLANK_FIB_TEXT), !1;
                var m = $(a).html(),
                    g = m.split("[GAP]"),
                    y = [];
                for (var b = 0; b < g.length; b++)
                    if (b != g.length - 1 && g[b] == "") y.push("GAP");
                    else {
                        var w = g[b].indexOf("[IMAGE]"),
                            E = g[b],
                            S = "",
                            x = 0;
                        if (w > -1) {
                            while (w > -1) S = E.substr(x, w), S = i.removeNbsp(S), E = E.substr(w + 7, E.length), w = E.indexOf("[IMAGE]"), y.push({
                                data: S,
                                type: "text"
                            }), s = t.shift(), r = s.substr(s.lastIndexOf("/") + 1, s.length), y.push({
                                data: r,
                                type: "image"
                            });
                            E = i.removeNbsp(E), y.push({
                                data: E,
                                type: "text"
                            })
                        } else g[b] = i.removeNbsp(g[b]), y.push({
                            data: g[b],
                            type: "text"
                        });
                        b != g.length - 1 && y.push("GAP")
                    }
                var T = $(".rubric-text", h).html().trim(),
                    N = [];
                T != "" && (T = i.removeNbsp(T), N = [{
                    data: T,
                    type: "text"
                }]);
                var C = {};
                _.each(d, function(t) {
                    var n = $(t).html(),
                        r = parseInt($(t).parent().find(".optionBadge").html());
                    C[n] = r, n && e.push(n)
                });
                var k = _.unique(e);
                k = _.shuffle(k);
                var L = [],
                    A = [];
                _.each(o, function(e) {
                    var t = k,
                        n = t.map(function(e) {
                            return e.toUpperCase()
                        }),
                        r = n.indexOf(e.toUpperCase());
                    L.push([r + 1])
                }), _.each(k, function(e) {
                    e = i.removeNbsp(e), A.push({
                        data: e,
                        type: "text",
                        usage: C[e]
                    })
                }), QUIZ_EDITOR_CONSTANTS.QUES_ID && (f.attributes.id = QUIZ_EDITOR_CONSTANTS.QUES_ID);
                var O = $(".metadata", h).html().trim();
                O = i.removeNbsp(O);
                var M = f.attributes;
                return M.answers = L, M.options = A, M.questionBody = y, M.rubric = N, M.title = u, M.metadata = O, f.attributes = M, f.attributes
            }, b = function(e, t) {
                var n, r, s, o;
                r = function(e) {
                    e.status === !0 ? a.trigger(AppEvent.QUESTION_CREATED, e.url) : e.status === !1 && i.showToasterMessage(AppLang.QUESTION_SAVE_ERROR)
                }, s = function(e) {
                    console.log(e)
                }, o = {
                    url: QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID,
                    success: r,
                    error: s
                }, c = t, c ? (n = "update", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/video/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "/question/" + QUIZ_EDITOR_CONSTANTS.QUES_ID) : (n = "create", f.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "question/sync/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID), v = _.uniq(v, function(e) {
                    return JSON.stringify(e)
                });
                var u = {};
                u.title = f.get("title"), u.questionType = QUIZ_EDITOR_CONSTANTS.FIB_TAP_AND_PLACE_QUESTION_TYPE_ID, u.assetIds = v, u.questionsData = e, f.sync(n, u, o)
            }, w = function(e) {
                var t = [],
                    n, r, s, o, u, a = null;
                s = $(e.target), o = s.prev().text(), u = $(".data-values-activity-fill", "#question-option-Wrapper"), a = i.clone(f.get("options")), n = _.pluck(f.get("options"), "data"), r = _.indexOf(n, o), r > -1 && (_.each(n, function(e) {
                    t.push(e)
                }), _.each(u, function(e) {
                    var t = $(e);
                    o.toLowerCase() === t.text().replace("/&nbsp;/gi", "").trim().toLowerCase() && t.after(" " + t.text()).remove()
                }), a.splice(r, 1), f.set({
                    options: a
                }))
            }, E = function() {
                var e, r, i, s, o, u;
                i = _.map(f.get("options"), function(e) {
                    var t = {};
                    return t.optionText = e.data, t.usage = e.usage, t
                }), u = $(".option-list > .question-option.fib-option", h), u.empty(), _.each(i, function(e) {
                    s = _.template(t, {
                        optionText: e.optionText,
                        usage: e.usage
                    }), u.append(s)
                }), $(".option-text").html("");
                var a = _.template(n);
                u.append(a)
            }, S = function(e, t) {
                var n = [],
                    r, s = null,
                    o = null;
                r = i.clone(f.get("options")), s = _.find(r, function(t, n) {
                    if (t.data.toLowerCase() == e.toLowerCase()) return o = n, t
                });
                if (s) return o != null && t === !0 ? i.showToasterMessage(AppLang.OPTION_ALREADY_EXIST) : o != null && t === !1 && (r[o].usage = (parseInt(r[o].usage) + 1).toString(), x(r)), !1;
                _.each(r, function(e) {
                    n.push(e)
                }), t ? n.push({
                    data: e,
                    type: "text",
                    usage: "0"
                }) : n.push({
                    data: e,
                    type: "text",
                    usage: "1"
                }), f.set({
                    options: n
                })
            }, x = function(e) {
                f.set({
                    options: e
                })
            }, T = function(e) {
                var t, n;
                t = $(".option-text", e.target.parentNode), n = t.text().replace("/&nbsp;/gi", "").trim(), n.length > 0 && S(n, !0)
            }, N = function(e, t) {
                var n = [],
                    r, i, s;
                i = $(t), s = i.text().replace("/&nbsp;/gi", "").trim(), s.length > 0 && S(s, !1)
            }, C = function(e) {
                if ($(e.target).parent().hasClass("data-values-activity-fill")) {
                    var t = $(e.target).parent().text(),
                        n = null;
                    $(e.target).parent().after(" " + t).remove();
                    var r = i.clone(f.get("options")),
                        s = _.find(r, function(e, r) {
                            if (e.data.toLowerCase() == t.toLowerCase()) return n = r, e
                        });
                    r[n].usage === "0" ? r.splice(n, 1) : r[n].usage = (parseInt(r[n].usage) - 1).toString(), f.set({
                        options: r
                    })
                }
            }, k = function(e) {
                parseInt($(".question-title").text().length) >= QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && e.preventDefault()
            }, L = Backbone.View.extend({
                events: {
                    "click .addOptionIcon": T,
                    "click #option-list-wrapper .option-selected > .remove-option": w,
                    "click .data-values-activity-fill > .remove-option": C,
                    "keypress .question-title": k
                },
                initialize: function(e) {
                    a = this, _options = e || {}, u = _options.el
                },
                fetchData: g,
                syncData: b,
                handleDoneClick: y
            });
        return new L(o)
    };
    return o
}), define("com/es/quizEditor/models/MediaAssetPopupModel", [], function() {
    var e = Backbone.Model.extend({
        defaults: {
            id: "",
            assetThumbnailURL: "",
            assetName: ""
        }
    });
    return e
}), define("com/es/quizEditor/collections/MediaAssetPopupCollection", ["com/es/quizEditor/models/MediaAssetPopupModel"], function(e) {
    var t = Backbone.Collection.extend({
        model: e,
        url: ""
    });
    return t
}), define("com/es/text!templateBasePath/Editor/quiz/MediaAssestSelectionPopup.html", [], function() {
    return '	\n	<div class="assest-browse-gal-popup  browse-popup" id="mediaAssetSelection" style="display: none;">\n\n		<div class="widget-header">\n			<h2 class="float-left"><%=AppLang.SELECT_IMAGE_LABLE%></h2>\n			<span id="closeBrowseGalPopup" class="icon-close-asset float-right"></span>\n		</div>			\n\n		<div id="assetFillByAjaxForGallery" class="widget-content-asset">\n            <ul>            \n            \n                <% _.each(collection, function(item, i){ %>\n                    <li class="">\n                        <div class="inline-block each-item">\n                            <div class="thumbnail-image" title="">\n                            	<img src=<%=item.assetThumbnailURL%> data-id=<%=item.id%> >\n                                <span class="selection-tick"></span>\n                            </div>                           \n                            <div class="thumbnail-text"><%=item.assetName%></div>\n                            </div>\n                    </li>\n                <% }); %>               \n            </ul>\n		</div>\n\n		<div class="form-footer">\n			<input type="button" value="<%=AppLang.ADD_TEXT%>" class="form-button" onclick=""  id="mediaAssetSelected"/>\n		</div>\n\n	</div>\n    '
}), define("com/es/quizEditor/views/MediaAssestPopupView", ["com/es/text!templateBasePath/Editor/quiz/MediaAssestSelectionPopup.html", "com/es/utilities/utils"], function(e, t) {
    var n = Backbone.View.extend({
        initialize: function(e) {
            this.options = e.opt || {}, this.el = this.options.container, this.render()
        },
        render: function(t) {
            var n = this,
                r = {
                    collection: this.collection
                }, i = _.template(e);
            $(".activity-container", this.el).length > 0 ? $(".activity-container", this.el).append(i(r)) : this.options.container.append(i(r)), $("#closeBrowseGalPopup").off(AppEvent.CLICK).on(AppEvent.CLICK, n._hidePopup), $(this.el).on(AppEvent.CLICK, ".mediaTestBtn", n._showPopup), $("li", $(".widget-content-asset")).off(AppEvent.CLICK).on(AppEvent.CLICK, n._selectImage), $("#mediaAssetSelected").off(AppEvent.CLICK).on(AppEvent.CLICK, n._mediaAssetSelected.bind(n)), $(this.el).on(AppEvent.CLICK, ".resetAssetSelection", n._clearSelectedImg), $("#mediaAssetSelected").prop("disabled", !0).css("opacity", .3), $("#mediaAssetSelection").on("shown.bs.modal", function() {
                _.delay(function() {
                    $("body").css("overflow", "hidden")
                }, 500)
            }), $("#mediaAssetSelection").on("hidden.bs.modal", function() {
                $("body").css("overflow", "auto")
            })
        },
        _hidePopup: function(e) {
            var t = this;
            e.stopPropagation(), $("li", $(".widget-content-asset")).removeClass("active-file"), $("#mediaAssetSelection").modal("hide");
            if (CKEDITOR)
                for (i = 1; i <= Object.keys(CKEDITOR.instances).length; i++) $("#cke_editor" + i).css("opacity", "1"), $("#cke_editor" + i).css("display") === "block" && $("#cke_editor" + i).css("display", "block!important")
        },
        _showPopup: function(e) {
            var t = this;
            e.stopPropagation(), $("#mediaAssetSelection").modal("show")
        },
        _selectImage: function(e) {
            e.stopPropagation(), $("li", $(".widget-content-asset")).removeClass("active-file"), $(this).toggleClass("active-file"), $("#mediaAssetSelected").prop("disabled", !1).css("opacity", 1)
        },
        _mediaAssetSelected: function(e) {
            e.stopPropagation(), $(".leftCol", this.el).length > 0 ? this._removeText() : $(".group").length > 0 ? this._removeText() : $(".option-text.mcqBinaryEditView").length > 0 ? $(this.editor.element.$).hasClass("question-text") ? this._createAndInsertImage() : this._removeText() : this._createAndInsertImage(), $("#mediaAssetSelection").modal("hide"), $("li", $(".widget-content-asset")).removeClass("active-file");
            if (CKEDITOR)
                for (i = 1; i <= Object.keys(CKEDITOR.instances).length; i++) $("#cke_editor" + i).css("opacity", "1"), $("#cke_editor" + i).css("display") === "block" && $("#cke_editor" + i).css("display", "block!important")
        },
        _removeText: function() {
            if ($(this.editor.element.$).children().length == 0 && $(this.editor.element.$).html().length == 0) this._createAndInsertImage();
            else if ($(this.editor.element.$).children().length == 0 && $(this.editor.element.$).html().length != 0) {
                $(this.editor.element.$).html("");
                var e = $(".active-file");
                if (!(e.length > 0)) return;
                this._createAndInsertImage()
            } else $(this.editor.element.$).children().length != 0 && $(this.editor.element.$).html().length != 0 && ($(this.editor.element.$).html(""), this._createAndInsertImage())
        },
        _createAndInsertImage: function() {
            var e = $(".active-file"),
                t = e.find("img").get(0).src,
                n = t.substr(t.lastIndexOf("/") + 1, t.length),
                r = $(e.find("img").get(0)).attr("data-id"),
                i = '<img src="' + t + '" class="question-image" data-id="' + r + '"/>';
            if ($(".activity-container", this.el).length > 0) {
                var s = CKEDITOR.dom.element.createFromHtml(i);
                this.editor.insertElement(s)
            } else $(".posterImageName").html(n), $(".posterImagePreview img").attr("src", t)
        },
        _clearSelectedImg: function(e) {
            e.target.parentNode.remove()
        },
        assetAdd: function(e, t) {
            $("#mediaAssetSelected").prop("disabled", !0).css("opacity", .3), this.editor = t
        }
    });
    return n
}), define("com/es/text!templateBasePath/Reader/popups/widgetPopupTemplate.html", [], function() {
    return "<div id='widgetPopup' class='modal hide fade lightBox' tabindex='-1' role='dialog' aria-labelledby='windowTitleLabel' aria-hidden='true'>\r\n	<div class='modal-dialog'>\r\n    <div id='widget-header'>\r\n				<span class='gal-title'></span>\r\n                <span class=\"icon icon-ic-close-widget widget-html-icon-style\" id='closePopup' data-dismiss='modal'></span>\r\n				<!--<a id='closePopup' class='icon-fullscreen' data-dismiss='modal' style='float:right;margin:2px;'></a>-->									\r\n			</div>\r\n		<div class='modal-content'>\r\n			\r\n			<div id='widgetContent'></div>\r\n		</div>\r\n	</div>\r\n</div>\r\n"
});
var WIDGET_EVENTS = {
    INITIALIZED: "initialized",
    LAUNCHED: "launched",
    POPULATED: "populated",
    DESTROYED: "destroyed",
    SHOW: "show",
    HIDE: "hide",
    CLOSED: "close",
    INITTIALIZE_ERROR: "intializeEerror",
    ALL_WIDGETS_INITIALIZED: "allWidgetsInitialized",
    PLAY_CLICKED: "click",
    RENDER_COMPLETE: "renderComplete",
    ALL_RENDER_COMPLETE: "allRenderComplete",
    HEIGHT_UPDATED: "heightUpdated",
    EDITED: "edited",
    POPUP_HIDDEN: "hidden.bs.modal",
    POPUP_SHOWN: "shown.bs.modal",
    CLICK: "click",
    TOUCHSTART: "touchstart",
    TOUCHEND: "touchend",
    CHANGE: "change",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    TIME_UPDATE: "timeupdate",
    MOUSEUP: "mouseup",
    ENDED: "ended",
    ON_PAUSE: "onpause",
    ON_PLAY: "onplay",
    POPULATE_MORE: "populateMore",
    ON_DONE: "onDone",
    MOUSE_ENTER: "mouseenter",
    MOUSE_LEAVE: "mouseleave",
    START_TEST_CLICK: "startTest",
    FETCH_PREVIUOUS_ATTEMPTS: "fetchPreviousAttempts",
    SEND_RESPONSE_DATA: "sendResponseData",
    SAVE_USER_RESPONSE_DATA: "saveUserResponseData",
    FETCH_USER_RESPONSE_DATA: "fetchUserResponseData",
    TEST_TRY_AGAIN_CLICK: "tryAgainClicked",
    TEST_FINISH_CLICK: "finishedTest",
    DOWNLOAD_ACTION: "downloadAction",
    LAUNCH_HTML_CLICKED: "launchHtml",
    LAUNCH_FILE_CLICKED: "launchFile",
    LAUNCH_LEARNOSITY_CLICKED: "launchLearnosity",
    DESTROY_WEBVIEW: "destroyWebview",
    VIDEO_TOUCHSTART: "videoTouchStart",
    VIDEO_TOUCHEND: "videoTouchEnd",
    VIDEO_CONTROL_TOUCHSTART: "videoControlTouchStart",
    VIDEO_CONTROL_TOUCHEND: "videoControlTouchEnd",
    SHOW_ALERT_MSG: "showAlert",
    INVOKE_SERVICE: "invokeService",
    FETCH_WIDGET_PROPERTIES: "fetchWidgetProperties",
    THIRD_PARTY_WIDGET_LAUNCH: "thirdPartyWidgetLaunch",
    XAPI_EVENT: "xapiEvent",
    LAUNCH_TPCONTENT: "TPLaunchEvent"
};
define("com/es/widgets/WidgetEvents", function() {}), define("com/es/widgets/WidgetPopup", ["com/es/text!templateBasePath/Reader/popups/widgetPopupTemplate.html", "com/es/widgets/WidgetEvents", "com/es/widgets/WidgetUtils"], function(e, t, n) {
    var r, i = function(e) {
            $("#widgetPopup .gal-title").html(unescape(e))
        }, s = Backbone.View.extend({
            initialize: function() {
                _.extend(this, Backbone.Events), r = this;
                var t = _.template(e),
                    i = t();
                $("#QAPlaceHolder")[0].innerHTML = i, $("body").append($("#widgetPopup")[0]), n.isIE() && $("#widgetPopup").removeClass("fade"), n.log("append in body..")
            },
            setTitle: i
        });
    return s
}),
function($) {
    function sc_setScroll(e, t, n) {
        return n.transition == "transition" && t == "swing" && (t = "ease"), {
            anims: [],
            duration: e,
            orgDuration: e,
            easing: t,
            startTime: getTime()
        }
    }

    function sc_startScroll(e, t) {
        for (var n = 0, r = e.anims.length; n < r; n++) {
            var i = e.anims[n];
            if (!i) continue;
            i[0][t.transition](i[1], e.duration, e.easing, i[2])
        }
    }

    function sc_stopScroll(e, t) {
        is_boolean(t) || (t = !0), is_object(e.pre) && sc_stopScroll(e.pre, t);
        for (var n = 0, r = e.anims.length; n < r; n++) {
            var i = e.anims[n];
            i[0].stop(!0), t && (i[0].css(i[1]), is_function(i[2]) && i[2]())
        }
        is_object(e.post) && sc_stopScroll(e.post, t)
    }

    function sc_afterScroll(e, t, n) {
        t && t.remove();
        switch (n.fx) {
            case "fade":
            case "crossfade":
            case "cover-fade":
            case "uncover-fade":
                e.css("opacity", 1), e.css("filter", "")
        }
    }

    function sc_fireCallbacks(e, t, n, r, i) {
        t[n] && t[n].call(e, r);
        if (i[n].length)
            for (var s = 0, o = i[n].length; s < o; s++) i[n][s].call(e, r);
        return []
    }

    function sc_fireQueue(e, t, n) {
        return t.length && (e.trigger(cf_e(t[0][0], n), t[0][1]), t.shift()), t
    }

    function sc_hideHiddenItems(e) {
        e.each(function() {
            var e = $(this);
            e.data("_cfs_isHidden", e.is(":hidden")).hide()
        })
    }

    function sc_showHiddenItems(e) {
        e && e.each(function() {
            var e = $(this);
            e.data("_cfs_isHidden") || e.show()
        })
    }

    function sc_clearTimers(e) {
        return e.auto && clearTimeout(e.auto), e.progress && clearInterval(e.progress), e
    }

    function sc_mapCallbackArguments(e, t, n, r, i, s, o) {
        return {
            width: o.width,
            height: o.height,
            items: {
                old: e,
                skipped: t,
                visible: n
            },
            scroll: {
                items: r,
                direction: i,
                duration: s
            }
        }
    }

    function sc_getDuration(e, t, n, r) {
        var i = e.duration;
        return e.fx == "none" ? 0 : (i == "auto" ? i = t.scroll.duration / t.scroll.items * n : i < 10 && (i = r / i), i < 1 ? 0 : (e.fx == "fade" && (i /= 2), Math.round(i)))
    }

    function nv_showNavi(e, t, n) {
        var r = is_number(e.items.minimum) ? e.items.minimum : e.items.visible + 1;
        if (t == "show" || t == "hide") var i = t;
        else if (r > t) {
            debug(n, "Not enough items (" + t + " total, " + r + " needed): Hiding navigation.");
            var i = "hide"
        } else var i = "show";
        var s = i == "show" ? "removeClass" : "addClass",
            o = cf_c("hidden", n);
        e.auto.button && e.auto.button[i]()[s](o), e.prev.button && e.prev.button[i]()[s](o), e.next.button && e.next.button[i]()[s](o), e.pagination.container && e.pagination.container[i]()[s](o)
    }

    function nv_enableNavi(e, t, n) {
        if (e.circular || e.infinite) return;
        var r = t == "removeClass" || t == "addClass" ? t : !1,
            i = cf_c("disabled", n);
        e.auto.button && r && e.auto.button[r](i);
        if (e.prev.button) {
            var s = r || t == 0 ? "addClass" : "removeClass";
            e.prev.button[s](i)
        }
        if (e.next.button) {
            var s = r || t == e.items.visible || t == e.visibleItemCount ? "addClass" : "removeClass";
            e.next.button[s](i)
        }
    }

    function go_getObject(e, t) {
        return is_function(t) ? t = t.call(e) : is_undefined(t) && (t = {}), t
    }

    function go_getItemsObject(e, t) {
        return t = go_getObject(e, t), is_number(t) ? t = {
            visible: t
        } : t == "variable" ? t = {
            visible: t,
            width: t,
            height: t
        } : is_object(t) || (t = {}), t
    }

    function go_getScrollObject(e, t) {
        return t = go_getObject(e, t), is_number(t) ? t <= 50 ? t = {
            items: t
        } : t = {
            duration: t
        } : is_string(t) ? t = {
            easing: t
        } : is_object(t) || (t = {}), t
    }

    function go_getNaviObject(e, t) {
        t = go_getObject(e, t);
        if (is_string(t)) {
            var n = cf_getKeyCode(t);
            n == -1 ? t = $(t) : t = n
        }
        return t
    }

    function go_getAutoObject(e, t) {
        return t = go_getNaviObject(e, t), is_jquery(t) ? t = {
            button: t
        } : is_boolean(t) ? t = {
            play: t
        } : is_number(t) && (t = {
            timeoutDuration: t
        }), t.progress && (is_string(t.progress) || is_jquery(t.progress)) && (t.progress = {
            bar: t.progress
        }), t
    }

    function go_complementAutoObject(e, t) {
        return is_function(t.button) && (t.button = t.button.call(e)), is_string(t.button) && (t.button = $(t.button)), is_boolean(t.play) || (t.play = !0), is_number(t.delay) || (t.delay = 0), is_undefined(t.pauseOnEvent) && (t.pauseOnEvent = !0), is_boolean(t.pauseOnResize) || (t.pauseOnResize = !0), is_number(t.timeoutDuration) || (t.timeoutDuration = t.duration < 10 ? 2500 : t.duration * 5), t.progress && (is_function(t.progress.bar) && (t.progress.bar = t.progress.bar.call(e)), is_string(t.progress.bar) && (t.progress.bar = $(t.progress.bar)), t.progress.bar ? (is_function(t.progress.updater) || (t.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(t.progress.interval) || (t.progress.interval = 50)) : t.progress = !1), t
    }

    function go_getPrevNextObject(e, t) {
        return t = go_getNaviObject(e, t), is_jquery(t) ? t = {
            button: t
        } : is_number(t) && (t = {
            key: t
        }), t
    }

    function go_complementPrevNextObject(e, t) {
        return is_function(t.button) && (t.button = t.button.call(e)), is_string(t.button) && (t.button = $(t.button)), is_string(t.key) && (t.key = cf_getKeyCode(t.key)), t
    }

    function go_getPaginationObject(e, t) {
        return t = go_getNaviObject(e, t), is_jquery(t) ? t = {
            container: t
        } : is_boolean(t) && (t = {
            keys: t
        }), t
    }

    function go_complementPaginationObject(e, t) {
        return is_function(t.container) && (t.container = t.container.call(e)), is_string(t.container) && (t.container = $(t.container)), is_number(t.items) || (t.items = !1), is_boolean(t.keys) || (t.keys = !1), !is_function(t.anchorBuilder) && !is_false(t.anchorBuilder) && (t.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(t.deviation) || (t.deviation = 0), t
    }

    function go_getSwipeObject(e, t) {
        return is_function(t) && (t = t.call(e)), is_undefined(t) && (t = {
            onTouch: !1
        }), is_true(t) ? t = {
            onTouch: t
        } : is_number(t) && (t = {
            items: t
        }), t
    }

    function go_complementSwipeObject(e, t) {
        return is_boolean(t.onTouch) || (t.onTouch = !0), is_boolean(t.onMouse) || (t.onMouse = !1), is_object(t.options) || (t.options = {}), is_boolean(t.options.triggerOnTouchEnd) || (t.options.triggerOnTouchEnd = !1), t
    }

    function go_getMousewheelObject(e, t) {
        return is_function(t) && (t = t.call(e)), is_true(t) ? t = {} : is_number(t) ? t = {
            items: t
        } : is_undefined(t) && (t = !1), t
    }

    function go_complementMousewheelObject(e, t) {
        return t
    }

    function gn_getItemIndex(e, t, n, r, i) {
        is_string(e) && (e = $(e, i)), is_object(e) && (e = $(e, i)), is_jquery(e) ? (e = i.children().index(e), is_boolean(n) || (n = !1)) : is_boolean(n) || (n = !0), is_number(e) || (e = 0), is_number(t) || (t = 0), n && (e += r.first), e += t;
        if (r.total > 0) {
            while (e >= r.total) e -= r.total;
            while (e < 0) e += r.total
        }
        return e
    }

    function gn_getVisibleItemsPrev(e, t, n) {
        var r = 0,
            i = 0;
        for (var s = n; s >= 0; s--) {
            var o = e.eq(s);
            r += o.is(":visible") ? o[t.d.outerWidth](!0) : 0;
            if (r > t.maxDimension) return i;
            s == 0 && (s = e.length), i++
        }
    }

    function gn_getVisibleItemsPrevFilter(e, t, n) {
        return gn_getItemsPrevFilter(e, t.items.filter, t.items.visibleConf.org, n)
    }

    function gn_getScrollItemsPrevFilter(e, t, n, r) {
        return gn_getItemsPrevFilter(e, t.items.filter, r, n)
    }

    function gn_getItemsPrevFilter(e, t, n, r) {
        var i = 0,
            s = 0;
        for (var o = r, u = e.length; o >= 0; o--) {
            s++;
            if (s == u) return s;
            var a = e.eq(o);
            if (a.is(t)) {
                i++;
                if (i == n) return s
            }
            o == 0 && (o = u)
        }
    }

    function gn_getVisibleOrg(e, t) {
        return t.items.visibleConf.org || e.children().slice(0, t.items.visible).filter(t.items.filter).length
    }

    function gn_getVisibleItemsNext(e, t, n) {
        var r = 0,
            i = 0;
        for (var s = n, o = e.length - 1; s <= o; s++) {
            var u = e.eq(s);
            r += u.is(":visible") ? u[t.d.outerWidth](!0) : 0;
            if (r > t.maxDimension) return i;
            i++;
            if (i == o + 1) return i;
            s == o && (s = -1)
        }
    }

    function gn_getVisibleItemsNextTestCircular(e, t, n, r) {
        var i = gn_getVisibleItemsNext(e, t, n);
        return t.circular || n + i > r && (i = r - n), i
    }

    function gn_getVisibleItemsNextFilter(e, t, n) {
        return gn_getItemsNextFilter(e, t.items.filter, t.items.visibleConf.org, n, t.circular)
    }

    function gn_getScrollItemsNextFilter(e, t, n, r) {
        return gn_getItemsNextFilter(e, t.items.filter, r + 1, n, t.circular) - 1
    }

    function gn_getItemsNextFilter(e, t, n, r, i) {
        var s = 0,
            o = 0;
        for (var u = r, a = e.length - 1; u <= a; u++) {
            o++;
            if (o >= a) return o;
            var f = e.eq(u);
            if (f.is(t)) {
                s++;
                if (s == n) return o
            }
            u == a && (u = -1)
        }
    }

    function gi_getCurrentItems(e, t) {
        return e.slice(0, t.items.visible)
    }

    function gi_getOldItemsPrev(e, t, n) {
        return e.slice(n, t.items.visibleConf.old + n)
    }

    function gi_getNewItemsPrev(e, t) {
        return e.slice(0, t.items.visible)
    }

    function gi_getOldItemsNext(e, t) {
        return e.slice(0, t.items.visibleConf.old)
    }

    function gi_getNewItemsNext(e, t, n) {
        return e.slice(n, t.items.visible + n)
    }

    function sz_storeMargin(e, t, n) {
        t.usePadding && (is_string(n) || (n = "_cfs_origCssMargin"), e.each(function() {
            var e = $(this),
                r = parseInt(e.css(t.d.marginRight), 10);
            is_number(r) || (r = 0), e.data(n, r)
        }))
    }

    function sz_resetMargin(e, t, n) {
        if (t.usePadding) {
            var r = is_boolean(n) ? n : !1;
            is_number(n) || (n = 0), sz_storeMargin(e, t, "_cfs_tempCssMargin"), e.each(function() {
                var e = $(this);
                e.css(t.d.marginRight, r ? e.data("_cfs_tempCssMargin") : n + e.data("_cfs_origCssMargin"))
            })
        }
    }

    function sz_storeOrigCss(e) {
        e.each(function() {
            var e = $(this);
            e.data("_cfs_origCss", e.attr("style") || "")
        })
    }

    function sz_restoreOrigCss(e) {
        e.each(function() {
            var e = $(this);
            e.attr("style", e.data("_cfs_origCss") || "")
        })
    }

    function sz_setResponsiveSizes(e, t) {
        var n = e.items.visible,
            r = e.items[e.d.width],
            i = e[e.d.height],
            s = is_percentage(i);
        t.each(function() {
            var t = $(this),
                n = r - ms_getPaddingBorderMargin(t, e, "Width");
            t[e.d.width](n), s && t[e.d.height](ms_getPercentage(n, i))
        })
    }

    function sz_setSizes(e, t) {
        var n = e.parent(),
            r = e.children(),
            i = gi_getCurrentItems(r, t),
            s = cf_mapWrapperSizes(ms_getSizes(i, t, !0), t, !1);
        n.css(s);
        if (t.usePadding) {
            var o = t.padding,
                u = o[t.d[1]];
            t.align && u < 0 && (u = 0);
            var a = i.last();
            a.css(t.d.marginRight, a.data("_cfs_origCssMargin") + u), e.css(t.d.top, o[t.d[0]]), e.css(t.d.left, o[t.d[3]])
        }
        return e.css(t.d.width, s[t.d.width] + ms_getTotalSize(r, t, "width") * 2), e.css(t.d.height, ms_getLargestSize(r, t, "height")), s
    }

    function ms_getSizes(e, t, n) {
        return [ms_getTotalSize(e, t, "width", n), ms_getLargestSize(e, t, "height", n)]
    }

    function ms_getLargestSize(e, t, n, r) {
        return is_boolean(r) || (r = !1), is_number(t[t.d[n]]) && r ? t[t.d[n]] : is_number(t.items[t.d[n]]) ? t.items[t.d[n]] : (n = n.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(e, t, n))
    }

    function ms_getTrueLargestSize(e, t, n) {
        var r = 0;
        for (var i = 0, s = e.length; i < s; i++) {
            var o = e.eq(i),
                u = o.is(":visible") ? o[t.d[n]](!0) : 0;
            r < u && (r = u)
        }
        return r
    }

    function ms_getTotalSize(e, t, n, r) {
        is_boolean(r) || (r = !1);
        if (is_number(t[t.d[n]]) && r) return t[t.d[n]];
        if (is_number(t.items[t.d[n]])) return t.items[t.d[n]] * e.length;
        var i = n.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight",
            s = 0;
        for (var o = 0, u = e.length; o < u; o++) {
            var a = e.eq(o);
            s += a.is(":visible") ? a[t.d[i]](!0) : 0
        }
        return s
    }

    function ms_getParentSize(e, t, n) {
        var r = e.is(":visible");
        r && e.hide();
        var i = e.parent()[t.d[n]]();
        return r && e.show(), i
    }

    function ms_getMaxDimension(e, t) {
        return is_number(e[e.d.width]) ? e[e.d.width] : t
    }

    function ms_hasVariableSizes(e, t, n) {
        var r = !1,
            i = !1;
        for (var s = 0, o = e.length; s < o; s++) {
            var u = e.eq(s),
                a = u.is(":visible") ? u[t.d[n]](!0) : 0;
            r === !1 ? r = a : r != a && (i = !0), r == 0 && (i = !0)
        }
        return i
    }

    function ms_getPaddingBorderMargin(e, t, n) {
        return e[t.d["outer" + n]](!0) - e[t.d[n.toLowerCase()]]()
    }

    function ms_getPercentage(e, t) {
        if (is_percentage(t)) {
            t = parseInt(t.slice(0, -1), 10);
            if (!is_number(t)) return e;
            e *= t / 100
        }
        return e
    }

    function cf_e(e, t, n, r, i) {
        return is_boolean(n) || (n = !0), is_boolean(r) || (r = !0), is_boolean(i) || (i = !1), n && (e = t.events.prefix + e), r && (e = e + "." + t.events.namespace), r && i && (e += t.serialNumber), e
    }

    function cf_c(e, t) {
        return is_string(t.classnames[e]) ? t.classnames[e] : e
    }

    function cf_mapWrapperSizes(e, t, n) {
        is_boolean(n) || (n = !0);
        var r = t.usePadding && n ? t.padding : [0, 0, 0, 0],
            i = {};
        return i[t.d.width] = e[0] + r[1] + r[3], i[t.d.height] = e[1] + r[0] + r[2], i
    }

    function cf_sortParams(e, t) {
        var n = [];
        for (var r = 0, i = e.length; r < i; r++)
            for (var s = 0, o = t.length; s < o; s++)
                if (t[s].indexOf(typeof e[r]) > -1 && is_undefined(n[s])) {
                    n[s] = e[r];
                    break
                }
        return n
    }

    function cf_getPadding(e) {
        if (is_undefined(e)) return [0, 0, 0, 0];
        if (is_number(e)) return [e, e, e, e];
        is_string(e) && (e = e.split("px").join("").split("em").join("").split(" "));
        if (!is_array(e)) return [0, 0, 0, 0];
        for (var t = 0; t < 4; t++) e[t] = parseInt(e[t], 10);
        switch (e.length) {
            case 0:
                return [0, 0, 0, 0];
            case 1:
                return [e[0], e[0], e[0], e[0]];
            case 2:
                return [e[0], e[1], e[0], e[1]];
            case 3:
                return [e[0], e[1], e[2], e[1]];
            default:
                return [e[0], e[1], e[2], e[3]]
        }
    }

    function cf_getAlignPadding(e, t) {
        var n = is_number(t[t.d.width]) ? Math.ceil(t[t.d.width] - ms_getTotalSize(e, t, "width")) : 0;
        switch (t.align) {
            case "left":
                return [0, n];
            case "right":
                return [n, 0];
            case "center":
            default:
                return [Math.ceil(n / 2), Math.floor(n / 2)]
        }
    }

    function cf_getDimensions(e) {
        var t = [
            ["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3],
            ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]
        ],
            n = t[0].length,
            r = e.direction == "right" || e.direction == "left" ? 0 : 1,
            i = {};
        for (var s = 0; s < n; s++) i[t[0][s]] = t[r][s];
        return i
    }

    function cf_getAdjust(e, t, n, r) {
        var i = e;
        if (is_function(n)) i = n.call(r, i);
        else if (is_string(n)) {
            var s = n.split("+"),
                o = n.split("-");
            if (o.length > s.length) var u = !0,
            a = o[0], f = o[1];
            else var u = !1,
            a = s[0], f = s[1];
            switch (a) {
                case "even":
                    i = e % 2 == 1 ? e - 1 : e;
                    break;
                case "odd":
                    i = e % 2 == 0 ? e - 1 : e;
                    break;
                default:
                    i = e
            }
            f = parseInt(f, 10), is_number(f) && (u && (f = -f), i += f)
        }
        if (!is_number(i) || i < 1) i = 1;
        return i
    }

    function cf_getItemsAdjust(e, t, n, r) {
        return cf_getItemAdjustMinMax(cf_getAdjust(e, t, n, r), t.items.visibleConf)
    }

    function cf_getItemAdjustMinMax(e, t) {
        return is_number(t.min) && e < t.min && (e = t.min), is_number(t.max) && e > t.max && (e = t.max), e < 1 && (e = 1), e
    }

    function cf_getSynchArr(e) {
        is_array(e) || (e = [
            [e]
        ]), is_array(e[0]) || (e = [e]);
        for (var t = 0, n = e.length; t < n; t++) is_string(e[t][0]) && (e[t][0] = $(e[t][0])), is_boolean(e[t][1]) || (e[t][1] = !0), is_boolean(e[t][2]) || (e[t][2] = !0), is_number(e[t][3]) || (e[t][3] = 0);
        return e
    }

    function cf_getKeyCode(e) {
        return e == "right" ? 39 : e == "left" ? 37 : e == "up" ? 38 : e == "down" ? 40 : -1
    }

    function cf_setCookie(e, t, n) {
        if (e) {
            var r = t.triggerHandler(cf_e("currentPosition", n));
            $.fn.carouFredSel.cookie.set(e, r)
        }
    }

    function cf_getCookie(e) {
        var t = $.fn.carouFredSel.cookie.get(e);
        return t == "" ? 0 : t
    }

    function in_mapCss(e, t) {
        var n = {};
        for (var r = 0, i = t.length; r < i; r++) n[t[r]] = e.css(t[r]);
        return n
    }

    function in_complementItems(e, t, n, r) {
        return is_object(e.visibleConf) || (e.visibleConf = {}), is_object(e.sizesConf) || (e.sizesConf = {}), e.start == 0 && is_number(r) && (e.start = r), is_object(e.visible) ? (e.visibleConf.min = e.visible.min, e.visibleConf.max = e.visible.max, e.visible = !1) : is_string(e.visible) ? (e.visible == "variable" ? e.visibleConf.variable = !0 : e.visibleConf.adjust = e.visible, e.visible = !1) : is_function(e.visible) && (e.visibleConf.adjust = e.visible, e.visible = !1), is_string(e.filter) || (e.filter = n.filter(":hidden").length > 0 ? ":visible" : "*"), e[t.d.width] || (t.responsive ? (debug(!0, "Set a " + t.d.width + " for the items!"), e[t.d.width] = ms_getTrueLargestSize(n, t, "outerWidth")) : e[t.d.width] = ms_hasVariableSizes(n, t, "outerWidth") ? "variable" : n[t.d.outerWidth](!0)), e[t.d.height] || (e[t.d.height] = ms_hasVariableSizes(n, t, "outerHeight") ? "variable" : n[t.d.outerHeight](!0)), e.sizesConf.width = e.width, e.sizesConf.height = e.height, e
    }

    function in_complementVisibleItems(e, t) {
        e.items[e.d["width"]] == "variable" && (e.items.visibleConf.variable = !0);
        if (!e.items.visibleConf.variable) {
            is_number(e[e.d.width]) ? e.items.visible = Math.floor(e[e.d.width] / e.items[e.d.width]) : (e.items.visible = Math.floor(t / e.items[e.d.width]), e[e.d.width] = e.items.visible * e.items[e.d.width], e.items.visibleConf.adjust || (e.align = !1));
            if (e.items.visible == "Infinity" || e.items.visible < 1) debug(!0, 'Not a valid number of visible items: Set to "variable".'), e.items.visibleConf.variable = !0
        }
        return e
    }

    function in_complementPrimarySize(e, t, n) {
        return e == "auto" && (e = ms_getTrueLargestSize(n, t, "outerWidth")), e
    }

    function in_complementSecondarySize(e, t, n) {
        return e == "auto" && (e = ms_getTrueLargestSize(n, t, "outerHeight")), e || (e = t.items[t.d.height]), e
    }

    function in_getAlignPadding(e, t) {
        var n = cf_getAlignPadding(gi_getCurrentItems(t, e), e);
        return e.padding[e.d[1]] = n[1], e.padding[e.d[3]] = n[0], e
    }

    function in_getResponsiveValues(e, t, n) {
        var r = cf_getItemAdjustMinMax(Math.ceil(e[e.d.width] / e.items[e.d.width]), e.items.visibleConf);
        r > t.length && (r = t.length);
        var i = Math.floor(e[e.d.width] / r);
        return e.items.visible = r, e.items[e.d.width] = i, e[e.d.width] = r * i, e
    }

    function bt_pauseOnHoverConfig(e) {
        if (is_string(e)) var t = e.indexOf("immediate") > -1 ? !0 : !1,
        n = e.indexOf("resume") > -1 ? !0 : !1;
        else var t = n = !1;
        return [t, n]
    }

    function bt_mousesheelNumber(e) {
        return is_number(e) ? e : null
    }

    function is_null(e) {
        return e === null
    }

    function is_undefined(e) {
        return is_null(e) || typeof e == "undefined" || e === "" || e === "undefined"
    }

    function is_array(e) {
        return e instanceof Array
    }

    function is_jquery(e) {
        return e instanceof jQuery
    }

    function is_object(e) {
        return (e instanceof Object || typeof e == "object") && !is_null(e) && !is_jquery(e) && !is_array(e) && !is_function(e)
    }

    function is_number(e) {
        return (e instanceof Number || typeof e == "number") && !isNaN(e)
    }

    function is_string(e) {
        return (e instanceof String || typeof e == "string") && !is_undefined(e) && !is_true(e) && !is_false(e)
    }

    function is_function(e) {
        return e instanceof Function || typeof e == "function"
    }

    function is_boolean(e) {
        return e instanceof Boolean || typeof e == "boolean" || is_true(e) || is_false(e)
    }

    function is_true(e) {
        return e === !0 || e === "true"
    }

    function is_false(e) {
        return e === !1 || e === "false"
    }

    function is_percentage(e) {
        return is_string(e) && e.slice(-1) == "%"
    }

    function getTime() {
        return (new Date).getTime()
    }

    function deprecated(e, t) {
        debug(!0, e + " is DEPRECATED, support for it will be removed. Use " + t + " instead.")
    }

    function debug(e, t) {
        if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
            if (is_object(e)) {
                var n = " (" + e.selector + ")";
                e = e.debug
            } else var n = ""; if (!e) return !1;
            is_string(t) ? t = "carouFredSel" + n + ": " + t : t = ["carouFredSel" + n + ":", t], window.console.log(t)
        }
        return !1
    }
    if ($.fn.carouFredSel) return;
    $.fn.caroufredsel = $.fn.carouFredSel = function(options, configs) {
        if (this.length == 0) return debug(!0, 'No element found for "' + this.selector + '".'), this;
        if (this.length > 1) return this.each(function() {
            $(this).carouFredSel(options, configs)
        });
        var $cfs = this,
            $tt0 = this[0],
            starting_position = !1;
        $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
        var FN = {};
        FN._init = function(e, t, n) {
            e = go_getObject($tt0, e), e.items = go_getItemsObject($tt0, e.items), e.scroll = go_getScrollObject($tt0, e.scroll), e.auto = go_getAutoObject($tt0, e.auto), e.prev = go_getPrevNextObject($tt0, e.prev), e.next = go_getPrevNextObject($tt0, e.next), e.pagination = go_getPaginationObject($tt0, e.pagination), e.swipe = go_getSwipeObject($tt0, e.swipe), e.mousewheel = go_getMousewheelObject($tt0, e.mousewheel), t && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, e)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, e), opts.d = cf_getDimensions(opts), crsl.direction = opts.direction == "up" || opts.direction == "left" ? "next" : "prev";
            var r = $cfs.children(),
                i = ms_getParentSize($wrp, opts, "width");
            is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, i), opts.items = in_complementItems(opts.items, opts, r, n), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, r), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, r), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(i, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, i)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && opts.items.filter == "*" ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center" : !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(r, opts, 0))), opts.items.filter != "*" && !opts.items.visibleConf.variable && (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(r, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible;
            if (opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, r, i);
            else {
                opts.padding = cf_getPadding(opts.padding), opts.align == "top" ? opts.align = "left" : opts.align == "bottom" && (opts.align = "right");
                switch (opts.align) {
                    case "center":
                    case "left":
                    case "right":
                        opts[opts.d["width"]] != "variable" && (opts = in_getAlignPadding(opts, r), opts.usePadding = !0);
                        break;
                    default:
                        opts.align = !1, opts.usePadding = opts.padding[0] == 0 && opts.padding[1] == 0 && opts.padding[2] == 0 && opts.padding[3] == 0 ? !1 : !0
                }
            }
            is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || opts.items.filter != "*" ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
        }, FN._build = function() {
            $cfs.data("_cfs_isCarousel", !0);
            var e = $cfs.children(),
                t = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
                n = "relative";
            switch (t.position) {
                case "absolute":
                case "fixed":
                    n = t.position
            }
            conf.wrapper == "parent" ? sz_storeOrigCss($wrp) : $wrp.css(t), $wrp.css({
                overflow: "hidden",
                position: n
            }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", t.zIndex), $cfs.css({
                textAlign: "left",
                "float": "none",
                position: "absolute",
                top: 0,
                right: "auto",
                bottom: "auto",
                left: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }), sz_storeMargin(e, opts), sz_storeOrigCss(e), opts.responsive && sz_setResponsiveSizes(opts, e)
        }, FN._bind_events = function() {
            FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function(e, t) {
                return e.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), t)), !0
            }), $cfs.bind(cf_e("finish", conf), function(e) {
                return e.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0
            }), $cfs.bind(cf_e("pause", conf), function(e, t, n) {
                e.stopPropagation(), tmrs = sc_clearTimers(tmrs);
                if (t && crsl.isScrolling) {
                    scrl.isStopped = !0;
                    var r = getTime() - scrl.startTime;
                    scrl.duration -= r, scrl.pre && (scrl.pre.duration -= r), scrl.post && (scrl.post.duration -= r), sc_stopScroll(scrl, !1)
                }!crsl.isPaused && !crsl.isScrolling && n && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0;
                if (opts.auto.onTimeoutPause) {
                    var i = opts.auto.timeoutDuration - tmrs.timePassed,
                        s = 100 - Math.ceil(i * 100 / opts.auto.timeoutDuration);
                    opts.auto.onTimeoutPause.call($tt0, s, i)
                }
                return !0
            }), $cfs.bind(cf_e("play", conf), function(e, t, n, r) {
                e.stopPropagation(), tmrs = sc_clearTimers(tmrs);
                var i = [t, n, r],
                    s = ["string", "number", "boolean"],
                    o = cf_sortParams(i, s);
                t = o[0], n = o[1], r = o[2], t != "prev" && t != "next" && (t = crsl.direction), is_number(n) || (n = 0), is_boolean(r) || (r = !1), r && (crsl.isStopped = !1, opts.auto.play = !0);
                if (!opts.auto.play) return e.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
                crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
                var u = opts.auto.timeoutDuration + n;
                return dur2 = u - tmrs.timePassed, perc = 100 - Math.ceil(dur2 * 100 / u), opts.auto.progress && (tmrs.progress = setInterval(function() {
                    var e = getTime() - tmrs.startTime + tmrs.timePassed,
                        t = Math.ceil(e * 100 / u);
                    opts.auto.progress.updater.call(opts.auto.progress.bar[0], t)
                }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function() {
                    opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), t) : $cfs.trigger(cf_e(t, conf), opts.auto)
                }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
            }), $cfs.bind(cf_e("resume", conf), function(e) {
                return e.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0
            }), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function(e, obj, num, clb, que) {
                e.stopPropagation();
                if (crsl.isStopped || $cfs.is(":hidden")) return e.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
                var minimum = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
                if (minimum > itms.total) return e.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + minimum + " needed): Not scrolling.");
                var v = [obj, num, clb, que],
                    t = ["object", "number/string", "function", "boolean"],
                    a = cf_sortParams(v, t);
                obj = a[0], num = a[1], clb = a[2], que = a[3];
                var eType = e.type.slice(conf.events.prefix.length);
                if ($(eval("opts." + eType + ".button.selector")).hasClass("disabled")) return;
                is_object(obj) || (obj = {}), is_function(clb) && (obj.onAfter = clb), is_boolean(que) && (obj.queue = que), obj = $.extend(!0, {}, opts[eType], obj);
                if (obj.conditions && !obj.conditions.call($tt0, eType)) return e.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
                if (!is_number(num)) {
                    if (opts.items.filter != "*") num = "visible";
                    else {
                        var arr = [num, obj.items, opts[eType].items];
                        for (var a = 0, l = arr.length; a < l; a++)
                            if (is_number(arr[a]) || arr[a] == "page" || arr[a] == "visible") {
                                num = arr[a];
                                break
                            }
                    }
                    switch (num) {
                        case "page":
                            return e.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(eType + "Page", conf), [obj, clb]);
                        case "visible":
                            !opts.items.visibleConf.variable && opts.items.filter == "*" && (num = opts.items.visible)
                    }
                }
                if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [eType, [obj, num, clb]]), e.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
                if (obj.duration > 0 && crsl.isScrolling) return obj.queue && (obj.queue == "last" && (queu = []), (obj.queue != "first" || queu.length == 0) && $cfs.trigger(cf_e("queue", conf), [eType, [obj, num, clb]])), e.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
                tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + eType, conf), [obj, num]);
                if (opts.synchronise) {
                    var s = opts.synchronise,
                        c = [obj, num];
                    for (var j = 0, l = s.length; j < l; j++) {
                        var d = eType;
                        s[j][2] || (d = d == "prev" ? "next" : "prev"), s[j][1] || (c[0] = s[j][0].triggerHandler("_cfs_triggerEvent", ["configuration", d])), c[1] = num + s[j][3], s[j][0].trigger("_cfs_triggerEvent", ["slide_" + d, c])
                    }
                }
                return !0
            }), $cfs.bind(cf_e("slide_prev", conf), function(e, t, n) {
                e.stopPropagation();
                var r = $cfs.children();
                if (!opts.circular && itms.first == 0) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), e.stopImmediatePropagation();
                sz_resetMargin(r, opts);
                if (!is_number(n)) {
                    if (opts.items.visibleConf.variable) n = gn_getVisibleItemsPrev(r, opts, itms.total - 1);
                    else if (opts.items.filter != "*") {
                        var i = is_number(t.items) ? t.items : gn_getVisibleOrg($cfs, opts);
                        n = gn_getScrollItemsPrevFilter(r, opts, itms.total - 1, i)
                    } else n = opts.items.visible;
                    n = cf_getAdjust(n, opts, t.items, $tt0)
                }
                opts.circular || itms.total - n < itms.first && (n = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible;
                if (opts.items.visibleConf.variable) {
                    var s = cf_getItemsAdjust(gn_getVisibleItemsNext(r, opts, itms.total - n), opts, opts.items.visibleConf.adjust, $tt0);
                    opts.items.visible + n <= s && n < itms.total && (n++, s = cf_getItemsAdjust(gn_getVisibleItemsNext(r, opts, itms.total - n), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = s
                } else if (opts.items.filter != "*") {
                    var s = gn_getVisibleItemsNextFilter(r, opts, itms.total - n);
                    opts.items.visible = cf_getItemsAdjust(s, opts, opts.items.visibleConf.adjust, $tt0)
                }
                sz_resetMargin(r, opts, !0);
                if (n == 0) return e.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                debug(conf, "Scrolling " + n + " items backward."), itms.first += n, itms.last -= n;
                while (itms.first >= itms.total) itms.first -= itms.total;
                opts.circular || (itms.first == 0 && t.onEnd && t.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - n, itms.total).prependTo($cfs), itms.total < opts.items.visible + n && $cfs.children().slice(0, opts.items.visible + n - itms.total).clone(!0).appendTo($cfs);
                var r = $cfs.children(),
                    o = gi_getOldItemsPrev(r, opts, n),
                    u = gi_getNewItemsPrev(r, opts),
                    a = r.eq(n - 1),
                    f = o.last(),
                    l = u.last();
                sz_resetMargin(r, opts);
                var c = 0,
                    h = 0;
                if (opts.align) {
                    var p = cf_getAlignPadding(u, opts);
                    c = p[0], h = p[1]
                }
                var d = c < 0 ? opts.padding[opts.d[3]] : 0,
                    v = !1,
                    m = $();
                if (opts.items.visible < n) {
                    m = r.slice(opts.items.visibleConf.old, n);
                    if (t.fx == "directscroll") {
                        var g = opts.items[opts.d.width];
                        v = m, a = l, sc_hideHiddenItems(v), opts.items[opts.d.width] = "variable"
                    }
                }
                var y = !1,
                    b = ms_getTotalSize(r.slice(0, n), opts, "width"),
                    w = cf_mapWrapperSizes(ms_getSizes(u, opts, !0), opts, !opts.usePadding),
                    E = 0,
                    S = {}, x = {}, T = {}, N = {}, C = {}, k = {}, L = {}, A = sc_getDuration(t, opts, n, b);
                switch (t.fx) {
                    case "cover":
                    case "cover-fade":
                        E = ms_getTotalSize(r.slice(0, opts.items.visible), opts, "width")
                }
                v && (opts.items[opts.d.width] = g), sz_resetMargin(r, opts, !0), h >= 0 && sz_resetMargin(f, opts, opts.padding[opts.d[1]]), c >= 0 && sz_resetMargin(a, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = h, opts.padding[opts.d[3]] = c), k[opts.d.left] = -(b - d), L[opts.d.left] = -(E - d), x[opts.d.left] = w[opts.d.width];
                var O = function() {}, M = function() {}, _ = function() {}, D = function() {}, P = function() {}, H = function() {}, B = function() {}, j = function() {}, F = function() {}, I = function() {}, q = function() {};
                switch (t.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                    case "uncover":
                    case "uncover-fade":
                        y = $cfs.clone(!0).appendTo($wrp)
                }
                switch (t.fx) {
                    case "crossfade":
                    case "uncover":
                    case "uncover-fade":
                        y.children().slice(0, n).remove(), y.children().slice(opts.items.visibleConf.old).remove();
                        break;
                    case "cover":
                    case "cover-fade":
                        y.children().slice(opts.items.visible).remove(), y.css(L)
                }
                $cfs.css(k), scrl = sc_setScroll(A, t.easing, conf), S[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                if (opts[opts.d["width"]] == "variable" || opts[opts.d["height"]] == "variable") O = function() {
                    $wrp.css(w)
                }, M = function() {
                    scrl.anims.push([$wrp, w])
                };
                if (opts.usePadding) {
                    l.not(a).length && (T[opts.d.marginRight] = a.data("_cfs_origCssMargin"), c < 0 ? a.css(T) : (B = function() {
                        a.css(T)
                    }, j = function() {
                        scrl.anims.push([a, T])
                    }));
                    switch (t.fx) {
                        case "cover":
                        case "cover-fade":
                            y.children().eq(n - 1).css(T)
                    }
                    l.not(f).length && (N[opts.d.marginRight] = f.data("_cfs_origCssMargin"), _ = function() {
                        f.css(N)
                    }, D = function() {
                        scrl.anims.push([f, N])
                    }), h >= 0 && (C[opts.d.marginRight] = l.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], P = function() {
                        l.css(C)
                    }, H = function() {
                        scrl.anims.push([l, C])
                    })
                }
                q = function() {
                    $cfs.css(S)
                };
                var R = opts.items.visible + n - itms.total;
                I = function() {
                    R > 0 && ($cfs.children().slice(itms.total).remove(), o = $($cfs.children().slice(itms.total - (opts.items.visible - R)).get().concat($cfs.children().slice(0, R).get()))), sc_showHiddenItems(v);
                    if (opts.usePadding) {
                        var e = $cfs.children().eq(opts.items.visible + n - 1);
                        e.css(opts.d.marginRight, e.data("_cfs_origCssMargin"))
                    }
                };
                var U = sc_mapCallbackArguments(o, m, u, n, "prev", A, w);
                F = function() {
                    sc_afterScroll($cfs, y, t), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, t, "onAfter", U, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, t, "onBefore", U, clbk);
                switch (t.fx) {
                    case "none":
                        $cfs.css(S), O(), _(), P(), B(), q(), I(), F();
                        break;
                    case "fade":
                        scrl.anims.push([$cfs, {
                                opacity: 0
                            },
                            function() {
                                O(), _(), P(), B(), q(), I(), scrl = sc_setScroll(A, t.easing, conf), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    },
                                    F
                                ]), sc_startScroll(scrl, conf)
                            }
                        ]);
                        break;
                    case "crossfade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([y, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, {
                                opacity: 1
                            },
                            F
                        ]), M(), _(), P(), B(), q(), I();
                        break;
                    case "cover":
                        scrl.anims.push([y, S,
                            function() {
                                _(), P(), B(), q(), I(), F()
                            }
                        ]), M();
                        break;
                    case "cover-fade":
                        scrl.anims.push([$cfs, {
                            opacity: 0
                        }]), scrl.anims.push([y, S,
                            function() {
                                _(), P(), B(), q(), I(), F()
                            }
                        ]), M();
                        break;
                    case "uncover":
                        scrl.anims.push([y, x, F]), M(), _(), P(), B(), q(), I();
                        break;
                    case "uncover-fade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([$cfs, {
                            opacity: 1
                        }]), scrl.anims.push([y, x, F]), M(), _(), P(), B(), q(), I();
                        break;
                    default:
                        scrl.anims.push([$cfs, S,
                            function() {
                                I(), F()
                            }
                        ]), M(), D(), H(), j()
                }
                return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w]), !0
            }), $cfs.bind(cf_e("slide_next", conf), function(e, t, n) {
                e.stopPropagation();
                var r = $cfs.children();
                if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), e.stopImmediatePropagation();
                sz_resetMargin(r, opts);
                if (!is_number(n)) {
                    if (opts.items.filter != "*") {
                        var i = is_number(t.items) ? t.items : gn_getVisibleOrg($cfs, opts);
                        n = gn_getScrollItemsNextFilter(r, opts, 0, i)
                    } else n = opts.items.visible;
                    n = cf_getAdjust(n, opts, t.items, $tt0)
                }
                var s = itms.first == 0 ? itms.total : itms.first;
                if (!opts.circular) {
                    if (opts.items.visibleConf.variable) var o = gn_getVisibleItemsNext(r, opts, n),
                    i = gn_getVisibleItemsPrev(r, opts, s - 1);
                    else var o = opts.items.visible,
                    i = opts.items.visible;
                    n + o > s && (n = s - i)
                }
                opts.items.visibleConf.old = opts.items.visible;
                if (opts.items.visibleConf.variable) {
                    var o = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(r, opts, n, s), opts, opts.items.visibleConf.adjust, $tt0);
                    while (opts.items.visible - n >= o && n < itms.total) n++, o = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(r, opts, n, s), opts, opts.items.visibleConf.adjust, $tt0);
                    opts.items.visible = o
                } else if (opts.items.filter != "*") {
                    var o = gn_getVisibleItemsNextFilter(r, opts, n);
                    opts.items.visible = cf_getItemsAdjust(o, opts, opts.items.visibleConf.adjust, $tt0)
                }
                sz_resetMargin(r, opts, !0);
                if (n == 0) return e.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                debug(conf, "Scrolling " + n + " items forward."), itms.first -= n;
                while (itms.first < 0) itms.first += itms.total;
                opts.circular || (itms.first == opts.items.visible && t.onEnd && t.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + n && $cfs.children().slice(0, opts.items.visible + n - itms.total).clone(!0).appendTo($cfs);
                var r = $cfs.children(),
                    u = gi_getOldItemsNext(r, opts),
                    a = gi_getNewItemsNext(r, opts, n),
                    f = r.eq(n - 1),
                    l = u.last(),
                    c = a.last();
                sz_resetMargin(r, opts);
                var h = 0,
                    p = 0;
                if (opts.align) {
                    var d = cf_getAlignPadding(a, opts);
                    h = d[0], p = d[1]
                }
                var v = !1,
                    m = $();
                if (opts.items.visibleConf.old < n) {
                    m = r.slice(opts.items.visibleConf.old, n);
                    if (t.fx == "directscroll") {
                        var g = opts.items[opts.d.width];
                        v = m, f = l, sc_hideHiddenItems(v), opts.items[opts.d.width] = "variable"
                    }
                }
                var y = !1,
                    b = ms_getTotalSize(r.slice(0, n), opts, "width"),
                    w = cf_mapWrapperSizes(ms_getSizes(a, opts, !0), opts, !opts.usePadding),
                    E = 0,
                    S = {}, x = {}, T = {}, N = {}, C = {}, k = sc_getDuration(t, opts, n, b);
                switch (t.fx) {
                    case "uncover":
                    case "uncover-fade":
                        E = ms_getTotalSize(r.slice(0, opts.items.visibleConf.old), opts, "width")
                }
                v && (opts.items[opts.d.width] = g), opts.align && opts.padding[opts.d[1]] < 0 && (opts.padding[opts.d[1]] = 0), sz_resetMargin(r, opts, !0), sz_resetMargin(l, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = p, opts.padding[opts.d[3]] = h), C[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                var L = function() {}, A = function() {}, O = function() {}, M = function() {}, _ = function() {}, D = function() {}, P = function() {}, H = function() {}, B = function() {};
                switch (t.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                    case "uncover":
                    case "uncover-fade":
                        y = $cfs.clone(!0).appendTo($wrp), y.children().slice(opts.items.visibleConf.old).remove()
                }
                switch (t.fx) {
                    case "crossfade":
                    case "cover":
                    case "cover-fade":
                        $cfs.css("zIndex", 1), y.css("zIndex", 0)
                }
                scrl = sc_setScroll(k, t.easing, conf), S[opts.d.left] = -b, x[opts.d.left] = -E, h < 0 && (S[opts.d.left] += h);
                if (opts[opts.d["width"]] == "variable" || opts[opts.d["height"]] == "variable") L = function() {
                    $wrp.css(w)
                }, A = function() {
                    scrl.anims.push([$wrp, w])
                };
                if (opts.usePadding) {
                    var j = c.data("_cfs_origCssMargin");
                    p >= 0 && (j += opts.padding[opts.d[1]]), c.css(opts.d.marginRight, j), f.not(l).length && (N[opts.d.marginRight] = l.data("_cfs_origCssMargin")), O = function() {
                        l.css(N)
                    }, M = function() {
                        scrl.anims.push([l, N])
                    };
                    var F = f.data("_cfs_origCssMargin");
                    h > 0 && (F += opts.padding[opts.d[3]]), T[opts.d.marginRight] = F, _ = function() {
                        f.css(T)
                    }, D = function() {
                        scrl.anims.push([f, T])
                    }
                }
                B = function() {
                    $cfs.css(C)
                };
                var I = opts.items.visible + n - itms.total;
                H = function() {
                    I > 0 && $cfs.children().slice(itms.total).remove();
                    var e = $cfs.children().slice(0, n).appendTo($cfs).last();
                    I > 0 && (a = gi_getCurrentItems(r, opts)), sc_showHiddenItems(v);
                    if (opts.usePadding) {
                        if (itms.total < opts.items.visible + n) {
                            var t = $cfs.children().eq(opts.items.visible - 1);
                            t.css(opts.d.marginRight, t.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
                        }
                        e.css(opts.d.marginRight, e.data("_cfs_origCssMargin"))
                    }
                };
                var q = sc_mapCallbackArguments(u, m, a, n, "next", k, w);
                P = function() {
                    $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, y, t), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, t, "onAfter", q, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, t, "onBefore", q, clbk);
                switch (t.fx) {
                    case "none":
                        $cfs.css(S), L(), O(), _(), B(), H(), P();
                        break;
                    case "fade":
                        scrl.anims.push([$cfs, {
                                opacity: 0
                            },
                            function() {
                                L(), O(), _(), B(), H(), scrl = sc_setScroll(k, t.easing, conf), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    },
                                    P
                                ]), sc_startScroll(scrl, conf)
                            }
                        ]);
                        break;
                    case "crossfade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([y, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, {
                                opacity: 1
                            },
                            P
                        ]), A(), O(), _(), B(), H();
                        break;
                    case "cover":
                        $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, C, P]), A(), O(), _(), H();
                        break;
                    case "cover-fade":
                        $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([y, {
                            opacity: 0
                        }]), scrl.anims.push([$cfs, C, P]), A(), O(), _(), H();
                        break;
                    case "uncover":
                        scrl.anims.push([y, x, P]), A(), O(), _(), B(), H();
                        break;
                    case "uncover-fade":
                        $cfs.css({
                            opacity: 0
                        }), scrl.anims.push([$cfs, {
                            opacity: 1
                        }]), scrl.anims.push([y, x, P]), A(), O(), _(), B(), H();
                        break;
                    default:
                        scrl.anims.push([$cfs, S,
                            function() {
                                B(), H(), P()
                            }
                        ]), A(), M(), D()
                }
                return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w]), !0
            }), $cfs.bind(cf_e("slideTo", conf), function(e, t, n, r, i, s, o) {
                e.stopPropagation();
                var u = [t, n, r, i, s, o],
                    a = ["string/number/object", "number", "boolean", "object", "string", "function"],
                    f = cf_sortParams(u, a);
                return i = f[3], s = f[4], o = f[5], t = gn_getItemIndex(f[0], f[1], f[2], itms, $cfs), t == 0 ? !1 : (is_object(i) || (i = !1), s != "prev" && s != "next" && (opts.circular ? s = t <= itms.total / 2 ? "next" : "prev" : s = itms.first == 0 || itms.first > t ? "next" : "prev"), s == "prev" && (t = itms.total - t), $cfs.trigger(cf_e(s, conf), [i, t, o]), !0)
            }), $cfs.bind(cf_e("prevPage", conf), function(e, t, n) {
                e.stopPropagation();
                var r = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [r - 1, t, "prev", n])
            }), $cfs.bind(cf_e("nextPage", conf), function(e, t, n) {
                e.stopPropagation();
                var r = $cfs.triggerHandler(cf_e("currentPage", conf));
                return $cfs.triggerHandler(cf_e("slideToPage", conf), [r + 1, t, "next", n])
            }), $cfs.bind(cf_e("slideToPage", conf), function(e, t, n, r, i) {
                e.stopPropagation(), is_number(t) || (t = $cfs.triggerHandler(cf_e("currentPage", conf)));
                var s = opts.pagination.items || opts.items.visible,
                    o = Math.ceil(itms.total / s) - 1;
                return t < 0 && (t = o), t > o && (t = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [t * s, 0, !0, n, r, i])
            }), $cfs.bind(cf_e("jumpToStart", conf), function(e, t) {
                e.stopPropagation(), t ? t = gn_getItemIndex(t, 0, !0, itms, $cfs) : t = 0, t += itms.first;
                if (t != 0) {
                    if (itms.total > 0)
                        while (t > itms.total) t -= itms.total;
                    $cfs.prepend($cfs.children().slice(t, itms.total))
                }
                return !0
            }), $cfs.bind(cf_e("synchronise", conf), function(e, t) {
                e.stopPropagation();
                if (t) t = cf_getSynchArr(t);
                else {
                    if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
                    t = opts.synchronise
                }
                var n = $cfs.triggerHandler(cf_e("currentPosition", conf)),
                    r = !0;
                for (var i = 0, s = t.length; i < s; i++) t[i][0].triggerHandler(cf_e("slideTo", conf), [n, t[i][3], !0]) || (r = !1);
                return r
            }), $cfs.bind(cf_e("queue", conf), function(e, t, n) {
                return e.stopPropagation(), is_function(t) ? t.call($tt0, queu) : is_array(t) ? queu = t : is_undefined(t) || queu.push([t, n]), queu
            }), $cfs.bind(cf_e("insertItem", conf), function(e, t, n, r, i) {
                e.stopPropagation();
                var s = [t, n, r, i],
                    o = ["string/object", "string/number/object", "boolean", "number"],
                    u = cf_sortParams(s, o);
                t = u[0], n = u[1], r = u[2], i = u[3], is_object(t) && !is_jquery(t) ? t = $(t) : is_string(t) && (t = $(t));
                if (!is_jquery(t) || t.length == 0) return debug(conf, "Not a valid object.");
                is_undefined(n) && (n = "end"), sz_storeMargin(t, opts), sz_storeOrigCss(t);
                var a = n,
                    f = "before";
                n == "end" ? r ? (itms.first == 0 ? (n = itms.total - 1, f = "after") : (n = itms.first, itms.first += t.length), n < 0 && (n = 0)) : (n = itms.total - 1, f = "after") : n = gn_getItemIndex(n, i, r, itms, $cfs);
                var l = $cfs.children().eq(n);
                return l.length ? l[f](t) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(t)), a != "end" && !r && n < itms.first && (itms.first += t.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
            }), $cfs.bind(cf_e("removeItem", conf), function(e, t, n, r) {
                e.stopPropagation();
                var i = [t, n, r],
                    s = ["string/number/object", "boolean", "number"],
                    o = cf_sortParams(i, s);
                t = o[0], n = o[1], r = o[2];
                var u = !1;
                if (t instanceof $ && t.length > 1) return a = $(), t.each(function(e, t) {
                    var i = $cfs.trigger(cf_e("removeItem", conf), [$(this), n, r]);
                    i && (a = a.add(i))
                }), a;
                if (is_undefined(t) || t == "end") a = $cfs.children().last();
                else {
                    t = gn_getItemIndex(t, r, n, itms, $cfs);
                    var a = $cfs.children().eq(t);
                    a.length && t < itms.first && (itms.first -= a.length)
                }
                return a && a.length && (a.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), a
            }), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function(e, t) {
                e.stopPropagation();
                var n = e.type.slice(conf.events.prefix.length);
                return is_array(t) && (clbk[n] = t), is_function(t) && clbk[n].push(t), clbk[n]
            }), $cfs.bind(cf_e("currentPosition", conf), function(e, t) {
                e.stopPropagation();
                if (itms.first == 0) var n = 0;
                else var n = itms.total - itms.first;
                return is_function(t) && t.call($tt0, n), n
            }), $cfs.bind(cf_e("currentPage", conf), function(e, t) {
                e.stopPropagation();
                var n = opts.pagination.items || opts.items.visible,
                    r = Math.ceil(itms.total / n - 1),
                    i;
                return itms.first == 0 ? i = 0 : itms.first < itms.total % n ? i = 0 : itms.first == n && !opts.circular ? i = r : i = Math.round((itms.total - itms.first) / n), i < 0 && (i = 0), i > r && (i = r), is_function(t) && t.call($tt0, i), i
            }), $cfs.bind(cf_e("currentVisible", conf), function(e, t) {
                e.stopPropagation();
                var n = gi_getCurrentItems($cfs.children(), opts);
                return is_function(t) && t.call($tt0, n), n
            }), $cfs.bind(cf_e("slice", conf), function(e, t, n, r) {
                e.stopPropagation();
                if (itms.total == 0) return !1;
                var i = [t, n, r],
                    s = ["number", "number", "function"],
                    o = cf_sortParams(i, s);
                t = is_number(o[0]) ? o[0] : 0, n = is_number(o[1]) ? o[1] : itms.total, r = o[2], t += itms.first, n += itms.first;
                if (items.total > 0) {
                    while (t > itms.total) t -= itms.total;
                    while (n > itms.total) n -= itms.total;
                    while (t < 0) t += itms.total;
                    while (n < 0) n += itms.total
                }
                var u = $cfs.children(),
                    a;
                return n > t ? a = u.slice(t, n) : a = $(u.slice(t, itms.total).get().concat(u.slice(0, n).get())), is_function(r) && r.call($tt0, a), a
            }), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function(e, t) {
                e.stopPropagation();
                var n = e.type.slice(conf.events.prefix.length),
                    r = crsl[n];
                return is_function(t) && t.call($tt0, r), r
            }), $cfs.bind(cf_e("configuration", conf), function(e, a, b, c) {
                e.stopPropagation();
                var reInit = !1;
                if (is_function(a)) a.call($tt0, opts);
                else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a);
                else if (!is_undefined(a))
                    if (is_function(b)) {
                        var val = eval("opts." + a);
                        is_undefined(val) && (val = ""), b.call($tt0, val)
                    } else {
                        if ( !! is_undefined(b)) return eval("opts." + a);
                        typeof c != "boolean" && (c = !0), eval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : eval("opts." + a + " = b")
                    }
                if (reInit) {
                    sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
                    var sz = sz_setSizes($cfs, opts);
                    $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
                }
                return opts
            }), $cfs.bind(cf_e("linkAnchors", conf), function(e, t, n) {
                return e.stopPropagation(), is_undefined(t) ? t = $("body") : is_string(t) && (t = $(t)), !is_jquery(t) || t.length == 0 ? debug(conf, "Not a valid object.") : (is_string(n) || (n = "a.caroufredsel"), t.find(n).each(function() {
                    var e = this.hash || "";
                    e.length > 0 && $cfs.children().index($(e)) != -1 && $(this).unbind("click").click(function(t) {
                        t.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), e)
                    })
                }), !0)
            }), $cfs.bind(cf_e("updatePageStatus", conf), function(e, t, n) {
                e.stopPropagation();
                if (!opts.pagination.container) return;
                var r = opts.pagination.items || opts.items.visible,
                    i = Math.ceil(itms.total / r);
                t && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
                    for (var e = 0; e < i; e++) {
                        var t = $cfs.children().eq(gn_getItemIndex(e * r, 0, !0, itms, $cfs));
                        $(this).append(opts.pagination.anchorBuilder.call(t[0], e + 1))
                    }
                })), opts.pagination.container.each(function() {
                    $(this).children().unbind(opts.pagination.event).each(function(e) {
                        $(this).bind(opts.pagination.event, function(t) {
                            t.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [e * r, -opts.pagination.deviation, !0, opts.pagination])
                        })
                    })
                }));
                var s = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
                return s >= i && (s = 0), s < 0 && (s = i - 1), opts.pagination.container.each(function() {
                    $(this).children().removeClass(cf_c("selected", conf)).eq(s).addClass(cf_c("selected", conf))
                }), !0
            }), $cfs.bind(cf_e("updateSizes", conf), function(e) {
                var t = opts.items.visible,
                    n = $cfs.children(),
                    r = ms_getParentSize($wrp, opts, "width");
                itms.total = n.length, crsl.primarySizePercentage ? (opts.maxDimension = r, opts[opts.d.width] = ms_getPercentage(r, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, r), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, n, r), t = opts.items.visible, sz_setResponsiveSizes(opts, n)) : opts.items.visibleConf.variable ? t = gn_getVisibleItemsNext(n, opts, 0) : opts.items.filter != "*" && (t = gn_getVisibleItemsNextFilter(n, opts, 0));
                if (!opts.circular && itms.first != 0 && t > itms.first) {
                    if (opts.items.visibleConf.variable) var i = gn_getVisibleItemsPrev(n, opts, itms.first) - itms.first;
                    else if (opts.items.filter != "*") var i = gn_getVisibleItemsPrevFilter(n, opts, itms.first) - itms.first;
                    else var i = opts.items.visible - itms.first;
                    debug(conf, "Preventing non-circular: sliding " + i + " items backward."), $cfs.trigger(cf_e("prev", conf), i)
                }
                opts.items.visible = cf_getItemsAdjust(t, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, n);
                var s = sz_setSizes($cfs, opts);
                return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, s]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), s
            }), $cfs.bind(cf_e("destroy", conf), function(e, t) {
                return e.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), t && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), conf.wrapper == "parent" ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0
            }), $cfs.bind(cf_e("debug", conf), function(e) {
                return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug
            }), $cfs.bind("_cfs_triggerEvent", function(e, t, n) {
                return e.stopPropagation(), $cfs.triggerHandler(cf_e(t, conf), n)
            })
        }, FN._unbind_events = function() {
            $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent")
        }, FN._bind_buttons = function() {
            FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf);
            if (opts.auto.pauseOnHover) {
                var e = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                $wrp.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), e)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }
            opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function(e) {
                e.preventDefault();
                var t = !1,
                    n = null;
                crsl.isPaused ? t = "play" : opts.auto.pauseOnEvent && (t = "pause", n = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), t && $cfs.trigger(cf_e(t, conf), n)
            });
            if (opts.prev.button) {
                opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function(e) {
                    e.preventDefault(), $cfs.trigger(cf_e("prev", conf))
                });
                if (opts.prev.pauseOnHover) {
                    var e = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                    opts.prev.button.bind(cf_e("mouseenter", conf, !1), function() {
                        $cfs.trigger(cf_e("pause", conf), e)
                    }).bind(cf_e("mouseleave", conf, !1), function() {
                        $cfs.trigger(cf_e("resume", conf))
                    })
                }
            }
            if (opts.next.button) {
                opts.next.button.bind(cf_e(opts.next.event, conf, !1), function(e) {
                    e.preventDefault(), $cfs.trigger(cf_e("next", conf))
                });
                if (opts.next.pauseOnHover) {
                    var e = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                    opts.next.button.bind(cf_e("mouseenter", conf, !1), function() {
                        $cfs.trigger(cf_e("pause", conf), e)
                    }).bind(cf_e("mouseleave", conf, !1), function() {
                        $cfs.trigger(cf_e("resume", conf))
                    })
                }
            }
            if (opts.pagination.container && opts.pagination.pauseOnHover) {
                var e = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function() {
                    $cfs.trigger(cf_e("pause", conf), e)
                }).bind(cf_e("mouseleave", conf, !1), function() {
                    $cfs.trigger(cf_e("resume", conf))
                })
            }(opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(e) {
                var t = e.keyCode;
                t == opts.next.key && (e.preventDefault(), $cfs.trigger(cf_e("next", conf))), t == opts.prev.key && (e.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
            }), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(e) {
                var t = e.keyCode;
                t >= 49 && t < 58 && (t = (t - 49) * opts.items.visible, t <= itms.total && (e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [t, 0, !0, opts.pagination])))
            });
            if ($.fn.swipe) {
                var t = "ontouchstart" in window;
                if (t && opts.swipe.onTouch || !t && opts.swipe.onMouse) {
                    var n = $.extend(!0, {}, opts.prev, opts.swipe),
                        r = $.extend(!0, {}, opts.next, opts.swipe),
                        i = function() {
                            $cfs.trigger(cf_e("prev", conf), [n])
                        }, s = function() {
                            $cfs.trigger(cf_e("next", conf), [r])
                        };
                    switch (opts.direction) {
                        case "up":
                        case "down":
                            opts.swipe.options.swipeUp = s, opts.swipe.options.swipeDown = i;
                            break;
                        default:
                            opts.swipe.options.swipeLeft = s, opts.swipe.options.swipeRight = i
                    }
                    crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0
                }
            }
            if ($.fn.mousewheel && opts.mousewheel) {
                var o = $.extend(!0, {}, opts.prev, opts.mousewheel),
                    u = $.extend(!0, {}, opts.next, opts.mousewheel);
                crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function(e, t) {
                    e.preventDefault(), t > 0 ? $cfs.trigger(cf_e("prev", conf), [o]) : $cfs.trigger(cf_e("next", conf), [u])
                }), crsl.mousewheel = !0
            }
            opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay);
            if (crsl.upDateOnWindowResize) {
                var a = function(e) {
                    $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf))
                }, f = $(window),
                    l = null;
                if ($.debounce && conf.onWindowResize == "debounce") l = $.debounce(200, a);
                else if ($.throttle && conf.onWindowResize == "throttle") l = $.throttle(300, a);
                else {
                    var c = 0,
                        h = 0;
                    l = function() {
                        var e = f.width(),
                            t = f.height();
                        if (e != c || t != h) a(), c = e, h = t
                    }
                }
                f.bind(cf_e("resize", conf, !1, !0, !0), l)
            }
        }, FN._unbind_buttons = function() {
            var e = cf_e("", conf),
                t = cf_e("", conf, !1);
            ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(t), opts.auto.button && opts.auto.button.unbind(t), opts.prev.button && opts.prev.button.unbind(t), opts.next.button && opts.next.button.unbind(t), opts.pagination.container && (opts.pagination.container.unbind(t), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
        }, is_boolean(configs) && (configs = {
            debug: configs
        });
        var crsl = {
            direction: "next",
            isPaused: !0,
            isScrolling: !1,
            isStopped: !1,
            mousewheel: !1,
            swipe: !1
        }, itms = {
                total: $cfs.children().length,
                first: 0,
                last: $cfs.children().length - 1
            }, tmrs = {
                auto: null,
                progress: null,
                startTime: getTime(),
                timePassed: 0
            }, scrl = {
                isStopped: !1,
                duration: 0,
                startTime: 0,
                easing: "",
                anims: []
            }, clbk = {
                onBefore: [],
                onAfter: []
            }, queu = [],
            conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
            opts = {}, opts_orig = $.extend(!0, {}, options),
            $wrp = conf.wrapper == "parent" ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
        conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons();
        if (is_array(opts.items.start)) var start_arr = opts.items.start;
        else {
            var start_arr = [];
            opts.items.start != 0 && start_arr.push(opts.items.start)
        }
        opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10));
        if (start_arr.length > 0)
            for (var a = 0, l = start_arr.length; a < l; a++) {
                var s = start_arr[a];
                if (s == 0) continue;
                if (s === !0) {
                    s = window.location.hash;
                    if (s.length < 1) continue
                } else s === "random" && (s = Math.floor(Math.random() * itms.total)); if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {
                    fx: "none"
                }])) break
            }
        var siz = sz_setSizes($cfs, opts),
            itm = gi_getCurrentItems($cfs.children(), opts);
        return opts.onCreate && opts.onCreate.call($tt0, {
            width: siz.width,
            height: siz.height,
            items: itm
        }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
    }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
        synchronise: !1,
        infinite: !0,
        circular: !0,
        responsive: !1,
        direction: "left",
        visibleItemCount: 0,
        items: {
            start: 0
        },
        scroll: {
            easing: "swing",
            duration: 500,
            pauseOnHover: !1,
            event: "click",
            queue: !1
        }
    }, $.fn.carouFredSel.configs = {
        debug: !1,
        transition: !1,
        onWindowResize: "throttle",
        events: {
            prefix: "",
            namespace: "cfs"
        },
        wrapper: {
            element: "div",
            classname: "caroufredsel_wrapper"
        },
        classnames: {}
    }, $.fn.carouFredSel.pageAnchorBuilder = function(e) {
        return '<a href="#"><span>' + e + "</span></a>"
    }, $.fn.carouFredSel.progressbarUpdater = function(e) {
        $(this).css("width", e + "%")
    }, $.fn.carouFredSel.cookie = {
        get: function(e) {
            e += "=";
            var t = document.cookie.split(";");
            for (var n = 0, r = t.length; n < r; n++) {
                var i = t[n];
                while (i.charAt(0) == " ") i = i.slice(1);
                if (i.indexOf(e) == 0) return i.slice(e.length)
            }
            return 0
        },
        set: function(e, t, n) {
            var r = "";
            if (n) {
                var i = new Date;
                i.setTime(i.getTime() + n * 24 * 60 * 60 * 1e3), r = "; expires=" + i.toGMTString()
            }
            document.cookie = e + "=" + t + r + "; path=/"
        },
        remove: function(e) {
            $.fn.carouFredSel.cookie.set(e, "", -1)
        }
    }, $.extend($.easing, {
        quadratic: function(e) {
            var t = e * e;
            return e * (-t * e + 4 * t - 6 * e + 4)
        },
        cubic: function(e) {
            return e * (4 * e * e - 9 * e + 6)
        },
        elastic: function(e) {
            var t = e * e;
            return e * (33 * t * t - 106 * t * e + 126 * t - 67 * e + 15)
        }
    })
}(jQuery), define("com/external/jquery.carouFredSel-6.2.1", function() {}), define("com/es/widgets/assessment/AssesmentLang", ["com/es/widgets/WidgetUtils"], function(e) {
    var t = {
        langGlobalObj: "AssesmentLang",
        fileName: "assesmentStrings.json"
    };
    return e.setLangCode(t.langGlobalObj, t.fileName), !1
}), define("com/es/widgets/assessment/AppConst", [], function() {
    var e = {
        VERSION: "1.0.6.3",
        ANIMATE_FORWARD: "forward",
        ANIMATE_BACKWARD: "reverse",
        QUESTION_SCREEN: "QuestionScreen",
        QUESTION_PLAYER: "questionPlayer",
        QUESTION_TYPE_FIB: "FIB",
        QUESTION_TYPE_REORDERING: "REORDERING",
        QUESTION_TYPE_LABELLING: "LABELLING",
        QUESTION_TYPE_MCQ: "MCQ",
        QUESTION_TYPE_MATCHSORT: "MATCHSORT",
        QUESTION_TYPE_GROUPING: "GROUPING",
        QUESTION_TYPE_IMAGE: "IMAGE",
        QUESTION_TYPE_SPEAKING: "SPEAKING",
        QUESTION_TYPE_CROSSWORD: "CROSSWORD",
        QUESTION_TYPE_FIBTABLE: "FIBTABLE",
        QUESTION_TYPE_OPENTEXT: "OPENTEXT",
        RESPONSE_TYPE_PICKER: "PICKER",
        RESPONSE_INSTRUCTION_TEXT: "TEXT",
        RESPONSE_TYPE_BUTTON: "BUTTON",
        RESPONSE_TYPE_DRAG: "DRAGDROP",
        RESPONSE_TYPE_TEXT: "TEXT",
        RESPONSE_TYPE_BINARY: "BINARY",
        RESPONSE_TYPE_SET: "SET",
        RESPONSE_TYPE_TAPPLACE: "TAPPLACE",
        RESULT_SCREEN: "resultsScreen",
        RESOURCE_SCREEN: "resourceScreen",
        WELCOME_SCREEN: "splashScreen",
        LAYOUT_HORIZONTAL: "HORIZONTAL",
        ASSETS_PATH: "",
        DEF_PREFIX: "PRE_",
        POPQ: !0,
        ASSESSMENT_BTNS_DIV: "assessmentBtnsContainer",
        REVIEW_BTNS_DIV: "reviewBtnsContainer",
        QBTN_RESET: "resetQBtn",
        QBTN_ANSWERS: "answersBtn",
        QBTN_CLUES: "activityCluesBtn",
        QBTN_EVALUATE: "evaluateBtn",
        QBTN_CORRECT_ANS: "correctAnsBtn",
        QBTN_USER_ANS: "userAnsBtn",
        TOOLBAR_DEFAULT: "default",
        TOOLBAR_ACTIVE: "active",
        TOOLBAR_LOCKED: "locked",
        TOOLBAR_DISABLED: "disabled",
        TOOLBAR_RESET: "reset",
        TOOLBAR_REVIEW_CORRECT: "review_correct",
        TOOLBAR_REVIEW_USER: "review_user",
        QUESTION_VIEW_FIB: "FIB_",
        QUESTION_VIEW_FIB_TEXT: "FIB__text",
        QUESTION_VIEW_FIB_IMAGE: "FIB__image",
        QUESTION_VIEW_FIB_2COL: "FIB_2COL_image",
        QUESTION_VIEW_FIB_VERTICAL: "FIB__VERTICAL",
        QUESTION_VIEW_FIB_IMAGE_VERTICAL: "FIB__image_VERTICAL",
        QUESTION_VIEW_FIB_GAP: "FIB_GAP",
        QUESTION_VIEW_FIB_GAP_2COL: "FIB_2COL_text",
        QUESTION_VIEW_FIB_GAP_2COL_IMAGE: "FIB_2COL_image",
        QUESTION_VIEW_FIB_GAP_2COL_IMAGE_TEXT: "FIB_2COL_image_text",
        QUESTION_VIEW_FIB_GAP_2COL_AUDIO: "FIB_2COL_audio",
        QUESTION_VIEW_FIB_GAP_2COL_AUDIO_TEXT: "FIB_2COL_audio_text",
        QUESTION_VIEW_REORDERING: "REORDERING_HORIZONTAL",
        QUESTION_VIEW_REORDERING_VERTICAL: "REORDERING_",
        QUESTION_VIEW_LABELLING: "LABELLING_",
        QUESTION_VIEW_MCQ: "MCQ_",
        QUESTION_VIEW_MCQ_2COL: "MCQ_2COL",
        QUESTION_VIEW_MCQ_TEXT: "MCQ__text",
        QUESTION_VIEW_MCQ_IMAGE: "MCQ__image",
        QUESTION_VIEW_MCQ_SOUND: "MCQ__audio",
        QUESTION_VIEW_MATCHSORT_VERTICAL: "MATCHSORT_",
        QUESTION_VIEW_GROUPING: "GROUPING_",
        QUESTION_VIEW_IMAGE: "IMAGE_",
        QUESTION_VIEW_FIBDROPDOWN: "FIBDROPDOWN_",
        QUESTION_VIEW_BINARY: "MCQ__BINARY",
        QUESTION_VIEW_BINARY_TABLE: "FIBTABLE_",
        QUESTION_VIEW_OPENTEXT: "OPENTEXT_",
        QUESTION_VIEW_UK2: "UK_2",
        QUESTION_VIEW_UK3: "UK_3",
        QUESTION_INSTRUCTION_FIB: "instructions/gapfillbuttondefaultwttext.png",
        QUESTION_INSTRUCTION_FIB_TEXT: "instructions/gapfilldefaulttext.png",
        QUESTION_INSTRUCTION_FIB_IMAGE: "instructions/mcqbuttondefaultwtimage.png",
        QUESTION_INSTRUCTION_FIB_GAP_2COL_IMAGE_TEXT: "instructions/gapfilldefaulttext.png",
        QUESTION_INSTRUCTION_FIB_2COL: "instructions/gapfill2colwtimage.png",
        QUESTION_INSTRUCTION_FIB_VERTICAL: "instructions/gapfillpicker.png",
        QUESTION_INSTRUCTION_FIB_IMAGE_VERTICAL: "instructions/gapfillpickerimage.png",
        QUESTION_INSTRUCTION_FIB_GAP: "instructions/gapfilldefaulttext.png",
        QUESTION_INSTRUCTION_FIB_GAP_2COL: "instructions/gapfilldefaulttext.png",
        QUESTION_INSTRUCTION_FIB_GAP_2COL_IMAGE: "instructions/gapfilldefaulttext.png",
        QUESTION_INSTRUCTION_FIB_GAP_2COL_AUDIO: "instructions/gapfillbutton2columnwtaudio.png",
        QUESTION_INSTRUCTION_FIB_GAP_2COL_AUDIO_TEXT: "instructions/gapfill2colwt-audio.png",
        QUESTION_TYPE_FIB_DROPDOWN: "FIBDROPDOWN",
        QUESTION_INSTRUCTION_REORDERING: "instructions/reordering(horizontal).png",
        QUESTION_INSTRUCTION_REORDERING_VERTICAL: "instructions/re-ordering(vertical).png",
        QUESTION_INSTRUCTION_LABELLING: "instructions/textlabelling.png",
        QUESTION_INSTRUCTION_MCQ: "instructions/mcqbuttondefaultwtimage.png",
        QUESTION_INSTRUCTION_MCQ_2COL: "instructions/mcqbutton2colwtimage.png",
        QUESTION_INSTRUCTION_MCQ_TEXT: "instructions/mcqbuttondefaultwtimage.png",
        QUESTION_INSTRUCTION_MCQ_TEXT_PICKER: "instructions/mcqpicker.png",
        QUESTION_INSTRUCTION_MCQ_IMAGE: "instructions/mcqbuttondefaultwtimage.png",
        QUESTION_INSTRUCTION_MCQ_SOUND: "instructions/mcqbuttondefaultaudio.png",
        QUESTION_INSTRUCTION_MATCHSORT_VERTICAL: "instructions/matchingvertical.png",
        QUESTION_INSTRUCTION_GROUPING: "instructions/groupingquestion.png",
        QUESTION_INSTRUCTION_FIBDROPDOWN: "instructions/fibdropdown.png",
        QUESTION_INSTRUCTION_BINARY: "instructions/binary.png",
        QUESTION_INSTRUCTION_BINARY_TABLE: "instructions/fibtablebinary.png",
        QUESTION_INSTRUCTION_OPENTEXT: "instructions/opentext.png",
        TOOLBAR_SPEAKING: "speaking_locked",
        TOOLBAR_SPEAKING_ACTIVE: "speaking",
        CORRECT: "correct",
        INCORRECT: "incorrect",
        PARTIAL: "partial",
        LANDSCAPE: "90",
        PORTRAIT: "0",
        ORIENTATION_ALERT_TEXT: "This device does not support landscape orientation. Please use only portrait orientation.",
        MATCHING_RIGHTSIDE: "rightside",
        MATCHING_BOTH: "both",
        CROSSWORD_AUTO_POPULATE: !0,
        REORDERING_TAP_PLACE: "tapplace",
        REORDERING_DRAG_DROP: "dragdrop",
        DROPDOWN_SPINNINGWHEEL: "spinningwheel",
        DROPDOWN_NATIVE: "native",
        FIB_REMOVE_OPTIONS: "removeoptions",
        FIB_MAINTAIN_OPTIONS: "maintainoptions",
        DEFAULT_TOASTER_DURATION: 1500,
        INCOMPLETE_TEST_REPORT_CLICK_MSG: "You have missed a question. You must complete all of the questions before proceeding.",
        URL_CHANGE_MSG: "Are you sure you want to leave this page?",
        MODE: "normal",
        USERID: "1",
        SAMSID: "9781444116526",
        UserToken: "{31180698-287f-4043-a076-ccc7efc30bed}",
        COMPLETE: "complete",
        NO_ATTEMPT: "noattempted"
    };
    return e
}), define("com/es/widgets/assessment/assessEvent", [], function() {
    var e = {
        SCREEN_READY: "screenReady",
        TEMPLATE_READY: "templateReady",
        ASSESSMENT_INITIATED: "assessmentInitiated",
        QUESTION_RENDERED: "onQuestionRenderd",
        QUESTION_EVALUATED: "onQuestionEvaluated",
        GET_QUESTIONDATA: "getQuestionData",
        REVIEW_QUESTION: "reviewAssessment",
        QUESTION_RESET: "onQuestionReset",
        HINT_SHOWED: "onHintShowed",
        ANSWER_SHOWED: "onAnswerShowed",
        ASSESSMENT_COMPLETED: "assessmentCompleted",
        RESPONSE_SAVED: "onResponseSaved",
        RESULT_SHOWED: "onResultShowed",
        CONFIG_SET: "onConfigSet",
        CONTROLS_DISABLED: "onControlsDisabled",
        CONTROLS_ENABLED: "onControlsEnabled",
        MARK_CORRECT: "markCorrect",
        MARK_INCORRECT: "markIncorrect",
        MARK_ANSWER: "markAnswer",
        SAVE_RESPONSE: "saveResponse",
        ANSWER_MARKED: "answerMarked",
        CONTINUE_ASSESSMENT: "continueAssessment",
        CLICK: String(document.documentElement.ontouchmove) != "undefined" ? "touchstart" : "click",
        UPDATE_RESPONSE: "updateResponse",
        CHANGETOOLBARMODE: "onChangeToolbarMode",
        MARK_EMPTY: "markEmpty",
        QUIT_RESULT: "quitResult",
        CHANGE: "change",
        KEYPRESS: "keypress",
        KEYDOWN: "keydown",
        KEYUP: "keyup",
        REFRESH_SCROLL: "refreshScroll",
        Q_STATUS: "quesStatusChanged",
        START_TEST: "startTest",
        IMG_LOADED: "imageLoaded",
        CONTEXT_MENU: "contextmenu"
    };
    return e
}), define("com/es/widgets/assessment/utilities", ["com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent"], function(e, t) {
    var n = new Object;
    n.resourcePath = "", n.DEVICE_TYPE = "";
    var r, i = +(new Date);
    return n.feedbackScroll = null, n.log = function(e) {}, n.screenTransition = function(e) {
        n.log("screen moving start"), this.showPreloader(), e.persistent == undefined && (e.persistent = !0), e.direction == undefined || e.direction == "" || e.direction == "forward" ? reverse = !1 : reverse = !0, curElm = typeof e.curScreen == "string" ? $("#" + e.curScreen) : e.curScreen, showElm = typeof e.newScreen == "string" ? $("#" + e.newScreen) : e.newScreen;
        if (e.handler == undefined || e.handler == null) e.handler = function() {};
        reverse ? (curElm.addClass("outback"), showElm.addClass("inback")) : (showElm.addClass("infwd"), curElm.addClass("outfwd")), showElm.removeClass("disableTemplate").addClass("enableTemplate"), setTimeout(function() {
            n.animationComplete(curElm, showElm, e.persistent, e.handler)
        }, 600)
    }, n.questionTransition = function(e) {}, n.animationComplete = function(e, t, r, i) {
        e.removeClass("current"), this.removeAnimClasses([e, t]), t.addClass("current"), n.log(i), i(e), e.hasClass("quesWrapper") || this.hidePreloader()
    }, n.removeAnimClasses = function(e) {
        var t = ["infwd", "outfwd", "inback", "outback", "current"];
        for (var n in t)
            for (var r in e) e[r].removeClass(t[n])
    }, n.showPreloader = function() {
        $(".overlay").show(), $("#floatingCirclesG").show()
    }, n.hidePreloader = function() {
        $(".overlay").hide(), $("#floatingCirclesG").hide()
    }, n.showQuesPopup = function(t) {
        if (!e.POPQ) return;
        var n = $(".questionPopup"),
            r = '<img src="interface/correctAnswer.png">',
            i = '<img src="interface/wrongAnswer.png">';
        n.bind(e.CLICK, this.hideQuesPopup);
        switch (t) {
            case "correct":
                var s = r + "<br />" + "Correct.";
                n.find(".questionPopupBox").html(s), n.show();
                break;
            case "incorrect":
                var s = i + "<br />" + "Incorrect.";
                n.find(".questionPopupBox").html(s), n.show();
                break;
            default:
        }
    }, n.hideQuesPopup = function(e) {
        $(".questionPopup").hide(), $(".questionPopup").unbind()
    }, n.showToasterMessage = function(r, i, s) {
        if (i == undefined || i == null || i == "") i = e.DEFAULT_TOASTER_DURATION;
        $(".Overlay_toast").bind(t.CLICK, n.hideToasterMessage.bind(n, s)), $(".toast_message").text(r);
        var o = $("body").height() - 100;
        o /= 2, $(".toast_message").css("top", o), $(".Overlay_toast").css("opacity", "1"), $(".toast_message").css("opacity", "1"), $("#toast").show(), n.myTimer = setTimeout(n.hideToasterMessage.bind(n, s), i)
    }, n.hideToasterMessage = function(e) {
        clearTimeout(n.myTimer), $(".Overlay_toast").unbind(), $(".toast_message").text(""), $("#toast").hide(), e != undefined && e != null && e()
    }, n.findResumePosition = function(e, t) {
        n.log("findResumePosition quesIds", e), n.log("findResumePosition responseData", t);
        if (t)
            for (var r = 0; r < e.length; r++) {
                n.log("id>>>>", e[r]);
                var i = _.findWhere(t, {
                    id: e[r]
                });
                if (i.userResponse == undefined) return n.log("k", r), r
            }
        return 0
    }, n.renderNode = function s(t, r, i) {
        var o = "",
            u = "PRE_";
        if (_.isArray(r))
            for (var a = 0; a < r.length; a++) o += s(t, r[a]);
        else if (typeof r == "object") switch (r.type) {
            case "text":
                o += r.data;
                break;
            case "optionText":
                var f = "text-icon.png",
                    l = "132";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' width='" + l + "'  />";
                break;
            case "image":
            case "a":
                u.indexOf(e.DEF_PREFIX) < 0 ? (n.log("image tag constuct"), o += "<img src='" + e.IOS_DOC_PATH + r.data + "'  class='image' id='" + i + "' />") : o += "<img src='" + t + r.data + "' class='image' id='" + i + "' />";
                break;
            case "optionImage":
                var f = "image-icon.png",
                    l = "132";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' width='" + l + "'  />";
                break;
            case "word":
                var f = "word-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "powerpoint":
                var f = "powerpoint-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "pdf":
                var f = "pdf-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "video":
                var f = "video-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "html":
                var f = "htmlView-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "excel":
                var f = "excel-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "weblink":
                var f = "weblink-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "activity":
                var f = "activity-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "audio":
                var f = "audio-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            case "personalTutor":
                var f = "personalTutor-icon.png";
                o += "<img src='interface/" + f + "' data-url='" + t + r.data + "' class='icon' />";
                break;
            default:
        }
        return o
    }, n.playAudio = function() {
        n.log("playAudio");
        var e = $(".audioBtn", this.screen).get(0);
        e.play(), e = null
    }, n.showResetPopup = function(e) {
        n.log("show reset popup"), $("#confirmload").removeClass("hide").addClass("resetPopup"), $(".resetOverlay").show();
        var r = {};
        $("#confirmload #buttons input").bind(t.CLICK, function(t) {
            if (t.target.id == "p_reset") var i = 1;
            else if (t.target.id == "c_reset") var i = 2;
            if ($("#RemReset").is(":checked")) var s = !0;
            else var s = !1;
            $("#confirmload #buttons input").unbind(), $("#confirmload").addClass("hide"), $("#confirmload").removeClass("show"), $(".resetOverlay").hide(), n.log("obj", r), e(i, s)
        })
    }, n.hideResetPopup = function(e) {
        $(".resetPopup").hide(), $(".resetOverlay").hide(), $(".resetPopup").unbind()
    }, n.showInfo = function(t, n, r, i) {
        $(".overlay").show();
        var n = n,
            r = r;
        $("#infoTitle").html(n), $("#infoContent").html(r), $("#infoImage img").attr("src", i), $("#infoImage img").show(), Imfinity.Constants.ORIENTATION_TYPE == e.LANDSCAPE ? $("#info").addClass("alert") : $("#info").removeClass("alert"), (i == "" || i == undefined) && $("#infoImage img").hide(), $("#info").show();
        var s = $("#info", this.screen)[0].clientHeight,
            o = $("#InfoHeader", this.screen)[0].clientHeight,
            u = s - o - 5;
        $("#infoContentCover", this.screen).css("height", u + "px");
        return
    }, n.hideInfo = function() {
        title = null, message = null, $("#info").hide(), $(".overlay").hide()
    }, n.randomizeArray = function(e, t) {
        var r = t.slice(),
            i = new Array;
        if (e.length != t.length) return n.log("Can't randomize both array has different size"), null;
        for (var s = 0; s < t.length; s++) {
            var o = t[s],
                u = !1;
            r.indexOf(o) > -1 && (u = !0, r = n.removeIndexFromArray(r, r.indexOf(o)));
            var a = n.generateRandomNo(0, r.length - 1);
            i[s] = r[a], r = n.removeIndexFromArray(r, a), u && r.push(o)
        }
        return i
    }, n.generateRandomNo = function(e, t) {
        return Math.floor(Math.random() * t) + e
    }, n.removeIndexFromArray = function(e, t) {
        if (t >= 0 && t <= e.length) {
            var n = [],
                r = e.slice(0, t),
                i = e.slice(t + 1, e.length);
            return n.push.apply(n, r), n.push.apply(n, i), n
        }
        return e
    }, n.showFeedback = function(r, i) {
        if ($("#feedbackBtn").hasClass("disabled")) return;
        this.feedbackScroll = null, i == undefined && (i = 0);
        for (var s = 0; s < r.length; s++)
            if (i >= r[s].minMarks && i <= r[s].maxMarks) {
                var o = r[s];
                break
            }
        var u = "";
        o.feedbackText != "" && (u += "<div id='feedbackText'>" + o.feedbackText + "</div>");
        if (o.resources.length > 0) {
            u += "<div id='feedbackResource'>", u += "<span class='resourceHeading'>Useful Resources</span>", u += "<div class='resourceContent'><ul>";
            for (var s = 0; s < o.resources.length; s++) u += "<li id='" + o.resources[s].id + "' title='" + o.resources[s].resourceFileName + "' class='resource'><span id='resourceType' class='" + o.resources[s].icon + "'></span><span class='resource-txt'>" + o.resources[s].longText + "</span></li>";
            u += "</ul></div></div>"
        }
        $("#feedbackContent", this.obj).html(u), $("#feedbackOverlay", this.obj).show(), $("#contentWrapper").css("overflow", "hidden"), $("#contentWrapper").css("position", "relative"), $(".resource", this.obj).bind(e.CLICK, n.showResource), $("#closeFeedback", this.obj).bind(t.CLICK, n.hideFeedback);
        var a = $("#feedbackWrapper").height() - $("#feedbackText").height();
        $("#contentWrapper").height(a - 20), this.feedbackScroll != null && this.feedbackScroll.destroy(), this.feedbackScroll = new IScroll($("#contentWrapper").get(0), {
            desktopCompatibility: !0,
            hScroll: !0
        }), ths = this, _.delay(function() {
            ths.feedbackScroll.refresh()
        }, 999)
    }, n.hideFeedback = function(e) {
        $("#feedbackContent", this.obj).html(""), $("#feedbackOverlay", this.obj).hide(), $("#closeFeedback", this.obj).unbind(), $(".resource", this.obj).unbind(), this.feedbackScroll = null
    }, n.showResource = function(e) {
        window.open(n.resourcePath + "Resources/" + e.target.title, "_blank")
    }, n.create_unique_random_array = function(e, t, r) {
        var i, s = new Array;
        for (var o = 0; o < e; o++) {
            while ((i = n.number_found(n.random_number(t, r), s)) == -1);
            s[o] = i
        }
        return s
    }, n.random_number = function(e, t) {
        return Math.round((t - e) * Math.random() + e)
    }, n.number_found = function(e, t) {
        for (var n = 0; n < t.length; n++)
            if (e == t[n]) return -1;
        return e
    }, n.generateAlphaArr = function(e) {
        var t = [];
        for (var n = 0; n < e; n++) t.push(String.fromCharCode(65 + n));
        return t
    }, n.checkDevice = function() {
        screen.width < 480 ? n.DEVICE_TYPE = "phone" : n.DEVICE_TYPE = "desktop"
    }, n.isPhone = function() {
        return window.innerWidth < 768 ? !0 : !1
    }, n.isIOS = function() {
        var e = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
        return e
    }, n.iOSversion = function() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)]
        }
        return undefined
    }, n.getHashValue = function() {
        var e = "";
        return window.location.hash && (e = window.location.hash.split("#")[1], e = e.split("-")[0]), n.log("value", e), e
    }, n.getMode = function() {
        var e = "";
        return window.location.hash && (e = window.location.hash.split("-")[1]), n.log("value", e), e
    }, n.hideAddressBar = function() {
        var t = document.getElementById("page"),
            r = navigator.userAgent,
            i = ~r.indexOf("iPhone") || ~r.indexOf("iPod"),
            s = ~r.indexOf("iPad"),
            o = i || s,
            u = window.navigator.standalone,
            a = ~r.indexOf("Android"),
            f = 0,
            l, c = n.iOSversion();
        a ? (window.onscroll = function() {
            t.style.height = window.innerHeight + "px"
        }, window.onbeforeunload = function() {
            return e.URL_CHANGE_MSG
        }) : window.onresize = function() {
            var e = t.offsetWidth;
            if (f == e) return;
            f = e, l()
        }, (l = window.onload = function() {
            if (o) {
                var e = document.documentElement.clientHeight;
                i && !u && c[0] < 7 && (e += 60), t.style.height = e + "px"
            } else a && (t.style.height = window.innerHeight + 56 + "px");
            setTimeout(scrollTo, 0, 0, 1)
        })()
    }, n.sortByKey = function(e, t) {
        return e.sort(function(e, n) {
            var r = e[t],
                i = n[t];
            return r < i ? -1 : r > i ? 1 : 0
        })
    }, n.isDesktopBrowser = function() {
        return navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i) ? !1 : !0
    }, n.clone = function(e) {
        if (Object.prototype.toString.call(e) === "[object Array]") {
            var t = [],
                n = 0,
                r = e.length;
            for (; n < r; n++) t[n] = arguments.callee(e[n]);
            return t
        }
        if (typeof e == "object") {
            var t = {}, n;
            for (n in e) t[n] = arguments.callee(e[n]);
            return t
        }
        return e
    }, n
}), define("com/es/widgets/assessment/model/assessmentWidgetVO", [], function() {
    var e = Backbone.Model.extend({
        defaults: {
            myId: "questionPlayer",
            headerVisible: "none",
            leftBtnClass: "",
            leftVisible: "none",
            leftLabel: "",
            title: "Title",
            titleVisible: "none",
            rightLabel: "Action",
            rightBtnClass: "genericActionBtn",
            rightVisible: "none",
            timestamp: "00:00:00",
            colorCode: ""
        }
    });
    return e
}), define("com/es/widgets/assessment/model/mcqVO", [], function() {
    var e = Backbone.Model.extend({
        id: "",
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        heading: "",
        userResponse: "",
        partialAttempt: !0,
        feedback: []
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/mcqView.html", [], function() {
    return "<div id='quesWrapper<%=id%>' class='disableTemplate'>\n    <div id='ques<%=id%>' class='quesContent'>\n		<div id='activityContent' style='display:block'>\n        	<div id='questionHeading' class='questionHeading'></div>\n            <div id='qCover' class=''>\n                <div id='questionMedia' class='left question-media'></div>\n                <div id='questionText' class='left questionImage'></div>\n                <div id='questionOptions'></div>\n            </div>\n        </div>\n    </div>\n</div>"
}), define("com/es/widgets/assessment/view/mcqView", ["com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/mcqView.html"], function(utils, AppConst, assessEvent, contentTpl) {
    var mcqView = Backbone.View.extend({
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        assetsPath: "",
        reviewData: "",
        userResponse: [],
        qId: "",
        itemClicked: !1,
        correctAnswerVisible: null,
        inputNo: 0,
        EvaluateFlag: !1,
        changeToolbar: {},
        nodes: [],
        maxpoints: 0,
        partialAttempt: !0,
        scroll: null,
        initialize: function() {
            _.bindAll(this, "handleMcqBtnClick", "resetClickFlag", "handleEvaluate"), _.extend(this, Backbone.Events)
        },
        render: function() {
            this.element = this.el;
            var e = _.template(contentTpl, this.model.toJSON());
            $("#" + this.model.get("uiId") + " #content", this.$el).QAappend(e), this.screen = $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el), this.obj = this.screen, this.setQuestionData()
        },
        setQuestionData: function() {
            this.modelParagraph = this.model.get("modelParagraph"), this.type = this.model.get("type"), this.layout = this.model.get("questionLayout"), this.responseType = this.model.get("responseType"), this.clues = this.model.get("clues"), this.rubric = this.model.get("rubric"), this.questionText = JSON.stringify(this.model.get("questionBody")), this.questionMedia = this.model.get("questionMedia"), this.optionsMedia = this.model.get("optionsMedia"), this.leftCol = this.model.get("leftCol"), this.rightCol = this.model.get("rightCol"), this.opLayout = this.model.get("optionsLayout"), this.options = this.model.get("options"), this.answers = this.model.get("answers"), this.assetsPath = this.model.get("assetPath"), this.isTest = this.model.get("isTest"), this.isReview = this.model.get("isReview"), this.reviewData = this.model.get(""), this.qId = this.model.get("id"), this.maxpoints = parseFloat(this.model.get("maxpoints")), this.model.get("userResponse") && (this.userResponse = this.model.get("userResponse").userResponse, this.isAnswered = !0), this.heading = this.model.get("heading"), this.partialAttempt = this.model.get("partialAttempt"), this.renderQues()
        },
        renderQues: function() {
            var qBody = eval(this.questionText.replace(/'+/g, "&apos;")),
                qOptions = eval(this.options);
            if (this.heading.length == 0) $(".questionHeading", this.screen).hide();
            else {
                var headingStr = "";
                for (var i = 0; i < this.heading.length; i++) this.heading[i].type == "image" ? headingStr += "<img src='" + this.assetsPath + this.heading[i].data + "' />" : headingStr += "<div>" + this.heading[i].data + "</div>";
                $(".questionHeading", this.screen).html(headingStr)
            } if (this.questionMedia.length == 0) $("#questionMedia", this.screen).hide();
            else {
                var qMediaStr = "";
                for (var i = 0; i < this.questionMedia.length; i++) qMediaStr += utils.renderNode(this.assetsPath, this.questionMedia[i]);
                $("#questionMedia", this.screen).html(qMediaStr)
            }
            $("#questionMedia img", this.screen).bind(assessEvent.CLICK, function() {
                window.open($("#questionMedia img", this.screen).data("url"))
            });
            var qStr = "",
                optionsStr = "";
            optionHasImg = !1;
            if (optionHasImg && this.responseType == AppConst.RESPONSE_TYPE_BUTTON) {
                $("#qCover", this.screen).addClass("img2col");
                for (var i = 0; i < qBody.length; i++) switch (qBody[i].type) {
                    case "text":
                        qStr += qBody[i].data;
                        break;
                    case "image":
                        qStr += '<div class="col inlineImg"><img src=\'' + this.assetsPath + qBody[i].data + "'  /></div>";
                        break;
                    default:
                }
                for (var i = 0; i < qOptions.length; i++) switch (qOptions[i][0].type) {
                    case "text":
                        optionsStr += '<div class="optionTxt"> <div id="text' + (i + 1) + '" class="col">' + qOptions[i][0].data + '</div> <div id="opt' + (i + 1) + "\" class='indicators modifier' " + "' data-op=" + (i + 1) + "> </div> </div>";
                        break;
                    case "image":
                        optionsStr += '<li class="optionImg"> <img id="img' + (i + 1) + "\" src='" + this.assetsPath + qOptions[i][0].data + "' /> <div id=\"opt" + (i + 1) + "\" class='indicators modifier' " + "' data-op=" + (i + 1) + "> </div> </li>";
                        break;
                    default:
                }
                $("#questionText", this.obj).html(qStr), $("#questionText", this.obj).css("width", "50%"), utils.log("QuestionTxt: " + $("#questionText", this.obj).html()), $("#questionOptions", this.obj).html(optionsStr), $("#activityContent", this.obj).addClass("mcqviewParent"), $("#questionText", this.obj).addClass("mcqQuestionText"), $("#questionOptions", this.obj).addClass("mcqOptions")
            } else {
                qStr += utils.renderNode(this.assetsPath, qBody), this.layout == "2COL" && this.leftCol != "" && this.rightCol != "" && (qStr += "<div class='leftcol'>", qStr += utils.renderNode(this.assetsPath, eval(this.leftCol)), qStr += "</div>", qStr += "<div class='rightcol'>", qStr += utils.renderNode(this.assetsPath, eval(this.rightCol)), qStr += "</div>");
                if (this.responseType == "" || this.responseType == AppConst.RESPONSE_TYPE_BUTTON) {
                    this.inputNo = this.answers.length, this.opLayout == "2COL" ? qOptions[0].type == "image" ? optionsStr = "<div class='mcq4'><ul class='newoptions '>" : optionsStr = "<div class='mcq4'><ul class='newoptions'>" : qOptions[0].type == "image" ? optionsStr = "<div class='mcq2'><ul class='newoptions '>" : optionsStr = "<div class='mcq2'><ul class='newoptions'>";
                    for (var i = 0; i < qOptions.length; i++) {
                        var idcClasses = null;
                        this.answers.length > 1 ? idcClasses = "indicators checkbox-btn-indicators" : idcClasses = "indicators radio-btn-indicators", optionsStr += "<li class='ui-ind-mcq' id='ui-mcq-" + (i + 1) + "'><div class='" + idcClasses + "' id='opt" + (i + 1) + "' data-op='" + (i + 1) + "'></div>";
                        for (var j = 0; j < qOptions[i].length; j++) qOptions[i][j].type == "image" ? optionsStr += "<img src='" + this.assetsPath + qOptions[i][j].data + "'></img>" : optionsStr += "<div>" + qOptions[i][j].data + "</div>", this.optionsMedia.length != 0 && this.optionsMedia[i] != undefined && (this.optionsMedia[i].type == "image" ? this.optionsMedia[i].type = "optionImage" : this.optionsMedia[i].type == "text" && (this.optionsMedia[i].type = "optionText"), optionsStr += "<div class='options-media'>" + utils.renderNode(this.assetsPath, this.optionsMedia[i]) + "</div>");
                        optionsStr += "<span class='checkBadge2'></span></li>"
                    }
                    optionsStr += "</ul></div>", $("#questionOptions", this.obj).html(optionsStr), $("#questionText", this.obj).html(qStr);
                    if (qOptions[0].type == "image") {
                        var l = $("#questionText", this.obj).find(".leftcol"),
                            r = $("#questionText", this.obj).find(".rightcol");
                        l.before(r), l.removeClass("leftcol"), r.removeClass("rightcol")
                    }
                }
            }
            var root = $(".mcq2", this.obj),
                options = $("input", root),
                len = options.length,
                minFontSize = 14;
            for (var i = 0; i < len; i++) {
                var node = options[i],
                    fsize = this.resizeText(node, minFontSize);
                minFontSize = fsize < minFontSize ? fsize : minFontSize
            }
            for (var i = 0; i < len; i++) {
                var node = options[i];
                node.style.fontSize = minFontSize + "px"
            }
            this.enableInteraction();
            var loadedImageCount = 0,
                imgArray = $("#activityContent img", this.obj),
                imgCount = imgArray.length,
                that = this;
            imgCount == 0 && this.trigger(assessEvent.TEMPLATE_READY), _.each(imgArray, function(e) {
                $(e).on("load", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.trigger(assessEvent.IMG_LOADED), that.trigger(assessEvent.TEMPLATE_READY))
                }), $(e).on("error", function() {
                    loadedImageCount++, imgCount === loadedImageCount && that.trigger(assessEvent.TEMPLATE_READY)
                })
            })
        },
        resizeText: function(e, t) {
            var n = t;
            while (e.offsetWidth < e.scrollWidth) e.style.fontSize = --n + "px";
            return n
        },
        enableInteraction: function() {
            $("#questionOptions", this.obj).find("input").unbind(), $("#questionOptions", this.obj).find("li").unbind(), $("#questionOptions", this.obj).find("input").removeClass("disableOption").removeClass("disabled"), $("#questionOptions", this.obj).find("li").removeClass("disableOption").removeClass("disabled"), $("#questionOptions", this.obj).find("li").removeClass("disableOption").removeClass("disabled"), $("#questionOptions", this.obj).find("img").removeClass("disableOption").removeClass("disabled"), $("#questionOptions", this.obj).find("div").removeClass("disableOption").removeClass("disabled"), $("#questionText", this.obj).removeClass("disabled");
            var qOptions = eval(this.options);
            $("#questionOptions", this.obj).find(".optionImg").bind(assessEvent.CLICK, this.handleMcqBtnClick), $("#questionOptions", this.obj).find("li").bind(assessEvent.CLICK, this.handleMcqBtnClick), $("#questionOptions", this.obj).find("input").bind(assessEvent.CLICK, this.handleMcqBtnClick), $(".options-media img", this.obj).unbind().bind(assessEvent.CLICK, function() {
                window.open($(".options-media img", this.screen).data("url"))
            })
        },
        disableInteraction: function() {
            var e = $("#activityContent img", this.obj);
            $("#questionOptions", this.obj).find("input").addClass("disableOption"), $("#questionOptions", this.obj).find("li").addClass("disableOption"), $("#questionOptions", this.obj).find("img").addClass("disableOption"), $("#questionOptions", this.obj).find("input").unbind(), $("#questionOptions", this.obj).find("li").unbind(), $("#questionOptions", this.obj).find("img").unbind(), $("#questionOptions", this.obj).find(".qr-correct").unbind(), $("#questionOptions", this.obj).find(".qr-incorrect").unbind(), $("#questionOptions", this.obj).find(".optionImg").unbind(), $("#questionText", this.screen).addClass("disabled"), $(".options-media img", this.obj).unbind(), $(e).off()
        },
        handleMcqBtnClick: function(e) {
            if (e.target.parentNode.classList && e.target.parentNode.classList.contains("options-media")) return;
            if (this.itemClicked == 1) return;
            this.itemClicked = !0;
            var t = e.target;
            this.answers.length == 1 ? ($("#questionOptions", this.obj).find(".selected").removeClass("selected"), utils.log(t), t.nodeName.toLowerCase() != "li" ? (t.nodeName.toLowerCase() == "img" && ($(t).addClass("selected"), $(t.parentNode).find(".modifier").addClass("selected")), $(t).hasClass("modifier") && $(t).addClass("selected"), $(t.parentNode).find(".modifier").length > 0 ? $(t).find(".modifier").addClass("selected") : (t = $(t).closest(".ui-ind-mcq"), $(t).addClass("selected"), $(t).find(".indicators").addClass("selected"), $(t).find(".optionsText").addClass("selected"))) : ($(t).addClass("selected"), $(t).find(".indicators").addClass("selected"), $(t).find(".optionsText").addClass("selected"))) : (t.nodeName.toLowerCase() != "li" && (t = $(t).closest(".ui-ind-mcq")), $(t).find(".indicators").hasClass("selected") ? ($(t).removeClass("selected"), $(t).find(".indicators").removeClass("selected"), $(t).find(".optionsText").removeClass("selected")) : $("ul.newoptions,div.mcqOptions", this.obj).find(".indicators.selected").length < this.answers.length && ($(t).addClass("selected"), $(t).find(".indicators").addClass("selected"), $(t).find(".optionsText").addClass("selected")));
            var n = $("#questionOptions", this.obj).find(".indicators.selected");
            this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, n.length == this.answers.length ? this.trigger(assessEvent.Q_STATUS, AppConst.COMPLETE) : n.length > 0 ? this.trigger(assessEvent.Q_STATUS, AppConst.PARTIAL) : this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT), this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), _.delay(this.resetClickFlag, 500)
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        handleEvaluate: function(e) {
            if (e != undefined && $(e.target).hasClass("disabled")) return;
            this.userResponse = [], blankObjsBadges = $("#questionOptions", this.obj).find("li.ui-ind-mcq").find(".checkBadge2");
            if (this.answers.length == 1) {
                var t = $("#questionOptions", this.obj).find(".indicators.selected").attr("data-op"),
                    n = this.maxpoints,
                    r = 0;
                this.userResponse.push(t);
                var i = $("#questionOptions", this.obj).find(".indicators.selected").length;
                this.partialAttempt == 1 || i > 0 ? t == this.answers[0] ? ($("#questionOptions", this.obj).find("#ui-mcq-" + t).find(".checkBadge2").addClass("markRight2"), $("#questionOptions", this.obj).find("#ui-mcq-" + t).addClass("focus-markright"), r += n, this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: r,
                    status: AppConst.CORRECT,
                    maxScore: this.maxpoints,
                    optLength: this.options.length,
                    type: this.type,
                    responseType: this.responseType
                })) : ($("#questionOptions", this.obj).find("#ui-mcq-" + t).find(".checkBadge2").addClass("markWrong2"), $("#questionOptions", this.obj).find("#ui-mcq-" + t).addClass("focus-markwrong"), this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: r,
                    status: AppConst.INCORRECT,
                    maxScore: this.maxpoints,
                    optLength: this.options.length,
                    type: this.type,
                    responseType: this.responseType
                })) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                    userResponse: this.userResponse,
                    maxScore: this.maxpoints,
                    type: this.type,
                    optLength: this.options.length,
                    responseType: this.responseType
                })
            } else if (this.answers.length > 1) {
                var s = $("#questionOptions", this.obj).find(".indicators.selected");
                $("#questionOptions", this.obj).removeClass("selected"), blankObjsBadges = $("#questionOptions", this.obj).find("li.ui-ind-mcq").find(".checkBadge2");
                var o = 0,
                    u = 0;
                u = this.answers.length;
                var n = parseFloat(this.maxpoints / u),
                    r = 0;
                for (var a = 0; a < this.answers.length; a++) {
                    var t = $(s.get(a)).attr("data-op");
                    this.userResponse.push("" + t)
                }
                for (var f = 0; f < s.length; f++) {
                    var l = parseInt(this.userResponse[f]),
                        t = parseInt($(s.get(f)).attr("data-op"));
                    this.answers.indexOf(l) >= 0 ? ($("#questionOptions", this.obj).find("#ui-mcq-" + t).find(".checkBadge2").addClass("markRight2"), $("#questionOptions", this.obj).find("#ui-mcq-" + t).addClass("focus-markright"), r += n, o++) : ($("#questionOptions", this.obj).find("#ui-mcq-" + t).find(".checkBadge2").addClass("markWrong2"), $("#questionOptions", this.obj).find("#ui-mcq-" + t).addClass("focus-markwrong"))
                }
                this.partialAttempt == 1 || s.length == u ? o == this.answers.length ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: r,
                    status: AppConst.CORRECT,
                    maxScore: this.maxpoints,
                    type: this.type,
                    optLength: this.options.length,
                    responseType: this.responseType
                }) : o > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: r,
                    status: AppConst.PARTIAL,
                    maxScore: this.maxpoints,
                    type: this.type,
                    optLength: this.options.length,
                    responseType: this.responseType
                }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: r,
                    status: AppConst.INCORRECT,
                    maxScore: this.maxpoints,
                    type: this.type,
                    optLength: this.options.length,
                    responseType: this.responseType
                }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                    userResponse: this.userResponse,
                    maxScore: this.maxpoints,
                    type: this.type,
                    optLength: this.options.length,
                    responseType: this.responseType
                })
            }
            this.partialAttempt || (blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markright"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markwrong")), $("#questionOptions", this.obj).find("li").removeClass("selected"), this.EvaluateFlag = !0, this.lockQuestion()
        },
        lockQuestion: function() {
            this.correctAnswerVisible = !1, this.changeToolbar.mode = AppConst.TOOLBAR_LOCKED, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.disableInteraction()
        },
        populateAnswers: function(e, t) {
            e.length > 0 && (this.EvaluateFlag = !0), blankObjsBadges = $("#questionOptions", this.obj).find("li.ui-ind-mcq").find(".checkBadge2"), $("#questionOptions", this.obj).find("input").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("input").removeClass("selected"), $("#questionOptions", this.obj).find("img").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("img").removeClass("selected"), blankObjsBadges.removeClass("markWrong2"), blankObjsBadges.removeClass("markRight2"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markright"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markwrong"), $("#questionOptions", this.obj).find(".indicators").removeClass("selected"), $("#questionOptions", this.obj).find("div.optionsText").removeClass("Selected"), $("#questionOptions", this.obj).find(".qr-incorrect").removeClass("selected"), $("#questionOptions", this.obj).find(".qr-correct").removeClass("selected"), t == 0 && (this.responseType == AppConst.RESPONSE_TYPE_PICKER ? ($("#MCQpick", this.obj).removeClass("markWrong2"), $("#MCQpick", this.obj).removeClass("markRight2")) : (blankObjsBadges.removeClass("markWrong2"), blankObjsBadges.removeClass("markRight2")));
            if (this.responseType == AppConst.RESPONSE_TYPE_PICKER) e.length > 0 ? (ans = this.options[e[0] - 1].data, $("#questionOptions", this.obj).find("input").val(ans)) : $("#questionOptions", this.obj).find("input").val(" ");
            else if (this.responseType == AppConst.RESPONSE_TYPE_BINARY) {
                if (e.length > 0)
                    for (var n = 0; n < e.length; n++) e[n] == 0 ? $("#li" + (n + 1), this.obj).find(".qr-correct").addClass("selected") : e[n] == 1 && $("#li" + (n + 1), this.obj).find(".qr-incorrect").addClass("selected")
            } else {
                e.length > 0 ? ($("#questionOptions", this.obj).find("li").attr("disabled", "disabled"), $("#questionOptions", this.obj).find("li").addClass("disabled")) : ($("#questionOptions", this.obj).find("li").removeAttr("disabled"), $("#questionOptions", this.obj).find("li").removeClass("disabled"), $("#questionOptions", this.obj).find(".selected").removeClass("selected"));
                for (var r = 0; r < e.length; r++) $("#opt" + e[r], this.obj).addClass("selected"), $("#text" + e[r], this.obj).addClass("selected")
            } if (t == 1) {
                for (var r = 0; r < this.userResponse.length; r++)
                    for (var i = 0; i < this.answers.length; i++) {
                        var s = parseInt(this.userResponse[i]);
                        this.answers.indexOf(s) >= 0 ? ($("#questionOptions", this.obj).find("#ui-mcq-" + s).find(".checkBadge2").addClass("markRight2"), $("#questionOptions", this.obj).find("#ui-mcq-" + s).addClass("focus-markright"), $("#li" + s, this.obj).find(".indicators").addClass("selected"), $("#li" + s, this.obj).find(".optionsText").addClass("selected"), $("#opt" + s, this.obj).find("img") ? $("#opt" + s, this.obj).find("img").addClass("selected") : ($("#questionOptions", this.obj).find(".checkBadge2").addClass("markWrong2"), $("#questionOptions", this.obj).addClass("focus-markwrong"), $("#li" + s, this.obj).find(".optionsText").addClass("selected"), $("#opt" + s, this.obj).addClass("selected"))) : ($("#questionOptions", this.obj).find("#ui-mcq-" + s).find(".checkBadge2").addClass("markWrong2"), $("#questionOptions", this.obj).find("#ui-mcq-" + s).addClass("focus-markwrong"), $("#opt" + s, this.obj).find("img").length > 0 ? $("#opt" + s, this.obj).find("img").addClass("selected") : ($("#opt" + s, this.obj).addClass("selected"), $("#opt" + s, this.obj).find(".indicators").addClass("selected"), $("#opt" + s, this.obj).find(".optionsText").addClass("selected")))
                    }(this.isTest || this.partialAttempt == 0) && !this.isReview && (blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markright"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markwrong"))
            }
        },
        resetQuestion: function(e) {
            $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("markRight2"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("markWrong2"), blankObjsBadges = $("#questionOptions", this.obj).find("li.ui-ind-mcq").find(".checkBadge2"), blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markright"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markwrong");
            if (this.responseType == "" || this.responseType == AppConst.RESPONSE_TYPE_BINARY) {
                $("#questionOptions", this.obj).find(".selected").removeClass("selected"), $("#questionOptions", this.obj).find("input").removeClass("optionHighlight");
                var t = $("#questionOptions", this.obj).find("li");
                t.removeAttr("disabled"), t.removeClass("disabled"), blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2"), t.removeClass("optionHighlight")
            } else if (this.responseType == "" || this.responseType == AppConst.RESPONSE_TYPE_BUTTON) {
                $("#questionOptions", this.obj).find(".selected").removeClass("selected"), $("#questionOptions", this.obj).find("input").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("img").removeClass("optionHighlight");
                var t = $("#questionOptions", this.obj).find("li");
                t.removeAttr("disabled"), t.removeClass("disabled"), blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2"), t.removeClass("optionHighlight")
            } else this.responseType == AppConst.RESPONSE_TYPE_PICKER && ($("#MCQpick", this.obj).val(""), $("#MCQpick", this.obj).removeClass("markRight2"), $("#MCQpick", this.obj).removeClass("markWrong2"), $("#MCQpick", this.obj).removeClass("disabled"), $("#MCQpick", this.obj).removeClass("selected"));
            this.userResponse = [], this.EvaluateFlag = !1, this.enableInteraction(), this.trigger(assessEvent.MARK_EMPTY, this.qId), this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)
        },
        resetQuestionPartial: function(e) {
            var t = !0;
            blankObjsBadges = $("#questionOptions", this.obj).find("li.ui-ind-mcq").find(".checkBadge2"), blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markright"), $("#questionOptions", this.obj).find(".ui-ind-mcq").removeClass("focus-markwrong"), $("#questionOptions", this.obj).find("li").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("img").removeClass("optionHighlight"), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
            if (this.responseType == "" || this.responseType == AppConst.RESPONSE_TYPE_BUTTON) {
                $("#questionOptions", this.obj).find(".selected").removeClass("selected"), $("#questionOptions", this.obj).find("li").removeAttr("disabled"), $("#questionOptions", this.obj).find("li").removeClass("disabled");
                if (this.userResponse.length > 0)
                    for (var n = 0; n < this.userResponse.length; n++) this.answers.indexOf(this.userResponse[n]) > -1 ? ($("#opt" + this.userResponse[n], this.obj).find("img").length != 0 ? ($("#opt" + this.userResponse[n], this.obj).find("img").addClass("selected"), $("#opt" + this.userResponse[n], this.obj).addClass("selected")) : $("#opt" + this.userResponse[n], this.obj).addClass("selected"), this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), t = !1) : this.userResponse[n] = ""
            }
            this.EvaluateFlag = !1, this.correctAnswerVisible = !1, this.enableInteraction(), t == 0 ? this.trigger(assessEvent.UPDATE_RESPONSE, this.qId, {
                userResponse: this.userResponse
            }) : this.trigger(assessEvent.MARK_EMPTY, this.qId), this.disableButton(AppConst.QBTN_RESET)
        },
        disableButton: function(e) {
            $("#" + e, this.obj).addClass("disabled")
        },
        handleScreenExit: function() {},
        orientationchange: function(e) {},
        randomize: function() {
            if (this.responseType == "" || this.responseType == AppConst.RESPONSE_TYPE_BINARY) {
                var e = "";
                this.opLayout == "2COL" ? e = "<div class='mcq4'><ul>" : e = "<div class='mcq2 trueFalse'><ul>";
                for (var t = 0; t < this.nodes.length; t++) e += this.nodes[t];
                e += "</ul></div>", $("#questionOptions", this.screen).html(e)
            }
        },
        destroy: function() {
            this.unbind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.unbind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.unbind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.unbind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.unbind(assessEvent.MARK_EMPTY, this.markEmpty), this.unbind(assessEvent.UPDATE_RESPONSE, this.updateResponse), $("#questionOptions", this.obj).find("li").unbind(), $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el).remove(), this.disableInteraction()
        }
    });
    return mcqView
}), define("com/es/widgets/assessment/model/matchSortVO", [], function() {
    var e = Backbone.Model.extend({
        id: "",
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        heading: [],
        attemptMethod: "",
        partialAttempt: !0,
        feedback: []
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/matchSortView.html", [], function() {
    return "<div id='quesWrapper<%=id%>' class='none-bg disableTemplate'>\n    <div id='ques<%=id%>'  class='quesContent'>\n		<div id='activityContent'>\n            <div id='questionHeading' class='questionHeading'></div>\n            <div id='questionMedia' class='left question-media'></div>\n            <div id='questionText' class='center clearfix'></div>\n            <div id='questionOptions'></div>\n            <div id='labelanswers'></div>\n        </div>\n	</div>\n</div>"
}), define("com/es/widgets/assessment/view/matchSortView", ["com/es/widgets/assessment/AssesmentLang", "com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/matchSortView.html"], function(AssesmentLang, utils, AppConst, assessEvent, contentTpl) {
    var matchSortView = Backbone.View.extend({
        modelParagraph: "",
        qId: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: [],
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: [],
        itemClicked: !1,
        correctAnswerVisible: null,
        inputNo: 0,
        EvaluateFlag: !1,
        templateOptionItem: "<div class='dropelement' id='drag<%=index+1%>'><span><%=option.data%></span></div>",
        resetClicked: !1,
        firstItem: null,
        secondItem: null,
        numSelected: 0,
        changeToolbar: {},
        quesType: "",
        maxItemHeight: 0,
        maxpoints: 0,
        assetsPath: "",
        marksQbtained: 0,
        rightMaxWidth: 0,
        leftMaxWidth: 0,
        heading: "",
        attemptMethod: AppConst.MATCHING_RIGHTSIDE,
        partialAttempt: !0,
        sortItemAttr: "",
        refItemAttr: "",
        title: "",
        defaultOptions: [],
        scroll: null,
        initialize: function() {
            _.bindAll(this, "handleEvaluate", "resetClickFlag", "handleLook", "handleMatchSortItemClick", "handleMatchLeftItemClick", "handleMatchRightItemClick"), _.extend(this, Backbone.Events)
        },
        render: function() {
            this.element = this.el;
            var e = _.template(contentTpl, this.model.toJSON());
            $("#" + this.model.get("uiId") + " #content", this.$el).QAappend(e), this.screen = $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el), this.setQuestionData()
        },
        setQuestionData: function() {
            this.modelParagraph = this.model.get("modelParagraph"), this.type = this.model.get("type"), this.layout = this.model.get("questionLayout"), this.responseType = this.model.get("responseType"), this.clues = this.model.get("clues"), this.rubric = this.model.get("rubric"), this.questionText = JSON.stringify(this.model.get("questionBody")), this.questionMedia = this.model.get("questionMedia"), this.optionsMedia = this.model.get("optionsMedia"), this.leftCol = this.model.get("leftCol"), this.rightCol = this.model.get("rightCol"), this.opLayout = this.model.get("optionsLayout"), this.answers = this.model.get("answers"), this.assetsPath = this.model.get("assetPath"), this.options = this.model.get("options"), this.isTest = this.model.get("isTest"), this.isReview = this.model.get("isReview"), this.reviewData = this.model.get(""), this.inputNo = this.options.length, this.qId = this.model.get("id"), this.heading = this.model.get("heading"), this.maxpoints = parseFloat(this.model.get("maxpoints")), this.partialAttempt = this.model.get("partialAttempt"), this.title = this.model.get("title"), this.model.get("userResponse").userResponse && (this.userResponse = this.model.get("userResponse").userResponse), this.attemptMethod = this.model.get("attemptMethod"), this.renderQues()
        },
        renderQues: function() {
            this.userResponse && this.userResponse.length > 0 && (this.EvaluateFlag = !0), this.obj = this.screen;
            var leftOptions = eval(this.questionText);
            this.answers = eval(_.clone(this.options));
            var rightOptions = eval(_.clone(this.options));
            if (!leftOptions.length || !rightOptions.length) return;
            var leftSort = "<div class='leftsort'>";
            leftSort += this.generateList(leftOptions, "sortL", "matching addsort textsort", "refItem"), leftSort += "</div>";
            var rightSort = "<div class='rightsort'>";
            rightOptions = utils.randomizeArray(leftOptions, rightOptions), rightSort += this.generateList(rightOptions, "sort", "matching addsort textsort", "sortItem", "addBadge"), rightSort += "</div>", $("#questionText", this.obj).html(leftSort + rightSort), $("#sortL", this.obj).find("img").length == 0 ? (this.refItemAttr = "p", $("#sortL", this.obj).removeClass("addsort")) : (this.refItemAttr = "img", $("#sortL", this.obj).removeClass("textsort")), $("#sort", this.obj).find("img").length == 0 ? (this.sortItemAttr = "p", $("#sort", this.obj).removeClass("addsort")) : (this.sortItemAttr = "img", $("#sort", this.obj).removeClass("textsort"), this.quesType = "image");
            if (this.heading.length == 0) $(".questionHeading", this.screen).hide();
            else {
                var headingStr = "";
                for (var i = 0; i < this.heading.length; i++) this.heading[i].type == "image" ? headingStr += "<img src='" + this.assetsPath + this.heading[i].data + "' />" : headingStr += "<div>" + this.heading[i].data + "</div>";
                $(".questionHeading", this.screen).html(headingStr)
            } if (this.questionMedia.length == 0) $("#questionMedia", this.screen).hide();
            else {
                var qMediaStr = "";
                for (var i = 0; i < this.questionMedia.length; i++) qMediaStr += utils.renderNode(this.assetsPath, this.questionMedia[i]);
                $("#questionMedia", this.screen).html(qMediaStr)
            }
            $("#questionMedia img", this.screen).bind(assessEvent.CLICK, function() {
                window.open($("#questionMedia img").data("url"))
            });
            var fontSize = 1;
            $("#sort > li", this.obj).css("font-size", fontSize + "em"), this.enableInteraction();
            var loadedImageCount = 0,
                imgArray = $("#activityContent img", this.obj),
                imgCount = imgArray.length,
                that = this;
            _.delay(function() {
                imgCount == 0 && (that.handleLook(), that.trigger(assessEvent.TEMPLATE_READY))
            }, 200), _.each(imgArray, function(e) {
                $(e).on("load", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.handleLook(), that.trigger(assessEvent.IMG_LOADED), that.trigger(assessEvent.TEMPLATE_READY))
                }), $(e).on("error", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.handleLook(), that.trigger(assessEvent.TEMPLATE_READY))
                })
            })
        },
        checkMaxHeight: function(e, t) {
            var n = e.length,
                r = 0;
            for (var i = 0; i < n; i++) {
                var s = $("#" + t + (i + 1), this.screen).get(0).scrollHeight,
                    o = parseInt($("#" + t + (i + 1) + " p", this.screen).css("padding"));
                o && (s += o * 2), s > r && (r = s)
            }
            return r
        },
        handleLook: function() {
            var leftOptions = eval(this.questionText),
                rightOptions = eval(_.clone(this.options)),
                l = this.checkMaxHeight(leftOptions, "refItem"),
                r = this.checkMaxHeight(rightOptions, "sortItem");
            if (utils.isPhone()) {
                var maxWidthNode = $(".matching", this.obj),
                    fontSize = this.resizeText(maxWidthNode, .8);
                $(".matching  > li", this.obj).css("font-size", fontSize + "em")
            }
            this.maxItemHeight = l > r ? l : r, this.maxItemHeight < 60 && (this.maxItemHeight = 60), utils.log("left maxHeight: " + l + " | r mHieght: " + r), $("li", this.screen).css("height", this.maxItemHeight + "px"), $("li", this.screen).css("position", "relative");
            var pHeight = this.maxItemHeight / 2;
            if ($("#sort", this.screen).find("p").length == $("#sortL", this.screen).find("p").length) {
                var pList = $("#sort, #sortL", this.screen).find("p");
                for (var idx = 0; idx < pList.length; idx++) $(pList[idx]).height() < this.maxItemHeight - 5
            }
            var paddingHeight = parseInt($("li", this.screen).css("padding-bottom"));
            paddingHeight += parseInt($("li", this.screen).css("padding-top")), $("#sort, #sortL", this.screen).find("p").css("height", this.maxItemHeight - paddingHeight + "px"), $("#sort", this.screen).find("p").length > 0 && $("#sort", this.screen).find("img").length == 0 && $("#sortL", this.screen).find("p").length > 0 && $("#sortL", this.screen).find("img").length == 0 && ($("#sort", this.screen).addClass("matchTextSpacer"), $("#sortL", this.screen).addClass("matchTextSpacer")), this.quesType == "image"
        },
        checkMaxOffWidth: function(e, t) {
            var n = e.length,
                r = 0,
                i;
            for (var s = 0; s < n; s++) {
                var o = $("#" + t + (s + 1), this.screen).find("p");
                if (o.length > 0) o = o.get(0).offsetWidth;
                else var o = $("#" + t + (s + 1), this.screen).find("img").get(0).offsetWidth;
                o > r && (r = o, i = $("#" + t + (s + 1), this.screen))
            }
            return i
        },
        resetFontSize: function(e, t, n) {
            return fSize = n, e.offsetWidth - 6 < t.offsetWidth && (fSize = t.innerHTML.length * .625), fSize
        },
        resizeText: function(e, t) {
            var n = t;
            for (var r = 0; r < e.length; r++) e[r].offsetWidth < e[r].scrollWidth && (n -= .1);
            return n
        },
        enableInteraction: function() {
            $("li", this.obj).removeClass("disableOption"), $("p", this.obj).removeClass("disableOption"), $("img", this.obj).removeClass("disableOption"), $("#questionText", this.obj).removeClass("disabled");
            var e = $(".rightsort li", this.obj).find("img"),
                t = $(".leftsort li", this.obj).find("img");
            this.attemptMethod != AppConst.MATCHING_RIGHTSIDE ? (e.get(0) ? $(".rightsort", this.obj).find("li").unbind().bind(assessEvent.CLICK, this.handleMatchRightItemClick) : $(".rightsort", this.obj).find("li").unbind().bind(assessEvent.CLICK, this.handleMatchRightItemClick), t.get(0) ? $(".leftsort", this.obj).find("li").unbind().bind(assessEvent.CLICK, this.handleMatchLeftItemClick) : $(".leftsort", this.obj).find("li").unbind().bind(assessEvent.CLICK, this.handleMatchLeftItemClick)) : e.get(0) ? $(".rightsort", this.obj).find("li").unbind().bind(assessEvent.CLICK, this.handleMatchSortItemClick) : $(".rightsort", this.obj).find("li").unbind().bind(assessEvent.CLICK, this.handleMatchSortItemClick)
        },
        disableInteraction: function() {
            var e = $("#activityContent img", this.obj);
            $("li", this.obj).unbind(), $("img", this.obj).unbind(), $("p", this.obj).unbind(), $("#questionText", this.obj).addClass("disabled"), $("#questionMedia img", this.screen).unbind(), $(".rightsort", this.obj).find("li").unbind(), $(".leftsort", this.obj).find("li").unbind(), e.off()
        },
        handleTouchStart: function(e) {
            $("#sort>li", this.obj).attr("class", "options")
        },
        handleMatchSortItemClick: function(e) {
            if (this.itemClicked == 1) return;
            $(".rightsort li", this.obj).find("img").removeClass("selected"), $(".rightsort li", this.obj).removeClass("selected"), this.itemClicked = !0;
            var t = e.target,
                n = t.id;
            if (t.nodeName == "IMG") t = t.parentNode.parentNode;
            else if (t.nodeName == "figure" || t.nodeName == "P") t = t.parentNode;
            $(".rightsort li", this.obj).find("img").attr("class", "options");
            var r = $(t);
            r.get(0) ? r.addClass("selected") : $(t).addClass("selected"), this.numSelected == 0 ? (this.firstItem = {
                value: $(t).html(),
                ele: t.id
            }, this.numSelected++) : this.numSelected == 1 && (this.secondItem = {
                value: $(t).html(),
                ele: t.id
            }, this.swap(this.firstItem, this.secondItem), $(".rightsort li", this.obj).removeClass(), this.numSelected = 0, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)), _.delay(this.resetClickFlag, 100)
        },
        handleMatchRightItemClick: function(e) {
            if (this.itemClicked == 1) return;
            $(".rightsort li", this.obj).removeClass("selected"), $(".rightsort p", this.obj).removeClass("selected"), $(".rightsort img", this.obj).removeClass("selected"), this.itemClicked = !0;
            var t = e.target,
                n = t,
                r = t.id;
            t.nodeName.toLowerCase() == "img" ? (t = t.parentNode, n = t) : t.nodeName.toLowerCase() == "figure" ? (t = t.parentNode, n = t) : t.nodeName.toLowerCase() == "p" && (n = t, t = t.parentNode);
            if ($(t).hasClass("attempted")) {
                $(t).removeClass("attempted");
                var i = t.id.split("sortItem")[1];
                $("#refItem" + i, this.obj).removeClass("attempted"), $("#sortL", this.obj).find(".attempted").length == this.options.length ? this.trigger(assessEvent.Q_STATUS, AppConst.COMPLETE) : $("#sortL", this.obj).find(".attempted").length > 0 ? this.trigger(assessEvent.Q_STATUS, AppConst.PARTIAL) : this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT)
            }
            var s = $(t);
            s.get(0) ? s.addClass("selected") : $(n).addClass("selected"), this.firstItem = {
                value: $(t).html(),
                ele: t.id
            }, this.firstItem != null && this.secondItem != null && (this.swap(this.firstItem, this.secondItem), this.firstItem = null, this.secondItem = null, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)), _.delay(this.resetClickFlag, 100)
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        handleMatchLeftItemClick: function(e) {
            if (this.itemClicked == 1) return;
            $(".leftsort li", this.obj).removeClass("selected"), $(".leftsort p", this.obj).removeClass("selected"), $(".leftsort img", this.obj).removeClass("selected"), this.itemClicked = !0;
            var t = e.target,
                n = t,
                r = t.id;
            t.nodeName == "IMG" || t.nodeName == "figure" ? (t = t.parentNode, n = t) : t.nodeName == "P" && (n = t, t = t.parentNode);
            if ($(t).hasClass("attempted")) {
                $(t).removeClass("attempted");
                var i = t.id.split("refItem")[1];
                $("#sortItem" + i, this.obj).removeClass("attempted"), $("#sortL", this.obj).find(".attempted").length == this.answers.length ? this.trigger(assessEvent.Q_STATUS, AppConst.COMPLETE) : $("#sortL", this.obj).find(".attempted").length > 0 ? this.trigger(assessEvent.Q_STATUS, AppConst.PARTIAL) : this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT)
            }
            var s = $(t);
            s.get(0) ? s.addClass("selected") : $(n).addClass("selected");
            var i = t.id.match(/\d+$/),
                o = "sortItem" + i,
                u = $("#sortItem" + i, this.screen).html();
            this.secondItem = {
                value: u,
                ele: o
            }, this.firstItem != null && this.secondItem != null && (this.swap(this.firstItem, this.secondItem), this.firstItem = null, this.secondItem = null, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)), _.delay(this.resetClickFlag, 100)
        },
        generateList: function(e, t, n, r, i) {
            var s = 0;
            if (r == undefined || r == "") r = "sortItem";
            var o = "<ul id='" + t + "' class='" + n + "'>";
            for (var u = 0; u < e.length; u++) e[u].type == "image" ? e[u].data == undefined ? i ? o += "<li id='" + r + (u + 1) + "'><img src ='" + this.assetsPath + e[u][0].data + "' /><div class='checkBadge2 icon'></div></li>" : o += "<li id='" + r + (u + 1) + "'><span class='addImage'><img  id ='imgques" + (u + 1) + "' src ='" + this.assetsPath + e[u][0].data + "' /></span></li>" : i ? o += "<li id='" + r + (u + 1) + "'><img src ='" + this.assetsPath + e[u].data + "' /><div class='checkBadge2 icon'></div></li>" : o += "<li id='" + r + (u + 1) + "'><span class='addImage'><img  id ='imgques" + (u + 1) + "' src ='" + this.assetsPath + e[u].data + "'/></span></li>" : e[u].data == undefined ? (i ? o += "<li id='" + r + (u + 1) + "'><p>" + e[u][0].data + "</p><div class='checkBadge2 icon'></div></li>" : o += "<li id='" + r + (u + 1) + "'><p>" + e[u][0].data + "</p></li>", e[u][0].data.length > s && (s = e[u].data.length)) : (i ? o += "<li id='" + r + (u + 1) + "'><p>" + e[u].data + "</p><div class='checkBadge2 icon'></div></li>" : o += "<li id='" + r + (u + 1) + "'><p>" + e[u].data + "</p></li>", e[u].data.length > s && (s = e[u].data.length));
            return o += "</ul>", t == "sortL" ? this.leftMaxWidth = s : t == "sort" && (this.rightMaxWidth = s), o
        },
        swap: function(e, t) {
            utils.log("SWAP: ");
            var n = $("#" + e.ele, this.obj).position(),
                r = $("#" + t.ele, this.obj).position();
            if (n && r) {
                var i = n.top,
                    s = r.top;
                utils.log(i + " - " + s), utils.log("A id: " + $("#" + e.ele, this.obj).attr("id")), utils.log("B id: " + $("#" + t.ele, this.obj).attr("id"));
                var o = 0,
                    u = 0;
                u = $("#" + t.ele, this.obj).css("top"), utils.log("bNewTop:" + u + (u != "auto")), u != "auto" && u != 0 ? (utils.log(u), u = u.replace("px", ""), u *= 1) : u = 0, o = $("#" + e.ele, this.obj).css("top"), utils.log("aNewTop: " + o), o != "auto" && o != 0 ? (utils.log(o), o = o.replace("px", ""), o *= 1) : o = 0, utils.log(o + " - " + u);
                var a = 500,
                    f = e.ele.replace("sortItem", "") * 1,
                    l = t.ele.replace("sortItem", "") * 1,
                    c = l - f,
                    h = this;
                isNaN(c) ? a = 600 : c >= 2 && (a += c * 50), utils.log("animDuration " + a + " - " + c), $("#" + t.ele, this.obj).animate({
                    top: i - s + u
                }, a), $("#" + e.ele, this.obj).animate({
                    top: s - i + o
                }, a, function() {
                    $(".rightsort li", h.obj).removeClass("selected"), $(".rightsort p", h.obj).removeClass("selected"), $(".leftsort li", h.obj).removeClass("selected"), $(".leftsort p", h.obj).removeClass("selected"), $(".rightsort img", h.obj).removeClass("selected"), $(".leftsort img", h.obj).removeClass("selected")
                })
            }
            temp = e.value;
            var p = $("#" + e.ele, this.obj),
                d = $("#" + t.ele, this.obj);
            p.attr("id", t.ele), d.attr("id", e.ele);
            var v = parseInt(t.ele.split("sortItem")[1]);
            $("#refItem" + v, this.obj).addClass("attempted"), $("#" + t.ele, this.obj).addClass("attempted");
            var m = parseInt(e.ele.split("sortItem")[1]);
            $("#refItem" + m, this.obj).hasClass("attempted") ? $("#" + e.ele, this.obj).addClass("attempted") : $("#" + e.ele, this.obj).removeClass("attempted"), $("#sortL").find(".attempted").length == this.answers.length ? this.trigger(assessEvent.Q_STATUS, AppConst.COMPLETE) : $("#sortL").find(".attempted").length > 0 ? this.trigger(assessEvent.Q_STATUS, AppConst.PARTIAL) : this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT)
        },
        isSolved: function(ob) {
            this.userResponse = [];
            var qOptions = eval(_.clone(ob.options)),
                items = $(".rightsort li", ob.obj).sort(function(e, t) {
                    var n = e.id.replace("sortItem", "") * 1,
                        r = t.id.replace("sortItem", "") * 1;
                    return n > r ? 1 : -1
                }),
                selector = "div.checkBadge2",
                blankObjsBadges = $(".rightsort li", this.screen).find("div.checkBadge2");
            $(".rightsort li", this.screen).find("div.checkBadge2").siblings("p").length > 0 && (blankObjsBadges = $(".rightsort li", this.screen).find("div.checkBadge2").siblings("p"), selector = "p"), blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2"), utils.log(blankObjsBadges);
            var max = items.size(),
                totalCorrect = 0,
                markPerQ = parseFloat(this.maxpoints / max);
            for (var i = 0; i < max; i++) {
                var obj = new Object;
                $(items.get(i)).hasClass("attempted") ? obj.attempted = !0 : obj.attempted = !1;
                var item1 = $(items.get(i)).find("img");
                if (item1.length > 0) {
                    var itemTexts = $(items.get(i)).find("img").attr("src").split("/"),
                        itemText = itemTexts[itemTexts.length - 1];
                    obj.type = "image", obj.data = item1.attr("src").split(this.assetsPath)[1];
                    var correctAnsArray = qOptions[i].data.split("/"),
                        correctAns = correctAnsArray[correctAnsArray.length - 1]
                } else {
                    var itemText = $(items.get(i)).find("p").html();
                    obj.type = "text", obj.data = itemText;
                    var correctAns = qOptions[i].data
                }
                for (var j = 0; j < this.options.length; j++)
                    if (this.options[j].data == itemText) {
                        obj.index = j + 1;
                        break
                    }
                this.userResponse.push(obj), utils.log("matching-- ", $(items.get(i)), qOptions[i].data), correctAns == itemText ? (totalCorrect++, this.marksQbtained = this.marksQbtained + markPerQ, $(items.get(i)).find(".checkBadge2").addClass("markRight2")) : $(items.get(i)).find(".checkBadge2").addClass("markWrong2")
            }
            return this.partialAttempt || (blankObjsBadges.removeClass("markRight2"), blankObjsBadges.removeClass("markWrong2")), totalCorrect == max ? AppConst.CORRECT : totalCorrect > 0 ? AppConst.PARTIAL : AppConst.INCORRECT
        },
        handleEvaluate: function(e) {
            if (e != undefined && $(e.target).hasClass("disabled")) return;
            $(".rightsort li", this.obj).removeClass("selected"), $(".rightsort li", this.obj).find("img").removeClass("selected"), $(".leftsort li", this.obj).removeClass("selected"), $(".leftsort li", this.obj).find("img").removeClass("selected"), this.EvaluateFlag = !0;
            var t = this.isSolved(this),
                n = $("#sortL").find(".attempted").length;
            this.partialAttempt == 1 || n == this.answers.length ? t == AppConst.CORRECT ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                userResponse: this.userResponse,
                score: this.marksQbtained,
                status: AppConst.CORRECT,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: this.marksQbtained,
                status: t,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                userResponse: this.userResponse,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                responseType: this.responseType
            }), this.lockQuestion()
        },
        lockQuestion: function() {
            this.correctAnswerVisible = !1, this.changeToolbar.mode = AppConst.TOOLBAR_LOCKED, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.disableInteraction()
        },
        populateAnswers: function(answers, correctAnswerVisible) {
            $("#questionText", this.obj).find("li").unbind(assessEvent.CLICK), _.delay(this.handleLook, 200), answers.length > 0 && (this.EvaluateFlag = !0);
            var qOptions = [];
            answers.length == 0 ? qOptions = eval(_.clone(this.options)) : qOptions = eval(_.clone(answers));
            var leftOptions = eval(this.questionText),
                leftSort = "<div class='leftsort'>";
            leftSort += this.generateList(leftOptions, "sortL", "matching addsort textsort", "refItem"), leftSort += "</div>";
            var rightSort = "<div class='rightsort'>";
            answers.length == 0 || correctAnswerVisible == 0 ? (qOptions = eval(_.clone(this.options)), answers.length == 0 ? rightSort += this.generateList(qOptions, "sort", "matching textsort addsort", "sortItem", "addBadge") : rightSort += this.generateList(qOptions, "sort", "matching textsort addsort", "sortItem", "addBadge")) : (qOptions = eval(_.clone(answers)), rightSort += this.generateList(qOptions, "sort", "matching textsort addsort", "sortItem", "addBadge")), rightSort += "</div>", $("#questionText", this.obj).html(leftSort + rightSort);
            for (var i = 0; i < answers.length; i++) answers[i].attempted && ($("#refItem" + (i + 1), this.obj).addClass("attempted"), $("#sortItem" + (i + 1), this.obj).addClass("attempted"));
            $("#sortL", this.obj).find("img").length == 0 && $("#sortL", this.obj).removeClass("addsort"), $("#sort", this.obj).find("img").length == 0 ? $("#sort", this.obj).removeClass("addsort") : this.quesType = "image";
            var blankObjsBadges = $(".rightsort li", this.screen).find("div.checkBadge2"),
                blankObjs = $(".rightsort li", this.screen);
            utils.log(blankObjsBadges), blankObjsBadges.removeClass("markWrong2"), blankObjsBadges.removeClass("markRight2");
            if (correctAnswerVisible == 1)
                for (var i = 0; i < answers.length; i++) answers[i].data == this.answers[i].data ? blankObjsBadges[i].className += " markRight2" : blankObjsBadges[i].className += " markWrong2";
            var l = this.checkMaxOffWidth(leftOptions, "refItem"),
                r = this.checkMaxOffWidth(qOptions, "sortItem"),
                fontSize = 1;
            $("#sort > li").css("font-size", fontSize + "em"), $(".rightsort > ul", this.obj).hide(), (this.isTest || this.partialAttempt == 0) && !this.isReview && (blankObjsBadges.removeClass("markWrong2"), blankObjsBadges.removeClass("markRight2"), $(".rightsort li", this.screen).removeClass("disableOption")), $(".leftsort > ul", this.obj).show(), $(".rightsort > ul", this.obj).show()
        },
        resetQuestion: function(e) {
            $(".rightsort li", this.obj).removeClass("selected"), $(".rightsort p", this.obj).removeClass("selected"), $(".leftsort p", this.obj).removeClass("selected"), $(".rightsort img", this.obj).removeClass("selected"), $(".leftsort img", this.obj).removeClass("selected"), this.firstItem = null, this.secondItem = null, $("#questionText", this.obj).html(""), this.resetClicked = !0, this.numSelected = 0, this.userResponse = [], this.renderQues(), this.enableInteraction(), this.trigger(assessEvent.MARK_EMPTY, this.qId), this.EvaluateFlag = !1, this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)
        },
        resetQuestionPartial: function(e) {
            $(".rightsort li", this.obj).removeClass("selected"), $(".rightsort p", this.obj).removeClass("selected"), $(".leftsort p", this.obj).removeClass("selected"), $(".rightsort img", this.obj).removeClass("selected"), $(".leftsort img", this.obj).removeClass("selected"), this.firstItem = null, this.secondItem = null;
            var t = $("#questionText", this.obj).find("div.checkBadge2");
            $(".rightsort li", this.screen).find("div.checkBadge2").siblings("p").length > 0 && (t = $(".rightsort li", this.screen).find("div.checkBadge2").siblings("p")), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
            var n = !0,
                r = $("#sort>li", this.obj);
            t.removeClass("markRight2"), t.removeClass("markWrong2"), $(".rightsort li", this.obj).removeClass("disableOption");
            var i = [],
                s = [];
            for (var o = 0; o < this.userResponse.length; o++) {
                var u = this.userResponse[o].data;
                this.options[o].data != u ? (s.push(o + 1), i.push(this.options[o])) : (n = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar))
            }
            i = utils.randomizeArray(i, i);
            for (var o = 0; o < s.length; o++) i[o].data.indexOf(".jpg") > 0 ? $("#sortItem" + s[o], this.obj).html("<img src ='" + this.assetsPath + i[o].data + "' /><div class='checkBadge2'></div>") : $("#sortItem" + s[o], this.obj).html("<p>" + i[o].data + "</p><div class='checkBadge2'></div>");
            _.delay(this.handleLook, 200), this.numSelected = 0, this.EvaluateFlag = !1, this.resetFlag = !0, this.enableInteraction(), n == 0 ? this.trigger(assessEvent.UPDATE_RESPONSE, this.qId, {
                userResponse: this.userResponse
            }) : this.trigger(assessEvent.MARK_EMPTY, this.qId), this.disableButton(AppConst.QBTN_RESET), this.EvaluateFlag = !1, this.userResponse = []
        },
        disableButton: function(e) {
            $("#" + e, this.obj).addClass("disabled")
        },
        handleScreenExit: function() {},
        orientationchange: function(e) {
            this.handleLook()
        },
        destroy: function() {
            this.unbind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.unbind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.unbind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.unbind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.unbind(assessEvent.MARK_EMPTY, this.markEmpty), this.unbind(assessEvent.UPDATE_RESPONSE, this.updateResponse), $("#questionOptions", this.obj).find("li").unbind(), $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el).remove(), this.disableInteraction()
        }
    });
    return matchSortView
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/fibView.html", [], function() {
    return "<div id='quesWrapper<%=id%>' class='disableTemplate'>\n    <div id='ques<%=id%>' class='quesContent'>\n		<div id='activityContent'>\n			<div id='questionHeading' class='questionHeading'></div>\n			<div id='questionText' class='left'></div>\n			<div id='questionOptions'></div>\n			<div id='labelanswers'></div>\n		</div>\n	</div>\n</div>"
}), define("com/es/widgets/assessment/view/fibView", ["com/es/widgets/assessment/AssesmentLang", "com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/fibView.html"], function(AssesmentLang, utils, AppConst, assessEvent, contentTpl) {
    var fibView = Backbone.View.extend({
        modelParagraph: "",
        qId: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        itemClicked: !1,
        correctAnswerVisible: null,
        inputNo: 0,
        EvaluateFlag: !1,
        changeToolbar: {},
        maxpoints: 0,
        partialAttempt: !0,
        assetsPath: "",
        initialize: function() {
            _.bindAll(this, "handleScreenExit", "handleFibBtnClick", "handleEvaluate", "handleBlankChange"), _.bindAll(this, "enableInteraction", "destroyScroll", "resetClickFlag"), _.extend(this, Backbone.Events)
        },
        render: function() {
            this.element = this.el;
            var e = _.template(contentTpl, this.model.toJSON());
            $("#" + this.model.get("uiId") + " #content", this.$el).QAappend(e), this.screen = $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el), this.setQuestionData()
        },
        setQuestionData: function() {
            this.modelParagraph = this.model.get("modelParagraph"), this.type = this.model.get("type"), this.layout = this.model.get("questionLayout"), this.responseType = this.model.get("responseType"), this.clues = this.model.get("clues"), this.rubric = this.model.get("rubric"), this.questionText = JSON.stringify(this.model.get("questionBody")), this.leftCol = this.model.get("leftCol"), this.rightCol = this.model.get("rightCol"), this.opLayout = this.model.get("optionsLayout"), this.options = this.model.get("options"), this.answers = this.model.get("answers"), this.isTest = this.model.get("isTest"), this.isReview = this.model.get("isReview"), this.reviewData = this.model.get(""), this.qId = this.model.get("id"), this.assetsPath = this.model.get("assetPath"), this.maxpoints = parseFloat(this.model.get("maxpoints")), this.model.get("userResponse").userResponse && (this.userResponse = this.model.get("userResponse").userResponse), this.heading = this.model.get("heading"), this.partialAttempt = this.model.get("partialAttempt"), this.renderQues()
        },
        renderQues: function() {
            this.answers.length > 0, this.obj = this.screen;
            var qBody = eval(this.questionText),
                qOptions = eval(this.options),
                qStr = "",
                optionsStr = "",
                gapNo = 0,
                gapLength = 0,
                headingStr = "";
            for (var i = 0; i < this.heading.length; i++) this.heading[i].type == "image" ? headingStr += "<img src='" + this.assetsPath + this.heading[i].data + "'/>" : headingStr += "<div>" + this.heading[i].data + "</div>";
            $(".questionHeading", this.screen).html(headingStr);
            if (this.responseType == AppConst.RESPONSE_TYPE_TEXT) {
                if (this.layout == "" || this.layout == undefined) {
                    var startNewLineUl = !0,
                        flagGap = !1;
                    for (var i = 0; i < qBody.length; i++) {
                        startNewLineUl && (qStr += '<ul class="fibLine">', startNewLineUl = !1);
                        if (qBody[i] == "GAP") {
                            gapNo++;
                            var gspSize = 0;
                            for (var k = 0; k < this.answers[gapNo - 1].length; k++) gspSize < this.answers[gapNo - 1][k].length && (gspSize = this.answers[gapNo - 1][k].length, gspSize += 4);
                            gspSize = Math.min(gspSize, document.body.clientWidth / 15), gspSize = Math.max(gspSize, 4), i == 0 ? qStr += "<li class='fibLineGap'><div class='badgeWrapper'><input type='text' autocorrect='off' style='text-transform:capitalize' id='ans" + gapNo + "' size='" + gspSize + "' class='FIBblank'/><div id='badge" + gapNo + "' class='checkBadge icon '></div></div></li>" : qStr += "<li class='fibLineGap'><div class='badgeWrapper'><input type='text' autocorrect='off' autocapitalize='off' id='ans" + gapNo + "' size='" + gspSize + "' class='FIBblank'/><div id='badge" + gapNo + "' class='checkBadge icon '></div></div></li>", flagGap = !0
                        } else {
                            if (typeof qBody[i] == "object") {
                                var liClass = "finLine" + qBody[i].type;
                                qBody[i].type == "text" ? qBody[i].data.trim().indexOf(" ") == -1 && flagGap ? qStr = qStr.replace(new RegExp("</li>$"), utils.renderNode(this.assetsPath, qBody[i]) + "</li>") : qStr += utils.renderNode(this.assetsPath, qBody[i]) : qStr += '<li class="' + liClass + '">' + utils.renderNode(this.assetsPath, qBody[i]) + "</li><br />"
                            }
                            flagGap = !1
                        }
                    }
                    qStr += "</ul>", this.inputNo = gapNo
                } else if (this.layout == "2COL") {
                    qStr += "<div class='leftcol'>";
                    var lcol = eval(this.leftCol);
                    for (var i = 0; i < lcol.length; i++)
                        if (lcol[i] == "GAP") {
                            gapNo++;
                            var gspSize = 0;
                            for (var k = 0; k < this.answers[gapNo - 1].length; k++) gspSize < this.answers[gapNo - 1][k].length && (gspSize = this.answers[gapNo - 1][k].length, gspSize += 4);
                            gspSize = Math.min(gspSize, document.body.clientWidth / 15), gspSize = Math.max(gspSize, 4), i == 0 ? qStr += "<div class='badgeWrapper'><input type='text' autocorrect='off' autocapitalize='on' style='text-transform:capitalize' id='ans" + gapNo + "' size='" + gspSize + "' class='FIBblank'/><div id='badge" + gapNo + "' class='checkBadge icon'></div></div>" : qStr += "<div class='badgeWrapper'><input type='text' autocorrect='off' autocapitalize='off' id='ans" + gapNo + "' size='" + gspSize + "' class='FIBblank'/><div id='badge" + gapNo + "' class='checkBadge icon'></div></div>", this.inputNo = gapNo, utils.log("input no 2COL : " + this.inputNo)
                        } else typeof lcol[i] == "object" && (qStr += utils.renderNode(this.assetsPath, lcol[i]));
                    qStr += "</div>", qStr += "<div class='rightcol'>";
                    var rcol = eval(this.rightCol);
                    for (var i = 0; i < rcol.length; i++)
                        if (rcol[i] == "GAP") {
                            gapNo++;
                            var gspSize = 0;
                            for (var k = 0; k < this.answers[gapNo - 1].length; k++) gspSize < this.answers[gapNo - 1][k].length && (gspSize = this.answers[gapNo - 1][k].length, gspSize = gspSize);
                            style = "", i == 0 ? qStr += "<div class='badgeWrapper'><input type='text' autocorrect='off' autocapitalize='on' style='text-transform:capitalize' " + style + " id='mcqFIBans" + gapNo + "' size='" + (gspSize + 4) + "'  class='FIBblank'/><div id='badge" + gapNo + "' class='checkBadge'></div></div>" : qStr += "<div class='badgeWrapper'><input type='text' autocorrect='off' autocapitalize='off' " + style + " id='mcqFIBans" + gapNo + "' size='" + (gspSize + 4) + "'  class='FIBblank'/><div id='badge" + gapNo + "' class='checkBadge'></div></div>", this.inputNo = gapNo, utils.log("input no rightcol : " + this.inputNo)
                        } else typeof rcol[i] == "object" && (qStr += utils.renderNode(this.assetsPath, rcol[i]));
                    qStr += "</div>"
                }
            } else if (this.responseType == AppConst.RESPONSE_TYPE_PICKER) {
                for (var j = 0; j < this.options.length; j++) gapLength < this.options[j].data.length && (gapLength = this.options[j].data.length);
                this.inputNo = gapLength;
                for (var i = 0; i < qBody.length; i++) qBody[i] == "GAP" ? qStr += "<input type='text' id='FIBpick" + (i + 1) + "' size='" + gapLength + "' class='FIBblank dropdown' data-ddid='" + (i + 1) + "' readonly />" : typeof qBody[i] == "object" && (qStr += utils.renderNode(this.assetsPath, qBody[i]))
            } else if (this.responseType == AppConst.RESPONSE_TYPE_BUTTON) {
                for (var j = 0; j < this.options.length; j++) gapLength < this.options[j].data.length && (gapLength = this.options[j].data.length);
                if (this.layout == "" || this.layout == undefined)
                    for (var i = 0; i < qBody.length; i++) utils.log(qBody[i]), utils.log("qBody length::" + qBody.length), qBody[i] == "GAP" ? qStr += "<div class='badgeWrapper'><input type='text' id='mcqFIBans" + (i + 1) + "' size='" + (gapLength + 4) + "' class='FIBblank' readonly='true' disabled style='background:#fff; opacity:1' /><div class='checkBadge'></div></div>" : typeof qBody[i] == "object" && (qStr += utils.renderNode(this.assetsPath, qBody[i]));
                else if (this.layout == "2COL") {
                    qStr += "<div class='leftcol'>";
                    var lcol = eval(this.leftCol);
                    for (var i = 0; i < lcol.length; i++) utils.log(lcol[i]), utils.log("lcol length::" + lcol.length), lcol[i] == "GAP" ? qStr += "<div class='badgeWrapper'><input type='text' id='mcqFIBans" + (i + 1) + "' size='" + (gapLength + 4) + "' class='FIBblank' readonly='true' disabled style='background:#fff; opacity:1' /><div class='checkBadge'></div></div>" : typeof lcol[i] == "object" && (qStr += utils.renderNode(this.assetsPath, lcol[i]));
                    qStr += "</div>", qStr += "<div class='rightcol'>";
                    var rcol = eval(this.rightCol);
                    for (var i = 0; i < rcol.length; i++) utils.log(rcol[i]), utils.log("rcol length::" + rcol.length), rcol[i] == "GAP" ? qStr += "<div class='badgeWrapper'><input type='text' id='mcqFIBans" + (i + 1) + "' size='" + (gapLength + 4) + "' class='FIBblank' readonly='true' disabled style='background:#fff; opacity:1' /><div class='checkBadge'></div></div>" : typeof rcol[i] == "object" && (qStr += utils.renderNode(this.assetsPath, rcol[i]));
                    qStr += "</div>"
                }
                this.opLayout == "2COL" ? optionsStr = "<div class='mcq4'><ul>" : this.opLayout == "" && (optionsStr = "<div class='mcq2'><ul class='newoptions'>");
                for (var i = 0; i < qOptions.length; i++) optionsStr += "<li id='li" + (i + 1) + "' class=''><div class='indicators' id='opt" + (i + 1) + "'></div><div class='optionsText' id='text" + (i + 1) + "'>" + qOptions[i].data + "</div></li>";
                optionsStr += "</ul></div>"
            }
            $("#questionText", this.obj).html(qStr), this.fixWrappedLi(), $("#questionOptions", this.obj).html(optionsStr), this.responseType == AppConst.RESPONSE_TYPE_TEXT && ($("#questionText", this.obj).removeClass("center"), $("#questionText", this.obj).addClass("left")), this.enableInteraction();
            var loadedImageCount = 0,
                imgCount = $("#activityContent img", this.obj).length,
                imgArray = $("#activityContent img", this.obj),
                that = this;
            imgCount == 0 && this.trigger(assessEvent.TEMPLATE_READY), _.each(imgArray, function(e) {
                $(e).on("load", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.trigger(assessEvent.IMG_LOADED), that.trigger(assessEvent.TEMPLATE_READY))
                }), $(e).on("error", function() {
                    loadedImageCount++, imgCount === loadedImageCount && that.trigger(assessEvent.TEMPLATE_READY)
                })
            }), this.responseType == AppConst.RESPONSE_TYPE_TEXT && _.delay(this.destroyScroll, 1e3)
        },
        fixWrappedLi: function() {
            var e = $("#questionText", this.obj).find("ul"),
                t = $(e[0]).height();
            for (var n = 0; n < e.length; n++) {
                var r = $(e[n]).height();
                r < t && (t = r)
            }
            for (var n = 0; n < e.length; n++) {
                var r = $(e[n]).height();
                if (r > t * 2 - 5) {
                    var i = $(e[n]).find("li");
                    for (var s = 0; s < i.length; s++) {
                        if ($(i[s]).find("*").length > 0) continue;
                        var o = $(i[s]).text(),
                            u = o.split(" "),
                            a = "";
                        for (var f = 0; f < u.length; f++) a += '<li class="fibLinetext"> ' + u[f] + "</li>";
                        $(i[s]).replaceWith(a)
                    }
                }
            }
        },
        destroyScroll: function() {
            this.spinnerOpen = !1, this.iScroll != null && this.iScroll.destroy()
        },
        enableInteraction: function() {
            $("#questionOptions", this.obj).find("li").bind(assessEvent.CLICK, this.handleFibBtnClick);
            var e = this;
            if (this.responseType == AppConst.RESPONSE_TYPE_TEXT) {
                $("#questionText", this.obj).find("input").unbind(assessEvent.KEYUP).bind(assessEvent.KEYUP, this.handleBlankChange), $("#questionText", this.obj).find("input").unbind(assessEvent.CONTEXT_MENU).bind(assessEvent.CONTEXT_MENU, function(e) {
                    e.preventDefault()
                });
                var e = this;
                $("#questionText", this.obj).find("input").bind(assessEvent.CLICK, function(e) {
                    utils.isIOS() || (e.stopPropagation(), $(e.target).focus())
                })
            }
            var t = $("#questionText", this.obj).find("input"),
                n = $("#questionOptions", this.obj).find("li");
            t.removeClass("disableOption"), n.removeClass("disableOption"), t.removeAttr("readonly")
        },
        disableInteraction: function() {
            var e = $("#questionText", this.obj).find("input"),
                t = $("#questionOptions", this.obj).find("li"),
                n = $("#activityContent img", this.obj);
            e.addClass("disableOption"), t.addClass("disableOption"), e.unbind(), t.unbind(), n.off(), e.attr("readonly", "true"), $("#questionText", this.obj).find("input").unbind("contextmenu")
        },
        handleBlankChange: function(e) {
            this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT;
            var t = $("#questionText", this.obj).find("input"),
                n = 0;
            for (var r = 0; r < t.length; r++) t[r].value != "" && (n++, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE);
            this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), n == t.length ? this.trigger(assessEvent.Q_STATUS, 1) : this.trigger(assessEvent.Q_STATUS, 0)
        },
        handleFibBtnClick: function(e) {
            if (this.itemClicked == 1) return;
            this.itemClicked = !0, utils.log("check0 ", $("#" + e.target.id)), node = e.target, e.target.nodeName.toLowerCase() != "li" && (node = node.parentNode);
            var t = $(node).find(".optionsText").text();
            $("#questionText", this.obj).find(".FIBblank").val(t), this.trigger(assessEvent.Q_STATUS, 1);
            if (this.answers.length == 1) $("#questionOptions", this.obj).find(".selected").removeClass("selected");
            else if ($(node).find(".indicators").hasClass("selected")) {
                $(node).find(".indicators").removeClass("selected"), $(node).find(".optionsText").removeClass("selected");
                return
            }
            $(node).find(".indicators").addClass("selected"), $(node).find(".optionsText").addClass("selected"), this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), _.delay(this.resetClickFlag, 500)
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        populateAnswers: function(answers, correctAnswerVisible) {
            if (this.isReset && this.isTest && !this.isReview && answers == undefined) return;
            var blanks = $("#questionText", this.obj).find("input"),
                buttons = $("#questionOptions", this.obj).find("li"),
                blankObjsBadges = $("#questionText", this.obj).find("div.checkBadge");
            $("#questionOptions", this.obj).find(".indicators").removeClass("markRight"), $("#questionOptions", this.obj).find(".indicators").removeClass("markWrong"), $("#questionOptions", this.obj).find(".indicators").removeClass("selected"), $("#questionOptions", this.obj).find(".optionsText").removeClass("selected"), blanks.removeClass("focus-markright"), blanks.removeClass("focus-markwrong"), buttons.removeClass("optionHighlight"), buttons.removeClass("selected"), correctAnswerVisible == 0 ? (blankObjsBadges.removeClass("markWrong"), blankObjsBadges.removeClass("markRight"), blankObjsBadges.removeClass("selected"), $("#questionOptions", this.obj).find("div.optionsText").removeClass("Selected")) : (utils.log(answers), answers.length > 0 && (this.EvaluateFlag = !0));
            var qOptions = eval(this.options),
                max = blanks.length;
            answers.length > 0 ? buttons.attr("disabled", "disabled") : buttons.removeAttr("disabled");
            if (max == 0 && this.layout == "" && this.opLayout == "") {
                var optionButton = $(".mcq2", this.obj).find("li");
                max = optionButton.size(), answers = _.flatten(answers), optionBadges = optionButton.find(".checkBadge2"), optionBadges.removeClass("markRight"), optionBadges.removeClass("markWrong"), buttonIndex = 0;
                if (typeof answers[0] == "number") buttonIndex = answers[0] - 1;
                else
                    for (var i = 0; i < max; i++) optionValue = $(optionButton.get(i)).html().substr(0, $(optionButton.get(i)).html().search("<div")), optionValue.toLowerCase() == answers[0] && (buttonIndex = i);
                this.answers = _.flatten(this.answers), $(optionButton.get(buttonIndex)).addClass("optionHighlight"), correctAnswerVisible == 1 && (qOptions[this.answers[0] - 1].data.toLowerCase() == qOptions[buttonIndex].data.toLowerCase() ? ($(optionBadges.get(buttonIndex)).addClass("markRight"), blanks.get(buttonIndex).className += " focus-markright") : ($(optionBadges.get(buttonIndex)).addClass("markWrong"), blanks.get(buttonIndex).className += " focus-markwrong"), this.isTest && (optionBadges.removeClass("markRight"), optionBadges.removeClass("markWrong"), blanks.removeClass("focus-markright"), blanks.removeClass("focus-markwrong")))
            } else
                for (var i = 0; i < max; i++) {
                    var ans = "";
                    switch (typeof answers[i]) {
                        case "string":
                            ans = answers[i];
                            break;
                        case "number":
                            ans = qOptions[answers[i] - 1].data;
                            break;
                        case "object":
                            if (_.isArray(answers[i]))
                                if (this.responseType == AppConst.RESPONSE_TYPE_BUTTON) {
                                    var firstCorrect = answers[i][0];
                                    ans = qOptions[firstCorrect - 1].data.toLowerCase()
                                } else ans = answers[i][0];
                                else ans = answers[i].data;
                            break;
                        default:
                    }
                    ans = ans.trim();
                    var myBlank = $(blanks.get(i));
                    myBlank.val("" + ans);
                    if (this.responseType == AppConst.RESPONSE_TYPE_BUTTON) {
                        var btnIndex = 0;
                        if (answers[i] != undefined)
                            for (var k = 0; k < qOptions.length; k++)
                                if (qOptions[k].data.toLowerCase() == ans.toLowerCase()) {
                                    btnIndex = k;
                                    break
                                }
                        correctAnswerVisible == 1 && answers[i] != undefined && (ans.toLowerCase() == this.options[this.answers[0][i] - 1].data.toLowerCase() ? (blankObjsBadges.addClass("markRight"), blanks.addClass("focus-markright")) : (blankObjsBadges.addClass("markWrong"), blanks.addClass("focus-markwrong"))), answers[i] != undefined && (myButton = $(buttons.get(btnIndex)), myButton.find(".indicators").addClass("selected"), myButton.find(".optionsText").addClass("selected"), $(myButton).find(".optionsText").text() == this.options[this.answers[0][i] - 1].data.toLowerCase())
                    } else if (this.responseType == AppConst.RESPONSE_TYPE_TEXT) {
                        if (correctAnswerVisible == 1)
                            if (this.answers[i].length > 1) answers[i] != undefined && (_.indexOf(this.answers[i], ans) >= 0 ? ($(blankObjsBadges.get(i)).addClass("markRight"), blanks.get(i).className += " focus-markright") : ($(blankObjsBadges.get(i)).addClass("markWrong"), blanks.get(i).className += " focus-markwrong"));
                            else {
                                var editanswer = this.answers[i][0].replace(/[.,?]/g, "");
                                editanswer = editanswer.toLowerCase(), editanswer = editanswer.trim();
                                var userAnswer = ans.replace(/[.,?]/g, "");
                                userAnswer = userAnswer.toLowerCase(), userAnswer = userAnswer.trim(), answers[i] != undefined && (editanswer == userAnswer ? ($(blankObjsBadges.get(i)).addClass("markRight"), blanks.get(i).className += " focus-markright") : ($(blankObjsBadges.get(i)).addClass("markWrong"), blanks.get(i).className += " focus-markwrong"))
                            }
                    } else this.responseType == AppConst.RESPONSE_TYPE_PICKER && answers.length > 0 && $(".dropdown", this.obj).removeClass("dropdown");
                    (this.isTest || this.partialAttempt == 0) && !this.isReview && (blankObjsBadges.removeClass("markRight"), blankObjsBadges.removeClass("markWrong"), blanks.removeClass("focus-markright"), blanks.removeClass("focus-markwrong"))
                }
        },
        itemClicked: !1,
        handleEvaluate: function(e) {
            if (e != undefined && $(e.target).hasClass("disabled")) return;
            if (this.itemClicked == 1) return;
            this.userResponse = [], this.itemClicked = !0, this.EvaluateFlag = !0, this.isReset = !1;
            var totalInputs = 0,
                attrToCheck = null,
                blankObjs = null,
                totalCorrect = 0,
                qOptions = eval(this.options),
                attemtedInputs = 0,
                buttons = $("#questionOptions", this.obj).find("li");
            if (this.responseType == AppConst.RESPONSE_TYPE_TEXT) {
                blankObjs = $("#questionText", this.obj).find("input"), attrToCheck = "value", totalInputs = blankObjs.size();
                var markPerQ = parseFloat(this.maxpoints / totalInputs),
                    marksQbtained = 0;
                $("#questionOptions", this.obj).find(".selected").removeClass("selected"), correctTrimedAnswerArray = [];
                for (var i = 0; i < totalInputs; i++)
                    for (var k = 0; k < this.answers[i].length; k++) {
                        var correctTrimedAnswer = this.answers[i][k].replace(/[.,?]/g, "");
                        correctTrimedAnswer = correctTrimedAnswer.toLowerCase(), correctTrimedAnswerArray.push(correctTrimedAnswer)
                    }
                for (var i = 0; i < totalInputs; i++) {
                    if (blankObjs.get(i)[attrToCheck] == undefined) break;
                    blankObjs.get(i)[attrToCheck] != "" && attemtedInputs++;
                    var myanswer = "" + blankObjs.get(i)[attrToCheck];
                    this.userResponse.push(myanswer), myanswer = myanswer.toLowerCase();
                    var myTrimedAnswer = myanswer.replace(/[.,?]/g, "");
                    myTrimedAnswer = myTrimedAnswer.trim(), $("#badge" + (i + 1), this.obj).removeClass("markRight"), $("#badge" + (i + 1), this.obj).removeClass("markWrong");
                    if (totalInputs > 1)
                        if (this.answers[i].length > 1) {
                            var index = _.indexOf(this.answers[i], myTrimedAnswer);
                            index >= 0 ? ($("#badge" + (i + 1), this.obj).addClass("markRight"), blankObjs.get(i).className += " focus-markright", marksQbtained += markPerQ, totalCorrect++) : ($("#badge" + (i + 1), this.obj).addClass("markWrong"), blankObjs.get(i).className += " focus-markwrong")
                        } else
                            for (var k = 0; k < this.answers[i].length; k++) {
                                var correctTrimedAnswer = this.answers[i][k].replace(/[.,?]/g, "");
                                correctTrimedAnswer = correctTrimedAnswer.toLowerCase(), utils.log(correctTrimedAnswer + ", " + myTrimedAnswer), myTrimedAnswer == correctTrimedAnswer ? ($("#badge" + (i + 1), this.obj).addClass("markRight"), blankObjs.get(i).className += " focus-markright", marksQbtained += markPerQ, totalCorrect++) : ($("#badge" + (i + 1), this.obj).addClass("markWrong"), blankObjs.get(i).className += " focus-markwrong")
                            } else {
                                utils.log("single response");
                                var index = _.indexOf(correctTrimedAnswerArray, myTrimedAnswer);
                                index >= 0 ? ($("#badge" + (i + 1), this.obj).addClass("markRight"), $("#opt" + (i + 1), this.obj).addClass("markRight"), blankObjs.get(i).className += " focus-markright", marksQbtained += markPerQ, totalCorrect++) : ($("#badge" + (i + 1), this.obj).addClass("markWrong"), $("#opt" + (i + 1), this.obj).addClass("markWrong"), blankObjs.get(i).className += " focus-markwrong")
                            }
                }
                this.partialAttempt == 1 || attemtedInputs == totalInputs ? totalCorrect >= totalInputs ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: marksQbtained,
                    maxScore: this.maxpoints,
                    status: AppConst.CORRECT,
                    type: this.type,
                    title: this.title
                }) : totalCorrect > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: marksQbtained,
                    maxScore: this.maxpoints,
                    status: AppConst.PARTIAL,
                    type: this.type,
                    title: this.title
                }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                    userResponse: this.userResponse,
                    score: marksQbtained,
                    maxScore: this.maxpoints,
                    status: AppConst.INCORRECT,
                    type: this.type,
                    title: this.title
                }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                    userResponse: this.userResponse,
                    maxScore: this.maxpoints,
                    score: marksQbtained,
                    type: this.type,
                    title: this.title
                })
            } else if (this.responseType == AppConst.RESPONSE_TYPE_BUTTON || this.responseType == AppConst.RESPONSE_TYPE_PICKER) {
                blankObjs = $("#questionText", this.obj).find("input"), blankObjsBadges = $("#questionText", this.obj).find("div.checkBadge"), attrToCheck = "value", totalInputs = blankObjs.size();
                var markPerQ = parseFloat(this.maxpoints / totalInputs),
                    marksQbtained = 0,
                    attemtedInputs = 0;
                if (totalInputs == 0 && this.layout == "" && this.opLayout == "") {
                    optionButtons = $(".mcq2", this.obj).find("li.selected"), optionButtonBadges = $("li.selected", this.obj).find(".checkBadge2"), totalCorrect = 0, correctAnswers = _.flatten(this.options), correctAnswerIndex = _.flatten(this.answers), $("#questionOptions", this.obj).find(".selected").removeClass("selected");
                    for (var i = 0; i < optionButtons.size(); i++) option = $(optionButtons.get(i)), optionBadge = option.find(".checkBadge2"), optionValue = option.html().substr(0, option.html().search("<div")), optionValue != "" && attemtedInputs++, this.userResponse.push(optionValue), correct = 0, correctAnswers[correctAnswerIndex[0] - 1].data.toLowerCase() == optionValue.toLowerCase() && correct++, option.addClass("optionHighlight"), correct > 0 && (marksQbtained += markPerQ, totalCorrect++);
                    this.partialAttempt == 1 || attemtedInputs == totalInputs ? totalCorrect >= correctAnswerIndex.length ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                        userResponse: this.userResponse,
                        score: marksQbtained,
                        status: AppConst.CORRECT
                    }) : totalCorrect > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                        userResponse: this.userResponse,
                        score: marksQbtained,
                        status: AppConst.PARTIAL
                    }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                        userResponse: this.userResponse,
                        score: marksQbtained,
                        status: AppConst.INCORRECT
                    }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                        userResponse: this.userResponse,
                        maxScore: this.maxpoints
                    })
                } else {
                    for (var i = 0; i < totalInputs; i++) {
                        blankObjs.val() != "" && attemtedInputs++;
                        var myanswer = "" + blankObjs.val();
                        this.userResponse.push(myanswer), myanswer = myanswer.toLowerCase();
                        if (this.responseType == AppConst.RESPONSE_TYPE_BUTTON)
                            for (var k = 0; k < this.answers[i].length; k++) {
                                var correctAnswer = this.options[this.answers[i][k] - 1].data.toLowerCase();
                                myanswer == correctAnswer ? (marksQbtained += markPerQ, blankObjsBadges.addClass("markRight"), blankObjsBadges.addClass("focus-markright"), totalCorrect++) : (blankObjsBadges.addClass("markWrong"), blankObjsBadges.addClass("focus-markwrong"));
                                for (var j = 0; j < qOptions.length; j++)
                                    if (qOptions[j].data.toLowerCase() == myanswer) {
                                        var myButton = buttons.get(j);
                                        $(myButton).find(".indicators").addClass("selected"), $(myButton).find(".optionsText").addClass("selected")
                                    }
                            } else {
                                var correctAnswer = this.options[this.answers[i] - 1].data.toLowerCase();
                                myanswer == correctAnswer ? (marksQbtained += markPerQ, blankObjsBadges.addClass("markRight"), blankObjsBadges.addClass("focus-markright"), totalCorrect++) : (blankObjsBadges.addClass("markWrong"), blankObjsBadges.addClass("focus-markwrong"))
                            }
                    }
                    this.partialAttempt == 1 || attemtedInputs == totalInputs ? totalCorrect >= totalInputs ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                        userResponse: this.userResponse,
                        score: marksQbtained,
                        status: AppConst.CORRECT
                    }) : totalCorrect > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                        userResponse: this.userResponse,
                        score: marksQbtained,
                        status: AppConst.PARTIAL
                    }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                        userResponse: this.userResponse,
                        score: marksQbtained,
                        status: AppConst.INCORRECT
                    }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                        userResponse: this.userResponse,
                        maxScore: this.maxpoints
                    })
                }
            }
            this.lockQuestion(), _.delay(this.resetClickFlag, 500)
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        lockQuestion: function() {
            this.correctAnswerVisible = !1, this.changeToolbar.mode = AppConst.TOOLBAR_LOCKED, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.disableInteraction()
        },
        resetQuestion: function(e) {
            this.isReset = !0;
            var t = $("#questionText", this.obj).find("input"),
                n = $("#questionText", this.obj).find("div.checkBadge"),
                r = $("#questionOptions", this.obj).find(".selected");
            n.removeClass("markRight"), n.removeClass("markWrong"), r.removeClass("markRight"), r.removeClass("markWrong"), r.removeClass("selected"), t.removeClass("focus-markright"), t.removeClass("focus-markwrong");
            var i = $(".mcq2", this.obj).find(".checkBadge2");
            i.size() > 0 && (i.removeClass("markRight"), i.removeClass("markWrong")), $("#questionText input", this.obj).val(""), this.responseType == AppConst.RESPONSE_TYPE_TEXT && $("#questionText input", this.obj).removeAttr("readonly"), $("#questionOptions", this.obj).find(".selected").removeClass("selected"), $("#questionOptions", this.obj).find("li").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("li").removeAttr("disabled"), this.userResponse = [], this.enableInteraction(), this.trigger(assessEvent.MARK_EMPTY, this.qId), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.trigger(assessEvent.Q_STATUS, 0), this.EvaluateFlag = !1
        },
        resetQuestionPartial: function(e) {
            this.optionSelected = "", this.targetSelected = "";
            var t = !0;
            $("#questionOptions", this.obj).find(".selected").removeClass("selected"), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
            var n = $("#questionText", this.obj).find("input"),
                r = $("#questionText", this.obj).find("div.checkBadge"),
                i = $("#questionOptions", this.obj).find("li");
            r.removeClass("markWrong"), r.removeClass("markRight"), blanks.removeClass("focus-markright"), blanks.removeClass("focus-markwrong");
            if (this.userResponse.length > 0)
                if (this.responseType == AppConst.RESPONSE_TYPE_TEXT)
                    for (var s = 0; s < n.length; s++)
                        if (this.answers[s].length > 1)
                            if (_.indexOf(this.answers[s], this.userResponse[s].trim()) < 0) {
                                var o = $(n.get(s));
                                o.val(""), this.userResponse[s] = ""
                            } else t = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
                            else if (this.userResponse[s].trim() != this.answers[s][0].replace(/[.,?]/g, "").toLowerCase()) {
                var o = $(n.get(s));
                o.val(""), this.userResponse[s] = ""
            } else t = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
            else {
                for (var s = 0; s < n.length; s++)
                    if (this.userResponse[s] != this.options[this.answers[s][0] - 1].data.toLowerCase()) {
                        var o = $(n.get(s));
                        o.val(""), this.userResponse[s] = ""
                    } else t = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
                var u = this.userResponse[0];
                for (var s = 0; s < this.options.length; s++)
                    if (this.options[s].data.toLowerCase() == u) {
                        var a = i.get(s);
                        $(a).find(".indicators").addClass("selected"), $(a).find(".optionsText").addClass("selected")
                    }
            }
            n.removeClass("disableOption"), i.removeClass("disableOption"), i.removeClass("optionHighlight"), this.EvaluateFlag = !1, this.correctAnswerVisible = !1, this.enableInteraction(), t == 0 ? this.trigger(assessEvent.UPDATE_RESPONSE, this.qId, {
                userResponse: this.userResponse
            }) : this.trigger(assessEvent.MARK_EMPTY, this.qId), this.disableButton(AppConst.QBTN_RESET)
        },
        disableButton: function(e) {
            $("#" + e, this.obj).addClass("disabled")
        },
        handleScreenExit: function() {},
        orientationchange: function(e) {},
        destroy: function() {
            this.unbind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.unbind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.unbind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.unbind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.unbind(assessEvent.MARK_EMPTY, this.markEmpty), this.unbind(assessEvent.UPDATE_RESPONSE, this.updateResponse), this.unbind(assessEvent.MARK_ANSWER, this.handleMarkAnswer), $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el).remove(), this.disableInteraction()
        }
    });
    return fibView
}), define("com/es/widgets/assessment/model/fibVO", [], function() {
    var e = Backbone.Model.extend({
        id: "",
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        heading: "",
        partialAttempt: !0,
        feedback: []
    });
    return e
});
var SpinningWheel = {
    cellHeight: 44,
    friction: .003,
    slotData: [],
    handleEvent: function(e) {
        e.type == "touchstart" ? (this.lockScreen(e), e.currentTarget.id == "sw-cancel" || e.currentTarget.id == "sw-done" ? (e.currentTarget.className = "sw-pressed", this.tapUp(e)) : e.currentTarget.id == "sw-frame" && this.scrollStart(e)) : e.type == "touchmove" ? (this.lockScreen(e), e.currentTarget.id == "sw-cancel" || e.currentTarget.id == "sw-done" ? this.tapCancel(e) : e.currentTarget.id == "sw-frame" && this.scrollMove(e)) : e.type == "touchend" ? e.currentTarget.id == "sw-cancel" || e.currentTarget.id == "sw-done" ? this.tapUp(e) : e.currentTarget.id == "sw-frame" && this.scrollEnd(e) : e.type == "webkitTransitionEnd" ? e.target.id == "sw-wrapper" ? this.destroy() : this.backWithinBoundaries(e) : e.type == "orientationchange" ? this.onOrientationChange(e) : e.type == "scroll" && this.onScroll(e)
    },
    onOrientationChange: function(e) {
        window.scrollTo(0, 0), this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px", this.calculateSlotsWidth()
    },
    onScroll: function(e) {
        this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px"
    },
    lockScreen: function(e) {
        e.preventDefault(), e.stopPropagation()
    },
    reset: function() {
        this.slotEl = [], this.activeSlot = null, this.swWrapper = undefined, this.swSlotWrapper = undefined, this.swSlots = undefined, this.swFrame = undefined
    },
    calculateSlotsWidth: function() {
        var e = this.swSlots.getElementsByTagName("div");
        for (var t = 0; t < e.length; t += 1) this.slotEl[t].slotWidth = e[t].offsetWidth
    },
    create: function() {
        var e, t, n, r, i;
        this.reset(), i = document.createElement("div"), i.id = "sw-wrapper", i.style.top = window.innerHeight + window.pageYOffset + "px", i.style.webkitTransitionProperty = "-webkit-transform", i.innerHTML = '<div id="sw-header"><div id="sw-cancel">Cancel</div><div id="sw-done">Done</div></div><div id="sw-slots-wrapper"><div id="sw-slots"></div></div><div id="sw-frame"></div>', document.body.appendChild(i), this.swWrapper = i, this.swSlotWrapper = document.getElementById("sw-slots-wrapper"), this.swSlots = document.getElementById("sw-slots"), this.swFrame = document.getElementById("sw-frame");
        for (t = 0; t < this.slotData.length; t += 1) {
            r = document.createElement("ul"), n = "";
            for (e in this.slotData[t].values) n += "<li>" + this.slotData[t].values[e] + "<" + "/li>";
            r.innerHTML = n, i = document.createElement("div"), i.className = this.slotData[t].style, i.appendChild(r), this.swSlots.appendChild(i), r.slotPosition = t, r.slotYPosition = 0, r.slotWidth = 0, r.slotMaxScroll = this.swSlotWrapper.clientHeight - r.clientHeight - 86, r.style.webkitTransitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)", this.slotEl.push(r), this.slotData[t].defaultValue && this.scrollToValue(t, this.slotData[t].defaultValue)
        }
        this.calculateSlotsWidth(), document.addEventListener("touchstart", this, !1), document.addEventListener("touchmove", this, !1), window.addEventListener("orientationchange", this, !0), window.addEventListener("scroll", this, !0), document.getElementById("sw-cancel").addEventListener("touchstart", this, !1), document.getElementById("sw-done").addEventListener("touchstart", this, !1), this.swFrame.addEventListener("touchstart", this, !1)
    },
    open: function() {
        this.create(), this.swWrapper.style.webkitTransitionTimingFunction = "ease-out", this.swWrapper.style.webkitTransitionDuration = "400ms", this.swWrapper.style.webkitTransform = "translate3d(0, -260px, 0)"
    },
    destroy: function() {
        this.swWrapper.removeEventListener("webkitTransitionEnd", this, !1), this.swFrame.removeEventListener("touchstart", this, !1), document.getElementById("sw-cancel").removeEventListener("touchstart", this, !1), document.getElementById("sw-done").removeEventListener("touchstart", this, !1), document.removeEventListener("touchstart", this, !1), document.removeEventListener("touchmove", this, !1), window.removeEventListener("orientationchange", this, !0), window.removeEventListener("scroll", this, !0), this.slotData = [], this.cancelAction = function() {
            return !1
        }, this.cancelDone = function() {
            return !0
        }, this.reset(), document.body.removeChild(document.getElementById("sw-wrapper"))
    },
    close: function(e) {
        this.swWrapper.style.webkitTransitionTimingFunction = "ease-in", this.swWrapper.style.webkitTransitionDuration = "400ms", this.swWrapper.style.webkitTransform = "translate3d(0, 0, 0)", this.swWrapper.addEventListener("webkitTransitionEnd", this, !1)
    },
    addSlot: function(e, t, n) {
        t || (t = ""), t = t.split(" ");
        for (var r = 0; r < t.length; r += 1) t[r] = "sw-" + t[r];
        t = t.join(" ");
        var i = {
            values: e,
            style: t,
            defaultValue: n
        };
        this.slotData.push(i)
    },
    getSelectedValues: function() {
        var e, t, n, r, i = [],
            s = [];
        for (n in this.slotEl) {
            this.slotEl[n].removeEventListener("webkitTransitionEnd", this, !1), this.slotEl[n].style.webkitTransitionDuration = "0", this.slotEl[n].slotYPosition > 0 ? this.setPosition(n, 0) : this.slotEl[n].slotYPosition < this.slotEl[n].slotMaxScroll && this.setPosition(n, this.slotEl[n].slotMaxScroll), e = -Math.round(this.slotEl[n].slotYPosition / this.cellHeight), t = 0;
            for (r in this.slotData[n].values) {
                if (t == e) {
                    i.push(r), s.push(this.slotData[n].values[r]);
                    break
                }
                t += 1
            }
        }
        return {
            keys: i,
            values: s
        }
    },
    setPosition: function(e, t) {
        this.slotEl[e].slotYPosition = t, this.slotEl[e].style.webkitTransform = "translate3d(0, " + t + "px, 0)"
    },
    scrollStart: function(e) {
        var t = e.targetTouches[0].clientX - this.swSlots.offsetLeft,
            n = 0;
        for (var r = 0; r < this.slotEl.length; r += 1) {
            n += this.slotEl[r].slotWidth;
            if (t < n) {
                this.activeSlot = r;
                break
            }
        }
        if (this.slotData[this.activeSlot].style.match("readonly")) return this.swFrame.removeEventListener("touchmove", this, !1), this.swFrame.removeEventListener("touchend", this, !1), !1;
        this.slotEl[this.activeSlot].removeEventListener("webkitTransitionEnd", this, !1), this.slotEl[this.activeSlot].style.webkitTransitionDuration = "0";
        var i = window.getComputedStyle(this.slotEl[this.activeSlot]).webkitTransform;
        return i = (new WebKitCSSMatrix(i)).m42, i != this.slotEl[this.activeSlot].slotYPosition && this.setPosition(this.activeSlot, i), this.startY = e.targetTouches[0].clientY, this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition, this.scrollStartTime = e.timeStamp, this.swFrame.addEventListener("touchmove", this, !1), this.swFrame.addEventListener("touchend", this, !1), !0
    },
    scrollMove: function(e) {
        var t = e.targetTouches[0].clientY - this.startY;
        if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) t /= 2;
        this.setPosition(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition + t), this.startY = e.targetTouches[0].clientY, e.timeStamp - this.scrollStartTime > 80 && (this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition, this.scrollStartTime = e.timeStamp)
    },
    scrollEnd: function(e) {
        this.swFrame.removeEventListener("touchmove", this, !1), this.swFrame.removeEventListener("touchend", this, !1);
        if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) return this.scrollTo(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition > 0 ? 0 : this.slotEl[this.activeSlot].slotMaxScroll), !1;
        var t = this.slotEl[this.activeSlot].slotYPosition - this.scrollStartY;
        if (t < this.cellHeight / 1.5 && t > -this.cellHeight / 1.5) return this.slotEl[this.activeSlot].slotYPosition % this.cellHeight && this.scrollTo(this.activeSlot, Math.round(this.slotEl[this.activeSlot].slotYPosition / this.cellHeight) * this.cellHeight, "100ms"), !1;
        var n = e.timeStamp - this.scrollStartTime,
            r = 2 * t / n / this.friction,
            i = this.friction / 2 * r * r;
        r < 0 && (r = -r, i = -i);
        var s = this.slotEl[this.activeSlot].slotYPosition + i;
        return s > 0 ? (s /= 2, r /= 3, s > this.swSlotWrapper.clientHeight / 4 && (s = this.swSlotWrapper.clientHeight / 4)) : s < this.slotEl[this.activeSlot].slotMaxScroll ? (s = (s - this.slotEl[this.activeSlot].slotMaxScroll) / 2 + this.slotEl[this.activeSlot].slotMaxScroll, r /= 3, s < this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4 && (s = this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4)) : s = Math.round(s / this.cellHeight) * this.cellHeight, this.scrollTo(this.activeSlot, Math.round(s), Math.round(r) + "ms"), !0
    },
    scrollTo: function(e, t, n) {
        this.slotEl[e].style.webkitTransitionDuration = n ? n : "100ms", this.setPosition(e, t ? t : 0), (this.slotEl[e].slotYPosition > 0 || this.slotEl[e].slotYPosition < this.slotEl[e].slotMaxScroll) && this.slotEl[e].addEventListener("webkitTransitionEnd", this, !1)
    },
    scrollToValue: function(e, t) {
        var n, r, i;
        this.slotEl[e].removeEventListener("webkitTransitionEnd", this, !1), this.slotEl[e].style.webkitTransitionDuration = "0", r = 0;
        for (i in this.slotData[e].values) {
            if (i == t) {
                n = r * this.cellHeight, this.setPosition(e, n);
                break
            }
            r -= 1
        }
    },
    backWithinBoundaries: function(e) {
        return e.target.removeEventListener("webkitTransitionEnd", this, !1), this.scrollTo(e.target.slotPosition, e.target.slotYPosition > 0 ? 0 : e.target.slotMaxScroll, "150ms"), !1
    },
    tapDown: function(e) {
        e.currentTarget.addEventListener("touchmove", this, !1), e.currentTarget.addEventListener("touchend", this, !1), e.currentTarget.className = "sw-pressed"
    },
    tapCancel: function(e) {
        e.currentTarget.removeEventListener("touchmove", this, !1), e.currentTarget.removeEventListener("touchend", this, !1), e.currentTarget.className = ""
    },
    tapUp: function(e) {
        this.tapCancel(e), e.currentTarget.id == "sw-cancel" ? this.cancelAction(e) : this.doneAction(e), this.close(e)
    },
    setCancelAction: function(e) {
        this.cancelAction = e
    },
    setDoneAction: function(e) {
        this.doneAction = e
    },
    cancelAction: function() {
        return !1
    },
    cancelDone: function() {
        return !0
    }
};
define("com/external/spinningwheel-min", function() {}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/fibDropDown.html", [], function() {
    return "<div class='disableTemplate' id='quesWrapper<%=id%>'>\n    <div id='ques<%=id%>' class='quesContent'>\n        <div id='activityContent'>\n            <div id='questionHeading' class='questionHeading'></div>\n            <div id='questionMedia' class='left question-media'></div>\n            <div id='questionText' class='left'></div>\n            <div id='questionOptions'></div>\n            <div id='labelanswers'></div>\n        </div>\n    </div>\n</div>"
}), define("com/es/widgets/assessment/view/fibDropDown", ["com/es/widgets/assessment/AssesmentLang", "com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/external/spinningwheel-min", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/fibDropDown.html"], function(AssesmentLang, utils, AppConst, assessEvent, spinningwheel, contentTpl) {
    var fibDropDown = Backbone.View.extend({
        modelParagraph: "",
        qId: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        itemClicked: !1,
        correctAnswerVisible: null,
        inputNo: 0,
        EvaluateFlag: !1,
        changeToolbar: {},
        spinnerOpen: !1,
        maxpoints: 0,
        attemptMethod: AppConst.DROPDOWN_SPINNINGWHEEL,
        partialAttempt: !0,
        title: "",
        assetsPath: "",
        initialize: function() {
            _.bindAll(this, "handleScreenExit", "handleEvaluate", "handleFibBtnClick"), _.bindAll(this, "enableInteraction", "destroyScroll", "resetClickFlag", "showDropDown", "spinningWheelCancelClick", "spinningWheelDoneClick"), _.extend(this, Backbone.Events)
        },
        render: function() {
            this.element = this.el;
            var e = _.template(contentTpl, this.model.toJSON());
            $("#" + this.model.get("uiId") + " #content", this.$el).QAappend(e), this.screen = $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el), this.setQuestionData()
        },
        setQuestionData: function() {
            this.modelParagraph = this.model.get("modelParagraph"), this.type = this.model.get("type"), this.layout = this.model.get("questionLayout"), this.responseType = this.model.get("responseType"), this.clues = this.model.get("clues"), this.rubric = this.model.get("rubric"), this.questionText = JSON.stringify(this.model.get("questionBody")), this.questionMedia = this.model.get("questionMedia"), this.optionsMedia = this.model.get("optionsMedia"), this.leftCol = this.model.get("leftCol"), this.rightCol = this.model.get("rightCol"), this.opLayout = this.model.get("optionsLayout"), this.options = this.model.get("options"), this.answers = this.model.get("answers"), this.isTest = this.model.get("isTest"), this.isReview = this.model.get("isReview"), this.reviewData = this.model.get(""), this.qId = this.model.get("id"), this.maxpoints = parseFloat(this.model.get("maxpoints")), this.model.get("userResponse").userResponse && (this.userResponse = this.model.get("userResponse").userResponse), this.heading = this.model.get("heading"), utils.isDesktopBrowser() ? this.attemptMethod = AppConst.DROPDOWN_NATIVE : this.attemptMethod = AppConst.DROPDOWN_SPINNINGWHEEL, this.partialAttempt = this.model.get("partialAttempt"), this.title = this.model.get("title"), this.assetsPath = this.model.get("assetPath"), this.renderQues()
        },
        renderQues: function() {
            this.answers.length > 0;
            for (var i = 0; i < this.options.length; i++)
                for (var j = 0; j < this.options[i].length; j++) this.options[i][j].data = this.options[i][j].data.replace(/(<([^>]+)>)/ig, "");
            this.drags = [], this.drops = [], this.dropObjs = [], this.obj = this.screen;
            var qBody = eval(this.questionText),
                qOptions = eval(this.options),
                qStr = "",
                optionsStr = "",
                gapNo = 0,
                gapLength = 0,
                imgcnt = 0;
            if (this.type == AppConst.QUESTION_TYPE_FIBTABLE) {
                var Body = [],
                    options = [];
                for (var i = 0; i < qBody.length; i++) {
                    options[i] = [], Body.push(qBody[i]), Body.push("GAP"), Body.push({
                        data: " <br/>",
                        type: "text"
                    });
                    for (var j = 0; j < qOptions.length; j++) options[i].push(qOptions[j])
                }
                qBody = Body, qOptions = options, this.options = qOptions, this.questionText = qBody
            }
            if (this.heading.length == 0) $(".questionHeading", this.screen).hide();
            else {
                var headingStr = "";
                for (var i = 0; i < this.heading.length; i++) this.heading[i].type == "image" ? headingStr += "<img src='" + this.assetsPath + this.heading[i].data + "'></img>" : headingStr += "<div>" + this.heading[i].data + "</div>";
                $(".questionHeading", this.screen).html(headingStr)
            } if (this.questionMedia.length == 0) $("#questionMedia", this.screen).hide();
            else {
                var qMediaStr = "";
                for (var i = 0; i < this.questionMedia.length; i++) {
                    imgcnt += 1;
                    var id = "fibdd-img-" + imgcnt;
                    qMediaStr += utils.renderNode(this.assetsPath, this.questionMedia[i], id)
                }
                $("#questionMedia", this.screen).html(qMediaStr)
            }
            $("#questionMedia img", this.screen).bind(assessEvent.CLICK, function() {
                window.open($("#questionMedia img").data("url"))
            });
            var startNewLineUl = !0,
                flagGap = !1;
            for (var i = 0; i < qBody.length; i++) {
                startNewLineUl && (qStr += "<ul class='fibLine'>", startNewLineUl = !1);
                if (qBody[i] == "GAP") {
                    var index = 0;
                    if (this.attemptMethod == AppConst.DROPDOWN_NATIVE) {
                        qStr += "<li class='fibLineGap'><div class='inputDrop'><div class='badgeWrapper' id='group_drop" + gapNo + "'><select id='drop" + gapNo + "' class='dropdown' readonly='readonly'  data-ddid='" + (i + 1) + "' ><option value='-1'></option>";
                        for (var j = 0; j < this.options[gapNo].length; j++) qStr += "<option value='" + index + "'>" + this.options[gapNo][j].data + "</option>", index++;
                        qStr += "</select><div class='' id='arrow_drop" + gapNo + "'></div><div id='badge" + gapNo + "' class='checkBadge5 icon'></div></div></div></li>"
                    } else {
                        gapLength = 4;
                        for (var j = 0; j < this.options[gapNo].length; j++) gapLength < this.options[gapNo][j].data.length && (gapLength = this.options[gapNo][j].data.length);
                        gapLength += 2, qStr += "<li class='fibLineGap'><div class='inputDrop'><div class='badgeWrapper' id='group_drop" + gapNo + "'><input type='text' id='drop" + gapNo + "' size='" + parseInt(parseInt(gapLength)) + "' class='dropdown' data-ddid='" + (i + 1) + "' /><span class='icon icon-input-arrow'></span>", qStr += "<div class='' id='arrow_drop" + gapNo + "'></div><div id='badge" + gapNo + "' class='checkBadge5 icon'></div></div></div></li>"
                    }
                    gapNo++, this.drops.push("drop" + gapNo), flagGap = !0
                } else {
                    if (typeof qBody[i] == "object") {
                        var liClass = "fibLine" + qBody[i].type;
                        if (qBody[i].type == "text")
                            if (qBody[i].data.match(/<[bB][rR]\s*[/]?>/)) {
                                var arr = qBody[i].data.split(/<[bB][rR]\s*[/]?>/),
                                    txt = arr[0];
                                txt.trim() != "" && (txt.trim().indexOf(" ") == -1 && flagGap ? qStr = qStr.replace(new RegExp("</li>$"), utils.renderNode(this.assetsPath, {
                                    type: "text",
                                    data: txt
                                }) + "</li>") : qStr += utils.renderNode(this.assetsPath, {
                                    type: "text",
                                    data: txt
                                })), qStr += "</ul><ul class='fibLine'>";
                                for (var j = 1; j < arr.length; j++) {
                                    var txt = arr[j];
                                    txt.trim() != "" ? qStr += utils.renderNode(this.assetsPath, {
                                        type: "text",
                                        data: txt
                                    }) : j != 1 && (qStr += "<br/>")
                                }
                            } else qStr += utils.renderNode(this.assetsPath, qBody[i]);
                            else {
                                imgcnt += 1;
                                var id = "fibdd-img-" + imgcnt;
                                qStr += '<li class="' + liClass + '">' + utils.renderNode(this.assetsPath, qBody[i], id) + "</li>"
                            }
                    }
                    flagGap = !1
                }
            }
            qStr += "</ul>", utils.log("FIBDD", qStr), this.inputNo = gapNo, $("#questionText", this.obj).html(qStr), this.fixWrappedLi(), $(".dropdown", this.obj).css("max-width", $("#questionText", this.obj).width() - 10), $("#questionOptions", this.obj).html(optionsStr), $("#questionText", this.obj).removeClass("center"), $("#questionText", this.obj).addClass("left"), this.enableInteraction();
            var that = this,
                ref = this.element,
                loadedImageCount = 0,
                imgArray = $("#activityContent img", this.obj),
                imgCount = imgArray.length;
            imgCount == 0 && this.trigger(assessEvent.TEMPLATE_READY), _.each(imgArray, function(e) {
                $(e).on("load", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.trigger(assessEvent.IMG_LOADED), that.trigger(assessEvent.TEMPLATE_READY))
                }), $(e).on("error", function() {
                    loadedImageCount++, imgCount === loadedImageCount && that.trigger(assessEvent.TEMPLATE_READY)
                })
            }), this.responseType == AppConst.RESPONSE_TYPE_TEXT && _.delay(this.destroyScroll, 1e3)
        },
        fixWrappedLi: function() {
            var e = $("#questionText", this.obj).find("ul"),
                t = $(e[0]).height();
            for (var n = 0; n < e.length; n++) {
                var r = $(e[n]).height();
                r < t && (t = r)
            }
            for (var n = 0; n < e.length; n++) {
                var r = $(e[n]).height();
                if (r > t * 2 - 5) {
                    var i = $(e[n]).find("li");
                    for (var s = 0; s < i.length; s++) {
                        if ($(i[s]).find("*").length > 0) continue;
                        var o = $(i[s]).text(),
                            u = o.split(" "),
                            a = "";
                        for (var f = 0; f < u.length; f++) a += '<li class="fibLinetext"> ' + u[f] + "</li>";
                        $(i[s]).replaceWith(a)
                    }
                }
            }
        },
        destroyScroll: function() {
            this.spinnerOpen = !1, this.iScroll != null && this.iScroll.destroy()
        },
        enableInteraction: function() {
            var e = this,
                t = $(".dropdown", this.obj);
            t.removeClass("disableOption"), t.removeAttr("disabled"), $(".checkBadge5", this.obj).css("z-index", -1), $("#questionText", this.obj).removeClass("disabled"), this.attemptMethod == AppConst.DROPDOWN_NATIVE ? $(".dropdown", this.obj).unbind().bind(assessEvent.CHANGE, function(t) {
                _.delay(e.handleFibBtnClick, 500, t)
            }) : $(".badgeWrapper", this.obj).unbind().bind(assessEvent.CLICK, e.showDropDown)
        },
        showDropDown: function(e) {
            if (this.spinnerOpen == 0) {
                var t = {};
                t.e = e, t.align = "bottom", t.position = 50, this.disableInteraction(), utils.log(e.target.id), $(e.target).hasClass("icon-input-arrow") ? this.currentDropDown = $(e.target).prev().attr("id") : this.currentDropDown = e.target.id;
                var n = this.currentDropDown.split("drop")[1];
                this.gapIndex = n;
                var r = new Object;
                for (var i = 0; i < this.options[n].length; i++) r[i + 1] = this.options[n][i].data;
                return SpinningWheel.addSlot(r, "", this.key || 1), SpinningWheel.setCancelAction(this.spinningWheelCancelClick), SpinningWheel.setDoneAction(this.spinningWheelDoneClick), SpinningWheel.open(t), this.spinnerOpen = !0, !1
            }
        },
        spinningWheelCancelClick: function() {
            this.spinnerOpen = !1, this.enableInteraction()
        },
        spinningWheelDoneClick: function() {
            this.spinnerOpen = !1, this.enableInteraction();
            var e = this.gapIndex,
                t = SpinningWheel.getSelectedValues();
            $("#drop" + e, this.screen).val(t.values), this.key = t.keys, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)
        },
        disableInteraction: function() {
            var e = $(".dropdown", this.obj),
                t = $("#activityContent img", this.obj);
            e.addClass("disableOption"), e.attr("disabled", "disabled"), e.unbind(assessEvent.CLICK), $("#questionText", this.obj).addClass("disabled"), $(".checkBadge5", this.obj).css("z-index", 0), $(".badgeWrapper", this.obj).unbind(), $("#questionMedia img", this.screen).unbind(), $(".dropdown", this.obj).unbind(), $(t).off()
        },
        handleFibBtnClick: function(e) {
            this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT;
            var t = $("#questionText", this.obj).find(".dropdown"),
                n = 0;
            for (var r = 0; r < t.length; r++) {
                var i = t[r];
                i.options[i.selectedIndex].value != -1 && (n++, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE)
            }
            this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), n == t.length ? this.trigger(assessEvent.Q_STATUS, AppConst.COMPLETE) : n > 0 ? this.trigger(assessEvent.Q_STATUS, AppConst.PARTIAL) : this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT)
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        populateAnswers: function(e, t) {
            if (this.isReset && this.isTest && !this.isReview && e == undefined) return;
            var n = $("#questionText", this.obj).find("input"),
                r = $("#questionText", this.obj).find("div.checkBadge5");
            $("#questionText", this.obj).find(".dropdown").removeClass("focus-markright"), $("#questionText", this.obj).find(".dropdown").removeClass("focus-markwrong"), t == 0 ? (r.removeClass("markWrong"), r.removeClass("markRight")) : e.length > 0 && (this.EvaluateFlag = !0);
            if (e.length > 0)
                if (t != 0)
                    for (var i = 0; i < this.options.length; i++) e[i] >= 0 ? (e[i] == this.answers[i] ? ($("#badge" + i, this.obj).addClass("markRight"), $("#questionText", this.obj).find(".dropdown").get(i).className += " focus-markright") : ($("#badge" + i, this.obj).addClass("markWrong"), $("#questionText", this.obj).find(".dropdown").get(i).className += " focus-markwrong"), this.attemptMethod == AppConst.DROPDOWN_NATIVE ? $("#drop" + [i], this.screen).val(parseInt(e[i])) : $("#drop" + [i], this.screen).val(this.options[i][e[i]].data)) : ($("#badge" + i, this.obj).addClass("markWrong"), $("#questionText", this.obj).find(".dropdown").get(i).className += " focus-markwrong", this.attemptMethod == AppConst.DROPDOWN_NATIVE ? $("#drop" + i, this.screen).val(-1) : $("#drop" + i, this.screen).val(""));
                else {
                    for (var i = 0; i < this.options.length; i++) this.attemptMethod == AppConst.DROPDOWN_NATIVE ? $("#drop" + [i], this.screen).val(e[i]) : e[i] >= 0 ? $("#drop" + [i], this.screen).val(this.options[i][e[i]].data) : $("#drop" + [i], this.screen).val(""), $("#badge" + [i], this.screen).removeClass("markWrong"), $("#badge" + [i], this.screen).removeClass("markRight");
                    $("#questionText", this.obj).find(".dropdown").removeClass("focus-markright"), $("#questionText", this.obj).find(".dropdown").removeClass("focus-markwrong")
                }
            e.length > 0 && (this.EvaluateFlag = !0), (this.isTest || this.partialAttempt == 0) && !this.isReview && (r.removeClass("markRight"), r.removeClass("markWrong"), $("#questionText", this.obj).find(".dropdown").removeClass("focus-markright"), $("#questionText", this.obj).find(".dropdown").removeClass("focus-markwrong"))
        },
        itemClicked: !1,
        handleEvaluate: function(e) {
            if (e != undefined && $(e.target).hasClass("disabled")) return;
            if (this.itemClicked == 1) return;
            this.userResponse = [], this.itemClicked = !0, this.EvaluateFlag = !0, this.isReset = !1;
            var attemtedInputs = 0,
                totalInputs = 0,
                attrToCheck = null,
                blankObjs = null,
                totalCorrect = 0,
                qOptions = eval(this.options);
            utils.log("qOptions", qOptions);
            var markPerQ = parseFloat(this.maxpoints / this.options.length),
                marksQbtained = 0,
                buttons = $("#questionOptions", this.obj).find("li");
            blankObjs = $("#questionText", this.obj).find(".dropdown"), blankObjsBadges = $("#questionText", this.obj).find("div.checkBadge5"), attrToCheck = "value", totalInputs = blankObjs.size(), $("#questionOptions", this.obj).find(".selected").removeClass("selected");
            var dropList = $("#questionText", this.obj).find(".dropdown");
            for (var i = 0; i < dropList.length; i++) {
                var el = dropList[i],
                    myanswer = -1;
                if (this.attemptMethod == AppConst.DROPDOWN_NATIVE) myanswer = parseInt(el.options[el.selectedIndex].value);
                else {
                    var ans = $(el).val();
                    for (var j = 0; j < this.options[i].length; j++)
                        if (ans == this.options[i][j].data) {
                            myanswer = j;
                            break
                        }
                }
                myanswer >= 0 && attemtedInputs++, this.userResponse.push(myanswer), myanswer == this.answers[i] ? ($("#badge" + [i], this.obj).addClass("markRight"), blankObjs.get(i).className += " focus-markright", totalCorrect++, marksQbtained += markPerQ) : ($("#badge" + [i], this.obj).addClass("markWrong"), $("#badge" + [i], this.obj).addClass("markWrong"), blankObjs.get(i).className += " focus-markwrong")
            }
            this.partialAttempt || (blankObjsBadges.removeClass("markRight"), blankObjsBadges.removeClass("markWrong"), blankObjs.removeClass("focus-markright"), blankObjs.removeClass("focus-markwrong")), this.partialAttempt == 1 || attemtedInputs == totalInputs ? totalCorrect >= totalInputs ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                userResponse: this.userResponse,
                status: AppConst.CORRECT,
                score: marksQbtained,
                maxScore: this.maxpoints,
                type: this.type,
                title: this.title,
                responseType: this.responseType
            }) : totalCorrect > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: marksQbtained,
                status: AppConst.PARTIAL,
                maxScore: this.maxpoints,
                type: this.type,
                title: this.title,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: marksQbtained,
                status: AppConst.PARTIAL,
                maxScore: this.maxpoints,
                type: this.type,
                title: this.title,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                userResponse: this.userResponse,
                maxScore: this.maxpoints,
                type: this.type,
                responseType: this.responseType
            }), this.lockQuestion(), _.delay(this.resetClickFlag, 500)
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        lockQuestion: function() {
            this.correctAnswerVisible = !1, this.changeToolbar.mode = AppConst.TOOLBAR_LOCKED, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.disableInteraction()
        },
        resetQuestion: function(e) {
            this.isReset = !0;
            var t = $("#questionText", this.obj).find("div.checkBadge5");
            t.removeClass("markRight"), t.removeClass("markWrong"), $("#questionText", this.obj).find(".dropdown").removeClass("focus-markright"), $("#questionText", this.obj).find(".dropdown").removeClass("focus-markwrong");
            var n = $("#questionText", this.obj).find(".dropdown").length;
            if (this.attemptMethod == AppConst.DROPDOWN_NATIVE)
                for (var r = 0; r < n; r++) $("#questionText", this.obj).find(".dropdown")[r].selectedIndex = 0;
            else $("#questionText", this.obj).find(".dropdown").val("");
            this.userResponse = [], this.enableInteraction(), this.trigger(assessEvent.MARK_EMPTY, this.qId), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT), this.EvaluateFlag = !1
        },
        resetQuestionPartial: function(e) {
            this.targetSelected = "";
            var t = !0,
                n = $("#questionText", this.obj).find("input"),
                r = $("#questionText", this.obj).find("div.checkBadge5");
            r.removeClass("markWrong"), r.removeClass("markRight");
            var i = $("#questionText", this.obj).find(".dropdown");
            i.removeClass("focus-markright"), i.removeClass("focus-markwrong");
            var s = 0;
            for (var o = 0; o < i.length; o++)
                if (this.userResponse[o] != this.answers[o]) {
                    if (this.attemptMethod == AppConst.DROPDOWN_NATIVE) var u = $("#drop" + [o], this.screen).val(-1);
                    else var u = $("#drop" + [o], this.screen).val("");
                    this.userResponse[o] = ""
                } else s++;
            s > 0 ? (t = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)) : (this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)), n.removeClass("disableOption"), this.EvaluateFlag = !1, this.correctAnswerVisible = !1, this.enableInteraction(), t == 0 ? this.trigger(assessEvent.UPDATE_RESPONSE, this.qId, {
                userResponse: this.userResponse
            }) : this.trigger(assessEvent.MARK_EMPTY, this.qId), this.disableButton(AppConst.QBTN_RESET)
        },
        disableButton: function(e) {
            $("#" + e, this.obj).addClass("disabled")
        },
        handleScreenExit: function() {},
        orientationchange: function(e) {},
        destroy: function() {
            this.spinnerOpen && (SpinningWheel.close(), this.spinnerOpen = !1), this.unbind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.unbind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.unbind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.unbind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.unbind(assessEvent.MARK_EMPTY, this.markEmpty), this.unbind(assessEvent.UPDATE_RESPONSE, this.updateResponse), this.unbind(assessEvent.MARK_ANSWER, this.handleMarkAnswer), $("#questionOptions", this.obj).find("li").unbind(), this.disableInteraction(), $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el).remove()
        }
    });
    return fibDropDown
}), define("com/es/widgets/assessment/model/fibDropDownVO", [], function() {
    var e = Backbone.Model.extend({
        id: "",
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        attemptMethod: "",
        heading: [],
        partialAttempt: !0,
        feedback: []
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/fibTapPlace.html", [], function() {
    return "<div id='quesWrapper<%=id%>' class='disableTemplate'>\n    <div id='ques<%=id%>' class='quesContent'>\n		<div id='activityContent'>\n			<div id='questionHeading' class='questionHeading'></div>\n			<div id='questionMedia' class='left question-media'></div>\n			<div id='questionOptions' class='trayParent'></div>\n			<div id='questionTextCover'>\n				<div id='questionText' class='left'></div>\n			</div>\n			<div id='labelanswers'></div>\n		</div>\n	</div>\n</div>"
}), define("com/es/widgets/assessment/view/fibTapPlace", ["com/es/widgets/assessment/AssesmentLang", "com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/fibTapPlace.html"], function(AssesmentLang, utils, AppConst, assessEvent, contentTpl) {
    var fibTapPlace = Backbone.View.extend({
        modelParagraph: "",
        qId: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        itemClicked: !1,
        correctAnswerVisible: null,
        inputNo: 0,
        EvaluateFlag: !1,
        changeToolbar: {},
        drags: [],
        drops: [],
        dragObjs: [],
        targetSelected: "",
        optionSelected: "",
        optionNode: "",
        maxpoints: 0,
        resetClicked: !1,
        maintainOptions: AppConst.FIB_REMOVE_OPTIONS,
        partialAttempt: !0,
        optionHasImg: !1,
        textScroll: null,
        title: "",
        assetsPath: "",
        initialize: function() {
            _.bindAll(this, "handleScreenExit", "handleEvaluate", "onOptionSelected", "onTargetSelected", "resetFontSize", "disableButton", "resetClickFlag", "onDeleteBtnClick", "initScroll"), _.extend(this, Backbone.Events)
        },
        render: function() {
            this.element = this.el;
            var e = _.template(contentTpl, this.model.toJSON());
            $("#" + this.model.get("uiId") + " #content", this.$el).QAappend(e), this.screen = $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el), this.setQuestionData()
        },
        setQuestionData: function() {
            this.modelParagraph = this.model.get("modelParagraph"), this.type = this.model.get("type"), this.layout = this.model.get("questionLayout"), this.responseType = this.model.get("responseType"), this.clues = this.model.get("clues"), this.rubric = this.model.get("rubric"), this.questionText = JSON.stringify(this.model.get("questionBody")), this.questionMedia = this.model.get("questionMedia"), this.optionsMedia = this.model.get("optionsMedia"), this.leftCol = this.model.get("leftCol"), this.rightCol = this.model.get("rightCol"), this.opLayout = this.model.get("optionsLayout"), this.options = this.model.get("options"), this.answers = this.model.get("answers"), this.isTest = this.model.get("isTest"), this.isReview = this.model.get("isReview"), this.reviewData = this.model.get(""), this.qId = this.model.get("id"), this.maxpoints = parseFloat(this.model.get("maxpoints")), this.partialAttempt = this.model.get("partialAttempt"), this.title = this.model.get("title"), this.assetsPath = this.model.get("assetPath"), this.model.get("userResponse").userResponse && (this.userResponse = this.model.get("userResponse").userResponse), this.heading = this.model.get("heading"), this.maintainOptions = this.model.get("maintainOptions"), this.renderQues()
        },
        renderQues: function() {
            this.drags = [], this.drops = [], this.dropObjs = [], this.obj = this.screen;
            var qBody = eval(this.questionText),
                qOptions = eval(this.options),
                qStr = "",
                optionsStr = "",
                gapNo = 0,
                gapLength = 0;
            this.inputNo = this.answers.length;
            if (this.heading.length == 0) $(".questionHeading", this.screen).hide();
            else {
                var headingStr = "";
                for (var i = 0; i < this.heading.length; i++) this.heading[i].type == "image" ? headingStr += "<img src='" + this.assetsPath + this.heading[i].data + "' />" : headingStr += "<div>" + this.heading[i].data + "</div>";
                $(".questionHeading", this.screen).html(headingStr)
            } if (this.questionMedia.length == 0) $("#questionMedia", this.screen).hide();
            else {
                var qMediaStr = "";
                for (var i = 0; i < this.questionMedia.length; i++) qMediaStr += utils.renderNode(this.assetsPath, this.questionMedia[i]);
                $("#questionMedia", this.screen).html(qMediaStr)
            }
            $("#questionMedia img", this.screen).bind(assessEvent.CLICK, function() {
                window.open($("#questionMedia img").data("url"))
            });
            if (this.responseType == AppConst.RESPONSE_TYPE_DRAG) {
                utils.log("render Ques 2");
                for (var j = 0; j < this.options.length; j++) gapLength < this.options[j].data.length && (gapLength = this.options[j].data.length);
                gapLength = Math.max(gapLength, 6), utils.log("gap length : " + gapLength);
                var startNewLineUl = !0,
                    flagGap = !1;
                for (var i = 0; i < qBody.length; i++) {
                    startNewLineUl && (qStr += '<ul class="fibLine">', startNewLineUl = !1);
                    if (qBody[i] == "GAP") gapNo++, qStr += "<li class='fibLineGap'><div class='badgeWrapper'><span type='text' id='drop" + gapNo + "' size='" + parseInt(parseInt(gapLength) + 3) + "' class='blank' readonly='readonly' ></span><div class='deleteBtn' style='display:none;'></div><div class='checkBadge icon'></div> </div></li>", this.drops.push("drop" + gapNo), flagGap = !0;
                    else {
                        if (typeof qBody[i] == "object") {
                            var liClass = "fibLine" + qBody[i].type;
                            qBody[i].type == "text" ? qBody[i].data.trim().indexOf(" ") == -1 && flagGap ? qStr = qStr.replace(new RegExp("</li>$"), utils.renderNode(this.assetsPath, qBody[i]) + "</li>") : qStr += utils.renderNode(this.assetsPath, qBody[i]) : qStr += '<li class="' + liClass + '">' + utils.renderNode(this.assetsPath, qBody[i]) + "</li><br />"
                        }
                        flagGap = !1
                    }
                }
                qStr += "</ul>", this.layout = this.layout.toUpperCase(), this.layout.toUpperCase() == AppConst.LAYOUT_HORIZONTAL || this.layout == "" ? optionsStr = "<div class='mcq4'>" : this.layout == AppConst.LAYOUT_VERTICAL && (optionsStr = "<div class='mcq2' style='padding-top:30px;'>");
                var optionsStr2 = "";
                for (var i = 0; i < qOptions.length; i++) qOptions[i].type == "image" ? optionsStr2 += "<div class='dropelement trayOptions imageOpt' id='drag" + (i + 1) + "'><span>" + utils.renderNode(this.assetsPath, qOptions[i]) + "</span></div>" : optionsStr2 += "<div class='dropelement trayOptions' id='drag" + (i + 1) + "'><span>" + utils.renderNode(this.assetsPath, qOptions[i]) + "</span></div>";
                var optionsStr3 = "</div>"
            }
            $("#questionText", this.obj).html(qStr), this.fixWrappedLi(), $("#questionOptions", this.obj).html(optionsStr + optionsStr2 + optionsStr3);
            for (var i = 0; i < qOptions.length; i++) this.drags.push("drag" + (i + 1));
            var minFontSize = 16;
            for (var i = 0; i < qOptions.length; i++) {
                utils.log("calculating font size : " + i), fSize = 16, cardTextNode = $("#drag" + (i + 1), this.obj).get(0);
                var node = $("span", cardTextNode).get(0);
                fCard = node.parentNode;
                var size = this.resetFontSize(cardTextNode, node, fSize, "px");
                minFontSize = size < minFontSize ? size : minFontSize, cardTextNode.style["font-size"] = minFontSize + "px !important"
            }
            $(".dropelement", this.obj).css("font-size", minFontSize + "px !important");
            for (var i = 0; i < qOptions.length; i++)
                if (qOptions[i].type == "image") {
                    this.optionHasImg = !0;
                    break
                }
            this.enableInteraction();
            if (this.optionHasImg) {
                var that = this;
                _.delay(that.initScroll, 500)
            } else this.initScroll();
            var loadedImageCount = 0,
                imgArray = $("#activityContent img", this.obj),
                imgCount = imgArray.length,
                that = this;
            imgCount == 0 && this.trigger(assessEvent.TEMPLATE_READY), _.each(imgArray, function(e) {
                $(e).on("load", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.trigger(assessEvent.IMG_LOADED), that.trigger(assessEvent.TEMPLATE_READY))
                }), $(e).on("error", function() {
                    loadedImageCount++, imgCount === loadedImageCount && that.trigger(assessEvent.TEMPLATE_READY)
                })
            })
        },
        fixWrappedLi: function() {
            var e = $("#questionText", this.obj).find("ul"),
                t = $(e[0]).height();
            for (var n = 0; n < e.length; n++) {
                var r = $(e[n]).height();
                r < t && (t = r)
            }
            for (var n = 0; n < e.length; n++) {
                var r = $(e[n]).height();
                if (r > t * 2 - 5) {
                    var i = $(e[n]).find("li");
                    for (var s = 0; s < i.length; s++) {
                        if ($(i[s]).find("*").length > 0) continue;
                        var o = $(i[s]).text(),
                            u = o.split(" "),
                            a = "";
                        for (var f = 0; f < u.length; f++) a += '<li class="fibLinetext"> ' + u[f] + "</li>";
                        $(i[s]).replaceWith(a)
                    }
                }
            }
        },
        resetFontSize: function(e, t, n) {
            return fSize = n, e.offsetWidth - 6 < t.offsetWidth && (fSize = n * .625), fSize
        },
        enableInteraction: function() {
            $(".blank", this.obj).unbind().bind(assessEvent.CLICK, this.onTargetSelected), $(".dropelement", this.obj).unbind().bind(assessEvent.CLICK, this.onOptionSelected), $(".blank", this.obj).removeClass("disableTarget"), $("#questionText").removeClass("disabled"), $(".dropelement", this.obj).removeClass("disableOption")
        },
        disableInteraction: function() {
            var e = $("#activityContent img", this.obj);
            $(".blank", this.obj).unbind(), $(".dropelement", this.obj).unbind(), $("div.deleteBtn", this.obj).unbind(), $("#questionMedia img", this.screen).unbind(), $(e).off(), $(".blank", this.obj).addClass("disableTarget"), $(".dropelement", this.obj).addClass("disableOption"), $("#questionText").addClass("disabled");
            var t = $("#questionOptions").find(".dropelement");
            t.removeClass("selected")
        },
        onDeleteBtnClick: function(e) {
            this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, $("#questionText", this.obj).find("div.deleteBtn").hide();
            var t = e.target,
                n = $(t).siblings(".badgeWrapper").find(".blank");
            n.html(""), n.removeAttr("style"), n.removeClass("selected"), $("#" + $(t).attr("optionId"), this.obj).css("visibility", "visible"), this.optionHasImg && this.initScroll(), $(t).hide(), $(t).attr("optionId", ""), this.optionSelected = this.targetSelected = this.optionNode = "";
            var r = $(".blank", this.screen);
            for (var i = 0; i < r.length; i++)
                if ($(r[i]).html() != "") {
                    this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE;
                    break
                }
            this.trigger(assessEvent.Q_STATUS, 0), this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.itemClicked = !1
        },
        onOptionSelected: function(e) {
            if (this.itemClicked == 1) return;
            $("#questionOptions", this.screen).find(".dropelement").removeClass("optionSelected"), $("#questionOptions", this.screen).find("img").removeClass("optionSelected"), node = e.target;
            var t = null;
            node.nodeName.toLowerCase() == "img" ? (node = node.parentNode, t = node.parentNode) : node.nodeName.toLowerCase() == "span" ? t = node.parentNode : node.nodeName.toLowerCase() == "div" && (t = node, node = $(node).find("span")), this.itemClicked = !0, this.optionNode = $(node), this.optionSelected = $(node).html(), $(t).addClass("optionSelected");
            var n = this.checkAndFillValue();
            $("#questionText", this.obj).find("div.deleteBtn").hide(), _.delay(this.resetClickFlag, 100)
        },
        onTargetSelected: function(e) {
            if (this.itemClicked == 1) return;
            $("#questionText", this.obj).find(".selected").removeClass("selected"), $("#questionText", this.obj).find(".deleteBtn").hide(), node = e.target, this.itemClicked = !0, node.nodeName.toLowerCase() == "img" && (node = node.parentNode), utils.log(node.id), this.targetSelected = node.id, $("#" + this.targetSelected, this.obj).addClass("selected");
            var t = this.checkAndFillValue();
            !t && $(node).html() != "", _.delay(this.resetClickFlag, 100)
        },
        initScroll: function() {
            utils.log("in init scroll", $("#content", this.obj))
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        checkAndFillValue: function() {
            if (this.optionSelected != "" && this.targetSelected != "") {
                $("#" + this.targetSelected, this.obj).get(0).innerHTML = this.optionSelected;
                var e = $("#" + this.targetSelected, this.obj).find("img").height();
                $("#" + this.targetSelected, this.obj).height(e), $("#" + this.targetSelected, this.obj).removeClass("selected"), $(".optionSelected", this.obj).removeClass("optionSelected");
                if (this.maintainOptions == AppConst.FIB_REMOVE_OPTIONS) {
                    this.optionNode.css("visibility", "hidden");
                    var t = $("#" + this.targetSelected, this.obj).parent().siblings("div.deleteBtn");
                    t.attr("optionId") && $("#" + t.attr("optionId"), this.obj).css("visibility", "visible"), t.attr("optionId", this.optionNode.attr("id"))
                }
                var n = $(".blank", this.screen),
                    r = 0;
                for (var i = 0; i < n.length; i++) $(n[i]).html() != "" && r++;
                return r == n.length ? this.trigger(assessEvent.Q_STATUS, 1) : this.trigger(assessEvent.Q_STATUS, 0), this.optionSelected = this.targetSelected = this.optionNode = "", this.optionHasImg && this.initScroll(), this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), !0
            }
        },
        populateAnswers: function(e, t) {
            if (this.resetClicked && this.isTest) return;
            utils.log(e);
            var n = $("#questionText", this.obj).find(".blank");
            n.removeClass("focus-markright"), n.removeClass("focus-markwrong");
            var r = $("#questionText", this.obj).find("div.checkBadge"),
                i = $("#questionOptions", this.obj).find(".dropelement");
            i.removeClass("selected"), i.removeClass("optionHighlight"), i.removeClass("optionSelected"), $("#questionText", this.obj).find("div.deleteBtn").hide(), $("#questionText", this.obj).find(".selected").removeClass("selected"), t == 0 && (utils.log("in correct ans false"), r.removeClass("markWrong"), r.removeClass("markRight"));
            var s = n.size();
            utils.log("max " + s), e.length > 0 ? i.addClass("disableOption") : i.css("opacity", 1);
            for (var o = 0; o < s; o++) {
                var u = e[o];
                myBlank = n.get(o), myBlank.innerHTML = "";
                if (e.length > 0) {
                    if (u != "") {
                        if (this.options[u - 1].type == "image") {
                            u = this.options[u - 1].data;
                            var a = utils.renderNode(this.assetsPath, {
                                type: "image",
                                data: u
                            });
                            myBlank.innerHTML = a;
                            var f = $(myBlank).find("img").height();
                            $(myBlank).height(f)
                        } else u = this.options[u - 1].data, myBlank.innerHTML = u;
                        var l = $("#" + myBlank.id, this.obj).parent().siblings("div.deleteBtn");
                        l.attr("optionid", "drag" + e[o]), utils.log("answer1 " + u)
                    } else myBlank.innerHTML = u; if (t == 1) {
                        this.answers.length > 0 && (this.EvaluateFlag = !0);
                        var c = this.options[this.answers[o] - 1].data.toLowerCase();
                        userAns = u == undefined ? u : u.toLowerCase(), userAns == c ? (r.get(o).className += " markRight", n.get(o).className += " focus-markright") : (r.get(o).className += " markWrong", n.get(o).className += " focus-markwrong")
                    }
                    var h = $("#questionOptions", this.obj).find("span");
                    for (var p = 0; p < h.length; p++) {
                        var d = "";
                        if ($(h[p]).find("img").length > 0) {
                            var v = $(h[p]).find("img").attr("src").split(this.assetsPath);
                            d = v[v.length - 1]
                        } else d = h[p].innerHTML;
                        d == u && i[p].className.search("optionHighlight") < 0 && (i[p].className += " optionHighlight")
                    }
                }
            }
            e.length > 0 && (this.EvaluateFlag = !0), (this.isTest || this.partialAttempt == 0) && !this.isReview && (r.removeClass("markWrong"), r.removeClass("markRight"), i.removeClass("selected"), i.removeClass("optionHighlight"), i.removeClass("optionSelected"), i.removeClass("disableOption"), n.removeClass("focus-markright"), n.removeClass("focus-markwrong")), !this.isReview && e.length <= 0 && this.enableInteraction()
        },
        handleEvaluate: function(e) {
            if (e != undefined && $(e.target).hasClass("disabled")) return;
            this.EvaluateFlag = !0, this.resetClicked = !1;
            var t = $("#questionText", this.obj).find(".blank"),
                n = $("#questionText", this.obj).find("div.checkBadge"),
                r = $("#questionOptions", this.obj).find(".dropelement");
            n.removeClass("markRight"), n.removeClass("markWrong"), t.removeClass("selected"), r.removeClass("optionSelected"), $("#questionText", this.obj).find("div.deleteBtn").hide(), $("#questionText", this.obj).find(".selected").removeClass("selected");
            var i = 0,
                s = null,
                o = null,
                u = 0,
                a = 0;
            this.userResponse = [];
            var f = 0,
                l = 0;
            o = $("#questionText", this.obj).find(".blank"), s = "value", i = o.length;
            var c = parseFloat(this.maxpoints / i);
            for (var h = 0; h < i; h++) {
                if ($(o.get(h)).find("img").length > 0) var p = $(o.get(h)).find("img").attr("src").split(this.assetsPath),
                d = p[p.length - 1];
                else var d = $(o.get(h)).html();
                d = d.toLowerCase(), utils.log(d), d == "" && this.userResponse.push(d);
                var v = [];
                if (this.answers[h].length && this.answers[h].length > 1)
                    for (var m = 0; m < this.answers[h].length; m++) v.push(this.options[this.answers[h][m] - 1].data.toLowerCase());
                else v.push(this.options[this.answers[h] - 1].data.toLowerCase());
                for (var g = 0; g < this.options.length; g++)
                    if (d == this.options[g].data.toLowerCase()) {
                        a = g + 1, f++, this.userResponse.push(a);
                        break
                    }
                utils.log(d + ", correct answer : " + v + " total inputs: " + i), v.indexOf(d) != -1 ? (n.get(h).className += " markRight", t.get(h).className += " focus-markright", l += c, u++) : (n.get(h).className += " markWrong", t.get(h).className += " focus-markwrong");
                for (var y = 0; y < this.options.length; y++)
                    if (this.options[y].data == d) {
                        utils.log("drops[o]", r[y]), $("#drag" + (y + 1), this.obj).addClass("optionHighlight");
                        break
                    }
            }
            this.partialAttempt || (n.removeClass("markRight"), n.removeClass("markWrong")), this.partialAttempt == 1 || f == i ? u >= i ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                userResponse: this.userResponse,
                status: AppConst.CORRECT,
                score: l,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                responseType: this.responseType
            }) : u > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: l,
                status: AppConst.PARTIAL,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: l,
                status: AppConst.INCORRECT,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                userResponse: this.userResponse,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                responseType: this.responseType
            }), this.lockQuestion()
        },
        lockQuestion: function() {
            this.correctAnswerVisible = !1, this.changeToolbar.mode = AppConst.TOOLBAR_LOCKED, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.disableInteraction()
        },
        resetQuestion: function(e) {
            this.resetClicked = !0, this.optionSelected = "", this.targetSelected = "", $("#questionText", this.obj).html(""), $("#questionOptions", this.obj).html(""), this.userResponse = [], this.EvaluateFlag = !1, this.renderQues(), this.correctAnswerVisible = !1, this.enableInteraction(), this.trigger(assessEvent.MARK_EMPTY, this.qId), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.Q_STATUS, 0), this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)
        },
        resetQuestionPartial: function(e) {
            this.optionSelected = "", this.targetSelected = "";
            var t = !0;
            this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
            var n = $("#questionText", this.obj).find("div.checkBadge"),
                r = $("#questionText", this.obj).find(".blank"),
                i = $("#questionOptions", this.obj).find(".dropelement");
            $("#questionText", this.obj).find("div.deleteBtn").hide(), $("#questionText", this.obj).find(".selected").removeClass("selected"), n.removeClass("markWrong"), n.removeClass("markRight"), i.removeClass("optionHighlight");
            if (this.userResponse.length > 0)
                for (var s = 0; s < this.userResponse.length; s++) this.answers[s].indexOf(this.userResponse[s]) == -1 ? ($("#drag" + this.userResponse[s], this.obj).removeClass("optionHighlight"), $("#drag" + this.userResponse[s], this.obj).css("visibility", "visible"), $("div.deleteBtn[optionid=drag" + this.userResponse[s] + "]", this.obj).attr("optionid", ""), this.userResponse[s] = "", $("#drop" + (s + 1)).html("")) : (this.maintainOptions == AppConst.FIB_REMOVE_OPTIONS && $("#drag" + this.userResponse[s], this.obj).css("visibility", "hidden"), t = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar));
            this.EvaluateFlag = !1, this.correctAnswerVisible = !1, this.enableInteraction(), t == 0 ? this.trigger(assessEvent.UPDATE_RESPONSE, this.qId, {
                userResponse: this.userResponse
            }) : this.trigger(assessEvent.MARK_EMPTY, this.qId), this.disableButton(AppConst.QBTN_RESET)
        },
        disableButton: function(e) {
            $("#" + e, this.obj).addClass("disabled")
        },
        handleScreenExit: function() {
            try {
                for (var e = 0; e < this.dragObjs.length; e++) this.dragObjs[e].lastCurX = null, this.dragObjs[e].lastCurY = null, this.dragObjs[e].destroy();
                webkit_drop.remove()
            } catch (t) {
                console.log(t)
            }
            this.textScroll != null && this.textScroll.destroy()
        },
        orientationchange: function(e) {},
        destroy: function() {
            this.unbind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.unbind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.unbind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.unbind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.unbind(assessEvent.MARK_EMPTY, this.markEmpty), this.unbind(assessEvent.UPDATE_RESPONSE, this.updateResponse), this.disableInteraction(), $("#questionOptions", this.obj).find("li").unbind(), $("#ques" + this.model.get("id")).remove()
        }
    });
    return fibTapPlace
}), define("com/es/widgets/assessment/model/fibTapPlaceVO", [], function() {
    var e = Backbone.Model.extend({
        id: "",
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        heading: [],
        maintainOptions: "",
        partialAttempt: !0,
        feedback: []
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/mcqBinary.html", [], function() {
    return "<div id='quesWrapper<%=id%>' class='disableTemplate'>\n    <div id='ques<%=id%>' class='quesContent'>\n		<div id='activityContent'>\n        	<div id='questionHeading' class='questionHeading'></div>\n			<div id='questionMedia' class='left question-media'></div>\n			<div id='questionText' class='left'></div>\n			<div id='questionOptions'></div>\n			<div id='labelanswers'></div>\n		</div>\n	</div>\n</div>"
}), define("com/es/widgets/assessment/view/mcqBinary", ["com/es/widgets/assessment/AssesmentLang", "com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/mcqBinary.html"], function(AssesmentLang, utils, AppConst, assessEvent, contentTpl) {
    var mcqBinaryView = Backbone.View.extend({
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: [],
        qId: "",
        itemClicked: !1,
        correctAnswerVisible: null,
        inputNo: 0,
        EvaluateFlag: !1,
        changeToolbar: {},
        nodes: [],
        maxpoints: 0,
        partialAttempt: !0,
        scroll: null,
        assetsPath: "",
        numberstyle: "1",
        initialize: function() {
            _.bindAll(this, "handleMcqBtnClick", "resetClickFlag", "randomize"), _.extend(this, Backbone.Events)
        },
        render: function() {
            utils.log(this.model.get("id")), this.element = this.el;
            var e = _.template(contentTpl, this.model.toJSON());
            $("#" + this.model.get("uiId") + " #content", this.$el).QAappend(e), this.screen = $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el), this.setQuestionData()
        },
        setQuestionData: function() {
            this.modelParagraph = this.model.get("modelParagraph"), this.type = this.model.get("type"), this.layout = this.model.get("questionLayout"), this.responseType = this.model.get("responseType"), this.clues = this.model.get("clues"), this.rubric = this.model.get("rubric"), this.questionText = JSON.stringify(this.model.get("questionBody")), this.questionMedia = this.model.get("questionMedia"), this.optionsMedia = this.model.get("optionsMedia"), this.leftCol = this.model.get("leftCol"), this.rightCol = this.model.get("rightCol"), this.opLayout = this.model.get("optionsLayout"), this.options = this.model.get("options"), this.answers = this.model.get("answers"), this.isTest = this.model.get("isTest"), this.assetsPath = this.model.get("assetPath"), this.isReview = this.model.get("isReview"), this.reviewData = this.model.get(""), this.qId = this.model.get("id"), this.maxpoints = parseFloat(this.model.get("maxpoints")), this.model.get("userResponse").userResponse && (this.userResponse = this.model.get("userResponse").userResponse, this.isAnswered = !0), this.heading = this.model.get("heading"), this.partialAttempt = this.model.get("partialAttempt"), this.labelFalse = this.model.get("labelFalse"), this.labelTrue = this.model.get("labelTrue"), this.labelFalse = "False", this.numberstyle = this.model.get("numberstyle"), this.renderQues()
        },
        renderQues: function() {
            this.nodes = [], this.obj = this.screen;
            var qBody = eval(this.questionText.replace(/'+/g, "&apos;")),
                qOptions = eval(this.options),
                initialNumber = 49,
                isRoman = !1;
            this.numberstyle == "1" ? initialNumber = 49 : this.numberstyle == "a" ? initialNumber = 97 : this.numberstyle == "i" && (isRoman = !0);
            if (this.heading.length == 0) $(".questionHeading", this.screen).hide();
            else {
                var headingStr = "";
                for (var i = 0; i < this.heading.length; i++) this.heading[i].type == "image" ? headingStr += "<img src='" + this.assetsPath + this.heading[i].data + "' />" : headingStr += "<div>" + this.heading[i].data + "</div>";
                $(".questionHeading", this.screen).html(headingStr)
            } if (this.questionMedia.length == 0) $("#questionMedia", this.screen).hide();
            else {
                var qMediaStr = "";
                for (var i = 0; i < this.questionMedia.length; i++) qMediaStr += utils.renderNode(this.assetsPath, this.questionMedia[i]);
                $("#questionMedia", this.screen).html(qMediaStr)
            }
            $("#questionMedia img", this.screen).bind(assessEvent.CLICK, function() {
                window.open($("#questionMedia img").data("url"))
            });
            var qStr = "",
                optionsStr = "";
            qStr += utils.renderNode(this.assetsPath, qBody), this.layout == "2COL" && this.leftCol != "" && this.rightCol != "" && (qStr += "<div class='leftcol'>", qStr += utils.renderNode(this.assetsPath, eval(this.leftCol)), qStr += "</div>", qStr += "<div class='rightcol'>", qStr += utils.renderNode(this.assetsPath, eval(this.rightCol)), qStr += "</div>"), this.inputNo = this.answers.length;
            var node = "",
                startLi = !0,
                idCounter = 1;
            for (var i = 0; i < qOptions.length; i++) {
                var curNumbering = "";
                isRoman ? curNumbering = utils.romanize(idCounter) : curNumbering = String.fromCharCode(initialNumber + idCounter - 1), startLi && (node = "<li id='li" + idCounter + "' class=''><!--span class='numbering'>" + curNumbering + " )</span--> <div class='tf-question binaryQues'>", startLi = !1);
                var tempData = qOptions[i].data.replace(/\s/g, "").toLowerCase();
                tempData == "<br>" || tempData == "<br/>" ? (node += "</div><div class='qr-answer binaryAns'><span id='qr-correct-" + idCounter + "' class='qr-correct' data-op = '0' >" + this.labelTrue + " <span class='checkBadge4 icon'></span> </span><span id='qr-incorrect-" + idCounter + "' class='qr-incorrect' data-op = '1'>" + this.labelFalse + " <span class='checkBadge4 icon'></span> </span> </div><div style='clear:both;'></div></li>", this.nodes.push(node), idCounter++, startLi = !0, node = "") : qOptions[i].type == "image" ? node += '<img src="' + this.assetsPath + qOptions[i].data + '" />' : node += utils.renderNode(this.assetsPath, qOptions[i])
            }
            node.trim() != "" && (node += "</div><div class='qr-answer binaryAns'><span id='qr-correct-" + idCounter + "' class='qr-correct' data-op = '0' >" + this.labelTrue + "<span class='checkBadge4 icon'></span></span><span id='qr-incorrect-" + idCounter + "' class='qr-incorrect' data-op = '1'>" + this.labelFalse + "<span class='checkBadge4 icon'></span> </span> </div><div style='clear:both;'></div></li>", this.nodes.push(node)), this.randomize(), $("#questionText", this.obj).html(qStr), qBody.length == 0 && $("#questionText", this.obj).hide();
            var root = $(".mcq2", this.obj),
                options = $("input", root),
                len = options.length,
                minFontSize = 14;
            for (var i = 0; i < len; i++) {
                var node = options[i],
                    fsize = this.resizeText(node, minFontSize);
                minFontSize = fsize < minFontSize ? fsize : minFontSize
            }
            for (var i = 0; i < len; i++) {
                var node = options[i];
                node.style.fontSize = minFontSize + "px"
            }
            this.enableInteraction();
            var loadedImageCount = 0,
                imgArray = $("#activityContent img", this.obj),
                imgCount = imgArray.length,
                that = this;
            imgCount == 0 && this.trigger(assessEvent.TEMPLATE_READY), _.each(imgArray, function(e) {
                $(e).on("load", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.trigger(assessEvent.IMG_LOADED), that.trigger(assessEvent.TEMPLATE_READY))
                }), $(e).on("error", function() {
                    loadedImageCount++, imgCount === loadedImageCount && that.trigger(assessEvent.TEMPLATE_READY)
                })
            })
        },
        resizeText: function(e, t) {
            var n = t;
            while (e.offsetWidth < e.scrollWidth) e.style.fontSize = --n + "px";
            return n
        },
        enableInteraction: function() {
            $("#questionOptions", this.obj).find("input").unbind(), $("#questionOptions", this.obj).find("li").unbind(), $("#questionOptions", this.obj).find("input").removeClass("disableOption"), $("#questionOptions", this.obj).find("li").removeClass("disableOption"), $(".dropdown", this.obj).unbind(), $("#questionOptions", this.obj).find("span").bind(assessEvent.CLICK, this.handleMcqBtnClick), $("#questionOptions", this.obj).find("input").bind(assessEvent.CLICK, this.handleMcqBtnClick), $("#questionOptions", this.obj).find(".qr-correct").removeAttr("disabled"), $("#questionOptions", this.obj).find(".qr-incorrect").removeAttr("disabled"), $("#questionText", this.obj).removeClass("disabled")
        },
        disableInteraction: function() {
            var e = $("#activityContent img", this.obj);
            $("#questionOptions", this.obj).find("input").addClass("disableOption"), $("#questionMedia img", this.screen).unbind(), $("#questionOptions", this.obj).find("li").addClass("disableOption"), $("#questionOptions", this.obj).find("input").unbind(), $("#questionOptions", this.obj).find("span").unbind(), $("#questionOptions", this.obj).find("li").unbind(), $("#questionOptions", this.obj).find(".qr-correct").unbind(), $("#questionOptions", this.obj).find(".qr-incorrect").unbind(), $(".dropdown", this.obj).unbind(), $("#questionText", this.obj).addClass("disabled"), $(e).off()
        },
        randomize: function() {
            if (this.responseType == "" || this.responseType == AppConst.RESPONSE_TYPE_BINARY) {
                var e = "";
                this.opLayout == "2COL" ? e = "<div class='mcq4'><ul>" : e = "<div class='mcq2 trueFalse'><ul>";
                for (var t = 0; t < this.nodes.length; t++) e += this.nodes[t];
                e += "</ul></div>", $("#questionOptions", this.obj).html(e);
                var n = $("#questionOptions", this.obj).find("li").width();
                $("#questionOptions", this.obj).find(".tf-question").css("width", n - 190 + "px"), $("#questionOptions", this.obj).find(".tf-question img").css("vertical-align", "middle"), $("#questionOptions", this.obj).find(".tf-question").css("vertical-align", "middle"), $("#questionOptions", this.obj).find(".tf-question img").css("padding", "3px"), $("#questionOptions", this.obj).find(".tf-question, .binaryAns").css("display", "inline-block"), $("#questionOptions", this.obj).find(".binaryAns").css("position", "relative")
            }
        },
        handleMcqBtnClick: function(e) {
            if (this.itemClicked == 1) return;
            this.itemClicked = !0, utils.log($(e.target), $(e.target.parentNode));
            if (this.answers) $(e.target.parentNode).find(".selected").removeClass("selected"), $(e.target).addClass("selected"), this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE;
            else {
                $(e.target).hasClass("selected") ? $(e.target).removeClass("selected") : $(e.target).addClass("selected");
                var t = $("#questionOptions", this.obj).find(".selected")
            }
            var n = $("#questionOptions").find(".selected").length;
            this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), n == this.answers.length ? this.trigger(assessEvent.Q_STATUS, AppConst.COMPLETE) : n > 0 ? this.trigger(assessEvent.Q_STATUS, AppConst.PARTIAL) : this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT), _.delay(this.resetClickFlag, 500)
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        handleEvaluate: function(e) {
            if (e != undefined && $(e.target).hasClass("disabled")) return;
            this.userResponse = [];
            var t = this.answers.length,
                n = parseFloat(this.maxpoints / t),
                r = 0;
            for (i = 0; i < this.answers.length; i++) {
                var s = $("#li" + (i + 1), this.obj).find(".selected").attr("data-op");
                this.userResponse.push("" + s)
            }
            var o = 0;
            for (var u = 0; u < this.userResponse.length; u++) this.userResponse[u] == this.answers[u] ? ($("#li" + (u + 1), this.screen).find(".selected").find(".checkBadge4").addClass("markRight"), $("#li" + (u + 1), this.screen).find(".selected").addClass("focus-markright"), r += n, o++) : ($("#li" + (u + 1), this.screen).find(".selected").find(".checkBadge4").addClass("markWrong"), $("#li" + (u + 1), this.screen).find(".selected").addClass("focus-markwrong"));
            this.partialAttempt || ($("#questionOptions", this.obj).find(".checkBadge4").removeClass("markRight"), $("#questionOptions", this.obj).find(".checkBadge4").removeClass("markWrong")), this.partialAttempt == 1 || this.userResponse.length == t ? o == this.answers.length ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                userResponse: this.userResponse,
                score: r,
                status: AppConst.CORRECT,
                maxScore: this.maxpoints,
                type: this.type,
                responseType: this.responseType
            }) : o > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: r,
                status: AppConst.PARTIAL,
                maxScore: this.maxpoints,
                type: this.type,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: r,
                status: AppConst.INCORRECT,
                maxScore: this.maxpoints,
                type: this.type,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                userResponse: this.userResponse,
                maxScore: this.maxpoints,
                type: this.type,
                responseType: this.responseType
            }), $("#questionOptions", this.obj).find("li").removeClass("selected"), this.EvaluateFlag = !0, this.lockQuestion()
        },
        lockQuestion: function() {
            this.correctAnswerVisible = !1, this.changeToolbar.mode = AppConst.TOOLBAR_LOCKED, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.disableInteraction()
        },
        populateAnswers: function(e, t) {
            e.length > 0 && (this.EvaluateFlag = !0);
            var n = $("#questionOptions", this.obj).find(".checkBadge4");
            $("#questionOptions", this.obj).find("input").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("input").removeClass("selected"), $("#questionOptions", this.obj).find("li").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("li").removeClass("selected"), $("#questionOptions", this.obj).find("span").removeClass("optionHighlight"), $("#questionOptions", this.obj).find("span").removeClass("selected"), $("#questionOptions", this.obj).find("span").removeClass("focus-markwrong"), $("#questionOptions", this.obj).find("span").removeClass("focus-markright"), t == 0 && (n.removeClass("markWrong"), n.removeClass("markRight"));
            for (var r = 0; r < e.length; r++) parseInt(e[r]) == 0 ? $("#qr-correct-" + (r + 1), this.screen).addClass("selected") : parseInt(e[r]) == 1 && $("#qr-incorrect-" + (r + 1), this.screen).addClass("selected"), e[r] == this.answers[r] ? ($("#li" + (r + 1), this.screen).find(".selected").find(".checkBadge4").addClass("markRight"), $("#li" + (r + 1), this.screen).find(".selected").addClass("focus-markright")) : ($("#li" + (r + 1), this.screen).find(".selected").find(".checkBadge4").addClass("markWrong"), $("#li" + (r + 1), this.screen).find(".selected").addClass("focus-markwrong"));
            if (t == 0 || this.isTest) $("#questionOptions", this.obj).find(".checkBadge4").removeClass("markRight"), $("#questionOptions", this.obj).find(".checkBadge4").removeClass("markWrong"), $("#questionOptions", this.obj).find("span").removeClass("focus-markwrong"), $("#questionOptions", this.obj).find("span").removeClass("focus-markright")
        },
        resetQuestion: function(e) {
            var t = $("#questionOptions", this.obj).find(".checkBadge4");
            $("#questionOptions", this.obj).find(".selected").removeClass("selected"), $("#questionOptions", this.obj).find("input").removeClass("optionHighlight");
            var n = $("#questionOptions", this.obj).find("li");
            n.removeAttr("disabled"), n.css("opacity", 1), t.removeClass("markRight"), t.removeClass("markWrong"), n.removeClass("optionHighlight"), this.randomize(), this.userResponse = [], this.EvaluateFlag = !1, this.enableInteraction(), this.trigger(assessEvent.MARK_EMPTY, this.qId), this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)
        },
        resetQuestionPartial: function(e) {
            $("#questionOptions", this.obj).find(".checkBadge4").removeClass("markWrong"), $("#questionOptions", this.obj).find(".checkBadge4").removeClass("markRight"), $("#questionOptions", this.obj).find("li").removeClass("optionHighlight"), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
            var t = !0;
            $("#questionOptions", this.obj).find(".selected").removeClass("selected"), $("#questionOptions", this.obj).find("li").removeAttr("disabled"), $("#questionOptions", this.obj).find("li").css("opacity", 1);
            if (this.userResponse.length > 0)
                for (var n = 0; n < this.userResponse.length; n++) this.userResponse[n] == this.answers[n] ? (this.userResponse[n] == 0 ? $("#li" + (n + 1), this.obj).find(".qr-correct").addClass("selected") : $("#li" + (n + 1), this.obj).find(".qr-incorrect").addClass("selected"), t = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)) : this.userResponse[n] = undefined;
            this.userResponse = [], this.EvaluateFlag = !1, this.correctAnswerVisible = !1, this.enableInteraction(), t == 0 ? this.trigger(assessEvent.UPDATE_RESPONSE, this.qId, {
                userResponse: this.userResponse
            }) : this.trigger(assessEvent.MARK_EMPTY, this.qId), this.disableButton(AppConst.QBTN_RESET)
        },
        disableButton: function(e) {
            $("#" + e, this.obj).addClass("disabled")
        },
        handleScreenExit: function() {},
        orientationchange: function(e) {},
        destroy: function() {
            this.unbind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.unbind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.unbind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.unbind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.unbind(assessEvent.MARK_EMPTY, this.markEmpty), this.unbind(assessEvent.UPDATE_RESPONSE, this.updateResponse), $("#questionOptions", this.obj).find("li").unbind(), $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.obj).remove(), this.disableInteraction()
        }
    });
    return mcqBinaryView
}), define("com/es/widgets/assessment/model/mcqBinaryVO", [], function() {
    var e = Backbone.Model.extend({
        id: "",
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        maxpoints: null,
        heading: "",
        partialAttempt: !0,
        feedback: [],
        labelTrue: "",
        labelFalse: "",
        numberstyle: ""
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/groupingTapPlace.html", [], function() {
    return "<div class='disableTemplate' id='quesWrapper<%=id%>'>\n    <div id='ques<%=id%>'  class='quesContent'>\n		<div id='activityContent'>\n        	<div id='questionHeading' class='questionHeading'></div>\n			<div id='questionMedia' class='left question-media'></div>\n			<div id='questionText' class='groupingText'></div>\n			<div id='questionOptionsCover'>\n            	<div id='questionOptions'></div>\n            </div>\n			<div id='labelanswers'></div>\n		</div>\n	</div>\n</div>"
}), define("com/es/widgets/assessment/view/groupingTapPlace", ["com/es/widgets/assessment/AssesmentLang", "com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quesTypeTemplates/groupingTapPlace.html"], function(AssesmentLang, utils, AppConst, assessEvent, contentTpl) {
    var groupingTapPlace = Backbone.View.extend({
        modelParagraph: "",
        type: "",
        qId: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        userResponse: "",
        itemClicked: !1,
        correctAnswerVisible: null,
        inputNo: 0,
        EvaluateFlag: !1,
        changeToolbar: {},
        drags: [],
        drops: [],
        dragObjs: [],
        targetSelected: "",
        optionSelected: "",
        optionNode: "",
        templateOptionItem: "<div class='dropelement' id='drag<%=index+1%>'><span><%=option.data%></span></div>",
        resetClicked: !1,
        alphabets: [],
        colors: [],
        optionColor: "",
        optionBorderColor: "",
        maxpoints: 0,
        partialAttempt: !0,
        optionScroll: null,
        quesScroll: null,
        title: "",
        assetsPath: "",
        blanksCount: "",
        groupsCount: "",
        initialize: function() {
            _.bindAll(this, "handleScreenExit", "handleEvaluate", "initScroll", "onOptionSelected", "onTargetSelected", "resetClickFlag", "addHoverClass"), _.extend(this, Backbone.Events)
        },
        render: function() {
            this.element = this.el;
            var e = _.template(contentTpl, this.model.toJSON());
            $("#" + this.model.get("uiId") + " #content", this.$el).QAappend(e), this.widgetId = $("#" + this.model.get("uiId"), this.$el), this.screen = $("#" + this.model.get("uiId") + " #ques" + this.model.get("id"), this.$el), this.setQuestionData()
        },
        setQuestionData: function() {
            this.modelParagraph = this.model.get("modelParagraph"), this.type = this.model.get("type"), this.layout = this.model.get("questionLayout"), this.responseType = this.model.get("responseType"), this.clues = this.model.get("clues"), this.rubric = this.model.get("rubric"), this.questionText = JSON.stringify(this.model.get("questionBody")), this.questionMedia = this.model.get("questionMedia"), this.optionsMedia = this.model.get("optionsMedia"), this.leftCol = this.model.get("leftCol"), this.rightCol = this.model.get("rightCol"), this.opLayout = this.model.get("optionsLayout"), this.options = this.model.get("options"), this.answers = this.model.get("answers"), this.isTest = this.model.get("isTest"), this.assetsPath = this.model.get("assetPath"), this.isReview = this.model.get("isReview"), this.reviewData = this.model.get(""), this.qId = this.model.get("id"), this.maxpoints = parseFloat(this.model.get("maxpoints")), this.model.get("userResponse").userResponse && (this.userResponse = this.model.get("userResponse").userResponse), this.heading = this.model.get("heading"), this.inputNo = this.answers.length, this.partialAttempt = this.model.get("partialAttempt"), this.title = this.model.get("title"), this.alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], this.colors = ["#f69a51", "#46b6ed", "#f57dc1", "#a9c656", "#e24c4c", "#49b444", "#a9e6f7"], this.bgColors = ["#fef0e5", "#e6f6fd", "#ffecf7", "#edf6e8", "#fae8e8", "#edf6e8", "#f9ffe7"], this.blanksCount = this.model.get("blanksCount"), this.groupsCount = this.model.get("groupsCount"), this.renderQues()
        },
        initScroll: function(e) {
            var t = ($("#footer", this.widgetId).get(0).offsetTop - $("#content", this.widgetId).get(0).offsetTop) / 2,
                n = $("#footer", this.widgetId).get(0).offsetTop - $("#content", this.widgetId).get(0).offsetTop - parseInt($("#questionText", this.obj).css("height")) - parseInt($("#questionMedia", this.obj).css("height")) - 65;
            $("#questionOptionsCover", this.obj).css("position", "relative"), $("#questionOptionsCover", this.obj).css("height", n + "px"), this.optionScroll != null && this.optionScroll.destroy(), this.optionScroll = new IScroll($("#questionOptionsCover", this.obj).get(0), {
                desktopCompatibility: !0,
                hScroll: !1,
                keyBindings: !0
            });
            var r = this;
            _.delay(function() {
                r.optionScroll.refresh()
            }, 999)
        },
        renderQues: function() {
            this.userResponse && this.userResponse.length > 0 && (this.EvaluateFlag = !0), this.drags = [], this.drops = [], this.dropObjs = [], this.dropSequence = [], this.droppedCount = 0, this.layout = this.layout.toUpperCase();
            if (this.heading.length == 0) $(".questionHeading", this.screen).hide();
            else {
                var headingStr = "";
                for (var i = 0; i < this.heading.length; i++) this.heading[i].type == "image" ? headingStr += "<img src='" + this.assetsPath + this.heading[i].data + "'></img>" : headingStr += "<div>" + this.heading[i].data + "</div>";
                $(".questionHeading", this.screen).html(headingStr)
            } if (this.questionMedia.length == 0) $("#questionMedia", this.screen).hide();
            else {
                var qMediaStr = "";
                for (var i = 0; i < this.questionMedia.length; i++) qMediaStr += utils.renderNode(this.assetsPath, this.questionMedia[i]);
                $("#questionMedia", this.screen).html(qMediaStr)
            }
            $("#questionMedia img", this.screen).bind(assessEvent.CLICK, function() {
                window.open($("#questionMedia img").data("url"))
            }), this.obj = this.screen;
            var qBody = eval(this.questionText),
                qOptions = eval(_.clone(this.options)),
                layoutClass = "col-grouping-three";
            qOptions.length <= 2 && (layoutClass = "col-grouping-two");
            var qStr = "<ul class='topsort'>",
                liCount = 0,
                totalLength = Math.ceil(qBody.length / 4) * 4;
            for (var i = 0; i < totalLength; i++) {
                liCount++;
                if (qBody[i] != undefined) {
                    qStr += "<li id='opt" + (i + 1) + "' class='matchdrag ' >";
                    for (var j = 0; j < qBody[i].length; j++) qBody[i][j].type == "image" ? qStr += "<div class='grouping-img'><img id='img" + (i + 1) + "' class='' src='" + this.assetsPath + qBody[i][j].data + "'></img></div>" : (qStr += "<span id='text" + (i + 1) + "' class='optionsText'>" + qBody[i][j].data, qStr += "</span>");
                    this.drags.push("" + (i + 1)), qStr += "<span class='dragBand hide'></span></li>"
                }
            }
            qStr += "</ul>";
            var optionsStr = "<div class='bottomsort'>";
            for (var i = 0; i < qOptions.length; i++) optionsStr += "<div id='drop" + (i + 1) + "' class='matchdrop' style='border:1px solid " + this.colors[i] + ";background:" + this.bgColors[i] + ";' ><span>" + qOptions[i].data + "</span>", optionsStr += "<span class='dropBand' style='display:none;border:1px solid " + this.colors[i] + ";background-color:" + this.bgColors[i] + "' >" + this.alphabets[i] + "</span>", optionsStr += "</div>", this.drops.push("drop" + (i + 1));
            optionsStr += "</div>", $("#questionText", this.obj).html(optionsStr), $("#questionText", this.obj).removeClass("left"), $("#questionOptions", this.obj).html(qStr);
            var ulList = $(".topsort", this.obj),
                liArr = ulList.find("li"),
                randomArr = _.shuffle(liArr);
            ulList.html(randomArr);
            var drops = $(".matchdrop", this.obj),
                len = drops.length,
                minFontSize = 16;
            for (var i = 0; i < len; i++) {
                var node = drops[i];
                node.style.fontSize = minFontSize + "px"
            }
            var drags = $(".matchdrag", this.obj),
                len = drags.length,
                minFontSize = 16;
            for (var i = 0; i < len; i++) {
                var node = drags[i];
                node.style.fontSize = minFontSize + "px"
            }
            var fontSize = this.resizeText(drops, .8);
            drops.find("span").css("font-size", fontSize + "em"), this.enableInteraction();
            var loadedImageCount = 0,
                imgArray = $("#activityContent img", this.obj),
                imgCount = imgArray.length,
                that = this;
            imgCount == 0 && this.trigger(assessEvent.TEMPLATE_READY), _.each(imgArray, function(e) {
                $(e).on("load", function() {
                    loadedImageCount++, imgCount === loadedImageCount && (that.trigger(assessEvent.IMG_LOADED), that.trigger(assessEvent.TEMPLATE_READY))
                }), $(e).on("error", function() {
                    loadedImageCount++, imgCount === loadedImageCount && that.trigger(assessEvent.TEMPLATE_READY)
                })
            }), that.maxItemHeight && (that.maxItemHeight = that.checkMaxHeight(qOptions, "drop"), $(".matchdrop", that.screen).css("height", that.maxItemHeight + "px"))
        },
        checkMaxHeight: function(e, t) {
            var n = e.length,
                r = 0;
            for (var i = 0; i < n; i++) {
                var s = $("#" + t + (i + 1), this.screen).css("height");
                s = s.substr(0, s.length - 2), s > r && (r = s)
            }
            return r
        },
        resizeText: function(e, t) {
            var n = t;
            for (var r = 0; r < e.length; r++) e[r].offsetWidth < e[r].scrollWidth && (n -= .1);
            return n
        },
        enableInteraction: function() {
            $(".matchdrag", this.obj).bind(assessEvent.CLICK, this.onTargetSelected), $(".matchdrop", this.obj).bind(assessEvent.CLICK, this.onOptionSelected), $(".matchdrag", this.obj).removeClass("disableTarget"), $(".matchdrop", this.obj).removeClass("disableOption"), $("#questionText", this.obj).removeClass("disabled")
        },
        disableInteraction: function() {
            var e = $("#activityContent img", this.obj);
            $(".matchdrag", this.obj).unbind(), $(".matchdrop", this.obj).unbind(), $(".matchdrag", this.obj).addClass("disableTarget"), $(".matchdrop", this.obj).addClass("disableOption"), $("#questionText", this.obj).addClass("disabled"), $("#questionMedia img", this.screen).unbind(), e.off()
        },
        onOptionSelected: function(e) {
            if (this.itemClicked == 1) return;
            $("#questionText", this.obj).find(".optionSelected").css("color", "#000"), $("#questionText", this.obj).find(".optionSelected").removeClass("optionSelected"), node = e.target, node.nodeName.toLowerCase() == "span" && (node = node.parentNode), node.nodeName.toLowerCase() == "p" && (node = node.parentNode.parentNode), this.itemClicked = !0, this.optionNode = node.id;
            var t = parseInt(node.id.split("drop")[1]);
            this.optionSelected = this.alphabets[t - 1], this.optionColor = $(node).find(".dropBand").css("background-color"), this.optionBorderColor = $(node).find(".dropBand").get(0).style.border;
            var n = this;
            $("#" + this.optionNode, this.obj).addClass("optionSelected"), $("#" + this.optionNode, this.obj).css("background-color", this.optionColor), _.delay(function() {
                n.addHoverClass(n.optionNode)
            }, 300), _.delay(n.resetClickFlag, 500)
        },
        onTargetSelected: function(e) {
            if (this.itemClicked == 1) return;
            $("#questionOptions", this.obj).find(".optionSelected").removeClass("optionSelected"), node = e.target;
            if (node.nodeName.toLowerCase() == "div" || node.nodeName.toLowerCase() == "span" || node.nodeName.toLowerCase() == "img") node = node.parentNode;
            this.itemClicked = !0, this.targetSelected = node.id;
            var t = this;
            this.optionSelected || $("#" + this.targetSelected, this.obj).addClass("optionSelected"), $("#" + this.targetSelected, this.obj).find(".optionsText").addClass("optionSelected"), _.delay(function() {
                t.addHoverClass(t.targetSelected)
            }, 300), _.delay(this.resetClickFlag, 500)
        },
        addHoverClass: function(e) {
            this.checkAndFillValue()
        },
        resetClickFlag: function() {
            this.itemClicked = !1
        },
        checkAndFillValue: function() {
            if (this.optionSelected != "" && this.targetSelected != "") {
                $("#" + this.targetSelected, this.obj).get(0).setAttribute("data-group", this.optionSelected), $("#" + this.targetSelected, this.obj).css({
                    "background-color": this.optionColor,
                    border: this.optionBorderColor
                }), badge = $("#" + this.targetSelected, this.obj).find(".dragBand"), badge.html(this.optionSelected), $(".matchdrop", this.obj).removeClass("optionSelected"), $("#" + this.targetSelected, this.obj).removeClass("optionHighlight"), $("#" + this.targetSelected, this.obj).find(".optionsText").removeClass("optionSelected"), this.optionSelected = this.targetSelected = this.optionNode = "", this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
                var e = 0;
                for (var t = 0; t < this.drags.length; t++) dragLabel = $("#opt" + this.drags[t], this.obj).find(".dragBand").html(), dragLabel != "" && e++;
                e == this.drags.length ? this.trigger(assessEvent.Q_STATUS, AppConst.COMPLETE) : e > 0 ? this.trigger(assessEvent.Q_STATUS, AppConst.PARTIAL) : this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT)
            }
        },
        handleEvaluate: function(e) {
            if (e != undefined && $(e.target).hasClass("disabled")) return;
            this.EvaluateFlag = !0;
            var correctAnswerLabels = [],
                binLabels = [];
            this.userResponse = [];
            var myanswerIndex = 0,
                totalCorrect = 0;
            this.answers = _.flatten(this.answers), utils.log("answers", this.answers), $("#questionText", this.obj).find(".optionSelected").css("background-color", "#fff"), $("#questionText", this.obj).find(".optionSelected").css("color", "#000"), $(".indicators", this.obj).removeClass("optionSelected"), $(".optionText", this.obj).removeClass("optionSelected"), $(".matchdrag", this.obj).removeClass("markRight2"), $(".matchdrag", this.obj).removeClass("markWrong2");
            var qOptions = eval(_.clone(this.options));
            utils.log("qOptions", qOptions);
            var markPerQ = parseFloat(this.maxpoints / this.drags.length),
                marksQbtained = 0;
            for (var i = 0; i < qOptions.length; i++) binLabels.push(this.alphabets[i]);
            for (var i = 0; i < this.drags.length; i++) utils.log("#opt" + this.drags[i]), dragLabel = $("#opt" + this.drags[i], this.obj).find(".dragBand").html(), dragLabelIndex = binLabels.indexOf(dragLabel) + 1, utils.log("dragLabelIndex", dragLabelIndex), this.userResponse.push(dragLabelIndex), dragLabelIndex == this.answers[i] ? ($("#opt" + (i + 1), this.obj).addClass("markRight2"), marksQbtained += markPerQ, totalCorrect++) : $("#opt" + (i + 1), this.obj).addClass("markWrong2");
            this.partialAttempt || ($(".matchDrag", this.obj).removeClass("markRight2"), $(".matchDrag", this.obj).removeClass("markWrong2"));
            var attemtedInputs = _.without(this.userResponse, 0).length;
            this.partialAttempt == 1 || attemtedInputs == this.drags.length ? totalCorrect == this.drags.length ? this.trigger(assessEvent.MARK_CORRECT, this.qId, {
                userResponse: this.userResponse,
                score: marksQbtained,
                status: AppConst.CORRECT,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                blanksCount: this.blanksCount,
                groupsCount: this.groupsCount,
                responseType: this.responseType
            }) : totalCorrect > 0 ? this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: marksQbtained,
                status: AppConst.PARTIAL,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                blanksCount: this.blanksCount,
                groupsCount: this.groupsCount,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_INCORRECT, this.qId, {
                userResponse: this.userResponse,
                score: marksQbtained,
                status: AppConst.INCORRECT,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                blanksCount: this.blanksCount,
                groupsCount: this.groupsCount,
                responseType: this.responseType
            }) : this.trigger(assessEvent.MARK_ANSWER, this.qId, {
                userResponse: this.userResponse,
                maxScore: this.maxpoints,
                title: this.title,
                type: this.type,
                blanksCount: this.blanksCount,
                groupsCount: this.groupsCount,
                responseType: this.responseType
            }), this.isReset = !1, this.lockQuestion()
        },
        lockQuestion: function() {
            this.correctAnswerVisible = !1, this.changeToolbar.mode = AppConst.TOOLBAR_LOCKED, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.disableInteraction()
        },
        populateAnswers: function(answers, correctAnswerVisible) {
            if (this.isReset && this.isTest && !this.isReview) return;
            try {
                answers.length > 0 && (this.EvaluateFlag = !0), $(".matchdrag", this.obj).unbind();
                var qBody = eval(this.questionText);
                $("#questionOptions", this.obj).find(".dragBand").html(""), this.answers = _.flatten(this.answers);
                if (answers.length > 0)
                    for (var i = 0; i < answers.length; i++) {
                        if (answers[i] != 0) {
                            var dragDataGroup = $("#drop" + answers[i], this.obj).find("span").html();
                            utils.log("dragDataGroup : " + dragDataGroup), $("#opt" + this.drags[i], this.obj).get(0).setAttribute("data-group", dragDataGroup), $("#opt" + this.drags[i], this.obj).find(".dragBand").html(this.alphabets[answers[i] - 1]), $("#opt" + this.drags[i], this.obj).css({
                                "background-color": this.bgColors[answers[i] - 1],
                                border: "1px solid " + this.colors[answers[i] - 1]
                            })
                        } else $("#opt" + this.drags[i], this.obj).get(0).setAttribute("data-group", ""), $("#opt" + this.drags[i], this.obj).find(".dragBand").html(""), $("#opt" + this.drags[i], this.obj).css("background-color", "white"), $("#opt" + this.drags[i], this.obj).find(".optionsText").css("color", "#8A8A8A");
                        this.resetFlag != 1 && correctAnswerVisible != 0 ? answers[i] == this.answers[i] ? $("#opt" + (i + 1), this.obj).addClass("markRight2") : $("#opt" + (i + 1), this.obj).addClass("markWrong2") : (utils.log("else case"), $("#opt" + (i + 1), this.obj).removeClass("markRight2"), $("#opt" + (i + 1), this.obj).removeClass("markWrong2"))
                    } else $(".dragBand", this.obj).find(".dragBand").html(""), $(".matchDrag", this.obj).css("background-color", "white"), $(".optionsText", this.obj).css("color", "#8A8A8A");
                (this.isTest || this.partialAttempt == 0) && !this.isReview && ($(".matchdrag", this.obj).removeClass("markRight2"), $(".matchdrag", this.obj).removeClass("markWrong2")), this.resetFlag = !1, !this.isReview && answers.length <= 0 && this.enableInteraction()
            } catch (error) {
                console.log(error)
            }
        },
        resetQuestion: function(e) {
            this.isReset = !0, this.resetClicked = !0, $("#questionText", this.obj).html(""), $("#questionOptions", this.obj).html(""), this.userResponse = [], this.renderQues(), this.enableInteraction(), this.trigger(assessEvent.MARK_EMPTY, this.qId), this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar), this.EvaluateFlag = !1, this.optionSelected = "", this.targetSelected = "", $(".matchdrag", this.obj).removeClass("optionSelected"), this.trigger(assessEvent.Q_STATUS, AppConst.NO_ATTEMPT)
        },
        resetQuestionPartial: function(e) {
            this.changeToolbar.mode = AppConst.TOOLBAR_DEFAULT, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar);
            var t = !0;
            if (this.userResponse.length > 0)
                for (var n = 0; n < this.userResponse.length; n++) this.userResponse[n] == this.answers[n] ? (t = !1, this.changeToolbar.mode = AppConst.TOOLBAR_ACTIVE, this.trigger(assessEvent.ANSWER_MARKED, this.changeToolbar)) : (this.userResponse[n] = 0, $("#opt" + this.drags[n], this.obj).removeAttr("background-color"), $("#opt" + this.drags[n], this.obj).find(".optionsText").removeAttr("color"), $("#opt" + this.drags[n], this.obj).get(0).setAttribute("data-group", ""), $("#opt" + this.drags[n], this.obj).get(0).setAttribute("data-group", ""), $("#opt" + this.drags[n], this.obj).find(".dragBand").html(""));
            this.EvaluateFlag = !1, this.resetFlag = !0, this.optionSelected = "", this.targetSelected = "", this.populateAnswers(this.userResponse, !0), this.enableInteraction(), t == 0 ? this.trigger(assessEvent.UPDATE_RESPONSE, this.qId, {
                userResponse: this.userResponse
            }) : this.trigger(assessEvent.MARK_EMPTY, this.qId), this.disableButton(AppConst.QBTN_RESET)
        },
        disableButton: function(e) {
            $("#" + e, this.obj).addClass("disabled")
        },
        handleScreenExit: function() {
            this.iScroll != null && this.iScroll.destroy(), this.optionScroll != null && this.optionScroll.destroy(), this.quesScroll != null && this.quesScroll.destroy()
        },
        orientationchange: function(e) {},
        destroy: function() {
            this.unbind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.unbind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.unbind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.unbind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.unbind(assessEvent.MARK_EMPTY, this.markEmpty), this.unbind(assessEvent.UPDATE_RESPONSE, this.updateResponse), $("#questionOptions", this.obj).find("li").unbind(), $("#ques" + this.model.get("id")).remove(), this.disableInteraction()
        }
    });
    return groupingTapPlace
}), define("com/es/widgets/assessment/model/groupingTapPlaceVO", [], function() {
    var e = Backbone.Model.extend({
        id: "",
        modelParagraph: "",
        type: "",
        layout: "",
        responseType: "",
        clues: "",
        rubric: "",
        questionText: "",
        questionMedia: "",
        optionsMedia: "",
        leftCol: "",
        rightCol: "",
        opLayout: "",
        options: "",
        answers: "",
        isTest: "",
        isReview: "",
        reviewData: "",
        heading: "",
        userResponse: "",
        partialAttempt: !0,
        feedback: []
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/resultScreenView/templateContent.html", [], function() {
    return "<div id='resultsScreen' class='screen'>\n    <div id='header' class='result-grid-head'>\n        <!--LEFT BTN-->\n        <div id='header-left' style='display: <%=leftVisible%>' class='header-left-btn'>\n            <div class='<%=leftBtnClass%>'>\n                <span id='backBtn' class='btn'><%=AssesmentLang.BACK_BUTTON_LABEL%></span>\n                <span><%=AssesmentLang.QUIT_RESULTS_LABEL%></span>\n            </div>\n        </div>\n        <!--TITLE-->\n        <!--h1 style='display: <%=titleVisible%>'><%=title%></h1-->\n        <!--RIGHT BTN-->\n        <div class='header-right-btn resourceBtn'>\n            <div class='<%=rightBtnClass%>'>\n                <div>\n                    <span></span>\n                </div>\n                <p><%=rightLabel%></p>\n            </div>\n        </div>\n    </div>\n    <div id='resultsContentCover'>\n        <div id='resultsContent'></div>\n    </div>\n    <!--div class='footerbar'>\n		<span id='backBtn'>Back</span>\n		<span id='resourceBtn'>Useful Resources</span>\n	</div-->\n</div>"
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/resultScreenView/resultsTemplate.html", [], function() {
    return '<div class="qinfo">\n    <span id="usernameSpan"><%=AssesmentLang.QUIT_RESULTS_LABEL%></span>\n</div>\n<div class="progressdiv">\n    <span  id="testScore" class="score">\n        <span class="type"><%=AssesmentLang.QUIT_RESULTS_LABEL%></span>\n        <span class="title"><%=AssesmentLang.RESULT_TYPE_LABEL%></span>\n        <span class="taken"><%=AssesmentLang.RESULT_TAKEN_LABEL%></span>\n        <span class="attempt"><%=AssesmentLang.RESULT_ATTEMPT_LABEL%></span>\n        <span class="score"><%=AssesmentLang.RESULT_SCORE_LABEL%></span>\n        <span class="actions"><%=AssesmentLang.RESULT_ACTION_LABEL%></span>\n    </span>\n</div>\n<div id= "detailedProgressCover">\n    <div id= "detailedProgress" class="resques"></div>\n</div>'
}), define("com/es/widgets/assessment/view/resultScreen", ["com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/resultScreenView/templateContent.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/resultScreenView/resultsTemplate.html"], function(e, t, n, r, i) {
    var s = Backbone.View.extend({
        curObj: this,
        screen: null,
        headerClass: "homehead",
        screenClass: "",
        leftBtnClass: "",
        resultData: [],
        iScroll: null,
        selectedFeedback: null,
        resourceButton: null,
        initialize: function() {
            _.bindAll(this, "handleReviewClick", "handleBackClick", "destroy")
        },
        render: function() {
            this.generateResults()
        },
        generateResults: function() {
            this.resultData = this.model.get("resultData");
            var n = this.model.get("testFeedbackData"),
                s = this.model.get("testMarkScheme");
            this.$el.QAappend(_.template(r, this.model.toJSON())), e.log("el === ", this.$el), this.screen = this.el, e.log("result screen ", $(this.screen));
            var o = _.template(i, this.model.toJSON());
            $("#resultsContent", this.screen).html(o), $("#header", this.screen).hide(), t.username != "" && t.username != undefined && $("#usernameSpan", this.screen).html(WidgetLang.TEST_RESULTS_FOR_LABEL + t.username);
            var u = 0,
                a = 0,
                f = "<ul>";
            for (var l = 0; l < this.resultData.length; l++) {
                var c = this.resultData[l].score;
                c == undefined ? c = 0 : c = parseFloat(parseFloat(c).toFixed(1));
                var h = parseFloat(parseFloat(this.resultData[l].maxScore).toFixed(1)),
                    p = this.resultData[l].questionData,
                    d = this.resultData[l].title != undefined ? this.resultData[l].title : "Default title";
                f += '<li class="progress-text">', f += '<span class="type">Quiz</span>', f += '<span class="title">' + d + "</span>", f += '<span class="taken">27.03.14</span>', f += '<span class="attempt">1st</span>', f += '<span class="score">' + c + "/" + h + "</span>", f += '<span class="actions">Try Again</span>', f += "</li>"
            }
            f += "<br/><br/><br/>", f += "</ul>", $("#detailedProgress", this.screen).html(f)
        },
        getQuestionTitle: function(n) {
            return n.type == t.QUESTION_TYPE_MCQ && n.responseType == "BUTTON" ? n.questionBody[0].type != "image" ? (title = n.questionBody[0].data != "" ? n.questionBody[0].data : n.rubric[0].data, title = title != "" ? title : n.title) : title = n.rubric[0].data != "" ? n.rubric[0].data : n.title : n.type == t.QUESTION_TYPE_MCQ && n.responseType == t.RESPONSE_TYPE_BINARY ? n.options[0].type != "image" ? (title = n.options[0].data != "" ? n.options[0].data : n.rubric[0].data, title = title != "" ? title : n.title) : title = n.rubric[0].data != "" ? n.rubric[0].data : n.title : title = n.rubric[0].data != "" ? n.rubric[0].data : n.title, e.handleEscapeSequence(title)
        },
        initScroll: function() {
            var e = $("#resultsScreen").get(0).clientHeight - $("#header").get(0).clientHeight - $(".qinfo").get(0).clientHeight - $(".progressdiv").get(0).clientHeight;
            $("#testFeedbackContainer").css("height", e + "px"), $("#testFeedbackContainer").css("overflow", "hidden"), $("#testFeedbackContainer").css("position", "relative"), this.iScroll != null && this.iScroll.destroy(), this.iScroll = new IScroll($("#testFeedbackContainer").get(0), {
                desktopCompatibility: !0,
                hScroll: !0,
                keyBindings: !0
            }), ths = this, _.delay(function() {
                ths.iScroll.refresh()
            }, 999)
        },
        handleBackClick: function(e) {
            this.trigger("reviewTest")
        },
        handleReviewClick: function(e) {
            if (this.iScroll.moved) return;
            var t = e.target;
            t.className != "review-outer" && (t = t.parentNode);
            var r = t.id.split("review")[1];
            this.iScroll != null && this.iScroll.destroy(), Backbone.Events.trigger(n.REVIEW_QUESTION, r.toString())
        },
        destroy: function() {
            this.iScroll != null && this.iScroll.destroy(), $(".feedback-outer", this.screen).unbind(), $(".review-outer", this.screen).unbind(), this.resourceButton.unbind(), $(".header-right-btn", this.screen).unbind(), $(".header-left-btn", this.screen).unbind(), $("#" + t.RESULT_SCREEN, this.screen).unbind(), $("#" + t.RESULT_SCREEN, this.screen).remove(), this.screen.remove(), this.screen = null, this.off()
        }
    });
    return s
}), define("com/es/widgets/assessment/model/resultScreenVO", [], function(e, t) {
    var n = Backbone.Model.extend({
        initialize: function() {
            this.set({
                myId: "",
                leftLabel: "",
                title: "",
                rightLabel: "",
                leftBtnClass: "",
                rightBtnClass: "",
                content: "",
                headerVisible: "block",
                leftVisible: "block",
                titleVisible: "block",
                rightVisible: "block",
                questionIds: [],
                resultData: [],
                testFeedbackData: [],
                colorCode: "",
                testMarkScheme: []
            })
        },
        toString: function() {
            return e.RESULT_SCREEN
        }
    });
    return n
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/welcomeScreenView/templateContent.html", [], function() {
    return '<div id="splashScreen" class="clearfix splashScreen">\n    <div id="container-div"  style="overflow: auto;">\n        <div class="l-column">\n            <div class="splash-title">\n                <%=testTitle%>\n            </div>\n            <h5><%=AssesmentLang.ATTEMPTS_LABEL%></h5>\n            <ul id="prevAttemptContainer" style="list-style: none;">\n                \n            </ul>\n        </div>\n        <div class="r-column">\n            <div class="quiz-instruction"><%=AssesmentLang.WELCOME_SCREEN_INSTRUCTION_TITLE%></div>\n           <%=AssesmentLang.WELCOME_SCREEN_INSTRUCTION_MESSAGE%>\n            <span id="startTest"  class="btn splashScreen-btn"><%=AssesmentLang.WELCOME_SCREEN_START_BUTTON%></span>\n        </div>\n    </div>\n</div>'
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/welcomeScreenView/prevAttemptTemplate.html", [], function() {
    return '<% _.each(objArr, function(obj, index) { %>\n    <li>\n        <div class="quiz-box-pattern">\n            <%\n                var countStr = "Last "+ (objArr.length - index);\n            %>\n            <div class="quiz-attempt">\n                <span class="quiz-attempt-score"> <%=countStr%> <%=parseFloat(parseFloat(obj.score).toFixed(1))%>/<%=parseFloat(parseFloat(obj.maxScore).toFixed(1))%> </span>\n                <%\n                        var per = parseFloat((obj.score/obj.maxScore)*100), grade;\n                        if(per < 33.33){\n                            grade = "R";\n                        }else if(per < 66.66){\n                            grade = "A";\n                        }else{\n                            grade = "G";\n                        }\n                %>\n                <span class="<%=grade%>-pattern"><%=grade%></span>\n            </div>\n            <div class="result-progress">\n                <span class="result-arrow" style="left: <%=per%>%;"></span>\n                <span class="progress-thumb"></span>\n            </div>\n        </div>\n    </li>\n<% }); %>'
}), define("com/es/widgets/assessment/view/welcomeScreenView", ["com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/welcomeScreenView/templateContent.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/welcomeScreenView/prevAttemptTemplate.html"], function(e, t, n, r, i) {
    var s = Backbone.View.extend({
        iScroll: null,
        _widget: null,
        _prevAttemptsArr: [],
        initialize: function() {
            _.bindAll(this, "handleStartTest", "updatePreviousResponse", "initScroll")
        },
        render: function(e) {
            var t = _.template(r);
            this.screen = this.el;
            var i = this;
            _widget = $("#" + this.model.get("uiId") + " #assessment-container", this.$el), $(_widget).html(t(this.model.toJSON()));
            var s = {
                testId: this.model.get("testId"),
                maxAttempts: 3,
                callbkFn: this.updatePreviousResponse
            };
            this.trigger(WIDGET_EVENTS.FETCH_PREVIUOUS_ATTEMPTS, s), $("#startTest", this.screen).bind(n.CLICK, this.handleStartTest), _.delay(function() {
                i.initScroll(), i.trigger(n.TEMPLATE_READY)
            }, 999)
        },
        initScroll: function() {
            var e = this;
            this.iScroll != null && this.iScroll.destroy(), this.iScroll = new IScroll($("#splashScreen").get(0), {
                desktopCompatibility: !0,
                vScroll: !0,
                keyBindings: !0
            }), _.delay(function() {
                e.iScroll.refresh()
            }, 999)
        },
        handleStartTest: function() {
            this.iScroll != null && this.iScroll.destroy(), this.trigger(WIDGET_EVENTS.START_TEST_CLICK, this.el, this._prevAttemptsArr, this.destroy)
        },
        updatePreviousResponse: function(e) {
            this._prevAttemptsArr = e.result;
            if (this._prevAttemptsArr.length > 0) {
                var t = _.template(i, {
                    objArr: e.result
                });
                $("#prevAttemptContainer", this.screen).html(t)
            } else $("#prevAttemptContainer", this.screen).html(WidgetLang.NO_PREVIOUS_ATTEMPT)
        },
        destroy: function() {
            this._prevAttemptsArr = [], $("#splashScreen").remove(), $("#splashScreen").unbind(), $("#startTest", this.screen).unbind()
        }
    });
    return s
}), define("com/es/widgets/assessment/model/welcomeScreenVO", [], function() {
    var e = Backbone.Model.extend({
        defaults: function() {
            return {
                testId: "",
                testTitle: ""
            }
        }
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizFinishScreenView/templateContent.html", [], function() {
    return '<div id="quizFinishScreen" class="clearfix splashScreen">\n	<div id="container" class="quizFinishContainer">\n        <h5><%=AssesmentLang.QUIT_RESULTS_LABEL%></h5>\n        <h2><%=title%></h2>\n        <h5><%=AssesmentLang.ATTEMPTS_LABEL%></h5>\n        <ul id="prevAttemptContainer" style="list-style: none;width:50%;">\n            \n        </ul>\n        <span id="tryAgainBtn"  class="btn splashScreen-btn"> <%=AssesmentLang.TRY_AGAIN_LABEL%> </span>\n        <span id="finishedTest"  class="btn splashScreen-btn"> <%=AssesmentLang.FINISH_LABEL%> </span>\n	</div>\n</div>'
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizFinishScreenView/prevAttemptTemplate.html", [], function() {
    return '<% _.each(objArr, function(obj, index) { %>\n    <li>\n        <div class="quiz-box-pattern">\n            <%\n                var countStr = "Last "+ (objArr.length - index);\n            %>\n            <div class="quiz-attempt">\n                <span class="quiz-attempt-score"> <%=countStr%> <%=parseFloat(parseFloat(obj.score).toFixed(1))%>/<%=parseFloat(parseFloat(obj.maxScore).toFixed(1))%> </span>\n                <%\n                        var per = parseFloat((obj.score/obj.maxScore)*100), grade;\n                        if(per < 33.33){\n                            grade = "R";\n                        }else if(per < 66.66){\n                            grade = "A";\n                        }else{\n                            grade = "G";\n                        }\n                %>\n                <span class="<%=grade%>-pattern"><%=grade%></span>\n            </div>\n            <div class="result-progress">\n                <span class="result-arrow" style="left: <%=per%>%;"></span>\n                <span class="progress-thumb"></span>\n            </div>\n        </div>\n    </li>\n<% }); %>'
}), define("com/es/widgets/assessment/view/quizFinishScreen", ["com/es/widgets/assessment/utilities", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizFinishScreenView/templateContent.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizFinishScreenView/prevAttemptTemplate.html"], function(e, t, n, r, i) {
    var s = Backbone.View.extend({
        iScroll: null,
        initialize: function() {
            _.bindAll(this, "handleFinishedTest", "handleTryAgain", "initScroll")
        },
        render: function(e) {
            this.screen = this.el;
            var t = this,
                s = _.template(r);
            $(this.el).html(s(this.model.toJSON()));
            var o = _.template(i, {
                objArr: this.model.get("attemptsArr")
            });
            $("#prevAttemptContainer", this.screen).html(o), $("#finishedTest", this.screen).bind(n.CLICK, this.handleFinishedTest), $("#tryAgainBtn", this.screen).bind(n.CLICK, this.handleTryAgain), _.delay(function() {
                t.initScroll(), t.trigger(n.TEMPLATE_READY)
            }, 999)
        },
        initScroll: function() {
            var e = this;
            this.iScroll != null && this.iScroll.destroy(), this.iScroll = new IScroll($("#quizFinishScreen").get(0), {
                desktopCompatibility: !0,
                vScroll: !0,
                keyBindings: !0
            }), _.delay(function() {
                e.iScroll.refresh()
            }, 999)
        },
        handleFinishedTest: function() {
            this.trigger(WIDGET_EVENTS.TEST_FINISH_CLICK)
        },
        handleTryAgain: function() {
            this.trigger(WIDGET_EVENTS.TEST_TRY_AGAIN_CLICK)
        },
        destroy: function() {
            $("#quizFinishScreen").unbind(), $("#finishedTest", this.screen).unbind(), $("#tryAgainBtn", this.screen).unbind(), $("#quizFinishScreen").remove()
        }
    });
    return s
}), define("com/es/widgets/assessment/model/quizFinishScreenVO", [], function() {
    var e = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "",
                attemptsArr: ""
            }
        }
    });
    return e
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/inlineViewTemplate.html", [], function() {
    return "<div class='ui-assessment-widget widget-ui ui-border invisible' id='<%=uiId%>' style='width: <%=width%>;' >\r\n	<div id='assessment-container'> </div>\r\n	<div class='inline-widget-footer'>\r\n		<div class='ui-assessment-icon icon icon-ic-assessment'></div>\r\n		<div class='ui-gal-text-left'><%=unescape(title)%></div>\r\n		<!--<div class='ui-maximize ui-right-div'></div>-->\r\n        <div class=\"ui-maximize ui-right-div-control icon icon-ic-fullscreen\"></div>\r\n	</div>\r\n</div>\r\n"
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/borderDivTemplate.html", [], function() {
    return '<div id="div-border-<%=id%>"></div>'
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/popupViewTemplate.html", [], function() {
    return "<div class='ui-assessment-widget' id='<%=uiId%>'>\n	<div id='assessment-container'> </div>\n</div>"
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/printViewTemplate.html", [], function() {
    return "<div class='print-widget-ui print-border invisible' id='<%=uiId%>' style='width: <%=width%>;' >\r\n	<div class='print-widget-header'>\r\n		<div class='ui-assessment-icon icon icon-ic-assessment'></div>\r\n		<div class='ui-gal-text-left'><%=unescape(title)%></div>\r\n	</div>\r\n	<div id='assessment-container'>\r\n		<div id='content' class='content'></div>\r\n	</div>\r\n</div>\r\n"
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/questionPlayer/templateHeader.html", [], function() {
    return "<div id='<%=myId%>' class='screen question-player'>\n	<!--header-->\n	<div id='header' class='head' style='display: <%=headerVisible%>;background-color: <%=colorCode%>'>\n		<!--LEFT BTN-->\n	 	<div id='header-left' style='display: <%=leftVisible%>' class='header-left-btn <%=leftBtnClass%>'>\n            <span><%=leftLabel%></span>\n		</div>\n		<!--TITLE-->\n		<h1 style='display: <%=titleVisible%>'><%=title%></h1>\n		<!--RIGHT BTN-->\n		<div class='header-right-btn' style='display: <%=rightVisible%>'>\n			<div class='<%=rightBtnClass%>'>\n				<div>\n					<span></span>\n				</div>\n                <p><%=rightLabel%></p>\n			</div>\n		</div>\n	</div>\n	<div class='qinfo phone' id='info' style='background-color: <%=colorCode%>'>\n		<span class='qposition'></span>\n		<div class='infoButton'></div>\n		<span class='qtime'></span>\n		<div class='qMapWrapper'><div class='qMap'></div></div>\n	</div>\n	<div class='qinstructions' id='inst'>\n        <span class='instructionTitle instruction-title closed'><%=AssesmentLang.QUESTION_INSTRUCTION%></span>\n        <span class='instructionContent instruction-content'></span>\n        <div id='instructionsWrapper'><img/></div>\n    </div>"
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/questionPlayer/templateContent.html", [], function() {
    return "<div id='content' class='content'></div>"
}), define("com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/questionPlayer/templateFooter.html", [], function() {
    return "	<div id='footer' style='background-color: <%=colorCode%>' class='footer-assessment-widget'>\r\n		<div id='assessmentBtnsContainer' class=\"footer-assesment-btn-widget\">\r\n        	<div class=\"assessment-btns\">\r\n                <div id='resetQBtn' class='footer_ico reset-btn-icon'  style='display:inline-block;'>\r\n\r\n                   <!-- <%=AssesmentLang.RESET_BTN_LABEL%>-->\r\n                </div>\r\n                <div id='answersBtn' class='footer_ico myAnswers'  style='display:inline-block;margin: 0 5px;  left: 5px'>\r\n                    <!--%=AssesmentLang.ANSWER_BTN_LABEL%-->\r\n                </div>\r\n                <div id='evaluateBtn' class='footer_ico evaluate-btn-icon'  style='left:5px;display:inline-block;margin: 0 5px;  left: 5px'>\r\n                    <!--<%=AssesmentLang.EVALUATE_BTN_LABEL%>-->\r\n                </div>\r\n                <div class='action-buttons-outer'>\r\n                    <span id='ReportBtn' class='reportButton report-btn'><label><%=AssesmentLang.SUBMIT_LABEL%></label></span>\r\n                </div>\r\n            </div>\r\n        	<div class=\"prev-next-wid-pagination\">\r\n                <span id='prevQBtn' class='footer_ico'></span>\r\n                <span id='qMapDesktop' class='footer_ico arrow-wid-pagination'></span>\r\n                <span id='nextQBtn' class='footer_ico'></span>\r\n                <div class='qinfo desktop pagination-info' id='info' style='background-color: <%=colorCode%>'>\r\n                    <div class='infoButton'></div>\r\n                    <span class='qposition'></span>\r\n            	</div>\r\n            </div>\r\n            <div class=\"assessment-submit-btn\" style='display:none;'>\r\n            	<button type=\"submit\" class=\"blue-submit-btn\">Submit</button>\r\n            </div>\r\n		</div>\r\n		\r\n\r\n		<div id='reviewBtnsContainer' style='display:none;'>\r\n			<span id='prevQBtn' class='footer_ico'><%=AssesmentLang.PREVIOUS_LABEL%></span>\r\n			<span id='qMapDesktop' class='footer_ico'></span>\r\n			<span id='correctAnsBtn' class='review_ico'><%=AssesmentLang.CORRECT_ANSWER_BTN_LABEL%></span>\r\n			<span id='userAnsBtn' class='review_ico'><%=AssesmentLang.USER_ANSWER_BTN_LABEL%></span>\r\n			<span id='feedbackBtn' class='footer_ico'><%=AssesmentLang.FEEDBACK%></span>\r\n			<span id='nextQBtn' class='footer_ico'><%=AssesmentLang.NEXT_LABEL%></span>\r\n			<span id='ReportBtn' class='reportButton report-btn'><label><%=AssesmentLang.SUBMIT_LABEL%></label></span>\r\n		</div>\r\n	</div>\r\n	<!--<div class='inline-widget-footer'> \r\n		<div class='ui-assessment-icon'></div>\r\n		<div class='ui-gal-text-left'><%=unescape(title)%></div>\r\n		<div class='ui-maximize ui-right-div'></div>\r\n	</div>-->\r\n	<!--div class='questionPopup'>\r\n		<div class='questionPopupBox arrowEvaluate'>\r\n			<img src='interface/wrongAnswer.png' /><img src='interface/correctAnswer.png' />\r\n			<br />Oh, answer?\r\n		</div>\r\n		<div class='questionPopupArrow'></div>\r\n	</div>\r\n	<div class='instructionPopup'>\r\n		<div class='instructionPopupBox'>\r\n			<img src='<%=AssesmentLang.QUESTION_INSTRUCTION_IMAGE%>' />\r\n		</div>\r\n	</div-->\r\n	<div id='instructionsWrapper'></div>\r\n	<div class='resetOverlay'>\r\n		<div id='confirmload' class='hide resetPopup'>\r\n			<div id='confirm'>\r\n				<div id='title'></div>\r\n				<div id='message'></div>\r\n				<div id= 'buttons' class = 'button'>\r\n					<input id='p_reset' type='button'  value= '<%=AssesmentLang.RESET_ONLY_INCORRECT_ANSWERS%>' /><br />\r\n					<input id='c_reset' type='button'  value= '<%=AssesmentLang.RESET_THE_WHOLE_QUESTION%>' /><br />\r\n				</div>\r\n				<input type='checkbox' id='RemReset' value='0' /> <%=AssesmentLang.REMEMBER_MY_PREFERENCE%><br /><br />\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div id='navigatorOverlay'>\r\n		<div id='navigatorWrapper'>\r\n			<div class='navigator hidden'>\r\n				<span id='closeQMap' class='closeBtn'></span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>"
}), define("com/es/widgets/assessment/view/assesmentWidget", ["com/external/jquery.carouFredSel-6.2.1", "com/es/widgets/assessment/AssesmentLang", "com/es/widgets/assessment/utilities", "com/es/widgets/WidgetUtils", "com/es/widgets/assessment/AppConst", "com/es/widgets/assessment/assessEvent", "com/es/widgets/assessment/model/assessmentWidgetVO", "com/es/widgets/assessment/model/mcqVO", "com/es/widgets/assessment/view/mcqView", "com/es/widgets/assessment/model/matchSortVO", "com/es/widgets/assessment/view/matchSortView", "com/es/widgets/assessment/view/fibView", "com/es/widgets/assessment/model/fibVO", "com/es/widgets/assessment/view/fibDropDown", "com/es/widgets/assessment/model/fibDropDownVO", "com/es/widgets/assessment/view/fibTapPlace", "com/es/widgets/assessment/model/fibTapPlaceVO", "com/es/widgets/assessment/view/mcqBinary", "com/es/widgets/assessment/model/mcqBinaryVO", "com/es/widgets/assessment/view/groupingTapPlace", "com/es/widgets/assessment/model/groupingTapPlaceVO", "com/es/widgets/assessment/view/resultScreen", "com/es/widgets/assessment/model/resultScreenVO", "com/es/widgets/assessment/view/welcomeScreenView", "com/es/widgets/assessment/model/welcomeScreenVO", "com/es/widgets/assessment/view/quizFinishScreen", "com/es/widgets/assessment/model/quizFinishScreenVO", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/inlineViewTemplate.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/borderDivTemplate.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/popupViewTemplate.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/quizView/printViewTemplate.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/questionPlayer/templateHeader.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/questionPlayer/templateContent.html", "com/es/text!templateBasePath/Reader/widgetsTemplates/assessmentView/questionPlayer/templateFooter.html"], function(carousel, AssesmentLang, utils, widgetUtils, AppConst, assessEvent, assessmentVO, mcqVO, mcqView, matchSortVO, matchSortView, fibView, fibVO, fibDropDown, fibDropDownVO, fibTapPlace, fibTapPlaceVO, mcqBinaryView, mcqBinaryVO, groupingTapPlace, groupingTapPlaceVO, resultScreen, resultScreenVO, welcomeScreenView, welcomeScreenVO, quizFinishScreenView, quizFinishScreenVO, _defaultViewTpl, _borderDivTpl, _popupViewTpl, _printViewTpl, _templateHeader, _templateContent, _templateFooter) {
    var assessmentWidget = function(data) {
        var _instance, _options, _bookURL, _resourceURL, _widgetObj, _popupView, _data, _frameContent, _frameContentRootEl, _cfg, _uicfg, _templateCfg, _resData, _QuestionId, _responseData = [],
            _questionIds = [],
            _quesView, _inlineQuesView, _quesVO, _refScreen, _jsonObject = {}, _appenderSelector, _isPopupView = !1,
            _widgetObjData, _directLaunch = !1,
            _view, _widgetContent, _maxWidth, _minWidth = WIDGET_CONSTANTS.ASSESSMENT_MIN_WIDTH,
            _minHeight = WIDGET_CONSTANTS.ASSESSMENT_MIN_HEIGHT,
            _resetBtnClick = !1,
            _visibleElement = 0,
            _prevAttemptsArr = [],
            _quizTestID = "",
            _isRendered = !1,
            _isTrackable = !0,
            _isPersistable = require.s.contexts._.config.assessmentConfig.is_persistable,
            _config = {}, _isEditPreview = !1,
            _isQuizPreview = !1,
            _isListPreview = !1,
            _reqConfig = require.s.contexts._.config.theme,
            _initialize = function() {
                _config = require.s.contexts._.config.assessmentConfig, _frameContent = _options.bookFrameContent, _frameContentRootEl = _options.bookFrameContentRootEl;
                if (_options.data_json) {
                    var e = _options.data_json,
                        t = _bookURL.split("/");
                    t.pop(), t = t.join("/") + "/" + _options.dataURL;
                    var n = t.split("/");
                    n.pop(), _resourceURL = n.join("/") + "/", _onDataLoaded(e)
                } else _loadData()
            }, _loadData = function() {
                if (_isEditPreview) var e = _options.dataURL + "data.json";
                else if (_isListPreview) var e = _options.dataURL;
                else {
                    var e = _bookURL.split("/");
                    e.pop(), e = e.join("/") + "/" + _options.dataURL
                }
                var t = e.split("/");
                t.pop(), _resourceURL = t.join("/") + "/", utils.log("url", e), $.getJSON(e, {}).done(function(e) {
                    _onDataLoaded(e)
                }).fail(function(e, t, n) {
                    _instance.trigger(WIDGET_EVENTS.INITTIALIZE_ERROR, n.message)
                })
            }, _onDataLoaded = function(e) {
                e.formattedTitle && (e.title = e.formattedTitle), _options.dataMode === WIDGET_CONSTANTS.DATA_MODE_INLINE && (_minWidth = _frameContentRootEl.width() * .7), _options.bookFrameContent && (_maxWidth = _frameContentRootEl.width()), e.testid && (_quizTestID = e.testid.trim()), $("#" + _widgetObj.id, _options.bookFrameContent).attr("data-testid", _quizTestID), _widgetObjData = e, _data = _widgetObjData.questionsData;
                for (var t = 0; t < _data.length; t++) {
                    _data[t].id || (_data[t].id = _data[t].qId), _data[t].id = _widgetObj.id + "_" + _data[t].id;
                    var n = _data[t].id;
                    _questionIds.push(n), _.findWhere(_responseData, {
                        id: n
                    }) == undefined && _responseData.push({
                        id: n,
                        maxScore: parseFloat(_data[t].maxpoints[0]),
                        title: _data[t].title
                    })
                }
                _checkWidth(), _jsonObject = {
                    uiId: "ui-" + _widgetObj.id,
                    widgetId: "widget-" + _widgetObj.id,
                    title: _widgetObjData.title,
                    width: $("#" + _widgetObj.id, _options.bookFrameContent).width() + "px"
                }, _widgetObjData.poster && (_jsonObject.posterUrl = _resourceURL + _widgetObjData.poster), _cfg = {
                    ContainerEL: _options.bookFrameContent,
                    QuestionIds: _questionIds,
                    Mode: "Practise",
                    Partial_attempt: !0,
                    partial_test_submission: !1,
                    InstantFeedback: !1,
                    TimerLimit: 1,
                    Reset: "Complete",
                    Error_Prefix: "Imf_Error",
                    LogPrefix: "Imf_Log",
                    OrientationSupport: !1
                }, _templateCfg = {
                    dropDown: {
                        attemptMethod: AppConst.DROPDOWN_NATIVE
                    },
                    fibTapPlace: {
                        maintainOptions: AppConst.FIB_MAINTAIN_OPTIONS
                    },
                    fibTapPlaceTable: {
                        maintainOptions: AppConst.FIB_MAINTAIN_OPTIONS
                    },
                    matchSort: {
                        attemptMethod: AppConst.BOTH
                    },
                    reordering: {
                        attemptMethod: AppConst.REORDERING_TAP_PLACE
                    },
                    crossword: {
                        autoPopulate: !0
                    }
                }, _uicfg = {
                    Header: {
                        left: {
                            visible: !1,
                            text: ""
                        },
                        right: {
                            visible: !1,
                            text: ""
                        },
                        title: {
                            visible: !1,
                            text: ""
                        },
                        colorCode: "",
                        visible: !1
                    },
                    Controls: [],
                    Timer: !1,
                    InstructionsImage: ""
                }, _isPersistable && (_options.checkAnswer || (_cfg.Mode = "Test")), WIDGET_CONSTANTS.PRINT_MODE ? _addPrintView() : _directLaunch || _addDefaultView(), _instance.trigger(WIDGET_EVENTS.INITIALIZED, _instance)
            }, _addPrintView = function() {
                var e = _.template(_printViewTpl, _jsonObject);
                utils.log("str", e), $("#" + _jsonObject.uiId, _frameContent).remove(), _options.layout == WIDGET_CONSTANTS.DATA_LAYOUT_FIXED ? _frameContentRootEl.QAappend(e) : ($("#" + _widgetObj.id, _frameContent).empty().addClass("reflow-print").QAappend(e), $("#" + _widgetObj.id, _frameContent).find(".icon").addClass("reflow-print")), _appenderSelector = $("#ui-" + _widgetObj.id, _frameContent);
                for (var t = 0; t < _data.length; t++) _printQuesView(_data[t], t + 1);
                _instance.trigger(WIDGET_EVENTS.RENDER_COMPLETE, _instance)
            }, _printQuesView = function(e, t) {
                var n = [],
                    r = !1,
                    i = !1,
                    s = _cfg.Partial_attempt,
                    o = _options.bookFrameContent,
                    u = "ui-" + _widgetObj.id,
                    a, f;
                switch (e.type) {
                    case AppConst.QUESTION_TYPE_MCQ:
                        e.responseType == AppConst.RESPONSE_TYPE_BINARY ? (utils.log("label true/false", e), a = new mcqBinaryVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s,
                            labelTrue: "True"
                        }), f = new mcqBinaryView({
                            model: a,
                            el: o
                        })) : e.responseType == AppConst.RESPONSE_TYPE_SET ? (a = new mcqSetVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r
                        }), f = new mcqSetView({
                            model: a,
                            el: o
                        })) : (a = new mcqVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s
                        }), f = new mcqView({
                            model: a,
                            el: o
                        }));
                        break;
                    case AppConst.QUESTION_TYPE_IMAGE:
                        a = new imageVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r
                        }), f = new imageTapPlace({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_FIB:
                        e.responseType == AppConst.RESPONSE_TYPE_DRAG ? (a = new fibTapPlaceVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s,
                            maintainOptions: _templateCfg.fibTapPlace.maintainOptions
                        }), f = new fibTapPlace({
                            model: a,
                            el: o
                        })) : (a = new fibVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s
                        }), f = new fibView({
                            model: a,
                            el: o
                        }));
                        break;
                    case AppConst.QUESTION_TYPE_GROUPING:
                        a = new groupingTapPlaceVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s,
                            widgetId: _widgetObj.id
                        }), f = new groupingTapPlace({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_MATCHSORT:
                        a = new matchSortVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s,
                            attemptMethod: _templateCfg.matchSort.attemptMethod
                        }), f = new matchSortView({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_LABELLING:
                        a = new textLabellingVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r
                        }), f = new textLabellingView({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_REORDERING:
                        a = new reorderingShiftViewVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            attemptMethod: _templateCfg.reordering.attemptMethod
                        }), e.questionLayout.toUpperCase() == AppConst.LAYOUT_HORIZONTAL ? (_templateCfg["reordering"]["attemptMethod"] == AppConst.REORDERING_DRAG_DROP && (this.disableIScroll = !0), f = new reorderingShiftViewHorizontal({
                            model: a,
                            el: o
                        })) : f = new reorderingShift({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_SPEAKING:
                        a = new speakingVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r
                        }), f = new speakingView({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_FIB_DROPDOWN:
                        a = new fibDropDownVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s,
                            attemptMethod: _templateCfg.dropDown.attemptMethod
                        }), f = new fibDropDown({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_CROSSWORD:
                        a = new crosswordVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r
                        }), _templateCfg["crossword"]["autoPopulate"] == 1 ? f = new crossword_auto({
                            model: a,
                            el: o
                        }) : f = new crossword_cord({
                            model: a,
                            el: o
                        });
                        break;
                    case AppConst.QUESTION_TYPE_FIBTABLE:
                        e.responseType == AppConst.RESPONSE_TYPE_BINARY ? utils.isPhone() ? (a = new fibDropDownVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            uiId: u,
                            partialAttempt: s,
                            attemptMethod: _templateCfg.dropDown.attemptMethod
                        }), f = new fibDropDown({
                            model: a,
                            el: o
                        })) : (a = new fibBinaryTableVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r,
                            maintainOptions: _templateCfg.fibTapPlaceTable.maintainOptions
                        }), f = new fibBinaryTable({
                            model: a,
                            el: o
                        })) : (a = new fibTextTableVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r
                        }), f = new fibTextTable({
                            model: a,
                            el: o
                        }));
                        break;
                    case AppConst.QUESTION_TYPE_OPENTEXT:
                        a = new openTextVO(e), a.set({
                            userResponse: n,
                            isReview: i,
                            assetPath: _resourceURL,
                            isTest: r
                        }), f = new openText({
                            model: a,
                            el: o
                        })
                }
                f.unbind(), f.render();
                var l = $("#quesWrapper" + e.id, _appenderSelector);
                l.QAprepend("<div class='qinstructions' id='inst'>" + t + ". <span class='instructionContent instruction-content'></span><div id='instructionsWrapper'><img/></div></div>");
                var c = $(".qinstructions", l);
                if (e.rubric == "" || e.rubric == undefined || !e.rubric.length || !e.rubric[0].data.trim().length) c.hide(), $(".qinstructions span.instruction-content", l).html("");
                else {
                    c.show();
                    var h = utils.renderNode(_resourceURL, e.rubric[0]),
                        p = $(".qinstructions span.instruction-title", l),
                        d = $(".qinstructions span.instruction-content", l);
                    p.hide(), c.unbind(), d.html(h)
                }
                l.removeClass("disableTemplate").addClass("enableTemplate")
            }, _refreshScroll = function() {
                _quesView.refreshScroll()
            }, _checkHeight = function() {
                var e = $("#ui-" + _widgetObj.id + " #assessment-container", _options.bookFrameContent).height();
                e += $("#ui-" + _widgetObj.id + " .inline-widget-footer", _options.bookFrameContent).height(), $("#" + _widgetObj.id, _frameContent).height() <= e && $("#" + _widgetObj.id, _frameContent).height(e), $("#" + _widgetObj.id, _options.bookFrameContent).html() != "" && _setMinHeight()
            }, _setMinHeight = function() {
                if (_options.dataMode !== WIDGET_CONSTANTS.DATA_MODE_COMPACT && !_isPopupView) {
                    var e = $("#" + _widgetObj.id, _frameContent).height();
                    e < _minHeight && ($("#" + _widgetObj.id, _frameContent).height(_minHeight), $("#ui-" + _widgetObj.id, _frameContent).height(_minHeight))
                }
            }, _relayout = function() {
                if (_isRendered) {
                    if (_options.dataMode == WIDGET_CONSTANTS.DATA_MODE_INLINE || _options.dataMode == WIDGET_CONSTANTS.DATA_MODE_POSTER && _options.align != "fitToWidth") _checkWidth(), _setHeight();
                    _options.layout !== WIDGET_CONSTANTS.DATA_LAYOUT_FIXED ? _updatePosition() : _setDimension()
                }
            }, _updatePosition = function() {
                if (_options.layout !== WIDGET_CONSTANTS.DATA_LAYOUT_FIXED) {
                    var e = _options.bookFrameContent,
                        t, n, r, i;
                    t = widgetUtils.getOffset($("#" + _widgetObj.id, e)).left, n = widgetUtils.getOffset($("#" + _widgetObj.id, e)).top, r = $("#" + _widgetObj.id, e).width(), i = $("#" + _widgetObj.id, e).height(), $("#" + _widgetObj.id, _frameContent).data("height") == undefined && _options.align == "fitToWidth" && (i = i > _minHeight ? i : _minHeight, $("#" + _widgetObj.id, _frameContent).css("height", i + "px")), _view = $("#ui-" + _widgetObj.id, e).get(0), $(_view).css({
                        top: n + "px",
                        left: t + "px",
                        width: r + "px",
                        height: i + "px",
                        position: "absolute"
                    })
                }
                _options.align == "fitToWidth" && _options.dataMode == "poster" ? ($("#" + _widgetObj.id, e).attr("data-height", i + "px"), $("#ui-" + _widgetObj.id + " img", e).css({
                    height: i + "px",
                    width: "auto"
                })) : _options.align != "fitToWidth" && _options.dataMode == "inline" && $("#" + _widgetObj.id, e).attr("data-width", r + "px")
            }, _widgetType = function() {
                return WIDGET_CONSTANTS.ASSESSMENT_WIDGET
            }, _setOptions = function() {}, _widgetResize = function() {
                _checkWidth(), _setHeight(), _updatePosition(), _quesView && (_quesView.refreshScroll(), _widgetContent && (_quesView.hideQMap(), _quesView.createCrousal(), _.delay(function() {
                    $("#nav" + _quesView.curIndex, _quesView.screen).addClass("selected"), _quesView._visibleElement = _quesView._visibleElement == 0 ? 1 : _quesView._visibleElement, _quesView._visibleElement < _quesView.questionids.length && $(".next", _quesView.obj).removeClass("disabled"), _quesView.curIndex >= _quesView._visibleElement && $(".prev", _quesView.obj).removeClass("disabled"), _quesView.handleQmap()
                }, 300)))
            }, _onCloseAllWidgets = function(e) {
                _quesView && !e && e != undefined && _quesView.destroy(), _widgetContent && _quesView.el == _widgetContent.get(0) && _destroy()
            }, _addDefaultView = function() {
                var e = _.template(_defaultViewTpl, _jsonObject);
                utils.log("str", e), _options.align != "fitToWidth" && $("#" + _widgetObj.id, _frameContent).css("width", $("#" + _widgetObj.id, _frameContent).data("width"));
                var t = $("#" + _widgetObj.id, _frameContent).get(0).innerHTML;
                t = t.trim(), t.length == 0 ? ($("#" + _widgetObj.id, _frameContent).get(0).innerHTML = e, _frameContentRootEl.append($("#" + _jsonObject.uiId, _frameContent))) : _frameContentRootEl.append(e), _appenderSelector = $("#ui-" + _widgetObj.id, _frameContent), _renderAssessmentQuestion(_options.bookFrameContent)
            }, _renderAssessmentWidget = function(e) {
                var t = [];
                _.each(_responseData, function(e) {
                    t.push({
                        id: e.id,
                        maxScore: e.maxScore,
                        title: e.title
                    })
                }), _responseData = t;
                if (_config.is_trackable && (_config.single_ques_quiz || _data.length > 1)) {
                    var n = {
                        uiId: "ui-" + _widgetObj.id,
                        testId: _quizTestID,
                        testTitle: _jsonObject.title
                    }, r = new welcomeScreenVO;
                    r.set(n);
                    var i = new welcomeScreenView({
                        model: r,
                        el: e
                    });
                    i._prevAttemptsArr = [], i.on(WIDGET_EVENTS.FETCH_PREVIUOUS_ATTEMPTS, function(e) {
                        _instance.trigger(WIDGET_EVENTS.FETCH_PREVIUOUS_ATTEMPTS, e)
                    }), i.on(WIDGET_EVENTS.START_TEST_CLICK, _renderAssessmentQuestion), i.on(assessEvent.TEMPLATE_READY, _onContentLoaded), i.render()
                } else _quesVO = new assessmentVO(_data[0]), utils.log("_quesVO :", _quesVO), _quesVO.set({
                    uiId: "ui-" + _widgetObj.id,
                    width: _options.width,
                    height: _options.height,
                    colorCode: "transparent"
                }), _quesView = new questionPlayer({
                    model: _quesVO,
                    el: e
                }), _isPersistable && _options.checkAnswer == 0 ? _instance.trigger(WIDGET_EVENTS.FETCH_USER_RESPONSE_DATA, _quizTestID, function(e) {
                    _responseData = e ? e : _responseData, _quesView.render(_cfg, _uicfg, _templateCfg, _responseData, _questionIds[0])
                }) : _quesView.render(_cfg, _uicfg, _templateCfg, _responseData, _questionIds[0])
            }, _renderAssessmentQuestion = function(e, t, n) {
                _prevAttemptsArr = t, _quesVO = new assessmentVO(_data[0]), utils.log("_quesVO :", _quesVO), _quesVO.set({
                    uiId: "ui-" + _widgetObj.id,
                    width: _options.width,
                    height: _options.height,
                    colorCode: "transparent"
                }), _quesView = new questionPlayer({
                    model: _quesVO,
                    el: e
                }), _isPersistable && _options.checkAnswer == 0 ? _instance.trigger(WIDGET_EVENTS.FETCH_USER_RESPONSE_DATA, _quizTestID, function(e) {
                    _responseData = e ? e : _responseData, _quesView.render(_cfg, _uicfg, _templateCfg, _responseData, _questionIds[0])
                }) : _quesView.render(_cfg, _uicfg, _templateCfg, _responseData, _questionIds[0]), n && n()
            }, _onContentLoaded = function() {
                _view = $("#ui-" + _widgetObj.id, _options.bookFrameContent).get(0), $("#" + _widgetObj.id, _options.bookFrameContent).removeClass("widget-loader"), $("#" + _widgetObj.id, _options.bookFrameContent).find(".move-icon").removeClass("move-icon-compact"), _setHeight();
                if (_options.layout === WIDGET_CONSTANTS.DATA_LAYOUT_REFLOW) _options.dataMode === WIDGET_CONSTANTS.DATA_MODE_POSTER && _isPopupView === !1 ? (_jsonObject.posterUrl ? ($(_view).QAprepend("<div style='width: 100%; height: 100%;'><img class='quizPoster'/><div class='ui-maximize quiz-package-widget-icon icon icon-ic-quiz-widget'></div></div>"), $(_view).find("img").attr("src", _jsonObject.posterUrl), _options.align === "fitToWidth" && ($("#ui-" + _widgetObj.id, _options.bookFrameContent).addClass("widget-fitToWidth"), $("#ui-" + _widgetObj.id + " img", _options.bookFrameContent).parent().css({
                    width: "auto",
                    height: "auto"
                }), $("#ui-" + _widgetObj.id + " img", _options.bookFrameContent).width($("#" + _widgetObj.id, _frameContent).data("width")))) : $(_view).QAprepend("<div class='ui-button-div quiz-slide'><div class='ui-maximize quiz-play-button icon icon-ic-quiz-widget'></div></div>"), $("#assessment-container", _view).remove(), _minHeight = _minWidth) : _options.dataMode === WIDGET_CONSTANTS.DATA_MODE_INLINE;
                else if (_options.layout === WIDGET_CONSTANTS.DATA_LAYOUT_FIXED && _isPopupView === !1) {
                    _setDimension(), _setMinHeight();
                    if (_options.dataMode !== WIDGET_CONSTANTS.DATA_MODE_COMPACT) {
                        var e = $("#" + _widgetObj.id, _options.bookFrameContent).width();
                        e < _minWidth && ($("#" + _widgetObj.id, _options.bookFrameContent).width(_minWidth), $("#ui-" + _widgetObj.id, _options.bookFrameContent).width(_minWidth))
                    }
                    if (_options.dataMode === WIDGET_CONSTANTS.DATA_MODE_POSTER && _isPopupView === !1) _jsonObject.posterUrl ? ($(_view).QAprepend("<div style='width: 100%; height: 100%;'><img class='quizPoster'/><div class='ui-maximize quiz-package-widget-icon icon icon-ic-quiz-widget'></div></div>"), $(_view).find("img").attr("src", _jsonObject.posterUrl)) : $(_view).QAprepend("<div class='ui-button-div quiz-slide'><div class='ui-maximize quiz-play-button icon icon-ic-quiz-widget'></div></div>"), $("#assessment-container", _view).remove();
                    else if (_options.dataMode === WIDGET_CONSTANTS.DATA_MODE_COMPACT) {
                        if (_options.dataBorder === WIDGET_CONSTANTS.DATA_BORDER_TRUE) {
                            var t = _.template(_borderDivTpl, {
                                id: _jsonObject.uiId
                            }),
                                n = $("#" + _widgetObj.id, _options.bookFrameContent).get(0).innerHTML;
                            n = n.trim(), n.length == 0 ? ($("#" + _widgetObj.id, _options.bookFrameContent).get(0).innerHTML = t, _frameContentRootEl.append($("#div-border-" + _jsonObject.uiId, _options.bookFrameContent))) : _frameContentRootEl.append(t), $("#div-border-" + _jsonObject.uiId, _options.bookFrameContent).css({
                                width: $(_view).width() + "px",
                                height: $(_view).height() + "px",
                                top: _view.style.top,
                                left: _view.style.left,
                                position: "absolute"
                            }), $("#div-border-" + _jsonObject.uiId, _options.bookFrameContent).addClass("transparentWidget ui-hover-class"), $("#div-border-" + _jsonObject.uiId, _options.bookFrameContent).css({
                                "pointer-events": "none"
                            })
                        }
                        $("#assessment-container", _view).remove(), $(".inline-widget-footer", _view).remove(), $(_view).html('<div class="ui-clickable-icon ui-assessment-icon icon-font"></div>'), $(_view).addClass("transparentWidget"), $(_view).removeClass("ui-border"), $(_view).css({
                            width: $(".ui-clickable-icon", _view).width() + "px",
                            height: $(".ui-clickable-icon", _view).height() + "px"
                        }), $("#" + _widgetObj.id, _options.bookFrameContent).find(".move-icon").addClass("move-icon-compact"), $("#" + _widgetObj.id + " .dummyWidget", _options.bookFrameContent).show(), _options.dataBorder === WIDGET_CONSTANTS.DATA_BORDER_FALSE && ($("#" + _widgetObj.id, _options.bookFrameContent).css({
                            "min-width": "0px",
                            width: $(".ui-clickable-icon", _view).width() + "px",
                            height: $(".ui-clickable-icon", _view).height() + "px"
                        }), $("#" + _widgetObj.id + " .dummyWidget", _options.bookFrameContent).hide()), $(".ui-assessment-icon", _view).click({}, _launchAssessmentPopup)
                    }
                }
                $(".ui-maximize", _view).unbind().bind("click", _launchAssessmentPopup), _minWidth = WIDGET_CONSTANTS.ASSESSMENT_MIN_WIDTH, !_isPopupView && !_resetBtnClick && (_isRendered = !0, _instance.trigger(WIDGET_EVENTS.RENDER_COMPLETE, _instance, _maxWidth, _minWidth, _minHeight))
            }, _setDimension = function() {
                $("#" + _widgetObj.id, _frameContent).css({
                    position: "absolute"
                });
                var e, t, n, r;
                e = widgetUtils.getOffset($("#" + _widgetObj.id, _frameContent)).left, t = widgetUtils.getOffset($("#" + _widgetObj.id, _frameContent)).top, n = $("#" + _widgetObj.id, _frameContent).width(), r = $("#" + _widgetObj.id, _frameContent).height(), _view = $("#ui-" + _widgetObj.id, _frameContent).get(0), _options.dataBorder == WIDGET_CONSTANTS.DATA_BORDER_TRUE ? $(_view).css({
                    top: t + "px",
                    left: e + "px",
                    position: "absolute"
                }) : $(_view).css({
                    top: t + "px",
                    left: e + "px",
                    width: n + "px",
                    height: r + "px",
                    position: "absolute"
                }), _options.dataBorder === WIDGET_CONSTANTS.DATA_BORDER_TRUE && $("#div-border-" + _jsonObject.uiId, _frameContent).css({
                    top: t + "px",
                    left: e + "px",
                    width: n + "px",
                    height: r + "px",
                    position: "absolute",
                    "z-index": 1e4
                })
            }, _setHeight = function() {
                if (_options.dataMode === WIDGET_CONSTANTS.DATA_MODE_POSTER) _options.align == "fitToWidth" ? _jsonObject.height = $("#" + _widgetObj.id, _options.bookFrameContent).data("height") : _jsonObject.height = $("#" + _widgetObj.id, _options.bookFrameContent).width();
                else if (_options.dataMode === WIDGET_CONSTANTS.DATA_MODE_COMPACT && _options.dataBorder === WIDGET_CONSTANTS.DATA_BORDER_TRUE) _jsonObject.height = $("#" + _widgetObj.id, _options.bookFrameContent).height();
                else {
                    var e = $("#ui-" + _widgetObj.id + " #assessment-container", _options.bookFrameContent).height();
                    e += $("#ui-" + _widgetObj.id + " .inline-widget-footer", _options.bookFrameContent).height(), _jsonObject.height = e
                }!_isPopupView && !_resetBtnClick && $("#" + _widgetObj.id, _options.bookFrameContent).css("height", _jsonObject.height + "px"), $("#" + _widgetObj.id, _options.bookFrameContent).html() != "" && _setMinHeight()
            }, _checkWidth = function() {
                if (_options.dataMode != WIDGET_CONSTANTS.DATA_MODE_COMPACT) {
                    var e = $("#" + _widgetObj.id, _options.bookFrameContent).width();
                    e < _minWidth && $("#" + _widgetObj.id, _options.bookFrameContent).css({
                        "min-width": _minWidth
                    }), e > _maxWidth && $("#" + _widgetObj.id, _options.bookFrameContent).css({
                        "max-width": "100%"
                    })
                }
            }, _launchAssessmentPopup = function() {
                if (_isEditPreview) {
                    _onPopupShown();
                    return
                }
                _inlineQuesView = _quesView, _popupView.addClass("assessment-popup");
                var e = {
                    type: "quiz"
                };
                _instance.trigger(WIDGET_EVENTS.LAUNCHED, _instance), _instance.trigger(WIDGET_EVENTS.XAPI_EVENT, _instance, e), $("#widgetPopup").removeClass("hide")
            }, _onPopupShown = function() {
                if (_isEditPreview) {
                    _isPopupView = !0, _data.length > 1 && (_isQuizPreview = !0, _isEditPreview = !1);
                    var e = _.template(_popupViewTpl, _jsonObject);
                    _popupView.html(e), _renderAssessmentWidget(_popupView);
                    return
                }
                _widgetContent = $("#widgetContent", _popupView), _isPopupView = !0;
                var e = _.template(_popupViewTpl, _jsonObject);
                utils.log("str", e), $("#widgetContent").html(e), _renderAssessmentWidget(_widgetContent), $(".gal-title", _popupView).html(unescape(_jsonObject.title)), $("#widgetPopup").unbind(assessEvent.KEYDOWN).bind(assessEvent.KEYDOWN, function(e) {
                    e.keyCode == 37 ? (_quesView.prevBtnClick(), $("#widgetPopup").focus()) : e.keyCode == 39 && (_quesView.nextBtnClick(), $("#widgetPopup").focus())
                }), _instance.trigger(WIDGET_EVENTS.POPULATED, _instance)
            }, _populateInlineView = function(e) {
                _options.dataMode === WIDGET_CONSTANTS.DATA_MODE_INLINE && (e[0].userResponse ? (_inlineQuesView.quesView.resetClicked = !1, _inlineQuesView.quesView.populateAnswers(e[0].userResponse, !1), _inlineQuesView.quesView.lockQuestion()) : _inlineQuesView.quesView.resetQuestion(), _inlineQuesView.reportButton.addClass("disabled"))
            }, _destroy = function() {
                _quesView && _quesView.destroy(), _isPopupView = !1, _prevAttemptsArr = [], !_isQuizPreview && !_isEditPreview && ($("#widgetPopup").unbind(), $(".gal-title", _popupView).html(""), _widgetContent.empty(), _popupView.removeClass("assessment-popup"), _instance.trigger(WIDGET_EVENTS.DESTROYED, _instance)), _quesView = _inlineQuesView
            }, _destroyView = function() {
                $(".ui-maximize", _view).unbind(), $("#" + _widgetObj.id, _frameContent).remove(), $("#ui-" + _widgetObj.id, _frameContent).remove()
            }, questionPlayer = Backbone.View.extend({
                animconfig: {},
                screenId: "",
                curScreen: "",
                screen: null,
                prevBtnEnabled: !0,
                nextBtnEnabled: !0,
                quesView: null,
                mode: "",
                isTest: !1,
                isReview: !1,
                correctAnswerVisible: null,
                userResponse: {},
                isAnswered: !1,
                externalCall: !1,
                prevQobj: null,
                stopwatch: 0,
                questionids: [],
                responseData: [],
                currentView: "",
                curIndex: -1,
                readOnly: !1,
                CurrentResponse: null,
                isBypass: !1,
                isRemember: !1,
                resetType: 2,
                launchId: null,
                disableIScroll: !1,
                OrientationSupport: !1,
                direction: "",
                templateConfig: {},
                partialAttempt: !0,
                feedbackScroll: null,
                mapScroll: null,
                QAttemptStatus: [],
                partial_test_submission: !0,
                reportButton: null,
                uicfg: {},
                iScroll: null,
                navigatorsDisabled: !1,
                isNavigatorVisible: !1,
                initialize: function(e) {
                    utils.log("questionplayer rendering", this.model), _.extend(this, Backbone.Events), _.bindAll(this, "onTemplateReady", "handleMarkCorrect", "handleMarkIncorrect", "handleMarkAnswer", "onAnswerMarked", "resetBtnClick", "handleTemplateEvents", "onQuestionReset", "handleEvaluateClick", "toggleVisibleResponse", "nextBtnClick", "createCrousal", "prevBtnClick", "handleAnimationComplete", "handleQuestionAnimationComplete", "destroyPrev", "updateTime", "handleDoneClick", "resetAnswer", "handleShowAnswer", "handleBackClick", "showQueInfo", "hideQueInfo", "destroy", "orientationchange", "initScroll", "handleEvaluateBtnClick", "refreshScroll", "showFeedback", "sendQuizResponseData", "handleDoneStatus", "handleMapItemClick", "hideQMap", "toggleInstructions", "showQuesMap", "getQuestionData", "saveResponse", "handleMaximizeClicked", "onImageLoaded")
                },
                render: function(e, t, n, r, i) {
                    var s = this;
                    this.screen = this.$el, this.obj = this.screen, _refScreen = this.obj, this.responseData = r, this.launchId = i, s.setConfig(e, t, n, s), this.onScreenReady()
                },
                setConfig: function(e, t, n, r) {
                    this.templateConfig = n, this.mode = e.Mode, this.uicfg = t, this.partialAttempt = e.Partial_attempt, this.partial_test_submission = e.partial_test_submission, this.OrientationSupport = e.OrientationSupport, this.questionids = e.QuestionIds, this.mode == "Test" ? (this.isTest = !0, this.isReview = !1) : this.mode == "Review" && (this.isTest = !0, this.isReview = !0);
                    var i = {};
                    t.Header.visible && (i.headerVisible = "block", t.Header.left.visible && (i.leftLabel = t.Header.left.text, i.leftVisible = "none"), t.Header.right.visible && (i.rightLabel = t.Header.right.text, i.rightVisible = "block"), t.Header.title.visible && (i.title = t.Header.title.text, i.titleVisible = "block")), r.model.set(i);
                    var s = r.model.toJSON(),
                        o = _.template(_templateHeader + _templateContent + _templateFooter, s);
                    $("#" + this.model.get("uiId") + " #assessment-container", this.$el).QAappend(o)
                },
                onScreenReady: function(e) {
                    this.screen = $("#" + this.model.get("uiId") + " .question-player", this.$el), this.obj = this.screen;
                    if (this.launchId == null || this.launchId == undefined) this.mode == "Review" ? this.curIndex = -1 : this.curIndex = utils.findResumePosition(this.questionids, this.responseData) - 1;
                    else {
                        this.curIndex = _.indexOf(this.questionids, this.launchId) - 1;
                        if (this.curIndex == -2) {
                            _instance.trigger(WIDGET_EVENTS.SHOW_ALERT_MSG, WidgetLang.NO_SUCH_QUESTION_PRESENT_LABEL);
                            return
                        }
                    }
                    $(".qMapWrapper", this.screen).hide(), $(".qinfo.phone", this.screen).hide(), $(".qinfo.desktop", this.screen).hide(), this.isReview ? $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).find("#qMapDesktop").show() : $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).find("#qMapDesktop").show(), $(".qinfo", this.screen).removeClass("phone"), $("#footer", this.screen).removeClass("phone"), this.reportButton = $(".report-btn", this.obj), this.questionids.length > 1 ? ($(".qinfo.desktop", this.screen).show(), this.isReview ? $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).find("#qMapDesktop").show() : $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).find("#qMapDesktop").show(), this.createQuesMap(this.questionids, this.responseData)) : this.isReview ? $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).find("#qMapDesktop").hide() : $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).find("#qMapDesktop").hide(), $("#header", this.screen).hide(), !this.partial_test_submission && !this.isReview, this.isReview ? ($("#" + AppConst.QBTN_CORRECT_ANS, this.screen).bind(assessEvent.CLICK, this.handleShowAnswer), $("#" + AppConst.QBTN_USER_ANS, this.screen).bind(assessEvent.CLICK, this.handleShowAnswer)) : ($("#resetQBtn", this.screen).bind(assessEvent.CLICK, this.resetBtnClick), $("#" + AppConst.QBTN_ANSWERS, this.screen).bind(assessEvent.CLICK, this.handleShowAnswer), $("#" + AppConst.QBTN_EVALUATE, this.screen).bind(assessEvent.CLICK, this.handleEvaluateBtnClick)), $(".ui-maximize", this.obj).bind(assessEvent.CLICK, this.handleMaximizeClicked), this.screen.find(".header-left-btn").bind(assessEvent.CLICK, this.handleBackClick), _config.single_ques_quiz || _data.length > 1 ? $("#footer", this.screen).removeClass("footer-singleQue") : (this.reportButton.hide(), $("#footer", this.screen).addClass("footer-singleQue")), _config.is_trackable ? this.reportButton.bind(assessEvent.CLICK, this.handleDoneClick) : this.reportButton.hide(), _isPersistable && (_options.checkAnswer ? this.reportButton.hide() : (this.reportButton.addClass("disabled"), this.reportButton.show(), this.reportButton.bind(assessEvent.CLICK, this.handleDoneClick))), this.animconfig = {
                        hide: "",
                        show: AppConst.QUESTION_PLAYER,
                        direction: AppConst.ANIMATE_FORWARD,
                        destroy: !0
                    }, $("#" + this.model.get("uiId") + " #" + AppConst.QUESTION_PLAYER, this.$el).addClass("current"), this.curScreen = AppConst.QUESTION_PLAYER, this.questionids.length <= 1 && ($("#prevQBtn", this.obj).hide(), $("#nextQBtn", this.obj).hide()), this.onNextQuestion()
                },
                handleMaximizeClicked: function() {
                    _instance.trigger(WIDGET_EVENTS.LAUNCHED, _instance), _widgetContent = $("#widgetContent", _popupView)
                },
                onNextQuestion: function() {
                    this.questionids.length >= 1 && (this.curIndex != this.questionids.length - 1 && this.curIndex++, this.direction = "forward", this.handlePreviousandNextClick(), this.getQuestionData(this.questionids[this.curIndex]))
                },
                onPreviousQuestion: function() {
                    this.questionids.length >= 1 && (this.curIndex > 0 && this.curIndex--, this.direction = "reverse", this.handlePreviousandNextClick(), this.getQuestionData(this.questionids[this.curIndex]))
                },
                handlePreviousandNextClick: function() {
                    this.disableIScroll = !1, $(".qposition", this.screen).text(WidgetLang.QUESTION_WITH_COLON_LABEL + (this.curIndex + 1) + " of " + this.questionids.length), this.curIndex == 0 ? this.prevBtnEnabled = !1 : this.prevBtnEnabled = !0, this.curIndex == this.questionids.length - 1 ? this.nextBtnEnabled = !1 : this.nextBtnEnabled = !0, this.handleQmap()
                },
                getQuestionData: function(e) {
                    utils.log("C: question data done ", e);
                    var t = "",
                        n = {};
                    for (var r in _data) _data[r].id == e.toString() && (t = _data[r], utils.log("----questiondata-----", JSON.stringify(t)));
                    _responseData != null && (utils.log("Passing response: ", _responseData[e.toString()]), n = _.findWhere(_responseData, {
                        id: e.toString()
                    })), this.initializeActivity(t, n)
                },
                saveResponse: function(e, t) {
                    utils.log("C: question Evaluated done -- ", e, t);
                    if (t != undefined && _.size(t) != 0) {
                        for (var n = 0; n < _responseData.length; n++)
                            if (_responseData[n].id == e) {
                                _responseData[n] = t;
                                break
                            }
                        this.handleQMapClass(e, t.status);
                        var r = {
                            questionId: _instance.identifier + "_" + (this.curIndex + 1),
                            raw: _responseData[n].score,
                            maxScore: _responseData[n].maxScore,
                            scaled: parseFloat((_responseData[n].score / _responseData[n].maxScore).toFixed(2)),
                            type: "question"
                        };
                        _quizTestID && (r.refTestId = _quizTestID), _instance.trigger(WIDGET_EVENTS.XAPI_EVENT, _instance, r, "answered")
                    } else {
                        for (var n = 0; n < _responseData.length; n++)
                            if (_responseData[n].id == e) {
                                _responseData[n] = {
                                    id: e,
                                    maxScore: parseFloat(_data[n].maxpoints[0]),
                                    title: _data[n].title
                                };
                                break
                            }
                        this.handleQMapClass(e, "notattempted")
                    }
                    utils.log("responsedate: ", _responseData)
                },
                handleQMapClass: function(e, t) {
                    var n = $("[data-id = " + e + "]", this.screen);
                    t == AppConst.CORRECT ? (n.addClass("correct"), n.removeClass("incorrect")) : t == AppConst.PARTIAL || t == AppConst.INCORRECT ? (n.addClass("incorrect"), n.removeClass("correct")) : (n.removeClass("incorrect"), n.removeClass("correct"))
                },
                handleQmap: function() {
                    if ($("#mapDiv", this.screen).find("li").length > this._visibleElement) {
                        var e = $("#mapDiv", this.screen).find("li").get(this._visibleElement - 1),
                            t = parseInt(e.id.split("nav")[1]),
                            n = t - this._visibleElement + 1;
                        if (!(this.curIndex >= n && this.curIndex <= t)) {
                            var r = Math.floor(t / this._visibleElement),
                                i = Math.floor(this.curIndex / this._visibleElement),
                                s = r - i + 1,
                                o = parseInt($(".pagination", this.screen).find(".selected").find("span").html()),
                                u = $(".pagination", this.screen).find("a").get(o - s);
                            $(u).trigger("click")
                        }
                    }
                },
                handleTemplateEvents: function() {
                    if (!this.quesView.resetClicked) {
                        this.isReview ? (this.toggleVisibleResponse(), this.quesView.lockQuestion(), utils.log(">>>>>inside test and review"), this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_REVIEW_USER
                        }), $("#feedbackBtn", this.screen).unbind(), this.curQData.feedback && this.curQData.feedback != "" ? ($("#feedbackBtn", this.screen).removeClass("disabled"), $("#feedbackBtn", this.screen).bind(assessEvent.CLICK, this.showFeedback)) : $("#feedbackBtn", this.screen).addClass("disabled")) : this.isTest ? this.readOnly ? (utils.log("test mode and read only :", this.readOnly), this.correctAnswerVisible = !0, this.toggleVisibleResponse(), this.quesView.lockQuestion(), this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_LOCKED
                        })) : this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_DEFAULT
                        }) : this.readOnly ? (this.correctAnswerVisible = !0, this.toggleVisibleResponse(), this.quesView.lockQuestion(), this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_LOCKED
                        })) : (this.correctAnswerVisible = !1, this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_DEFAULT
                        })), this.partialAttempt == 0 && !this.isReview && this.quesView.enableInteraction();
                        var e = this;
                        this.prevQobj != undefined ? utils.screenTransition({
                            curScreen: $("#ques" + this.prevQobj.model.get("id"), this.obj).parent(),
                            newScreen: $("#ques" + this.curQobj.model.get("id"), this.obj).parent(),
                            direction: this.direction,
                            persistent: !0,
                            handler: function() {
                                e.destroyPrev(), e.initScroll(), e.quesView.scroll = e.iScroll
                            }
                        }) : (_.delay(e.initScroll, 50), this.quesView.scroll = this.iScroll)
                    }
                },
                handleDoneClick: function() {
                    var e = this;
                    if (_isPersistable && this.reportButton.hasClass("disabled")) return;
                    if (this.isAnswered && this.quesView.EvaluateFlag == 0 || this.partialAttempt == 0 && this.isAnswered) this.isBypass = !1, this.handleEvaluateClick();
                    this.isTest, utils.hideQuesPopup();
                    var t = 0,
                        n = 0,
                        r = this,
                        i = [];
                    _.each(_responseData, function(e, r) {
                        var s = isNaN(parseFloat(e.score)) ? 0 : parseFloat(e.score),
                            o = isNaN(parseFloat(e.maxScore)) ? 0 : parseFloat(e.maxScore);
                        t += o, n += s, i.push({
                            qid: _questionIds[r],
                            score: {
                                raw: s,
                                max: o,
                                scaled: parseFloat((s / o * 100).toFixed(2)),
                                attempted: e.score == undefined ? !1 : !0
                            }
                        })
                    }), attemptObj = {
                        date: new Date,
                        score: n,
                        maxScore: t
                    };
                    if (_reqConfig == "cup") {
                        _prevAttemptsArr = [], _prevAttemptsArr.length > 2 && _prevAttemptsArr.shift(), _prevAttemptsArr.push(attemptObj), this.sendQuizResponseData(attemptObj);
                        var s = new quizFinishScreenVO({
                            title: _jsonObject.title,
                            attemptsArr: _prevAttemptsArr
                        }),
                            o = $("#ui-" + _widgetObj.id + " #assessment-container"),
                            u = new quizFinishScreenView({
                                model: s,
                                el: o
                            });
                        u.render(), u.on(WIDGET_EVENTS.TEST_FINISH_CLICK, function() {
                            _popupView.modal("hide")
                        }), u.on(WIDGET_EVENTS.TEST_TRY_AGAIN_CLICK, function() {
                            u.destroy();
                            var e = [];
                            _.each(_responseData, function(t) {
                                e.push({
                                    id: t.id,
                                    maxScore: t.maxScore,
                                    title: t.title
                                })
                            }), _responseData = e, _renderAssessmentQuestion($("#widgetContent", _popupView), _prevAttemptsArr)
                        }), utils.screenTransition({
                            curScreen: $("#" + AppConst.QUESTION_PLAYER),
                            newScreen: $("#quizFinishScreen"),
                            direction: "forward",
                            persistent: !1,
                            handler: function() {
                                _quesView.destroy()
                            }
                        })
                    } else _isPersistable && (this.reportButton.addClass("disabled"), _instance.trigger(WIDGET_EVENTS.SAVE_USER_RESPONSE_DATA, _quizTestID, _responseData), _instance.trigger(WIDGET_EVENTS.ON_DONE, _responseData));
                    var a = {
                        raw: attemptObj.score,
                        maxScore: attemptObj.maxScore,
                        scaled: parseFloat((attemptObj.score / attemptObj.maxScore).toFixed(2)),
                        questionCount: _responseData.length,
                        questionWiseScores: i,
                        completion: "true",
                        type: "quiz"
                    };
                    _quizTestID && (a.refTestId = _quizTestID), $("#ReportBtn").css("display") !== "none" && _instance.trigger(WIDGET_EVENTS.XAPI_EVENT, _instance, a, "completed")
                },
                sendQuizResponseData: function(e) {
                    var t, n = utils.clone(_responseData),
                        r = _widgetObj.id + "_";
                    _.each(n, function(e) {
                        e.id = e.id.substring(r.length), e.qId = e.id
                    }), t = {
                        testId: _quizTestID,
                        testTitle: _jsonObject.title,
                        resultsData: {
                            date: e.date,
                            score: e.score,
                            maxScore: e.maxScore,
                            responseData: n
                        }
                    }, _instance.trigger(WIDGET_EVENTS.SEND_RESPONSE_DATA, t)
                },
                showFeedback: function() {
                    if ($("#feedbackBtn", this.screen).hasClass("disabled")) return;
                    var e = _.findWhere(this.responseData, {
                        id: this.questionids[this.curIndex]
                    }),
                        t = e.score;
                    t == undefined && (t = 0), utils.showFeedback(this.curQData.feedback, t)
                },
                handleDoneStatus: function(e) {
                    var t = this.QAttemptStatus[this.questionids[this.curIndex]],
                        n = -1;
                    if (t != e) {
                        e == AppConst.COMPLETE ? ($("#nav" + this.curIndex, this.screen).addClass("attempted"), $("#nav" + this.curIndex, this.screen).removeClass("notattempted"), $("#nav" + this.curIndex, this.screen).removeClass("partial"), n = 2) : e == AppConst.PARTIAL ? ($("#nav" + this.curIndex, this.screen).addClass("partial"), $("#nav" + this.curIndex, this.screen).removeClass("notattempted"), $("#nav" + this.curIndex, this.screen).removeClass("attempted"), n = 1) : ($("#nav" + this.curIndex, this.screen).addClass("notattempted"), $("#nav" + this.curIndex, this.screen).removeClass("attempted"), $("#nav" + this.curIndex, this.screen).removeClass("partial"), n = 0), this.QAttemptStatus[this.questionids[this.curIndex]] = n;
                        var r = _.without(this.QAttemptStatus, 0, 1).length;
                        this.partial_test_submission == 0 && (r == this.questionids.length ? (this.reportButton.show(), this.reportButton.removeClass("disabled")) : (this.reportButton.hide(), this.reportButton.addClass("disabled")))
                    }
                },
                onSubmitAssessment: function(e, t) {
                    this.destroy(), utils.log("onSubmitAssessment>>>>>>>>", this.questionids, e);
                    var n = this.questionids.length - _.size(e),
                        r = 0;
                    for (k in e) e[k].status == 1 && r++;
                    var i = new resultScreenVO;
                    i.set({
                        questionData: this.questionids,
                        resData: e,
                        score: r,
                        numSkipped: n,
                        timeTaken: this.model.get("timestamp"),
                        isTest: this.isTest
                    });
                    var s = new resultsScreen({
                        model: i,
                        el: this.screen
                    });
                    this.curScreen = AppConst.RESULT_SCREEN, s.render(t), this.currentView = s, s.isTest = this.isTest, this.showScreen()
                },
                onImageLoaded: function() {
                    _isPopupView || _instance.trigger(WIDGET_EVENTS.HEIGHT_UPDATED, _instance)
                },
                handleBackClick: function() {
                    this.isTest && this.stopwatch.stop();
                    var e = {
                        interrupt: !0,
                        timeTaken: this.model.get("timestamp")
                    };
                    Backbone.Events.trigger("assessmentCompleted", e)
                },
                resetBtnClick: function(e) {
                    utils.log($("#resetQBtn"), this.screen);
                    if ($("#resetQBtn", this.screen).hasClass("disabled")) return;
                    _isPersistable && this.reportButton.removeClass("disabled"), _resetBtnClick = !0, this.resetAnswer()
                },
                resetAnswer: function(e, t) {
                    e && (this.resetType = e), t && (this.isRemember = t), this.resetType == 1 ? this.quesView.resetQuestionPartial ? this.quesView.resetQuestionPartial() : this.quesView.resetQuestion() : this.quesView.resetQuestion()
                },
                nextBtnClick: function(e) {
                    if ($("#nextQBtn", this.obj).hasClass("disabled")) return;
                    if (this.navigatorsDisabled) return;
                    this.navigatorsDisabled = !0, $(".overlay", this.obj).show(), (this.isBypass != 1 && this.isAnswered == 1 && this.quesView.EvaluateFlag == 0 || this.partialAttempt == 0 && this.isAnswered == 1) && this.handleEvaluateClick(), this.onNextQuestion()
                },
                prevBtnClick: function() {
                    if ($("#prevQBtn", this.obj).hasClass("disabled")) return;
                    if (this.navigatorsDisabled) return;
                    this.navigatorsDisabled = !0, $(".overlay", this.obj).show(), (this.isBypass != 1 && this.isAnswered == 1 && this.quesView.EvaluateFlag == 0 || this.partialAttempt == 0 && this.isAnswered == 1) && this.handleEvaluateClick(), this.onPreviousQuestion(), Backbone.Events.trigger("onPrevClicked")
                },
                nextConfirmation: function(e) {
                    e = e == 2 ? !0 : !1, e ? this.showNextQuestion() : this.handleEvaluate()
                },
                handleEvaluateBtnClick: function(e) {
                    var t = $("#" + AppConst.QBTN_EVALUATE, this.obj);
                    if (t.hasClass("disabled")) return;
                    this.handleEvaluateClick()
                },
                handleEvaluateClick: function(e) {
                    var t = $("#" + AppConst.QBTN_EVALUATE, this.obj);
                    utils.log("handle Evaluate", t);
                    if (this.isBypass && this.isTest) return;
                    e ? (AppConst.POPQ = !0, e.preventDefault()) : AppConst.POPQ = !1, this.quesView.handleEvaluate(t)
                },
                handleShowAnswer: function(e) {
                    if (this.itemClicked == 1) return;
                    utils.hideQuesPopup();
                    if (e) {
                        var t = $(e.currentTarget);
                        t.get(0).tagName == "LABEL" && (t = t.parents("span"));
                        if (t.hasClass("disabled")) return;
                        e.preventDefault()
                    }
                    this.itemClicked = !0, $("#labelanswers", this.screen).css("visibility", "hidden");
                    if (this.isTest) this.toggleVisibleResponse();
                    else if (!this.correctAnswerVisible) {
                        var n = !1;
                        n ? this.showAnswerConfirmation(2) : ($("#" + AppConst.QBTN_ANSWERS, this.screen).addClass("toggle"), this.toggleVisibleResponse())
                    } else $("#" + AppConst.QBTN_ANSWERS, this.screen).removeClass("toggle"), this.toggleVisibleResponse();
                    this.itemClicked = !1
                },
                toggleVisibleResponse: function() {
                    if (!this.correctAnswerVisible && this.correctAnswerVisible != null) this.isTest || this.isReview ? ($("#labelanswers", this.obj).css("visibility", "visible"), this.changeToolbarMode({
                        mode: AppConst.TOOLBAR_REVIEW_CORRECT
                    })) : this.changeToolbarMode({
                        mode: AppConst.TOOLBAR_RESET
                    }), $("#answersBtn", this.obj).html(WidgetLang.YOUR_ANSWER_LABEL), this.quesView.populateAnswers(this.curQData.answers, this.correctAnswerVisible), this.correctAnswerVisible = !0;
                    else {
                        var e = [];
                        this.CurrentResponse ? e = this.CurrentResponse.userResponse : this.userResponse && this.userResponse.userResponse && (e = this.userResponse.userResponse, this.isTest || (this.readOnly = !1)), this.isTest || this.isReview ? (this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_REVIEW_USER
                        }), this.readOnly = !1) : this.userResponse.length > 0 ? this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_LOCKED
                        }) : this.changeToolbarMode({
                            mode: AppConst.TOOLBAR_LOCKED
                        }), $("#answersBtn", this.obj).html(WidgetLang.ANSWER_LABEL), this.quesView.populateAnswers(e, this.correctAnswerVisible), this.correctAnswerVisible = !1
                    }
                },
                onQuestionReset: function() {
                    this.quesView.enableInteraction(), this.changeToolbarMode({
                        mode: AppConst.TOOLBAR_DEFAULT
                    })
                },
                initializeActivity: function(questionData, userResponse) {
                    this.correctAnswerVisible = !0, utils.showPreloader(), this.quesView != null, this.userResponse = "", userResponse == null || userResponse == undefined || userResponse == "" ? this.readOnly = !1 : userResponse.userResponse && (this.readOnly = !0), this.curQData = questionData, this.userResponse = userResponse, questionData.instructions == "" || questionData.instructions == undefined;
                    var ins = $(".qinstructions", this.screen);
                    if (questionData.rubric == "" || questionData.rubric == undefined || !questionData.rubric.length || !questionData.rubric[0].data.trim().length) ins.hide(), $(".qinstructions span.instruction-content", this.screen).html("");
                    else {
                        ins.show();
                        var rubric = utils.renderNode(_resourceURL, questionData.rubric[0]),
                            insTitle = $(".qinstructions span.instruction-title", this.screen),
                            insCont = $(".qinstructions span.instruction-content", this.screen);
                        insTitle.hide(), insCont.removeClass("up-arrow"), insCont.removeClass("closed"), insCont.removeClass("open"), ins.unbind(), insCont.html(rubric), questionData.rubric[0].type == "text" && insCont.get(0).offsetWidth >= $("#inst", this.obj).get(0).offsetWidth - 30 && (insCont.addClass("up-arrow"), insCont.addClass("open"), ins.bind(assessEvent.CLICK, this.toggleInstructions))
                    }
                    switch (questionData.type) {
                        case AppConst.QUESTION_TYPE_MCQ:
                            if (questionData.responseType == AppConst.RESPONSE_TYPE_BINARY) {
                                utils.log("label true/false", questionData);
                                var quesVO = new mcqBinaryVO(questionData);
                                quesVO.set({
                                    userResponse: this.userResponse,
                                    isReview: this.isReview,
                                    assetPath: _resourceURL,
                                    isTest: this.isTest,
                                    uiId: this.model.get("uiId"),
                                    partialAttempt: this.partialAttempt,
                                    labelTrue: "True"
                                }), this.quesView = new mcqBinaryView({
                                    model: quesVO,
                                    el: this.el
                                })
                            } else if (questionData.responseType == AppConst.RESPONSE_TYPE_SET) {
                                var quesVO = new mcqSetVO(questionData);
                                quesVO.set({
                                    userResponse: this.userResponse,
                                    isReview: this.isReview,
                                    assetPath: _resourceURL,
                                    isTest: this.isTest
                                }), this.quesView = new mcqSetView({
                                    model: quesVO,
                                    el: this.el
                                })
                            } else {
                                var quesVO = new mcqVO(questionData);
                                quesVO.set({
                                    userResponse: this.userResponse,
                                    isReview: this.isReview,
                                    assetPath: _resourceURL,
                                    isTest: this.isTest,
                                    uiId: this.model.get("uiId"),
                                    partialAttempt: this.partialAttempt
                                }), this.quesView = new mcqView({
                                    model: quesVO,
                                    el: this.el
                                })
                            }
                            break;
                        case AppConst.QUESTION_TYPE_IMAGE:
                            var quesVO = new imageVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                assetPath: _resourceURL,
                                isTest: this.isTest
                            }), this.quesView = new imageTapPlace({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_FIB:
                            if (questionData.responseType == AppConst.RESPONSE_TYPE_DRAG) {
                                var quesVO = new fibTapPlaceVO(questionData);
                                quesVO.set({
                                    userResponse: this.userResponse,
                                    isReview: this.isReview,
                                    isTest: this.isTest,
                                    uiId: this.model.get("uiId"),
                                    assetPath: _resourceURL,
                                    maintainOptions: this.templateConfig.fibTapPlace.maintainOptions,
                                    partialAttempt: this.partialAttempt
                                }), this.quesView = new fibTapPlace({
                                    model: quesVO,
                                    el: this.el
                                })
                            } else {
                                var quesVO = new fibVO(questionData);
                                quesVO.set({
                                    userResponse: this.userResponse,
                                    isReview: this.isReview,
                                    isTest: this.isTest,
                                    assetPath: _resourceURL,
                                    uiId: this.model.get("uiId"),
                                    partialAttempt: this.partialAttempt
                                }), this.quesView = new fibView({
                                    model: quesVO,
                                    el: this.el
                                })
                            }
                            break;
                        case AppConst.QUESTION_TYPE_GROUPING:
                            var quesVO = new groupingTapPlaceVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                isTest: this.isTest,
                                assetPath: _resourceURL,
                                widgetId: _widgetObj.id,
                                uiId: this.model.get("uiId"),
                                partialAttempt: this.partialAttempt
                            }), this.quesView = new groupingTapPlace({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_MATCHSORT:
                            var quesVO = new matchSortVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                assetPath: _resourceURL,
                                isTest: this.isTest,
                                attemptMethod: this.templateConfig.matchSort.attemptMethod,
                                partialAttempt: this.partialAttempt,
                                uiId: this.model.get("uiId")
                            }), this.quesView = new matchSortView({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_LABELLING:
                            var quesVO = new textLabellingVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                assetPath: _resourceURL,
                                isTest: this.isTest
                            }), this.quesView = new textLabellingView({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_REORDERING:
                            var quesVO = new reorderingShiftViewVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                assetPath: _resourceURL,
                                isTest: this.isTest,
                                attemptMethod: this.templateConfig.reordering.attemptMethod
                            }), questionData.questionLayout.toUpperCase() == AppConst.LAYOUT_HORIZONTAL ? (this.templateConfig["reordering"]["attemptMethod"] == AppConst.REORDERING_DRAG_DROP && (this.disableIScroll = !0), this.quesView = new reorderingShiftViewHorizontal({
                                model: quesVO,
                                el: this.el
                            })) : this.quesView = new reorderingShift({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_SPEAKING:
                            var quesVO = new speakingVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                assetPath: _resourceURL,
                                isTest: this.isTest
                            }), this.quesView = new speakingView({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_FIB_DROPDOWN:
                            var quesVO = new fibDropDownVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                assetPath: _resourceURL,
                                isTest: this.isTest,
                                uiId: this.model.get("uiId"),
                                partialAttempt: this.partialAttempt,
                                attemptMethod: this.templateConfig.dropDown.attemptMethod
                            }), this.quesView = new fibDropDown({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_CROSSWORD:
                            var quesVO = new crosswordVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                assetPath: _resourceURL,
                                isReview: this.isReview,
                                isTest: this.isTest
                            }), this.templateConfig["crossword"]["autoPopulate"] == 1 ? this.quesView = new crossword_auto({
                                model: quesVO,
                                el: this.el
                            }) : this.quesView = new crossword_cord({
                                model: quesVO,
                                el: this.el
                            });
                            break;
                        case AppConst.QUESTION_TYPE_FIBTABLE:
                            if (questionData.responseType == AppConst.RESPONSE_TYPE_BINARY)
                                if (utils.isPhone()) {
                                    var quesVO = new fibDropDownVO(questionData);
                                    quesVO.set({
                                        userResponse: this.userResponse,
                                        isReview: this.isReview,
                                        assetPath: _resourceURL,
                                        isTest: this.isTest,
                                        attemptMethod: this.templateConfig.dropDown.attemptMethod,
                                        partialAttempt: this.partialAttempt
                                    }), this.quesView = new fibDropDown({
                                        model: quesVO,
                                        el: this.el
                                    })
                                } else {
                                    var quesVO = new fibBinaryTableVO(questionData);
                                    quesVO.set({
                                        userResponse: this.userResponse,
                                        isReview: this.isReview,
                                        assetPath: _resourceURL,
                                        isTest: this.isTest,
                                        maintainOptions: this.templateConfig.fibTapPlaceTable.maintainOptions
                                    }), this.quesView = new fibBinaryTable({
                                        model: quesVO,
                                        el: this.el
                                    })
                                } else {
                                    var quesVO = new fibTextTableVO(questionData);
                                    quesVO.set({
                                        userResponse: this.userResponse,
                                        assetPath: _resourceURL,
                                        isReview: this.isReview,
                                        isTest: this.isTest
                                    }), this.quesView = new fibTextTable({
                                        model: quesVO,
                                        el: this.el
                                    })
                                }
                            break;
                        case AppConst.QUESTION_TYPE_OPENTEXT:
                            var quesVO = new openTextVO(questionData);
                            quesVO.set({
                                userResponse: this.userResponse,
                                isReview: this.isReview,
                                assetPath: _resourceURL,
                                isTest: this.isTest
                            }), this.quesView = new openText({
                                model: quesVO,
                                el: this.el
                            })
                    }
                    this.quesView.unbind(), this.quesView.bind(assessEvent.TEMPLATE_READY, this.onTemplateReady), this.quesView.bind(assessEvent.ANSWER_MARKED, this.onAnswerMarked), this.quesView.bind(assessEvent.MARK_CORRECT, this.handleMarkCorrect), this.quesView.bind(assessEvent.MARK_INCORRECT, this.handleMarkIncorrect), this.quesView.bind(assessEvent.MARK_ANSWER, this.handleMarkAnswer), this.quesView.bind(assessEvent.QUESTION_RESET, this.onQuestionReset), this.quesView.bind(assessEvent.CHANGETOOLBARMODE, this.changeToolbarMode), this.quesView.bind(assessEvent.UPDATE_RESPONSE, this.updateResponse), this.quesView.bind(assessEvent.MARK_EMPTY, this.markEmpty), this.quesView.bind(assessEvent.REFRESH_SCROLL, this.refreshScroll), this.quesView.bind(assessEvent.IMG_LOADED, this.onImageLoaded), rel = questionData.type + "_" + questionData.questionLayout, questionData.type == AppConst.QUESTION_TYPE_FIBTABLE && utils.isPhone() && (rel = "FIBDROPDOWN_");
                    if (questionData.type == AppConst.QUESTION_TYPE_MCQ)
                        if (questionData.responseType == "BINARY") rel += "_BINARY";
                        else {
                            try {
                                QuestionText = eval(questionData.questionBody)
                            } catch (e) {}
                            QuestionText.length > 0 && (rel += "_" + QuestionText[0].type)
                        }
                    if (questionData.type == AppConst.QUESTION_TYPE_FIB) {
                        try {
                            QuestionText = eval(questionData.leftCol)
                        } catch (e) {}
                        QuestionText.length > 0 && (rel += "_" + QuestionText[0].type);
                        try {
                            QuestionText = eval(questionData.questionBody)
                        } catch (e) {}
                        QuestionText.length > 0 && QuestionText[0].type == "image" && (rel += "_" + QuestionText[0].type), questionData.responseType == "TEXT" ? rel += "_text" : questionData.responseType == "DRAGDROP" && (rel += "_VERTICAL")
                    }
                    questionData.type == AppConst.QUESTION_TYPE_FIB && questionData.responseType == "BINARY" && (rel += "_BINARY"), this.prevQobj = _.clone(this.curQobj), this.curQobj = this.quesView, $(".infoButton", this.screen).attr("rel", rel);
                    var ref = this;
                    utils.hidePreloader(), $(".infoButton", this.screen).unbind().bind(assessEvent.CLICK, function() {}), $("#instructionsWrapper", this.screen).unbind().bind(assessEvent.CLICK, ref.hideQueInfo), $(".qno", this.screen).removeClass("selected"), $("#nav" + this.curIndex, this.screen).addClass("selected"), this.quesView.render(), this.prevQobj || $("#quesWrapper" + this.curQData.id, this.obj).removeClass("disableTemplate").addClass("enableTemplate")
                },
                toggleInstructions: function() {
                    $(".instruction-content", this.obj).hasClass("open") ? ($(".instruction-content", this.obj).removeClass("open"), $(".instruction-content", this.obj).removeClass("up-arrow"), $(".instruction-content", this.obj).addClass("closed")) : ($(".instruction-content", this.obj).removeClass("closed"), $(".instruction-content", this.obj).addClass("open"), $(".instruction-content", this.obj).addClass("up-arrow")), this.refreshScroll()
                },
                evaluateQuestion: function(e) {
                    this.isBypass = !0, this.handleEvaluateClick()
                },
                showNextQuestion: function(e) {
                    this.initializeActivity(e)
                },
                refreshScroll: function() {
                    this.initScroll()
                },
                showPreviousQuestion: function(e) {
                    this.initializeActivity(e)
                },
                updateResponse: function(e, t) {
                    t == [] && delete this.responseData[e], this.saveResponse(e, t)
                },
                markEmpty: function(e) {
                    _quesView.saveResponse(e, [])
                },
                showQueInfo: function(e) {
                    qView = $(".infoButton", this.screen).attr("rel"), popupImage = "";
                    switch (qView) {
                        case AppConst.QUESTION_VIEW_FIB:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_VERTICAL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_VERTICAL;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_IMAGE_VERTICAL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_IMAGE_VERTICAL;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_IMAGE:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_IMAGE;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_2COL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_2COL;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_TEXT:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_TEXT;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_GAP_2COL_IMAGE_TEXT:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_GAP_2COL_IMAGE_TEXT;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_GAP_2COL_AUDIO_TEXT:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_GAP_2COL_AUDIO_TEXT;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_GAP:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_GAP;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_GAP_2COL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_GAP_2COL;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_GAP_2COL_IMAGE:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_GAP_2COL_IMAGE;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_GAP_2COL_AUDIO:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_GAP_2COL_AUDIO;
                            break;
                        case AppConst.QUESTION_VIEW_REORDERING:
                            popupImage = AppConst.QUESTION_INSTRUCTION_REORDERING;
                            break;
                        case AppConst.QUESTION_VIEW_REORDERING_VERTICAL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_REORDERING_VERTICAL;
                            break;
                        case AppConst.QUESTION_VIEW_LABELLING:
                            popupImage = AppConst.QUESTION_INSTRUCTION_LABELLING;
                            break;
                        case AppConst.QUESTION_VIEW_MCQ:
                            popupImage = AppConst.QUESTION_INSTRUCTION_MCQ;
                            break;
                        case AppConst.QUESTION_VIEW_MCQ_2COL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_MCQ_2COL;
                            break;
                        case AppConst.QUESTION_VIEW_MCQ_TEXT:
                            popupImage = AppConst.QUESTION_INSTRUCTION_MCQ_TEXT, e == "PICKER" && (popupImage = AppConst.QUESTION_INSTRUCTION_MCQ_TEXT_PICKER);
                            break;
                        case AppConst.QUESTION_VIEW_MCQ_IMAGE:
                            popupImage = AppConst.QUESTION_INSTRUCTION_MCQ_IMAGE;
                            break;
                        case AppConst.QUESTION_VIEW_MCQ_SOUND:
                            popupImage = AppConst.QUESTION_INSTRUCTION_MCQ_SOUND;
                            break;
                        case AppConst.QUESTION_VIEW_MATCHSORT_VERTICAL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_MATCHSORT_VERTICAL;
                            break;
                        case AppConst.QUESTION_INSTRUCTION_GROUPING:
                            popupImage = AppConst.QUESTION_INSTRUCTION_GROUPING;
                            break;
                        case AppConst.QUESTION_VIEW_IMAGE:
                            popupImage = AppConst.QUESTION_INSTRUCTION_IMAGE;
                            break;
                        case AppConst.QUESTION_VIEW_GROUPING:
                            popupImage = AppConst.QUESTION_INSTRUCTION_GROUPING;
                            break;
                        case AppConst.QUESTION_VIEW_FIB_AUDIO_2COL:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIB_AUDIO_2COL;
                            break;
                        case AppConst.QUESTION_VIEW_FIBDROPDOWN:
                            popupImage = AppConst.QUESTION_INSTRUCTION_FIBDROPDOWN;
                            break;
                        case AppConst.QUESTION_VIEW_BINARY:
                            popupImage = AppConst.QUESTION_INSTRUCTION_BINARY;
                            break;
                        case AppConst.QUESTION_VIEW_BINARY_TABLE:
                            popupImage = AppConst.QUESTION_INSTRUCTION_BINARY_TABLE;
                            break;
                        case AppConst.QUESTION_VIEW_OPENTEXT:
                            popupImage = AppConst.QUESTION_INSTRUCTION_OPENTEXT;
                            break;
                        default:
                    }
                    $("#instructionsWrapper img", this.screen).attr("src", popupImage), $("#instructionsWrapper", this.screen).show()
                },
                hideQueInfo: function() {
                    $("#instructionsWrapper", this.screen).hide()
                },
                showScreen: function() {
                    var e = this;
                    utils.screenTransition({
                        curScreen: $("#" + this.model.get("uiId") + " #" + AppConst.QUESTION_PLAYER, this.$el),
                        newScreen: $("#" + this.model.get("uiId") + " #" + AppConst.RESULT_SCREEN, this.$el),
                        direction: this.direction,
                        persistent: !1,
                        handler: function() {
                            e.destroy()
                        }
                    })
                },
                onTemplateReady: function() {
                    var e = this;
                    _isPersistable && _options.checkAnswer == 0 && $("#" + this.model.get("uiId") + " #" + AppConst.QUESTION_PLAYER, this.$el).addClass("no-badge");
                    if (_isPopupView && !_isEditPreview) {
                        var t = $("#ques" + this.curQData.id, this.screen),
                            n = $("#content", this.screen).height();
                        $("#ques" + this.curQData.id, this.screen).height(n)
                    }
                    this.handleTemplateEvents(), utils.hidePreloader(), _onContentLoaded(), _resetBtnClick = !1, $("#splashScreen", _widgetContent).length > 0 && utils.screenTransition({
                        curScreen: $("#splashScreen", _widgetContent),
                        newScreen: $("#" + AppConst.QUESTION_PLAYER, _widgetContent),
                        direction: "forward",
                        persistent: !1,
                        handler: function() {
                            $("#splashScreen", _widgetContent).remove(), $("#splashScreen", _widgetContent).unbind()
                        }
                    })
                },
                updateTime: function(e) {
                    this.model && this.model.set({
                        timestamp: e
                    })
                },
                onAnswerMarked: function(e) {
                    this.changeToolbarMode(e)
                },
                changeToolbarMode: function(e) {
                    this.isAnswered = !1, $(".footer_ico", this.obj).addClass("disabled"), $(".review_ico", this.obj).addClass("disabled"), this.prevBtnEnabled && $("#prevQBtn", this.obj).removeClass("disabled"), this.nextBtnEnabled && $("#nextQBtn", this.obj).removeClass("disabled");
                    switch (e.mode) {
                        case AppConst.TOOLBAR_DEFAULT:
                            $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).show(), $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).hide(), $("#" + AppConst.QBTN_ANSWERS, this.obj).removeClass("toggle"), $("#" + AppConst.QBTN_ANSWERS, this.obj).hide(), $("#" + AppConst.QBTN_EVALUATE, this.obj).show();
                            break;
                        case AppConst.TOOLBAR_ACTIVE:
                            this.isAnswered = !0, $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).show(), $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).hide(), this.isTest || $("#" + AppConst.QBTN_EVALUATE, this.obj).removeClass("disabled"), $("#" + AppConst.QBTN_RESET, this.obj).removeClass("disabled"), _isPersistable && this.reportButton.removeClass("disabled"), this.enableCluesIfAvailable();
                            break;
                        case AppConst.TOOLBAR_LOCKED:
                            this.isAnswered = !0, $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).show(), $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).hide(), $("#" + AppConst.QBTN_ANSWERS, this.obj).show(), $("#" + AppConst.QBTN_RESET, this.obj).show(), $("#" + AppConst.QBTN_EVALUATE, this.obj).hide(), this.isTest ? $("#" + AppConst.QBTN_RESET, this.obj).removeClass("disabled") : ($("#" + AppConst.QBTN_ANSWERS, this.obj).removeClass("disabled toggle"), $("#" + AppConst.QBTN_RESET, this.obj).removeClass("disabled"));
                            break;
                        case AppConst.TOOLBAR_DISABLED:
                            $("#" + AppConst.QBTN_ANSWERS, this.obj).removeClass("disabled");
                            break;
                        case AppConst.TOOLBAR_RESET:
                            $("#" + AppConst.QBTN_ANSWERS, this.obj).removeClass("disabled");
                            break;
                        case AppConst.TOOLBAR_REVIEW_CORRECT:
                            $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).hide(), $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).show(), $("#" + AppConst.QBTN_USER_ANS, this.obj).removeClass("disabled"), $("#" + AppConst.QBTN_CORRECT_ANS, this.obj).addClass("selected"), $("#" + AppConst.QBTN_USER_ANS, this.obj).removeClass("selected");
                            break;
                        case AppConst.TOOLBAR_REVIEW_USER:
                            $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).hide(), $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).show(), $("#" + AppConst.QBTN_CORRECT_ANS, this.obj).removeClass("disabled"), $("#" + AppConst.QBTN_USER_ANS, this.obj).addClass("selected"), $("#" + AppConst.QBTN_CORRECT_ANS, this.obj).removeClass("selected");
                            break;
                        case AppConst.TOOLBAR_SPEAKING_ACTIVE:
                            $("#" + AppConst.QBTN_RESET, this.obj).removeClass("disabled");
                            break;
                        case AppConst.TOOLBAR_SPEAKING:
                            $("#" + AppConst.QBTN_RESET, this.obj).addClass("disabled")
                    }
                    _isPersistable && _options.checkAnswer == 0 && ($("#" + AppConst.QBTN_ANSWERS, this.obj).hide(), $("#" + AppConst.QBTN_EVALUATE, this.obj).hide());
                    if (this.isReview) {
                        var t = $("#reviewBtnsContainer", this.screen);
                        $("#assessmentBtnsContainer", this.screen).hide()
                    } else {
                        var t = $("#assessmentBtnsContainer", this.screen);
                        $("#reviewBtnsContainer", this.screen).hide()
                    }
                    t.find("#qMapDesktop").removeClass("disabled"), this.nextBtnEnabled ? (t.find("#nextQBtn").removeClass("disabled"), t.find("#nextQBtn").unbind().bind(assessEvent.CLICK, this.nextBtnClick)) : t.find("#nextQBtn").addClass("disabled"), this.prevBtnEnabled ? (t.find("#prevQBtn").removeClass("disabled"), t.find("#prevQBtn").unbind().bind(assessEvent.CLICK, this.prevBtnClick)) : t.find("#prevQBtn").addClass("disabled")
                },
                enableCluesIfAvailable: function() {
                    $("#" + AppConst.QBTN_CLUES, this.obj).unbind(), this.clues != "" ? ($("#" + AppConst.QBTN_CLUES, this.obj).removeClass("disabled"), $("#" + AppConst.QBTN_CLUES, this.obj).removeAttr("disabled"), $("#" + AppConst.QBTN_CLUES, this.obj).bind(assessEvent.CLICK, this.cluesBtnClick)) : ($("#" + AppConst.QBTN_CLUES, this.obj).addClass("disabled"), $("#" + AppConst.QBTN_CLUES, this.obj).attr("disabled", "disabled"), $("#" + AppConst.QBTN_CLUES, this.obj).unbind(assessEvent.CLICK))
                },
                handleMarkCorrect: function(e, t) {
                    t.id = e, this.userResponse = t, !this.isTest, this.changeToolbarMode({
                        mode: AppConst.TOOLBAR_LOCKED
                    }), this.saveResponse(e, t)
                },
                handleMarkIncorrect: function(e, t) {
                    t.id = e, this.userResponse = t, !this.isTest, this.changeToolbarMode({
                        mode: AppConst.TOOLBAR_LOCKED
                    }), this.saveResponse(e, t)
                },
                handleMarkAnswer: function(e, t) {
                    t.id = e, this.userResponse = t, !this.isTest, this.changeToolbarMode({
                        mode: AppConst.TOOLBAR_LOCKED
                    }), this.saveResponse(e, t)
                },
                initScroll: function() {
                    utils.log("initScroll :: ", this.iScroll);
                    if (!_isPopupView || _isEditPreview) return;
                    if (this.disableIScroll != 1) {
                        var e = $("#footer", _popupView).get(0).offsetTop,
                            t = $("#content", _popupView).get(0).offsetTop,
                            n = e - t;
                        $("#content", _popupView).height(n), $("#ques" + this.curQData.id, _popupView).height(n), $("#ques" + this.curQData.id, _popupView).css("overflow", "hidden"), this.iScroll != null && this.iScroll.destroy(), this.iScroll = new IScroll($("#ques" + this.curQData.id, _popupView).get(0), {
                            desktopCompatibility: !0,
                            interactiveScrollbars: !0,
                            scrollY: !0,
                            keyBindings: !0
                        }), ths = this, _.delay(function() {
                            ths.iScroll.refresh()
                        }, 999)
                    } else this.quesView.initScroll();
                    utils.log("initScroll 2:: ", this.iScroll)
                },
                handleAnimationComplete: function(e) {
                    this.currentView.applyCSS()
                },
                handleQuestionAnimationComplete: function(e) {},
                enableButton: function(e) {
                    $("#" + e, this.obj).removeClass("disabled")
                },
                disableButton: function(e) {
                    $("#" + e, this.obj).addClass("disabled")
                },
                createQuesMap: function(e, t) {
                    var n = "";
                    n += '<div class="qmapUlWrappar"><ul class="phone">';
                    for (var r = 0; r < t.length; r++) t && t[r].userResponse != undefined ? n += '<li id="nav' + r + '" class="qno phone attempted" data-id="' + e[r] + '">' + (r + 1) + "</li>" : n += '<li id="nav' + r + '" class="qno phone notattempted" data-id="' + e[r] + '">' + (r + 1) + "</li>";
                    n += "</ul></div>", $(".navigator", this.screen).QAprepend(n), $("#qMapDesktop", this.screen).QAprepend("<div class='showQMapBtn'></div>"), $("#qMapDesktop .showQMapBtn", this.screen).unbind().bind(assessEvent.CLICK, this.showQuesMap), $("#navigatorOverlay").unbind().bind(assessEvent.CLICK, this.hideQMap), $(".qno", this.obj).unbind().bind(assessEvent.CLICK, this.handleMapItemClick)
                },
                createQuesMapForDesktop: function(e, t) {
                    var n = "";
                    n += '<div class="mapDivOuter"><span class="prev disabled"></span><span id="mapDivWrapper"><ul id="mapDiv">';
                    for (var r = 0; r < t.length; r++)
                        if (t[r] && t[r].userResponse != undefined) {
                            var i = t[r].status;
                            if (i == AppConst.CORRECT) n += '<li id="nav' + r + '" class="qno correct" data-id="' + e[r] + '">' + (r + 1) + "</li>";
                            else if (i == AppConst.PARTIAL || i == AppConst.INCORRECT) n += '<li id="nav' + r + '" class="qno incorrect" data-id="' + e[r] + '">' + (r + 1) + "</li>"
                        } else n += '<li id="nav' + r + '" class="qno" data-id="' + e[r] + '">' + (r + 1) + "</li>";
                    n += '</ul></span><span class="next"></span></div>', this.isReview ? $("#" + AppConst.REVIEW_BTNS_DIV, this.obj).find("#qMapDesktop").QAprepend(n) : $("#" + AppConst.ASSESSMENT_BTNS_DIV, this.obj).find("#qMapDesktop").QAprepend(n), this.createCrousal(), $(".qno", this.obj).unbind().bind(assessEvent.CLICK, this.handleMapItemClick)
                },
                createCrousal: function() {
                    var e = this,
                        t = require.s.contexts._.config.theme,
                        n = isNaN(parseInt($("#mapDiv", e.obj).find("li").css("margin-left"))) ? 0 : parseInt($("#mapDiv", e.obj).find("li").css("margin-left"));
                    n += isNaN(parseInt($("#mapDiv", e.obj).find("li").css("margin-right"))) ? 0 : parseInt($("#mapDiv", e.obj).find("li").css("margin-right"));
                    var r = $("#mapDiv", e.obj).find("li").outerWidth() + n,
                        i = $("#qMapDesktop", e.obj).outerWidth() - $(".prev", e.obj).width() - $(".next", e.obj).width();
                    i = i > r ? i : r, window.navigator.userAgent.toLowerCase().indexOf("firefox") || window.navigator.userAgent.toLowerCase().indexOf("MSIE") ? _reqConfig !== "cup" && ($("#mapDivWrapper", e.obj).width(i), $("#mapDiv", e.obj).width(i)) : _reqConfig !== "cup" && ($("#mapDivWrapper", e.obj).css("width", i + "px !important"), $("#mapDiv", e.obj).css("width", i + "px !important")), e._visibleElement = Math.floor(i / r), e._visibleElement = e._visibleElement == 0 ? 1 : e._visibleElement;
                    var s = Math.ceil(this.responseData.length / e._visibleElement),
                        o = '<div class="pagination" id="pagination" style="display: none;"></div>';
                    $("#qMapDesktop", e.obj).QAappend(o), $("#page1", e.obj).addClass("selected"), $("#mapDiv", e.obj).carouFredSel({
                        auto: !1,
                        prev: ".prev",
                        next: ".next",
                        pagination: "#pagination",
                        circular: !1,
                        visibleItemCount: e._visibleElement,
                        infinite: !1,
                        mousewheel: !1,
                        synchronise: !1,
                        swipe: {
                            onMouse: !0,
                            onTouch: !0
                        }
                    }), $("#pagination", e.obj).hide(), window.navigator.userAgent.toLowerCase().indexOf("firefox") || window.navigator.userAgent.toLowerCase().indexOf("MSIE") ? _reqConfig !== "cup" && ($("#mapDivWrapper", e.obj).width(i), $("#mapDiv", e.obj).width(i)) : _reqConfig !== "cup" && ($("#mapDivWrapper", e.obj).css("width", i + "px !important"), $("#mapDiv", e.obj).css("width", i + "px !important")), e._visibleElement >= this.questionids.length && $(".next", e.obj).addClass("disabled")
                },
                showQuesMap: function() {
                    var e = $(".navigator", this.screen),
                        t = $("#navigatorOverlay", this.screen);
                    if (!this.isNavigatorVisible) {
                        $("#navigatorOverlay", this.screen).show(), $(".navigator", this.screen).removeClass("hidden");
                        var n = $(".qmapUlWrappar", this.screen).height();
                        $(".qmapUlWrappar", this.screen).css("position", "relative"), this.mapScroll && (this.mapScroll.destroy(), this.mapScroll = null), this.mapScroll = new IScroll($(".qmapUlWrappar", this.screen).get(0), {
                            desktopCompatibility: !0,
                            hScroll: !0
                        });
                        var r = this.mapScroll;
                        _.delay(function() {
                            r.refresh()
                        }, 50), this.isNavigatorVisible = !0
                    } else this.hideQMap()
                },
                hideQMap: function() {
                    this.mapScroll && (this.mapScroll.destroy(), this.mapScroll = null), $(".navigator", this.screen).addClass("hidden"), $("#navigatorOverlay", this.screen).hide(), this.isNavigatorVisible = !1
                },
                handleMapItemClick: function(e) {
                    var t = parseInt(e.target.id.split("nav")[1]);
                    this.hideQMap(), t != this.curIndex && ($(".overlay", this.screen).show(), t > this.curIndex ? this.direction = "forward" : this.direction = "reverse", (this.isBypass != 1 && this.isAnswered == 1 && this.quesView.EvaluateFlag == 0 || this.partialAttempt == 0 && this.isAnswered == 1) && this.handleEvaluateClick(), this.curIndex = t, this.handlePreviousandNextClick(), this.getQuestionData(this.questionids[t]))
                },
                orientationchange: function(e) {
                    this.iScroll != null && (this.iScroll.destroy(), _.delay(this.initScroll, 1e3));
                    var t = this.quesView;
                    _.delay(function() {
                        t.orientationchange(e)
                    }, 600)
                },
                destroyPrev: function() {
                    utils.log("destroying previous", this.prevQobj.model.get("id")), $("#ques" + this.prevQobj.model.get("id"), this.screen).unbind(), $("#ques" + this.prevQobj.model.get("id"), this.screen).parent().remove(), this.navigatorsDisabled = !1, $(".overlay", this.screen).hide()
                },
                destroy: function() {
                    var e = $(".qinstructions", this.screen);
                    this.quesView && this.quesView.destroy(), $(".header-right-btn", this.screen).unbind(), $(".header-left-btn", this.screen).unbind(), $("#resetQBtn", this.screen).unbind(), $("#" + AppConst.QBTN_ANSWERS, this.screen).unbind(), $("#" + AppConst.QBTN_EVALUATE, this.screen).unbind(), $("#" + AppConst.QBTN_CORRECT_ANS, this.screen).unbind(), $("#" + AppConst.QBTN_USER_ANS, this.screen).unbind(), $("#" + AppConst.QBTN_CLUES, this.obj).unbind(), $(".ui-maximize", this.obj).unbind(), this.reportButton.unbind(), $("#feedbackBtn", this.screen).unbind(), e.unbind(), this.quesView.unbind(), $(".infoButton", this.screen).unbind(), $("#instructionsWrapper", this.screen).unbind(), $("#reviewBtnsContainer", this.screen).find("#nextQBtn").unbind(), $("#assessmentBtnsContainer", this.screen).find("#nextQBtn").unbind(), $("#reviewBtnsContainer", this.screen).find("#prevQBtn").unbind(), $("#assessmentBtnsContainer", this.screen).find("#prevQBtn").unbind(), $(".qMap", this.screen).unbind(), $("#closeQMap", this.obj).unbind(), $(".qno", this.obj).unbind(), this.screen.unbind(), this.screen.remove()
                }
            }),
            assessmentWidgetView = Backbone.View.extend({
                initialize: function(e) {
                    _.extend(this, Backbone.Events), e.directLaunch ? (_widgetObj = {}, _widgetObj.id = (new Date).getTime(), _directLaunch = !0) : _widgetObj = e.obj, _isEditPreview = e.editPreview, _isListPreview = e.listPreview, _options = e.options, _popupView = e.popupView, _instance = this, _bookURL = _options.bookURL
                },
                initCurrWidget: _initialize,
                destroy: _destroy,
                widgetResize: _widgetResize,
                relayout: _relayout,
                widgetType: _widgetType,
                onCloseAllWidgets: _onCloseAllWidgets,
                launch: _launchAssessmentPopup,
                populateInlineView: _populateInlineView,
                onPopupShown: _onPopupShown,
                refreshScroll: _refreshScroll,
                destroyView: _destroyView
            });
        return new assessmentWidgetView(data)
    };
    return assessmentWidget
}), define("com/es/quizEditor/views/previewPopupView", ["com/es/widgets/WidgetPopup", "com/es/widgets/assessment/view/assesmentWidget", "com/es/widgets/WidgetUtils"], function(e, t, n) {
    var r = function(e) {
        $.fn.QAappend = function(e) {
            var t = n.getAndroidVersion(),
                r = navigator.userAgent.toLowerCase(),
                i = r.match(/(iPad|iPhone|iPod)/i);
            t >= 4.4 || i ? ($("#QAPlaceHolder")[0].innerHTML = e, this.append($("#QAPlaceHolder").children()[0])) : this.append(e)
        }, $.fn.QAprepend = function(e) {
            var t = n.getAndroidVersion(),
                r = navigator.userAgent.toLowerCase(),
                i = r.match(/(iPad|iPhone|iPod)/i);
            t >= 4.4 || i ? ($("#QAPlaceHolder")[0].innerHTML = e, this.prepend($("#QAPlaceHolder").children()[0])) : this.prepend(e)
        };
        var r = null,
            i = null,
            s = null,
            o = null,
            u = function() {
                s = $(".preview-container"), a()
            }, a = function() {
                var e = {
                    dataURL: i.dataURL
                };
                o = new t({
                    directLaunch: !0,
                    editPreview: !0,
                    options: e,
                    popupView: s
                }), o.on(WIDGET_EVENTS.INITIALIZED, f)
            }, f = function(e) {
                e.launch()
            }, l = function() {
                o.destroy(), o.remove(), o = null, r.trigger(WIDGET_EVENTS.DESTROYED, r)
            }, c = Backbone.View.extend({
                initialize: function(e) {
                    i = e || {}, r = this, u()
                },
                destroy: l
            });
        return new c(e)
    };
    return r
}), define("com/es/quizEditor/models/QuizEditorModel", [], function() {
    var e = Backbone.Model.extend({
        defaults: {
            title: "",
            testid: "",
            questionsData: [{
                id: null,
                answers: [],
                heading: [],
                leftCol: [],
                modelParagraph: "",
                options: [],
                optionsLayout: "",
                questionBody: [],
                questionLayout: "",
                responseType: "BUTTON",
                rightCol: [],
                rubric: [],
                questionMedia: [],
                optionsMedia: [],
                title: "",
                maxpoints: [""],
                type: ""
            }]
        },
        url: function() {
            return "./com/es/quizEditor/data/MCQ_DefaultQuestionData.json"
        },
        sync: function() {
            options || (options = {});
            switch (method) {
                case "create":
                    break;
                case "update":
                    break;
                case "delete":
                    break;
                case "read":
            }
        }
    });
    return e
}), define("com/es/quizEditor/QuizEditor", ["com/es/quizEditor/QuizEditorConstants", "com/es/text!templateBasePath/Editor/quiz/baseTemplate.html", "com/es/text!templateBasePath/Editor/popups/popUpTemplate.html", "com/es/quizEditor/views/FIBDropDownEditView", "com/es/quizEditor/views/FIBEditView", "com/es/quizEditor/views/MCQEditView", "com/es/quizEditor/views/MCQBinaryEditView", "com/es/quizEditor/views/MatchingEditView", "com/es/quizEditor/views/GroupingEditView", "com/es/quizEditor/views/FIBTapPlaceEditView", "com/es/utilities/utils", "com/es/quizEditor/collections/MediaAssetPopupCollection", "com/es/quizEditor/views/MediaAssestPopupView", "com/es/quizEditor/views/previewPopupView", "com/es/quizEditor/models/QuizEditorModel"], function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
    var v = function() {
        var e, v, m, g = null,
            y = null,
            b = null,
            w = null,
            E = "",
            S = !1,
            x = null,
            T = null,
            N = null,
            C = "",
            k = function(e, l, p) {
                E = p, e = parseInt(e);
                var d = _.template(t, {});
                l.append(d), l.append(_.template(n)), m = $(".quiz-editor-popup", $(l)), v = {
                    container: m,
                    el: m,
                    url: p,
                    type: e
                };
                switch (e) {
                    case QUIZ_EDITOR_CONSTANTS.MCQ_SINGLE_RESPONSE_QUESTION_TYPE_ID:
                    case QUIZ_EDITOR_CONSTANTS.MCQ_MULTIPLE_RESPONSE_QUESTION_TYPE_ID:
                        g = new s(v);
                        break;
                    case QUIZ_EDITOR_CONSTANTS.FIB_TEXT_QUESTION_TYPE_ID:
                        g = new i(v), $(CKEDITOR).unbind(AppEvent.FIB_ANSWER_ADDED).bind(AppEvent.FIB_ANSWER_ADDED, g.fibAnswerAdded.bind(g));
                        break;
                    case QUIZ_EDITOR_CONSTANTS.FIB_DROP_DOWN_QUESTION_TYPE_ID:
                        g = new r(v), $(CKEDITOR).unbind(AppEvent.FIB_ANSWER_ADDED).bind(AppEvent.FIB_ANSWER_ADDED, g.fibAnswerAdded.bind(g));
                        break;
                    case QUIZ_EDITOR_CONSTANTS.TRUE_OR_FALSE_QUESTION_TYPE_ID:
                        g = new o(v);
                        break;
                    case QUIZ_EDITOR_CONSTANTS.MATCHING_QUESTION_TYPE_ID:
                        g = new u(v);
                        break;
                    case QUIZ_EDITOR_CONSTANTS.GROUPING_QUESTION_TYPE_ID:
                        g = new a(v);
                        break;
                    case QUIZ_EDITOR_CONSTANTS.FIB_TAP_AND_PLACE_QUESTION_TYPE_ID:
                        g = new f(v);
                        break;
                    default:
                }
                g.on("render_complete", D($(".quiz-editor-popup"))), g.on(AppEvent.OPTION_ADDED, M), g.fetchData(v.url), g.on(AppEvent.QUESTION_CREATED, O), $(".activity-container").on("paste", L), _.delay(function() {
                    w = new c, w.url = QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL + "assets/" + QUIZ_EDITOR_CONSTANTS.BOOK_ID + "?type=1";
                    var e = {
                        success: function(e) {
                            var t = e.toJSON();
                            b = new h({
                                collection: t,
                                opt: v
                            }), $(CKEDITOR).unbind(AppEvent.ADD_ASSET).bind(AppEvent.ADD_ASSET, b.assetAdd.bind(b))
                        },
                        error: function(e) {
                            console.log("error in fetching media asset data")
                        }
                    };
                    w.fetch(e)
                }, 500)
            }, L = function(e) {
                e.preventDefault();
                var t = undefined;
                window.clipboardData && window.clipboardData.getData ? t = window.clipboardData.getData("Text") : e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData && (t = e.originalEvent.clipboardData.getData("text/plain"), e.originalEvent.clipboardData.setData("text/plain", ""));
                if (t) {
                    t = "<span>" + t + "</span>";
                    var n = l.removeNbsp($(t.toString()).text()),
                        r = $(e.target).text();
                    A(n, $(e.target))
                }
            }, A = function(e, t) {
                var n, r;
                t.hasClass("question-title") && e.length > QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && (e = e.substr(0, QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH));
                if (window.getSelection) {
                    n = window.getSelection();
                    if (n.getRangeAt && n.rangeCount) {
                        r = n.getRangeAt(0), r.deleteContents();
                        var i = document.createElement("span");
                        i.innerHTML = e;
                        var s = document.createDocumentFragment(),
                            o, u;
                        while (o = i.firstChild) u = s.appendChild(o);
                        r.insertNode(s), u && (r = r.cloneRange(), r.setStartAfter(u), r.collapse(!0), n.removeAllRanges(), n.addRange(r))
                    }
                } else document.selection && document.selection.type != "Control" && document.selection.createRange().pasteHTML(e);
                var a = $(".question-title").text();
                parseInt(a.length) > QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH && $(".question-title").text(a.substr(0, QUIZ_EDITOR_CONSTANTS.MAX_TITLE_LENGTH))
            }, O = function(e) {
                E = e, S ? F() : $(window).trigger(AppEvent.QUESTION_CREATED,e)
            }, M = function(e) {
                D(e)
            }, D = function(e) {
                _.delay(function() {
                    e.hasClass("quiz-editor-popup") && _.each(CKEDITOR.instances, function(e) {
                        e.destroy()
                    });
                    var t = $(e).find("div[contenteditable=true]").filter(".question-text, .option-text, .question-option, .leftCol, .rightCol, .option");
                    _.delay(function(e) {
                        _.each(t, function(e) {
                            var t = P(e);
                            CKEDITOR.inline(e, t)
                        })
                    }, 200)
                }, 500)
            }, P = function(e) {
                var t = {
                    enterMode: CKEDITOR.ENTER_BR,
                    shiftEnterMode: CKEDITOR.ENTER_P,
                    allowedContent: !0
                };
                return $(e).hasClass("fib-option") && (t.extraPlugins = "fib"), $(e).hasClass("fib-dropdown") && (t.extraPlugins = "fib"), t.extraPlugins ? $(e).hasClass("add-img") && (t.extraPlugins = t.extraPlugins + "," + "add_img") : $(e).hasClass("add-img") && (t.extraPlugins = "add_img"), t
            }, H = function() {
                var e = g.handleDoneClick();
                if (e) {
                    e = JSON.parse(JSON.stringify(e).replace("​", ""));
                    var t = new d;
                    t.attributes.questionsData[0] = e, e.title && (t.attributes.title = e.title, C = e.title), t.attributes.testid || (t.attributes.testid = "quiz_" + e.id), t.attributes.quesType || (t.attributes.quesType = N), T = t.attributes, g.syncData(t.attributes, E)
                }
            }, B = function() {
                l.showConfirmPopUp(AppLang.SAVE_WIDGET_CONFIMATION_MESSAGE, "Confirm", ["cancel"], function(e) {
                    if (e.toLowerCase() !== "yes") return;
                    m.modal("hide")
                })
            }, j = function() {
                S = !0, H()
            }, F = function() {
                $("#editBtn").removeClass("active"), $("#previewBtn").addClass("active"), $(".activity-container").hide(), $(".preview-container-title").html(C), $(".preview-container-title").show(), $(".preview-container").show();
                var e = {
                    dataURL: E
                };
                y = new p(e), y.on(WIDGET_EVENTS.DESTROYED, q), S = !1
            }, I = function() {
                $("#previewBtn").removeClass("active"), $("#editBtn").addClass("active"), $(".preview-container-title").hide(), $(".preview-container").hide(), $(".preview-container-title").html(""), y.destroy(), $(".activity-container").show()
            }, q = function() {
                y.remove(), y = null
            }, R = function() {
                b.remove(), g.remove(), g = null, _.each(CKEDITOR.instances, function(e) {
                    e.destroy()
                }), $(CKEDITOR).unbind(AppEvent.FIB_ANSWER_ADDED)
            }, U = Backbone.View.extend({
                events: {
                    "click .quiz-editor-popup .doneBtn": H,
                    "click .quiz-editor-popup .cancelBtn": B,
                    "click .quiz-editor-popup #previewBtn": j,
                    "click .quiz-editor-popup #editBtn": I
                },
                initialize: function() {
                    QUIZ_EDITOR_CONSTANTS.ROOT_URL = location.href.split("#")[0], QUIZ_EDITOR_CONSTANTS.ROOT_PATH = window.location.pathname.split("/")[1];
                    var e = this.getURlQueryStringParams()
                },
                getURlQueryStringParams: function() {
                    var e = [],
                        t, n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
                    for (var r = 0; r < n.length; r++) t = n[r].split("="), e.push(t[0]), e[t[0]] = t[1];
                    return e
                },
                init: function(e) {
                    var t = this;
                    QUIZ_EDITOR_CONSTANTS.SERVICE_BASE_URL = e.baseServiceURL, QUIZ_EDITOR_CONSTANTS.BOOK_ID = e.videoId, $.getScript("assets/QA/com/external/ckeditor/ckeditor.js", function() {
                        var urlPath ="";
                        var myUrlPattern = 'localhost:';
                        if(window.location.href.indexOf(myUrlPattern) === -1){
                            urlPath ="/visap/visapng/"
                        }
                        var n = location.href.split("#")[0],
                          //  r = window.location.pathname.split("/")[1]+'/visaptest',
                            i = window.location.origin + urlPath+ "/assets/QA/com/external/ckeditor/";
                        CKEDITOR.basePath = i;
                        var s = e.quesType,
                            o = e.QuesContainer,
                            u = e.url,
                            a = e.quesId;
                        e.quesId ? QUIZ_EDITOR_CONSTANTS.QUES_ID = e.quesId : QUIZ_EDITOR_CONSTANTS.QUES_ID = "", e.url && (QUIZ_EDITOR_CONSTANTS.QUESTION_ASSET_BASE_PATH = e.url.substr(0, e.url.lastIndexOf("/") + 1)), N = s, k(s, o, u), t.setElement(o)
                    })
                }
            });
        return new U
    };
    return window.QuizEditor = new v, window.QuizEditor
}), require(["main-config", "com/es/widgets/WidgetConstants", "com/es/utilities/AppLang", "com/es/utilities/AppEvent", "com/es/quizEditor/QuizEditor"], function(e, t, n, r, i) {
    $(window).trigger(AppEvent.EDITOR_READY)
}), define("com/es/mainQuizEditor", function() {});
