//=============================================================================
// BattleActorFaceVisibility.js
//=============================================================================

/*:
 * @plugindesc 戦闘中顔グラフィック表示プラグイン
 * 顔グラフィック未設定時ウィンドウ非表示改造済み
 * @author トリアコンタン
 * @version 1.00 2015/11/13 初版
 * 
 * @help 戦闘中、コマンド選択ウィンドウの上に
 * 顔グラフィックが表示されるようになります。
 * サイドビューの場合は何も表示されません。
 * このプラグインにはプラグインコマンドはありません。
 * 
 * 
 * ※顔グラフィック未設定時ウィンドウが非表示になるように改造しています。
 * 
 *
 * 利用規約：このプラグインはもうあなたのものです。
 * 作者連絡先：https://twitter.com/triacontane
 */
(function () {

    //=============================================================================
    // Scene_Battle
    //  顔グラフィックを表示するウィンドウを追加します。
    //=============================================================================
    var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function () {
        _Scene_Battle_createAllWindows.call(this);
        this.createFaceWindow();
    };

    Scene_Battle.prototype.createFaceWindow = function () {
        this._faceWindow = new Window_Face(this._partyCommandWindow);
        this.addWindow(this._faceWindow);
        // 表示順入れ替え
        this._windowLayer.removeChild(this._skillWindow);
        this.addWindow(this._skillWindow);
        this._windowLayer.removeChild(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    var Scene_Battle_commandAttack = Scene_Battle.prototype.commandAttack;
    Scene_Battle.prototype.commandAttack = function () {
        Scene_Battle_commandAttack.apply(this, arguments);
        this._faceWindow.visible = false;
    };

    var Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function () {
        Scene_Battle_onEnemyCancel.apply(this, arguments);
        if (this._actorCommandWindow.currentSymbol() === "attack") {
            this._faceWindow.visible = true;
        }
    };
    //=============================================================================
    // Window_Face
    //  顔グラフィックを表示するだけのウィンドウです。
    //=============================================================================
    function Window_Face() {
        this.initialize.apply(this, arguments);
    }

    Window_Face.prototype = Object.create(Window_Base.prototype);
    Window_Face.prototype.constructor = Window_Face;

    Window_Face.prototype.initialize = function () {
        var width = 192;
        var height = Window_Base._faceHeight + this.standardPadding() * 2;
        var x = 0;
        var y = Graphics.boxHeight - this.fittingHeight(Window_BattleStatus.prototype.numVisibleRows()) - height;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.hide();
        this.loadImages();  // 非同期処理のため先読み
        this._actorId = 0;
    };

    Window_Face.prototype.loadImages = function () {
        $gameParty.members().forEach(function (actor) {
            ImageManager.loadFace(actor.faceName());
        }, this);
    };

    Window_Face.prototype.update = function () {
        if ($gameSystem.isSideView()) return;
        Window_Base.prototype.update.call(this);
        var actor = BattleManager.actor();
        if (actor && this._actorId != actor.actorId()) {
            if (actor.faceName() == "") {
                this.hide();
            } else {
                this.contents.clear();
                var x = (this.contentsWidth() - Window_Base._faceWidth) / 2;
                var y = 0;
                this.drawActorFace(actor, x, y);
                this._actorId = actor.actorId();
                this.show();
            }
        }
        if (actor == null && this._actorId != 0) {
            this.contents.clear();
            this._actorId = 0;
            this.hide();
        }
    };


    // アクターを追加するときに顔画像をプリロードしておくように改造
    // Change Party Member
    Game_Interpreter.prototype.command129 = function () {
        var actor = $gameActors.actor(this._params[0]);
        if (actor) {
            if (this._params[1] === 0) {  // Add
                if (this._params[2]) {   // Initialize
                    $gameActors.actor(this._params[0]).setup(this._params[0]);
                }

                // 改造か所
                ImageManager.loadFace(actor.faceName());

                $gameParty.addActor(this._params[0]);
            } else {  // Remove
                $gameParty.removeActor(this._params[0]);
            }
        }
        return true;
    };

})();