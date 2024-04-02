/*:
 * @plugindesc パーティ・アクターコマンドを横長にします。
 それに合わせてバトルステータスの表示も変更します。
 * @author 茶の助
 *
 * @param partyCommandWindowSet
 * @desc パーティコマンドウィンドウの列・行数
 * @default 2, 1
 *
 * @param actorCommandWindowSet
 * @desc アクターコマンドウィンドウの列・行数
 * @default 4, 1
 *
 * @param statusWindowRows
 * @desc ステータスウィンドウの行数
 * @default 4
 *
 * @param stateIconWidth
 * @desc ステートアイコンの表示数
 * @default 4
 *
 * @param statusWindowCustom
 * @desc ステータスウィンドウを透過する (1:する 0:しない)
 * @default 1
 *
 * @param coverColor1
 * @desc ステータス背景色（statusWindowCustomが1の時のみ）
 左から 赤, 緑, 青（0～255）, 透明度（0.0～1.0）
 * @default 0, 0, 0, 0.5
 
 * @param coverColor2
 * @desc 空きステータス背景色（statusWindowCustomが1の時のみ）
 左から 赤, 緑, 青（0～255）, 透明度（0.0～1.0）
 * @default 255, 255, 255, 0.5
 */

(function() {

    var parameters = PluginManager.parameters('TYA_BattleCommandCustom');
    var partyCommandWindowSet = parameters['partyCommandWindowSet'].split(",");
    var actorCommandWindowSet = parameters['actorCommandWindowSet'].split(",");
    var statusWindowRows = Number(parameters['statusWindowRows']);
    var stateIconWidth = Number(parameters['stateIconWidth']);
    var statusWindowCustom = Number(parameters['statusWindowCustom']) != 0;
    var coverColor1 = 'rgba(' + parameters['coverColor1'] + ')';
    var coverColor2 = 'rgba(' + parameters['coverColor2'] + ')';
	
    Window_PartyCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_PartyCommand.prototype.maxCols = function() {
        return partyCommandWindowSet[0];
    };

    Window_PartyCommand.prototype.numVisibleRows = function() {
        return partyCommandWindowSet[1];
    };

    Window_PartyCommand.prototype.itemTextAlign = function() {
        return 'center';
    };

    Window_PartyCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.openness = 0;
        this.deactivate();
    };

    Window_ActorCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_ActorCommand.prototype.maxCols = function() {
        return actorCommandWindowSet[0];
    };

    Window_ActorCommand.prototype.numVisibleRows = function() {
        return actorCommandWindowSet[1];
    };
    
    Window_ActorCommand.prototype.itemTextAlign = function() {
        return 'center';
    };
    
    Window_ActorCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.openness = 0;
        this.deactivate();
        this._actor = null;
    };
	
    Window_BattleStatus.prototype.initialize = function() {
        var width = Graphics.boxWidth;
        var height = this.windowHeight();
        var y = Graphics.boxHeight - height;
        Window_Selectable.prototype.initialize.call(this, 0, y, width, height);
        this.refresh();
        this.openness = 0;
        if(statusWindowCustom){
          this.opacity = 0;
        }
    };
	
	Window_BattleStatus.prototype.numVisibleRows = function() {
        return statusWindowRows;
    };
    
    Window_BattleStatus.prototype.drawAllItems = function() {
        var topIndex = this.topIndex();
        for (var i = 0; i < this.maxPageItems(); i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItem(index);
            } else {
                var rect = this.basicAreaRect(index);
                this.contents.fillRect(1, rect.y+1, 778, rect.height-2, coverColor2);
            }
        }
    };
    
    Window_BattleStatus.prototype.drawItem = function(index) {
        var actor = $gameParty.battleMembers()[index];
        this.drawBasicArea(this.basicAreaRect(index), actor);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor);
    };
    
    Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
        if(statusWindowCustom){
          this.contents.fillRect(1, rect.y+1, 778, rect.height-2, coverColor1);
        }
        var dead = true
        if(actor.hp == 0){
          dead = false;
        }
        this.changePaintOpacity(dead);
        // this.drawActorFace (actor, rect.x - 5, rect.y + 1, 144, 34);
        this.changePaintOpacity(true);
        this.drawActorName(actor, rect.x, rect.y, 150);
        this.drawActorIcons(actor, rect.x + 155, rect.y, stateIconWidth * 32);
    };

    Window_BattleStatus.prototype.gaugeAreaWidth = function() {
        return 388;
    };

    Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
        this.drawActorHp(actor, rect.x + 0, rect.y, 186);
        this.drawActorMp(actor, rect.x + 186 + 5, rect.y,  96);
        this.drawActorTp(actor, rect.x + 282 + 10, rect.y,  96);
    };
    
    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
        this.drawActorHp(actor, rect.x + 11, rect.y, 186);
        this.drawActorMp(actor, rect.x + 202, rect.y, 186);
    };
    
    Window_BattleEnemy.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };
    
    Scene_Battle.prototype.updateWindowPositions = function() {
    };
	
    Scene_Battle.prototype.createEnemyWindow = function() {
        this._enemyWindow = new Window_BattleEnemy(0, 0);
		this._enemyWindow.y = Graphics.boxHeight - this._enemyWindow.height;
        this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
        this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
        this.addWindow(this._enemyWindow);
    };
    
})();
