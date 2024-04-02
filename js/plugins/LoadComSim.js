//=============================================================================
// LoadComSim.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 メニューコマンドにロードを追加します。
 * @author まっつＵＰ
 * 
 * @param loadtext
 * @desc コマンド「ロード」のコマンド名です。
 * @default ロード
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * コマンド「ロード」はイベントテスト中またはセーブデータがないときは選択不能になります。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
    var parameters = PluginManager.parameters('LoadComSim');
    var LCSloadtext = String(parameters['loadtext'] || "读档");

    var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('load', this.commandLoad.bind(this));
    };

    Scene_Menu.prototype.commandLoad = function() { //新規
    SceneManager.push(Scene_Load);
    };

    var _Window_MenuCommand_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
    Window_MenuCommand.prototype.addSaveCommand = function() {
    _Window_MenuCommand_addSaveCommand.call(this);
     var enabled = this.isLoadEnabled();
     this.addCommand(LCSloadtext, 'load', enabled);
    };
      
    Window_MenuCommand.prototype.isLoadEnabled = function() { //新規
    if(DataManager.isEventTest()) return false; //この行はイベントテスト中かどうか判定しています。
    return DataManager.isAnySavefileExists();
    };

})();
