REM xoa file min cu neu co
del /s /q /f ..\TerminalGUIWeb\release\app.min.js

REM tong hop cac file vendor\quantedge js thanh 1 file

	type ..\TerminalGUIWeb\language\lang_vi.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\language\lang_en.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.function.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.enum.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\base\app.enum.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\base\app.enum.custom.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.consts.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.message.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.network.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.item.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\base\app.entitykeys.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\base\app.entities.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\base\app.objects.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.memory.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.inMemory.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.datamanager.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.request.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.menu.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.menucreator.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.formcreator.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.docking.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.operator.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.utils.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.getcustom.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.getnotification.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.getorderstatus.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.wrapper.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.convertorderstatus.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.convertapprovaltype.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.getapprovaldetail.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.model.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.exchange.state.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.fx.state.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.gold.state.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.gold.status.confirm.reject.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.global.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.monitor.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.main.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.role.js >> ..\TerminalGUIWeb\release\app.combined.js
        type ..\TerminalGUIWeb\vendor\quantedge\app.dialogs.js >> ..\TerminalGUIWeb\release\app.combined.js

REM ma hoa no
jsmin < ..\TerminalGUIWeb\release\app.combined.js > ..\TerminalGUIWeb\release\app.min.js
REM xoa file tam
del /s /q /f ..\TerminalGUIWeb\release\app.combined.js
