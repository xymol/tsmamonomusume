//=============================================================================
// ItemUseRestriction.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.1 2018/05/13 特定環境下で動作しない問題を修正
// 1.1.0 2018/05/08 アイテムIDを指定して個別に制限を解除できるように改良
// 1.0.0 2018/04/29 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc スイッチ操作でパーティー全体のアイテム使用を制限するプラグイン
 * @author n2naokun(柊菜緒)
 *
 * @help プラグインパラメーターで指定した番号のスイッチが
 * ONの時はアイテムが使用できません。
 * 
 * ただしExceptionItemに指定したIDのアイテムは使用可能です。
 * 
 * 
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 * 
 * @param RestrictionSwitch
 * @desc 使用制限に使うスイッチの番号です。
 * @type number
 * @default 0
 * 
 * @param ExceptionItems
 * @desc 使用制限を掛けないアイテムのIDを指定します。
 * @type number[]
 * @default []
 * 
 */

// ESLint向けグローバル変数宣言
/*global */

"use strict";//厳格なエラーチェック

var Imported = Imported || {};
Imported.ItemUseRestriction = true;
// 他のプラグインとの連携用シンボル

(function (_global) {
   // ここにプラグイン処理を記載
   var params = PluginManager.parameters("ItemUseRestriction") || {};
   var SwNum = Number(params.RestrictionSwitch) || 0;
   var ExcItems = [];
   try {
      ExcItems = JSON.parse(params.ExceptionItems);
      ExcItems.forEach(function (current, index, array) {
         array[index] = Number(current);
      });
   } catch (error) {
      ExcItems = [];
   }


   Game_Party.prototype.canUse = function (item) {
      return this.members().some(function (actor) {
         if ($gameSwitches.value(SwNum) && !ExcItems.includes(item.id)) {
            return false;
         } else {
            return actor.canUse(item);
         }
      });
   };

   // 互換コード
   if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, 'includes', {
         value: function (searchElement, fromIndex) {

            if (this == null) {
               throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
               return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
               return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
               // a. Let elementK be the result of ? Get(O, ! ToString(k)).
               // b. If SameValueZero(searchElement, elementK) is true, return true.
               if (sameValueZero(o[k], searchElement)) {
                  return true;
               }
               // c. Increase k by 1. 
               k++;
            }

            // 8. Return false
            return false;
         }
      });
   }
})(this);