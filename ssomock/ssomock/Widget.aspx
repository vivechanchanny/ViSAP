<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Widget.aspx.cs" Inherits="ssomock.Widget" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <h1>Welcome to Widget Page</h1>
        <iframe id="urIFrameName"width="1080px" height="800px" src="<%=GetSsoSource() %>"></iframe>
       
       
    </div>
    </form>
</body>
</html>
