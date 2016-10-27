@echo off

REM xoa thu muc build
rd /s /q ..\TerminalGUIWeb\release
REM tao lai thu muc build
mkdir ..\TerminalGUIWeb\release

set /p Var1="enter"

REM --------Merge thu muc Controller
call combine_controller.bat
set /p Var1="enter"

REM --------Merge thu muc App
call combine_app.bat
set /p Var1="enter"

REM --------Merge thu muc Vendor
call combine_vendor.bat

REM pause