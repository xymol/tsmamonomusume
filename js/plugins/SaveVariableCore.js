//=============================================================================
// SaveVariableCore.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2017/10/31 大幅な仕様変更
// 1.0.0 2017/10/29 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc プラグイン内の変数を簡単にセーブに対応させる前提プラグイン
 * @author n2naokun(柊菜緒)
 *
 * @help var インスタンスの名前 = new saveObject("プラグインの名前");
 * まず上記のようにプラグイン内でインスタンスを生成してください。
 * セーブしたいデータがある場合は
 * インスタンスの名前.saveParams以下に新しく変数/オブジェクトを作ってください。
 * 
 * 例:（インスタンスの名前がsaveの場合）
 * save.saveParams.items = 1;
 * このような感じで使ってください。（オブジェクトも入れれます）
 * また、使用直前に
 * var savedata = save.saveParams;
 * savedata.item = 1;
 * savedata.item2 = 1;
 * のように省略することも可能です。
 * （JavaScriptがオブジェクトを参照渡しすることを利用しています。）
 * ※使用直前でないと上手く動作しないことがあります。
 * 
 * プレーヤーがセーブ/ロードしたタイミングでセーブ/ロードされます。
 * ※セーブごとに内容が変わるので注意。
 * 
 * 
 * 
 * 
 * 仕組みの解説
 * ロードされると自動的にグローバル変数の$saveParams["プラグインの名前"]
 * が各インスタンスのsaveParamsからアクセスできるように更新されます。
 * 
 * 例のようにsave.saveParamsにアクセスすると実際には
 * $saveParams["プラグインの名前"]にアクセスされます。
 * var savedata = save.saveParams のように省略する場合は直前に行わないと
 * 新しい参照先に切り替えが行われず上手く動作しません。
 * （言語の仕様なのでご容赦ください。）
 * 
 * 
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

// ESLint向けグローバル変数宣言
/*global $saveParams:true , _updates:true*/

"use strict";//厳格なエラーチェック

var Imported = Imported || {};
Imported.SaveVariableCore = true;

(function (_global) {
   // セーブ用のオブジェクトを作成
   window.$saveParams = {};
   window._updates = {};

   var DataManager_createGameObjects = DataManager.createGameObjects;
   DataManager.createGameObjects = function () {
      DataManager_createGameObjects.call(this);
      $saveParams = $saveParams || {};
   };

   var DataManager_makeSaveContents = DataManager.makeSaveContents;
   DataManager.makeSaveContents = function () {
      var contents = DataManager_makeSaveContents.call(this);
      contents.saveParams = $saveParams;
      return contents;
   };

   var DataManager_extractSaveContents = DataManager.extractSaveContents;
   DataManager.extractSaveContents = function (contents) {
      DataManager_extractSaveContents.call(this, contents);
      $saveParams = contents.saveParams;
      for (var name in _updates) {
         // 各インスタンスの参照先を更新
         _updates[name].update();
      }
   };

})(this);

// セーブオブジェクトの定義
function saveObject() {
   return this.initialize.apply(this, arguments);
}

// セーブオブジェクトの初期化
saveObject.prototype.initialize = function (name) {
   if (name != null && name != "") {
      // _nameにプラグインの名前を格納
      this._name = name;
      // 初期化されてなかったら初期化する
      $saveParams[name] = $saveParams[name] || {};
      // _paramsに$saveParams[name]をセット
      this.saveParams = $saveParams[name];
      // グローバル変数の_updates[name]に自身のインスタンスの参照を格納
      _updates[name] = this;
   }
   else {
      throw "saveObject name null exception";
   }
};

saveObject.prototype.update = function () {
   if (this.saveParams !== $saveParams[this._name]) {
      this.saveParams = $saveParams[this._name];
   }
};
