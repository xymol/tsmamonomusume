//=============================================================================
// HS_PluginEnableCheckAPI.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/08/25 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc PluginManagerを拡張してプラグインが有効になっているか
 * 確認するためのAPIを提供します。
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
/*global ,$plugins*/

"use strict";//厳格なエラーチェック

var Imported = Imported || {};
Imported.HS_PluginEnableCheckAPI = true;
// 他のプラグインとの連携用シンボル

(function (_global) {
   PluginManager.isEnable = function (name) {
      let result = false;
      $plugins.forEach(function (plugin) {
         if (plugin.name == name) {
            result = plugin.status;
         }
      });

      return result;
   };

})(this);