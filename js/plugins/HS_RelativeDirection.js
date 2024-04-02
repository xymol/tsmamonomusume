//=============================================================================
// HS_RelativeDirection.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/06/24 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc NPC(イベント)やプレイヤーから見たそれぞれの
 * 相対方向を使ってイベント分岐ができます。
 * @author n2naokun(柊菜緒)
 *
 * @help 条件分岐のスクリプトにそれぞれ
 * イベントからみたプレイヤーのいる方向を使って分岐する。
 * this.directionFromEvent()
 * プレイヤーからみたイベントのいる方向を使って分岐する。
 * this.directionFromPlayer()
 * を指定してください。
 * 
 * 向きに関してはオブジェクトが向いている方向を基準にして、
 * 正面が8 背面が2
 * 左側面が4 右側面が6
 * として出力されます。
 * 
 * 例:
 * イベントの正面にプレイヤーがいるかを確認したい場合。
 * this.directionFromEvent() == 8
 * イベントの背面にプレイヤーがいるかを確認したい場合。
 * this.directionFromEvent() == 2
 * イベントの側面(左右問わず)にプレイヤーがいるかを確認したい場合。
 * (this.directionFromEvent() == 4 || this.directionFromEvent() == 6)
 * イベントの正面以外にプレイヤーがいるかを確認したい場合。
 * !(this.directionFromEvent() == 8)
 * 
 * プレイヤーから見た場合にしたい場合はdirectionFromPlayerで置き換えてください。
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
Imported.HS_RelativeDirection = true;
// 他のプラグインとの連携用シンボル

(function (_global) {
   // ここにプラグイン処理を記載
   var util = {};
   // 方向変換テーブル
   util.table = [8, 6, 2, 4];
   // 主観オブジェクトから見たターゲットの居る絶対方向を計算して返します。
   util.absDirection = function (subject, target) {
      var absDirection;
      var sx = subject.deltaXFrom(target.x);
      var sy = subject.deltaYFrom(target.y);
      if (Math.abs(sx) > Math.abs(sy)) {
         absDirection = sx > 0 ? 4 : 6;
      } else if (sy !== 0) {
         absDirection = sy > 0 ? 8 : 2;
      }
      return absDirection;
   };
   // 主観オブジェクトが向いている絶対方向とターゲットの居る絶対方向から
   // 相対方向を計算して返します。
   util.relDirection = function (subjectDirection, absDirection) {
      var relDirection, internalDirection;
      internalDirection = util.table.indexOf(absDirection) - util.table.indexOf(subjectDirection);
      if (internalDirection < 0) internalDirection += 4;
      relDirection = util.table[internalDirection];
      return relDirection;
   };
   // イベントから見たプレイヤーの居る方向を取得します。
   Game_Interpreter.prototype.directionFromEvent = function () {
      var event = $gameMap.event(this.eventId());
      var player = $gamePlayer;
      var absDirection = util.absDirection(event, player);
      return util.relDirection(event._prelockDirection, absDirection);
   };
   // プレイヤーから見たイベントの居る方向を取得します。
   Game_Interpreter.prototype.directionFromPlayer = function () {
      var event = $gameMap.event(this.eventId());
      var player = $gamePlayer;
      var absDirection = util.absDirection(player, event);
      return util.relDirection(player.direction(), absDirection);
   };
})(this);