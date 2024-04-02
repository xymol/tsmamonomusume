//=============================================================================
// HS_PictureZoom.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2021/10/15 ズームモード中何もせずにキャンセルするとおかしくなるバグを修正
// 1.0.1 2021/10/14 ピクチャの初期位置が0,0以外でも正常に動作するように変更
// 1.0.0 2021/10/11 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc ピクチャズームプラグイン
 * 指定したピクチャ1枚を半固定値でズームして舐め回すように見ることができます。
 * @author n2naokun(柊菜緒)
 *
 * @help プラグインコマンドでZoomMode ピクチャ番号を実行してください。
 * ZoomModeに関してはプログラム内部で全て半角大文字として処理するので、
 * 半角ならば大文字で書いても小文字で書いても実行結果には影響しません。
 * 
 * 実行例
 * ZoomMode 1
 * ピクチャ1を指定してズームモードに移行します。
 * 
 * キャンセルボタンを押すことでズームモードから抜け出すことができます。
 * ズームモード中は決定キーを押すことによってズームと通常表示を切り替える
 * 事が出来ます。
 * 
 * 
 * @param ImageZoomScale
 * @type number
 * @desc 画像の倍率（既定値：1.3）
 * @decimals 0.1
 * @default 1.3
 *
 * @param ImageMovePixel
 * @type number
 * @desc ズーム時にカーソルキーで移動する量（既定値：10）
 * @default 10
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
Imported.HS_PictureZoom = true;
// 他のプラグインとの連携用シンボル

(function (_global) {
   var params = PluginManager.parameters('HS_PictureZoom');
   var zoomScale = Number(params["ImageZoomScale"]);
   zoomScale = isNaN(zoomScale) ? 1.3 : zoomScale;
   var movePixel = Number(params["ImageMovePixel"]);
   movePixel = isNaN(movePixel) ? 10 : movePixel;

   var zoomMode = false;
   var picNumber = 0;
   var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
   Game_Interpreter.prototype.pluginCommand = function (command, args) {
      Game_Interpreter_pluginCommand.apply(this, arguments);
      if (command.toUpperCase() == 'ZoomMode'.toUpperCase()) {
         picNumber = Number(args);
         if (!isNaN(picNumber) && SceneManager._scene._spriteset) {
            var windLay = SceneManager._scene._windowLayer;
            windLay.visible = false;
            lastActiveWindow.deactivate();
            var dummyWind;
            if (!SceneManager._scene._dummyWindow) {
               SceneManager._scene._dummyWindow = new Window_Selectable(0, 0, Graphics.boxWidth, Graphics.boxHeight);
               dummyWind = SceneManager._scene._dummyWindow;
               dummyWind.opacity = 0;
               dummyWind.hide();
               dummyWind.setHandler('ok', this.changeZoom.bind(this));
               dummyWind.setHandler('cancel', this.cancelZoomMode.bind(this));
               SceneManager._scene.addWindow(dummyWind);
            }
            if (!dummyWind) dummyWind = SceneManager._scene._dummyWindow;
            var picture = $gameScreen.picture(picNumber);
            normal.scaleX = picture._scaleX;
            normal.scaleY = picture._scaleY;
            normal.x = picture.x();
            normal.y = picture.y();
            var tmp = lastActiveWindow;
            dummyWind.activate();
            lastActiveWindow = tmp;
            zoomMode = true;
         }
      }
   };

   var zoom = false;
   var normal = {};
   Game_Interpreter.prototype.changeZoom = function () {
      var dummyWind = SceneManager._scene._dummyWindow;
      dummyWind.active = true;
      var sprites = SceneManager._scene._spriteset._pictureContainer.children;
      var picture = $gameScreen.picture(picNumber);
      var sprite = sprites.filter(function (sprite) {
         return sprite._pictureId === picNumber;
      });
      sprite = sprite[0];
      if (!zoom) {
         picture._scaleX *= zoomScale;
         picture._scaleY *= zoomScale;
         sprite.scale.x *= zoomScale;
         sprite.scale.y *= zoomScale;
         var zoomWidth, zoomHeight;
         zoomWidth = sprite.width * zoomScale;
         zoomHeight = sprite.height * zoomScale;
         picture._x = ((sprite.width - zoomWidth) / 2) + normal.x;
         picture._y = ((sprite.height - zoomHeight) / 2) + normal.y;
         sprite.x = ((sprite.width - zoomWidth) / 2) + normal.x;
         sprite.y = ((sprite.height - zoomHeight) / 2) + normal.y;
         zoom = true;
      } else {
         picture._scaleX = normal.scaleX;
         picture._scaleY = normal.scaleY;
         sprite.scale.x = normal.scaleX / 100;
         sprite.scale.y = normal.scaleY / 100;
         picture._x = normal.x;
         picture._y = normal.y;
         sprite.x = normal.x;
         sprite.y = normal.y;
         zoom = false;
      }
   };

   Game_Interpreter.prototype.cancelZoomMode = function () {
      zoomMode = false;

      var sprites = SceneManager._scene._spriteset._pictureContainer.children;
      var picture = $gameScreen.picture(picNumber);
      var sprite = sprites.filter(function (sprite) {
         return sprite._pictureId === picNumber;
      });
      sprite = sprite[0];
      picture._scaleX = normal.scaleX;
      picture._scaleY = normal.scaleY;
      sprite.scale.x = normal.scaleX / 100;
      sprite.scale.y = normal.scaleY / 100;
      picture._x = normal.x;
      picture._y = normal.y;
      sprite.x = normal.x;
      sprite.y = normal.y;
      zoom = false;

      var windLay = SceneManager._scene._windowLayer;
      windLay.visible = true;
      lastActiveWindow.activate();
   };

   var lastActiveWindow = null;
   var Window_Base_activate = Window_Base.prototype.activate;
   Window_Base.prototype.activate = function () {
      if (zoomMode) return;
      Window_Base_activate.call(this);
      lastActiveWindow = this;
   };

   var repeatCount = 0;
   var Scene_Base_update = Scene_Base.prototype.update;
   Scene_Base.prototype.update = function () {
      Scene_Base_update.call(this);
      if (zoom) {
         var picture = $gameScreen.picture(picNumber);
         if (Input.isRepeated('up') || Input.isRepeated('down') ||
            Input.isRepeated('left') || Input.isRepeated('right')) {
            var tmp = movePixel;
            if (repeatCount < 60) {
               repeatCount += Input.keyRepeatInterval;
            } else {
               tmp = movePixel * 3;
            }
            switch (Input.dir8) {
               case 8:
                  picture._y -= tmp;
                  break;
               case 2:
                  picture._y += tmp;
                  break;
               case 4:
                  picture._x -= tmp;
                  break;
               case 6:
                  picture._x += tmp;
                  break;
               case 7:
                  picture._y -= tmp;
                  picture._x -= tmp;
                  break;
               case 9:
                  picture._y -= tmp;
                  picture._x += tmp;
                  break;
               case 1:
                  picture._y += tmp;
                  picture._x -= tmp;
                  break;
               case 3:
                  picture._y += tmp;
                  picture._x += tmp;
                  break;
            }
         }
         if (Input.dir8 === 0) {
            repeatCount = 0;
         }
      }
   };

})(this);