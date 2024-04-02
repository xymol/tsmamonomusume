//=============================================================================
// HS_TSmonIslandTitle.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/08/12 初版
// 1.0.1 2020/08/12 右端からの余白計算アルゴリズムを変更(余白がいい感じになる)
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc タイトル画面のメニュー表示を変更します。
 * ※タイトル画面に選択肢を追加する系のプラグインより後に読み込んでください。
 * @author n2naokun(柊菜緒)
 *
 * @help 説明
 * タイトル画面に表示されるメニューの位置を変更します。
 * メニュー位置の手動設定で0よりも小さい数字を設定すると標準位置に設定されます。
 * 
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 * 
 * @param manualMode
 * @type boolean
 * @desc メニュー位置を手動で設定します。
 * @default false
 * 
 * @param menuX
 * @type number
 * @desc 画面の右端からどのくらい離すかを指定します。
 * -1を指定するとノーマルのウィンドウ位置になります。
 * @default 56
 * @min -1
 * 
 * @param menuY
 * @type number
 * @desc 画面の下端からどのくらい離すかを指定します。
 * -1を指定するとノーマルのウィンドウ位置になります。
 * @default 56
 * @min -1
 * 
 * @param textSlideX
 * @type number
 * @desc テキストを左右にずらす量を指定します。
 * -200～200を指定できます。
 * @default 22
 * @min -200
 * @max 200
 * 
 * @param space
 * @type number
 * @desc 選択肢の行間を指定します。
 * @default 10
 * @max 100
 * 
 * @param backColor
 * @desc 選択肢の背景色を指定します。
 * ※HTMLの色指定形式です。
 * @default 000000
 * 
 * @param backOpacity
 * @type number
 * @desc 背景の色の濃さを指定します。
 * 0～255で指定できます。
 * @default 60
 * @min 0
 * @max 255
 */

// ESLint向けグローバル変数宣言
/*global */

"use strict";//厳格なエラーチェック

var Imported = Imported || {};
Imported.HS_TSmonIslandTitle = true;
// 他のプラグインとの連携用シンボル

(function (_global) {
   var params = PluginManager.parameters("HS_TSmonIslandTitle");
   var manual = params["manualMode"] == "true" ? true : false;
   var x = Number(params["menuX"]);
   var y = Number(params["menuY"]);
   var tSlide = Number(params["textSlideX"]);
   var space = Number(params["space"]);
   var backColor = params["backColor"];
   var backOpacity = Number(params["backOpacity"]).clamp(0, 255);

   var Window_TitleCommand_initialize = Window_TitleCommand.prototype.initialize;
   Window_TitleCommand.prototype.initialize = function () {
      this._windowWidth = 100;
      Window_TitleCommand_initialize.call(this);
   };

   Window_TitleCommand.prototype.backColor = function () {
      return '#' + backColor;
   };

   Window_TitleCommand.prototype.windowWidth = function () {
      return this._windowWidth;
   };

   Window_TitleCommand.prototype.standardPadding = function () {
      return 4;
   };

   Window_TitleCommand.prototype.textPadding = function () {
      return 6;
   };

   Window_TitleCommand.prototype.itemTextAlign = function () {
      return 'center';
   };

   var Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
   Window_TitleCommand.prototype.makeCommandList = function () {
      Window_TitleCommand_makeCommandList.call(this);

      var itemLength = this.maxPageItems() - 1;
      for (let i = 0; i <= itemLength; ++i) {
         console.log(i);
         let maxWidth = (this.standardFontSize() * this.commandName(i).length + tSlide * (itemLength - i) + this.standardPadding() * 2);
         if (this.width < maxWidth) {
            this.width = maxWidth;
            this._windowWidth = maxWidth;
            this._refreshBack();
         }
      }

      if (itemLength > 0) {
         this.height += space * itemLength;
      }
   };

   Window_TitleCommand.prototype.updatePlacement = function () {
      this._windowFrameSprite.opacity = 0;

      if (manual) {
         this.x = Graphics.boxWidth - this.width - x;
         this.y = Graphics.boxHeight - this.height - y;

      } else {
         this.x = Graphics.boxWidth - this.width - this.standardFontSize() * 2;
         this.y = Graphics.boxHeight - this.height - this.standardFontSize() * 2;

      }

   };

   Window_TitleCommand.prototype.itemRect = function (index) {
      var fontSize = this.standardFontSize();
      var commandName = this.commandName(index);
      var itemLength = this.maxPageItems() - 1;

      var rect = new Rectangle();
      var maxCols = this.maxCols();
      rect.width = Math.floor(commandName.length * fontSize);
      rect.height = this.itemHeight();
      rect.x += Math.floor(tSlide * (itemLength - index));
      rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;

      rect.y += Math.floor((space * index));

      return rect;
   };

   Window_TitleCommand.prototype.itemRectForText = function (index) {
      var rect = this.itemRect(index);
      rect.x += this.textPadding();
      rect.width -= this.textPadding() * 2;
      return rect;
   };

   var Window_TitleCommand_drawAllItems = Window_TitleCommand.prototype.drawAllItems;
   Window_TitleCommand.prototype.drawAllItems = function () {
      this._windowBackSprite.bitmap.clear();
      this.backOpacity = backOpacity;
      Window_TitleCommand_drawAllItems.call(this);

   };

   Window_TitleCommand.prototype.drawItem = function (index) {
      var itemRect = this.itemRect(index);
      var textRect = this.itemRectForText(index);
      var align = this.itemTextAlign();
      var commandName = this.commandName(index);

      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));

      this._windowBackSprite.bitmap.fillRect(itemRect.x, itemRect.y, itemRect.width, itemRect.height, this.backColor());
      this.drawText(commandName, textRect.x, textRect.y, textRect.width, align);
   };

})(this);