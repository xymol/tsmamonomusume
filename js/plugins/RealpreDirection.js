//=============================================================================
// RealpreDirection.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00イベントの向きの代入
 * @author まっつＵＰ
 * 
 * @param val1
 * @desc プレイヤーの方を向くが何らかの形で実行された時
 * このIDの変数にその直前のそのイベントの向きを代入します。
 * @default 10
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
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
    
    var parameters = PluginManager.parameters('RealpreDirection');
    var RDval1 = Number(parameters['val1'] || 10);
    
    var Game_Character_turnTowardPlayer = Game_Character.prototype.turnTowardPlayer;
    Game_Character.prototype.turnTowardPlayer = function() {
    //console.log(this._direction)
    $gameVariables.setValue(RDval1,this._direction);    
    Game_Character_turnTowardPlayer.call(this);
    };
          
})();
