REM xoa file min cu neu co
RMDIR /S /Q ..\TerminalGUIWeb\release
MKDIR ..\TerminalGUIWeb\release
REM tong hop cac file controller js thanh file

REM noi cac file trong thu muc chinh
type ..\TerminalGUIWeb\controllers\controller.login.js >> ..\TerminalGUIWeb\release\controller.core.js
type ..\TerminalGUIWeb\controllers\controller.relogin.js >> ..\TerminalGUIWeb\release\controller.core.js
type ..\TerminalGUIWeb\controllers\controller.splash.js >> ..\TerminalGUIWeb\release\controller.core.js
type ..\TerminalGUIWeb\controllers\controller.home.js >> ..\TerminalGUIWeb\release\controller.core.js
echo var $controller_core = true; >> ..\TerminalGUIWeb\release\controller.core.js



type ..\TerminalGUIWeb\vendor\quantedge\app.function.js >> ..\TerminalGUIWeb\release\app.core.js
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.views.core.js ..\TerminalGUIWeb\release
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.views.exchange.js ..\TerminalGUIWeb\release
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.views.fx.js ..\TerminalGUIWeb\release
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.views.system.js ..\TerminalGUIWeb\release
type ..\TerminalGUIWeb\vendor\quantedge\app.enum.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\base\app.enum.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\base\app.enum.custom.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.consts.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.message.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.network.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.item.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\base\app.entitykeys.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\base\app.entities.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\base\app.objects.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.memory.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.inMemory.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.datamanager.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.request.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.menu.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.menucreator.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.formcreator.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.docking.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.operator.js >> ..\TerminalGUIWeb\release\app.core.js
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.utils.js ..\TerminalGUIWeb\release
type ..\TerminalGUIWeb\vendor\quantedge\app.getcustom.js >> ..\TerminalGUIWeb\release\app.core.js
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.getnotification.js ..\TerminalGUIWeb\release
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.getorderstatus.js ..\TerminalGUIWeb\release
type ..\TerminalGUIWeb\vendor\quantedge\app.wrapper.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.convertorderstatus.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.convertapprovaltype.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.getapprovaldetail.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.model.js >> ..\TerminalGUIWeb\release\app.core.js
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.exchange.state.js ..\TerminalGUIWeb\release
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.fx.state.js ..\TerminalGUIWeb\release
XCOPY ..\TerminalGUIWeb\vendor\quantedge\app.gold.state.js ..\TerminalGUIWeb\release
type ..\TerminalGUIWeb\vendor\quantedge\app.gold.status.confirm.reject.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.global.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.monitor.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.main.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.role.js >> ..\TerminalGUIWeb\release\app.core.js
type ..\TerminalGUIWeb\vendor\quantedge\app.dialogs.js >> ..\TerminalGUIWeb\release\app.core.js

REM noi cac file trong thu muc core system
type ..\TerminalGUIWeb\controllers\core\system\*.js >> ..\TerminalGUIWeb\release\controller.core.system.js
echo var $controller_core_system = true; >> ..\TerminalGUIWeb\release\controller.core.system.js

REM noi cac file trong thu muc core limit
type ..\TerminalGUIWeb\controllers\core\limit\*.js >> ..\TerminalGUIWeb\release\controller.core.limit.js
echo var $controller_core_limit = true; >> ..\TerminalGUIWeb\release\controller.core.limit.js

REM noi cac file trong thu muc core user
type ..\TerminalGUIWeb\controllers\core\user\*.js >> ..\TerminalGUIWeb\release\controller.core.user.js
echo var $controller_core_user = true; >> ..\TerminalGUIWeb\release\controller.core.user.js

REM noi cac file trong thu muc core price
type ..\TerminalGUIWeb\controllers\core\price\*.js >> ..\TerminalGUIWeb\release\controller.core.price.js
echo var $controller_core_price = true; >> ..\TerminalGUIWeb\release\controller.core.price.js

REM noi cac file trong thu muc core other
type ..\TerminalGUIWeb\controllers\core\other\*.js >> ..\TerminalGUIWeb\release\controller.core.other.js
echo var $controller_core_other = true; >> ..\TerminalGUIWeb\release\controller.core.other.js

REM noi cac file trong thu muc gold transaction
type ..\TerminalGUIWeb\controllers\gold\transaction\*.js >> ..\TerminalGUIWeb\release\controller.gold.transaction.js
echo var $controller_gold_transaction = true; >> ..\TerminalGUIWeb\release\controller.gold.transaction.js

REM noi cac file trong thu muc gold order
type ..\TerminalGUIWeb\controllers\gold\order\*.js >> ..\TerminalGUIWeb\release\controller.gold.order.js
echo var $controller_gold_order = true; >> ..\TerminalGUIWeb\release\controller.gold.order.js

REM noi cac file trong thu muc exchange
type ..\TerminalGUIWeb\controllers\exchange\transaction\*.js >> ..\TerminalGUIWeb\release\controller.exchange.transaction.js
echo var $controller_exchange_transaction = true; >> ..\TerminalGUIWeb\release\controller.exchange.transaction.js

REM noi cac file trong thu muc exchange
type ..\TerminalGUIWeb\controllers\exchange\order\*.js >> ..\TerminalGUIWeb\release\controller.exchange.order.js
echo var $controller_exchange_order = true; >> ..\TerminalGUIWeb\release\controller.exchange.order.js


REM noi cac file trong thu muc fx
type ..\TerminalGUIWeb\controllers\fx\order\*.js >> ..\TerminalGUIWeb\release\controller.fx.order.js
echo var $controller_fx_order = true; >> ..\TerminalGUIWeb\release\controller.fx.order.js

REM noi cac file trong thu muc fx
type ..\TerminalGUIWeb\controllers\fx\requote\*.js >> ..\TerminalGUIWeb\release\controller.fx.requote.js
echo var $controller_fx_requote = true; >> ..\TerminalGUIWeb\release\controller.fx.requote.js

REM noi cac file trong thu muc fx
type ..\TerminalGUIWeb\controllers\fx\risk\*.js >> ..\TerminalGUIWeb\release\controller.fx.risk.js
echo var $controller_fx_risk = true; >> ..\TerminalGUIWeb\release\controller.fx.risk.js

REM noi cac file trong thu muc fx
type ..\TerminalGUIWeb\controllers\fx\transaction\*.js >> ..\TerminalGUIWeb\release\controller.fx.transaction.js
echo var $controller_fx_transaction = true; >> ..\TerminalGUIWeb\release\controller.fx.transaction.js
