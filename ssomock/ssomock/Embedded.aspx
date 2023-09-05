<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Embedded.aspx.cs" Inherits="ssomock.Embedded" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="jquery/jquery-1.10.2.min.js"></script>
    <script src="visap.edit.js"></script>
    <script src="visap.js"></script>

    <script src="mockindex.js"></script>
  <link href="style/style.css" rel="stylesheet" />  
  <link href="default/jquery.dataTables.css" rel="stylesheet" /> 
    <link href="style/carousel-bootstrap.css" rel="stylesheet" /> 
  <link href="style/carousel.css" rel="stylesheet" /> 
    <link href="style/player.brown.css" rel="stylesheet" />
    
</head>
<body>
    
    <form id="form1" runat="server">
    <div>
    <h1>Embedded page.!</h1>
         <asp:HiddenField ID="HiddenField" runat="server" />  
        <div class="banner">
  <div class="container">
    <div class="logo">
      <div><span>VIDEO SEARCH ADAPT & PLAY</span></div>
    </div>
    <div class="flt-rt links-container">
      
      <ul class="links-rt">
             
              <li><a  href="contact.html"class="icn-contact" >Contact</a></li>
              <li class="profile" style="border-left:thin #666 solid;"><span id="uName"></span></li>
               <li class="power" title="Logout"><a class="" href="#" onclick="ViTag.logout();"></a></li>
            </ul>
      <ul class="links-rt-main" id="HomeandEdit">
              <li><a href="Embedded.aspx" class="link-catalogue-s">HOME</a></li>
              <li><a href="mockedit.html" class="link-edit-n">EDIT</a></li>
         
            </ul>
    </div>
  </div>
</div>   
        <div id="playContainer"style="width:540px">
                            <div id="videoContainer" class="vidcontainer">
                            </div>
            <div id="listofvideo">
              

            </div>

            <div class="col-rt" >
                <div class="content-rt" >
                    <ul class="videotabselection" >
                        <li class="videoTab" style="width:100%">VIDEOS</li>
                       
                    </ul>
                    <div class="search">
                        <input type="text" placeholder="Title,Tags" title="Search video by Title / Tag"
                            onkeyup="javascript: ViTagUI.doVidSearch({ obj: this, e: event });" id="vidSearch"> </input></div>
                    <!-- Thumb-->
                    <ul class="video-list-video" id="videoList">
                    </ul>
                    <!-- Thumb-->
                </div>
            </div>
    </div>
        </div>
    </form>
</body>
</html>
