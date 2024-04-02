//=============================================================================
// GlobalVariable.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2017/11/22 変数取得機能周りを少し変更
// 1.0.0 2017/11/22 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc セーブに関係なく利用できる変数を使えるようにするプラグインです。
 * @author n2naokun(柊菜緒)
 *
 * @help 使い方
 * イベントのスクリプトにて
 * 読み込み
 * GlobalVars.get("変数名");
 * 書き込み
 * GlobalVars.set("変数名", 値 );
 * 値の保存
 * GlobalVars.save();
 * 
 * ※値をセットした後はGlobalVars.save();を実行しないとセーブファイルに保存されません。
 *   使用する変数名はダブルクォーテーション " かシングルクォーテーション ' で囲ってください。
 * 
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

// ESLint向けグローバル変数宣言
/*global ,GlobalVars*/

"use strict";// 厳格なエラーチェック

// 他プラグイン連携用
var Imported = Imported || {};
Imported.GlobalVariable = true;

ConfigManager.GlobalVars = {};

(function (_global) {

   // コンフィグマネージャー拡張
   var _ConfigManager_makeData = ConfigManager.makeData;
   ConfigManager.makeData = function () {
      var config = _ConfigManager_makeData.apply(this, arguments);
      config.GlobalVars = this.GlobalVars;
      return config;
   };

   var _ConfigManager_applyData = ConfigManager.applyData;
   ConfigManager.applyData = function (config) {
      _ConfigManager_applyData.apply(this, arguments);
      this.GlobalVars = config.GlobalVars || {};
   };


   // グローバル関数拡張
   window.GlobalVars = {};
   GlobalVars.get = function (name) {
      return ConfigManager.GlobalVars[name];
   };

   GlobalVars.set = function (name, arg) {
      ConfigManager.GlobalVars[name] = arg;
   };

   GlobalVars.save = function () {
      ConfigManager.save();
   };
})(this);