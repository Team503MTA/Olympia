@echo off
git pull
cls
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set ldt=%%c%%a%%b)
echo Build Date[%ldt%]
set COPY_RIGHT=QuantEdge-Lake@%ldt%

REM xoa thu muc trien khai cu
RMDIR /S /Q ..\release
MKDIR ..\release


XCOPY ..\TerminalGUIWeb\Index.html ..\release /-Y /Q
XCOPY ..\TerminalGUIWeb\notsupport.html ..\release /-Y /Q

REM copy cac thu muc khong thay doi
MKDIR ..\release\files
XCOPY ..\TerminalGUIWeb\files ..\release\files /E /-Y /S /Q
MKDIR ..\release\images
XCOPY ..\TerminalGUIWeb\images ..\release\images /E /-Y /S /Q
MKDIR ..\release\language
XCOPY ..\TerminalGUIWeb\language ..\release\language /E /-Y /S /Q
MKDIR ..\release\styles
XCOPY ..\TerminalGUIWeb\styles ..\release\styles /E /-Y /S /Q
MKDIR ..\release\vendor
XCOPY ..\TerminalGUIWeb\vendor ..\release\vendor /E /-Y /S /Q
RMDIR /S /Q ..\release\vendor\quantedge

REM min cac file js dang su dung

echo wait...

MKDIR ..\release\joiner
cd ..\TerminalGUIWeb\joiner\
FORFILES /M *.js /C "cmd /c ..\..\build\jsmin <@path > ..\..\release\joiner\@file %COPY_RIGHT%"
cd ..\..\build\

echo var $releaseMode = true;var $version = '2.6.0-%ldt%'; > ..\release\joiner\joiner.version.js

MKDIR ..\release\vendor\quantedge
cd ..\TerminalGUIWeb\vendor\quantedge\
FORFILES /M *.js /C "cmd /c ..\..\..\build\jsmin <@path > ..\..\..\release\vendor\quantedge\@file %COPY_RIGHT%"
cd ..\..\..\build\

MKDIR ..\release\vendor\quantedge\base
cd ..\TerminalGUIWeb\vendor\quantedge\base\
FORFILES /M *.js /C "cmd /c ..\..\..\..\build\jsmin <@path > ..\..\..\..\release\vendor\quantedge\base\@file %COPY_RIGHT%"
cd ..\..\..\..\build\

MKDIR ..\release\controllers
cd ..\TerminalGUIWeb\controllers\
FORFILES /M *.js /C "cmd /c ..\..\build\jsmin <@path > ..\..\release\controllers\@file %COPY_RIGHT%"
cd ..\..\build\

MKDIR ..\release\controllers\core

MKDIR ..\release\controllers\core\other
cd ..\TerminalGUIWeb\controllers\core\other\
FORFILES /M *.js /C "cmd /c ..\..\..\..\build\jsmin <@path > ..\..\..\..\release\controllers\core\other\@file %COPY_RIGHT%"
cd ..\..\..\..\build\
MKDIR ..\release\controllers\core\system
cd ..\TerminalGUIWeb\controllers\core\system\
FORFILES /M *.js /C "cmd /c ..\..\..\..\build\jsmin <@path > ..\..\..\..\release\controllers\core\system\@file %COPY_RIGHT%"
cd ..\..\..\..\build\
MKDIR ..\release\controllers\core\user
cd ..\TerminalGUIWeb\controllers\core\user\
FORFILES /M *.js /C "cmd /c ..\..\..\..\build\jsmin <@path > ..\..\..\..\release\controllers\core\user\@file %COPY_RIGHT%"
cd ..\..\..\..\build\

ECHO -----------------DONE------------------