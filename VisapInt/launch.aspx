<%@ Page
	Language           = "C#"
	AutoEventWireup    = "true"
	Inherits           = "VisapInt.launch"
	ValidateRequest    = "true"
	EnableSessionState = "true"
%>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <title>launch</title>

        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta http-equiv="CACHE-CONTROL" content="NO-CACHE" />
        <meta http-equiv="PRAGMA" content="NO-CACHE" />


        <script type="text/javascript" src="scripts/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="scripts/jquery-ui.1.10.4.js"></script>
        <script type="text/javascript" src="scripts/jquery.blockUI.js"></script>
        
        
         <script type="text/javascript" src="scripts/visap/i18next.js"></script>
        <script type="text/javascript" src="scripts/visap/visap.localize.js"></script>
        <script type="text/javascript" src="https://www.youtube.com/iframe_api"></script>
        <script type="text/javascript" src="http://visapdemo.excelindia.com/ViSAPFx/scripts/logger.js"></script>
        <script type="text/javascript" src="http://visapdemo.excelindia.com/ViSAPFx/scripts/visap.logger.js"></script>
        <script type="text/javascript" src="scripts/visap/config.js"></script>
        <script type="text/javascript" src="http://visapdemo.excelindia.com/ViSAPFx/scripts/visap.js"></script>
        <script type="text/javascript" src="http://visapdemo.excelindia.com/ViSAPFx/scripts/visap.aelib.js"></script>


        <link href="styles/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="styles/player.brown.css" rel="stylesheet" type="text/css">
        <link href="<%=getCss()%>" rel="stylesheet" type="text/css">
        <script type="text/javascript" src="scripts/index.js"></script>



        <script src="QA/com/external/jquery-ui/jquery-ui.js"></script>
        <link rel="stylesheet" type="text/css" href="QA/css/widget_global.css" />
        <link rel="stylesheet" type="text/css" href="QA/css/widget_color.css" />
        <link rel="stylesheet" type="text/css" href="QA/css/widgets_utils.css" />
        <link rel="stylesheet" type="text/css" href="QA/css/widget.css" />
        <link rel="stylesheet" type="text/css" href="QA/themes/default/css/widgets_theme.css">
        <link rel="stylesheet" type="text/css" href="QA/css/widgets_quizCreator.css" />
        <link rel="stylesheet" type="text/css" href="QA/css/widgets_popup.css" />
        <link rel="stylesheet" type="text/css" href="QA/css/widgets_quizEditor.css" />

        <link rel="stylesheet" type="text/css" href="QA/css//widgets_iFrameWidget.css" />
        <link rel="stylesheet" type="text/css" href="QA/themes/default/css/widgets_iframeTheme.css">


        <!--<script src="QA/com/external/jquery/jquery.js"></script>-->
        <script src="QA/com/external/backbone/underscore.js"></script>
        <script src="QA/com/external/backbone/backbone.js"></script>
        <script src="QA/com/external/iscroll.js"></script>
        <!--<script src="QA/com/external/jquery-ui/jquery-ui.js"></script>-->
        <script src="QA/com/external/rangy-core.js"></script>
        <script src="QA/com/external/DetectMobileBrowser.js"></script>
        <script>var require = {baseUrl : './QA/'};</script>
        <script>var require = {baseUrl : './QA/', deps:["com/es/mainRenderer"]};</script>
        <script data-main="com/es/mainQuizEditor" src="QA/com/external/require.js"></script>

        <script type="text/javascript" src="QA/com/es/mainRenderer.js"></script>




        <script type="text/javascript">
        $(document).ready(ViTagUI.getReady);
    </script>

    </head>

    <body class="visapContainer">

      
      
        <div id="playContainer" class="playerContainer">
            <div id="videoContainer" class="vidcontainer">
            </div>
          <div class="btn-tag" onclick='ViTagUI.getTagsLinks()' id="tagLinkBtn"></div>     
        <div class="tag-main" id='slider'>
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <!-- Tags and links are shown here -->
            </div>
            <!-- question block are shown here -->
           
        </div>
         <div id="questContainer">
                <div class="quest-main" id="aelibquestblock"></div>
            </div>
        </div>

    </body>

    </body>

    </html>