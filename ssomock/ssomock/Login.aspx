<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ssomock.Login" %>

    <!DOCTYPE html>

    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <title>Login Form</title>
        <meta name="generator" content="Bootply" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <link href="css/styles.css" rel="stylesheet">
    </head>

    <body>
        <div id="loginModal" class="modal show" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h1 class="text-center">Login</h1>
                    </div>
                    <div class="modal-body">
                        <form class="form col-md-12 center-block" id="form1" runat="server">
                            <div class="form-group">
                                <div class="form-group">
                                    <asp:label ID="lblValidatation" class="" runat="server"></asp:label>
                                </div>
                                <div class="form-group">
                                    <asp:TextBox ID="txtUserName" class="form-control input-lg" placeholder="Username" runat="server"></asp:TextBox>
                                </div>

                                <div class="form-group">
                                    <asp:TextBox ID="PasswordTxt" class="form-control input-lg" placeholder="Password" runat="server" TextMode="Password"></asp:TextBox>
                                </div>
                                <div class="form-group" hidden>
                                    <asp:TextBox ID="txtRole" class="form-control input-lg" runat="server"></asp:TextBox>
                                </div>
                                <div class="form-group" hidden>
                                    <asp:DropDownList ID="drop1" runat="server">
                                        <asp:ListItem>Widget</asp:ListItem>
                                        <asp:ListItem>Embedded</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                                <div class="form-group">
                                    <asp:Button class="btn btn-primary btn-lg btn-block" ID="SubmitBtn" runat="server" Text="Submit" OnClick="SubmitBtn_Click"
                                    />
                                </div>
                        </form>
                        </div>
                        <div class="modal-footer">
                            <div class="col-md-12">

                            </div>
                        </div>
                    </div>
                </div>
            </div>


    </body>

    </html>