//=============================================================================
// CustomStepPattern.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/03/30 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc ファイル名を使用して歩行アニメーションのパターンを設定できます。
 * @author n2naokun(柊菜緒)
 *
 * @help ファイル名を使用してキャラクターの歩行アニメーションの順番を設定できます。
 * ファイル名 + _パターン
 * の様にファイル名を付けると自動的にそのパターンを適用します。
 * 
 * ※パターンが無い場合は通常の動作をします。
 * 
 * 使用する数字は1～3を使用してください。（それ以上・以下の数字は1と3に変更されます。）
 * ファイル名の例 (通常と同じ動きにする場合)
 * Actor1_2321
 * 123としたい場合
 * Actor1_123
 * 
 * 中央2
 * 右3
 * 左1
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
Imported.CustomStepPattern = true;
// 他のプラグインとの連携用シンボル

(function (_global) {
   var Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
   Game_CharacterBase.prototype.initMembers = function () {
      Game_CharacterBase_initMembers.call(this);
      this._animePattern = [];
      this._currentPattern = 0;
      this._customPattern = false;
   };

   var Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
   Game_CharacterBase.prototype.setImage = function (characterName, characterIndex) {
      Game_CharacterBase_setImage.apply(this, arguments);
      this._animePattern = [];
      this._customPattern = false;
      this._currentPattern = 0;
      let match = characterName.match(/.+_(\d+)/);
      if (match) {
         let pattern = match[1];
         this._customPattern = true;
         for (let i = 0; i < pattern.length; i++) {
            this._animePattern.push((Number(pattern[i]) - 1).clamp(0, 3));
         }
      }
   };

   var Game_CharacterBase_updatePattern = Game_CharacterBase.prototype.updatePattern;
   Game_CharacterBase.prototype.updatePattern = function () {
      if (!this._customPattern) {
         Game_CharacterBase_updatePattern.call(this);
      } else {
         if (!this.hasStepAnime() && this._stopCount > 0) {
            this._pattern = this._animePattern[0];
         } else {
            if (this._currentPattern >= this._animePattern.length) {
               this._currentPattern = 0;
            }
            this._pattern = this._animePattern[this._currentPattern];
            this._currentPattern++;
         }
      }
   };

})(this);