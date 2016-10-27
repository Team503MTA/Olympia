REM xoa file min cu neu co
del /s /q /f ..\TerminalGUIWeb\release\controller.core.min.js
del /s /q /f ..\TerminalGUIWeb\release\controller.gold.min.js
del /s /q /f ..\TerminalGUIWeb\release\controller.ex.min.js
del /s /q /f ..\TerminalGUIWeb\release\controller.fx.min.js

REM tong hop cac file controller js thanh 1 file

REM noi cac file trong thu muc chinh
type ..\TerminalGUIWeb\controllers\controller.login.js >> ..\TerminalGUIWeb\release\controller.core.combined.js
type ..\TerminalGUIWeb\controllers\controller.relogin.js >> ..\TerminalGUIWeb\release\controller.core.combined.js
type ..\TerminalGUIWeb\controllers\controller.splash.js >> ..\TerminalGUIWeb\release\controller.core.combined.js
type ..\TerminalGUIWeb\controllers\controller.home.js >> ..\TerminalGUIWeb\release\controller.core.combined.js

REM noi cac file trong thu muc core
type ..\TerminalGUIWeb\controllers\core\*.js >> ..\TerminalGUIWeb\release\controller.gold.combined.js

REM noi cac file trong thu muc exchange
type ..\TerminalGUIWeb\controllers\exchange\*.js >> ..\TerminalGUIWeb\release\controller.ex.combined.js

REM noi cac file trong thu muc exchange
type ..\TerminalGUIWeb\controllers\fx\*.js >> ..\TerminalGUIWeb\release\controller.fx.combined.js

REM ma hoa no
jsmin < ..\TerminalGUIWeb\release\controller.core.combined.js > ..\TerminalGUIWeb\release\controller.core.min.js
jsmin < ..\TerminalGUIWeb\release\controller.gold.combined.js > ..\TerminalGUIWeb\release\controller.gold.min.js
jsmin < ..\TerminalGUIWeb\release\controller.ex.combined.js > ..\TerminalGUIWeb\release\controller.ex.min.js
jsmin < ..\TerminalGUIWeb\release\controller.fx.combined.js > ..\TerminalGUIWeb\release\controller.fx.min.js

REM xoa file tam
del /s /q /f ..\TerminalGUIWeb\release\controller.core.combined.js
del /s /q /f ..\TerminalGUIWeb\release\controller.gold.combined.js
del /s /q /f ..\TerminalGUIWeb\release\controller.ex.combined.js
del /s /q /f ..\TerminalGUIWeb\release\controller.fx.combined.js
