<%@ Page
	Language           = "C#"
	AutoEventWireup    = "false"
	Inherits           = "ssomock.defaultPage"
  
	ValidateRequest    = "true"
	EnableSessionState = "true"
   
%>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <title>Contoso</title>

        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta http-equiv="CACHE-CONTROL" content="NO-CACHE" />
        <meta http-equiv="PRAGMA" content="NO-CACHE" />

        <link href="css/bootstrap.min.css" rel="stylesheet">
        <!-- Custom CSS -->
        <link href="css/portfolio-item.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <script  type="text/javascript" src="jquery/jquery-1.10.2.min.js"></script>
        <script  type="text/javascript" src="jquery/bootstrap.min.js"></script>

    </head>
    <body>

        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                    <a class="navbar-brand" href="#">Contoso Videos</a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container -->
        </nav>

        <!-- Page Content -->
        <div class="container">

            <!-- Portfolio Item Heading -->
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">
                        <small>Chapter1.</small>
                    </h1>
                </div>
            </div>
            <!-- /.row -->

            <!-- Portfolio Item Row -->
            <div class="row">

 
                <div class="col-md-7" id="player" runat="server">
                   <video class="mockVid" autoplay="true" controls src="http://visapdemo.excelindia.com/VideoRepo/FC.mp4"></video>
                </div>

                <div class="col-md-5">
                    <form class="form col-md-12 center-block" id="form3" runat="server">
                        <!--modal popup starts here-->
                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">

                                <!-- Modal content-->
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Select video Type</h4>
                                    </div>
                                    <div class="modal-body">
                                        <asp:RadioButton ID="RadioBtn1" GroupName="radiobtn" runat="server" Text="Static video"  />
                                       
                                        <asp:TextBox ID="vidURL" placeholder="videoURL" class="form-control" runat="server" value="http://visapdemo.excelindia.com/VideoRepo/FC.mp4"></asp:TextBox>
                                        </br>
                                        <asp:RadioButton ID="RadioBtn2" GroupName="radiobtn" runat="server" Text="Interactive video" />
                                        <asp:TextBox ID="vidID" placeholder="videoID" runat="server" class="form-control"></asp:TextBox>

                                    </div>
                                    <div class="modal-footer">
                                        <asp:Button class="btn btn-primary" runat="server" Text="Save" OnClick="save_Click" />
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                          <!--modal popup starts here-->
                        <button type="button" class="btn btn-primary editBtn" data-toggle="modal" data-target="#myModal">Edit</button>
                        
                        <h3>Introduction</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat,
                            felis enim.</p>
                        <p>Etiam enim augue, ullamcorper nec convallis eu, luctus quis odio. Vivamus ac nulla nec risus egestas finibus quis id lorem. Sed pellentesque massa eu mauris malesuada faucibus. Cum sociis natoque penatibus et magnis dis parturient
                            montes, nascetur ridiculus mus.</p>
                        <h3>Project Details</h3>
                        <ul>
                            <li>Lorem Ipsum</li>
                            <li>Dolor Sit Amet</li>
                            <li>Consectetur</li>
                            <li>Adipiscing Elit</li>
                        </ul>
                    </form>
                </div>

            </div>
            <!-- /.row -->

            <!-- Related Projects Row -->
            <div class="row">
                <div class="col-lg-12" style="margin-top: 20px;">
                    Etiam vel risus vitae eros ullamcorper mattis sit amet et massa. Mauris volutpat placerat consequat. Suspendisse vehicula, odio vitae facilisis blandit, nunc felis cursus tellus, vitae ullamcorper odio urna et justo. Integer finibus risus diam, nec vulputate
                    purus sodales sit amet.
                </div>
                <div class="col-lg-12" style="margin-top: 10px;">
                    Etiam vel risus vitae eros ullamcorper mattis sit amet et massa. Mauris volutpat placerat consequat. Suspendisse vehicula, odio vitae facilisis blandit, nunc felis cursus tellus, vitae ullamcorper odio urna et justo. Integer finibus risus diam, nec vulputate
                    purus sodales sit amet.
                </div>
                <div class="col-lg-12" style="margin-top: 10px;">
                    Etiam vel risus vitae eros ullamcorper mattis sit amet et massa. Mauris volutpat placerat consequat. Suspendisse vehicula, odio vitae facilisis blandit, nunc felis cursus tellus, vitae ullamcorper odio urna et justo. Integer finibus risus diam, nec vulputate
                    purus sodales sit amet.
                </div>
            </div>
            <!-- /.row -->

            <hr>

            <!-- Footer -->
            <footer>
                <div class="row">
                    <div class="col-lg-12">
                        <p>Copyright &copy; www.excelindia.com</p>
                    </div>
                </div>
                <!-- /.row -->
            </footer>

        </div>
        <!-- /.container -->




    </body>

    </html>