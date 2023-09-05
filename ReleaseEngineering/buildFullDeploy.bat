echo off

REM Please do not do any change in this build batch file.
REM set path
REM SET PATH=%PATH%;C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727;
REM SET PATH=%PATH%;C:\Program Files\Microsoft Visual Studio 8\Common7\IDE

echo msbuild @buildFullDeploy.rsp /t:%1 build.xml 
msbuild.exe @buildFullDeploy.rsp /t:%1  build.xml

echo on
