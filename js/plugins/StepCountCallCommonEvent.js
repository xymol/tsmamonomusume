//=============================================================================
// StepCountCallCommonEvent.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2017/11/18 説明文と細かい処理を変更
// 1.0.0 2017/11/17 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc 指定歩数後にコモンイベントを実行するプラグイン
 * ※要SaveVariableCore（今プラグインより先に読み込んでください）
 * @author n2naokun(柊菜緒)
 *
 * @help ※前提となるSaveVariableCoreを導入し、このプラグインより先に読み込んでください。
 * ※SetStepEventにて同じ名前のイベントをセットアップすると一度DelStepEventによって
 *  同名のイベントが一度削除されてから再セットアップされます。
 * 
 * プラグインコマンドにて
 * SetStepEvent イベント名 歩数 実行するコモンイベントの番号
 * 歩数イベントをセットアップします。
 * （上手く初期化できなかった場合有効化できません）
 * 
 * DelStepEvent イベント名
 * 歩数イベントを削除します。
 * 
 * EnableStepEvent イベント名
 * 歩数イベントを可能な場合有効化します。
 * （初期化できていた場合はセットアップ後自動的に有効になっています）
 * 
 * DisableStepEvent イベント名
 * 歩数イベントを無効化します。
 * （歩数カウントが停止しますが歩数は保持します）
 * 
 * ResetStepEvent イベント名
 * 歩数イベントの歩数をリセットします。
 * 
 * 
 * スクリプトにて
 * $EVsteps("イベント名")
 * 歩数イベントの現在の歩数を取得します。
 * また、取得に失敗した場合は-1が送られます。
 * ※イベント名はダブルクォーテーション " またはシングルクォーテーション ' で囲むこと。
 * 
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

// ESLint向けグローバル変数宣言
/*global ,Imported ,saveObject ,$EVsteps*/

"use strict";//厳格なエラーチェック

(function (_global) {

   // SaveVariableCoreの読み込みチェック
   if (Imported.SaveVariableCore) {
      var Events = new saveObject("StepCountCallCommonEvent");

      var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
      Game_Interpreter.prototype.pluginCommand = function (command, args) {
         switch (command) {
            case "SetStepEvent":
               Utility.setupEvent(args[0], args[1], args[2]);
               break;

            case "DelStepEvent":
               Utility.deleteEvent(args[0]);
               break;

            case "EnableStepEvent":
               Utility.enableEvent(args[0]);
               break;

            case "DisableStepEvent":
               Utility.disableEvent(args[0]);
               break;

            case "ResetStepEvent":
               Utility.resetEvent(args[0]);
               break;
         }

         Game_Interpreter_pluginCommand.call(this, command, args);
      };

      var Game_Party_increaseSteps = Game_Party.prototype.increaseSteps;
      Game_Party.prototype.increaseSteps = function () {
         Game_Party_increaseSteps.call(this);

         if (Events) {
            for (var EventName in Events.saveParams) {
               Utility.updateEvent(Events.saveParams[EventName]);
            }
         }
      };

   } else {
      // SaveVariableCoreが読み込まれていなかったら警告を出す
      console.error("SaveVariableCoreを読み込んでください");
   }

   function StepEvent() {
      this.initialize.apply(this, arguments);
   }

   StepEvent.prototype.initialize = function (TargetStep, EventId) {
      this._TargetStep = Number(TargetStep);
      this._EventId = Number(EventId);
      this._steps = 0;
      if (this._TargetStep > 0 && !isNaN(this._TargetStep) && !isNaN(this._EventId)) {
         this._enabled = true;
      } else {
         this._enabled = false;
      }
   };



   window.$EVsteps = function (EventName) {
      if (!EventName || !Events) return -1;
      return Events.saveParams[String(EventName)]._steps;
   };



   function Utility() { }

   Utility.setupEvent = function (EventName, TargetStep, EventId) {
      if (!EventName) return;
      Utility.deleteEvent(EventName);
      if (!Events.saveParams[EventName]) {
         Events.saveParams[EventName] = new StepEvent(TargetStep, EventId);
      }
   };

   Utility.deleteEvent = function (EventName) {
      if (!EventName) return;
      if (Events.saveParams[EventName]) {
         delete Events.saveParams[EventName];
      }
   };

   Utility.enableEvent = function (EventName) {
      if (!EventName) return;
      if (Events.saveParams[EventName]) {
         if (Events.saveParams[EventName]._TargetStep > 0
            && !isNaN(Events.saveParams[EventName]._TargetStep)
            && !isNaN(Events.saveParams[EventName]._EventId)) {

            Events.saveParams[EventName]._enabled = true;
         } else {
            Utility.disableEvent(EventName);
         }
      }
   };

   Utility.disableEvent = function (EventName) {
      if (!EventName) return;
      if (Events.saveParams[EventName]) {
         Events.saveParams[EventName]._enabled = false;
      }
   };

   Utility.resetEvent = function (EventName) {
      if (!EventName) return;
      if (Events.saveParams[EventName]) {
         Events.saveParams[EventName]._steps = 0;
      }
   };

   Utility.updateEvent = function (EVobj) {
      if (EVobj._enabled) {
         EVobj._steps++;

         if (EVobj._steps >= EVobj._TargetStep) {
            EVobj._enabled = false;
            $gameTemp.reserveCommonEvent(EVobj._EventId);
         }
      }
   };

})(this);