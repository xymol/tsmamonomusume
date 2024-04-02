//=============================================================================
// VE_Single_Actor_override.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/05/25 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc シングルアクター改造プラグイン
 * @author n2naokun(柊菜緒)
 *
 * @help このプラグインにはプラグインパラメーターも
 * プラグインコマンドも有りません。
 * 
 * 
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

// ESLint向けグローバル変数宣言
/*global */

"use strict";//厳格なエラーチェック

var Imported = Imported || {};
Imported.VE_Single_Actor_override = true;
// 他のプラグインとの連携用シンボル

(function (_global) {
   // APIプラグインチェック
   if (Imported.HS_PluginEnableCheckAPI) {
      // プラグインの有効化チェック
      if (PluginManager.isEnable('VE_Single_Actor')) {

         Scene_Menu.prototype.createCommandWindow = function () {
            // メニューコマンドウィンドウの位置変更（左上）
            this._commandWindow = new Window_MenuCommand(0, 0);
            this._commandWindow.setHandler('item', this.commandItem.bind(this));
            this._commandWindow.setHandler('skill', this.commandPersonal.bind(this));
            this._commandWindow.setHandler('equip', this.commandPersonal.bind(this));
            this._commandWindow.setHandler('status', this.commandPersonal.bind(this));
            this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
            this._commandWindow.setHandler('options', this.commandOptions.bind(this));
            this._commandWindow.setHandler('save', this.commandSave.bind(this));
            this._commandWindow.setHandler('gameEnd', this.commandGameEnd.bind(this));
            this._commandWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._commandWindow);
         };

         // コマンドウィンドウの縦の長さを可変に戻す
         Window_MenuCommand.prototype.numVisibleRows = function () {
            return this.maxItems();
         };

         // ステータスウィンドウの位置とサイズを変更
         var _Scene_Menu_create = Scene_Menu.prototype.create;
         Scene_Menu.prototype.create = function () {
            _Scene_Menu_create.call(this);
            this._statusWindow.x = this._commandWindow.x + this._commandWindow.width;
            this._statusWindow.y = this._commandWindow.y;

            this._goldWindow.x = this._commandWindow.x;
            this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
         };

         Scene_Menu.prototype.createStatusWindow = function () {
            this._statusWindow = new Window_MenuStatus(this._commandWindow.width, 0,
               Graphics.boxWidth - (this._commandWindow.width + this._commandWindow.x),
               Graphics.boxHeight);
            this._statusWindow.reserveFaceImages();
            this.addWindow(this._statusWindow);
         };

         Window_MenuStatus.prototype.initialize = function (x, y, width, height) {
            width = width || this.windowWidth();
            height = height || this.windowHeight();
            Window_Selectable.prototype.initialize.call(this, x, y, width, height);
            this._formationMode = false;
            this._pendingIndex = -1;
            this.refresh();
         };
         // ここまで

      } else {
         console.log("警告: VE_Single_Actorが読み込まれていません");
      }
   } else {
      console.error("エラー: HS_PluginEnableCheckAPIプラグインを導入してください");
   }
})(this);