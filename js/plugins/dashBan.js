
/*:ja
 * @plugindesc ダッシュを禁止するプラグインです
 * @author 村人A
 *
 * @help
 *
 * プレイヤーのダッシュをコマンドで禁止するプラグインです
 * ダッシュが許可されているマップに移動してもダッシュ禁止は
 * 継続されます。
 *
 * プラグインコマンド:
 *   ダッシュ禁止    # ダッシュを禁止
 *   ダッシュ許可    # ダッシュを許可
 */

(function() {
	villaA_dashBan = false;
	
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ダッシュ禁止') {
			villaA_dashBan = true;
        }
		
        if (command === 'ダッシュ許可') {
			villaA_dashBan = false;
        }
    };
	
	Game_Player.prototype.isDashing = function() {
		if(villaA_dashBan){
			return false;
		} else {
			return this._dashing;
		}
	};
})();