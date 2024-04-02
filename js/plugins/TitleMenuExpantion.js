//=============================================================================
// TitleMenuExpantion.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/11/22 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc タイトルメニューにシーン・CG観賞を追加するカスタムプラグイン
 * @author n2naokun(柊菜緒)
 *
 * @help タイトルメニューにシーン・CG項目（名称変更可）を追加します。
 * 自動開始イベントなどの条件分岐にスクリプトを使用し
 * (StartFlag == 1) の場合はシーン・CGが選択された処理を実行します。
 * 上記の括弧ごと条件分岐のスクリプトに張り付ければ使用可能です。
 * 
 * ※使用するにはGlobalVariableの読み込みが必要です。
 *   シーン・CGの項目を表示するためにはGlobalVar.set()にて
 *   変数名"extra"にtrueや1などが設定されている必要があります。
 * 
 * 
 * @param MenuText
 * @desc メニューの項目テキスト
 * @default シーン・CG
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

// ESLint向けグローバル変数宣言
/*global , StartFlag:true , Imported:true , GlobalVars */

"use strict";//厳格なエラーチェック

(function (_global) {

   var params = PluginManager.parameters("TitleMenuExpantion");

   window.StartFlag = 0;


   var Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
   Scene_Title.prototype.createCommandWindow = function () {
      // GlobalVariableが読み込まれていて尚且つ変数extraが有効ならシーンを表示する
      if (Imported.GlobalVariable && GlobalVars.get("extra")) {
         this._commandWindow = new Window_TitleCommand();
         this._commandWindow.setHandler('newGame', this.commandStart.bind(this));
         this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
         this._commandWindow.setHandler('extra', this.commandExtra.bind(this));
         this._commandWindow.setHandler('options', this.commandOptions.bind(this));
         this.addWindow(this._commandWindow);
      } else {
         Scene_Title_createCommandWindow.call(this);
      }
   };

   Scene_Title.prototype.commandStart = function () {
      StartFlag = 0;
      this.commandNewGame.call(this);
   };

   Scene_Title.prototype.commandExtra = function () {
      StartFlag = 1;
      this.commandNewGame.call(this);
   };

   var Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
   Window_TitleCommand.prototype.makeCommandList = function () {
      // GlobalVariableが読み込まれていて尚且つ変数extraが有効ならシーンを表示する
      if (Imported.GlobalVariable && GlobalVars.get("extra")) {
         this.addCommand(TextManager.newGame, 'newGame');
         this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
         this.addCommand(params["MenuText"] || "シーン・CG", 'extra');
         this.addCommand(TextManager.options, 'options');
      } else {
         Window_TitleCommand_makeCommandList.call(this);
      }
   };
})(this);