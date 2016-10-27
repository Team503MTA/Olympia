@echo off

rem update git to lastest version
rem git pull

rem remove old file
del win32\VisionFX.exe
del osx\app.nw

rem zip all files without git to zip archive -2 compression methods - fast (-mx0) or strong (-mx9)
7za.exe a -tzip VisionFX.nw ..\TerminalGUIWeb\* -xr!?git\* -mx9
7za.exe a -tzip osx\app.nw ..\TerminalGUIWeb\* -xr!?git\* -mx0

rem compilation to executable form
copy /b nw.exe+%~dp0VisionFX.nw win32\VisionFX.exe

rem remove temporary
del VisionFX.nw

pause