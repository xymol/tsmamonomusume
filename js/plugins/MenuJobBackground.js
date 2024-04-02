//=============================================================================
// MenuJobBackground.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.3.0 2021/09/27 長押しによる斜め移動に対応
//                  1秒以上長押しすると3倍速で移動するように変更
// 1.2.2 2021/09/22 中央を起点にズームするように変更
// 1.2.1 2017/10/25 バグ修正
// 1.2.0 2017/10/25 ステータス画面での画像のズームと移動を実装しました
// 1.1.1 2017/10/25 競合が発生する可能性のあるバグを修正
// 1.1.0 2017/10/25 ステータス画面への表示に対応＋各画面の画像のON-OFFを可能にしました
// 1.0.1 2017/10/25 YEP_ClassChangeCoreを読み込んでいない時のバグを修正
// 1.0.0 2017/10/20 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc ジョブごとにメニュー背景の画像を変更します。
 * ※シングルアクター環境専用プラグイン
 * @author n2naokun(柊菜緒)
 *
 * @help ジョブのメモ欄で指定した背景画像をメニューの背景に表示します。
 * 指定の方法
 * <JobPic:画像ファイル名>
 * 
 * 画像格納フォルダ
 * /img/jobpicture/
 * 
 * ステータス画面の背景としても表示することが可能になりました。
 * また、設定すればステータス画面で画像を手前に表示することも可能です。
 * その際オプションで画像をズームさせることもできます。
 * 
 * ※シングルアクター環境を想定して作っているためその他の環境では想定通りの
 * 動作をしない可能性が極めて高いのでご注意ください。
 * 
 * YEP_ClassChangeCoreを併用する場合は本プラグインよりも先に読み込んでください。
 * ※クラスチェンジ画面の背景にも現在のクラスの画像が表示されます。
 * 
 * @param MenuBackground
 * @type boolean
 * @desc メニュー画面の背景に画像を表示するかの設定（既定値：有効）
 * @default true
 * 
 * @param StatesBackground
 * @type boolean
 * @desc ステータス画面の背景に画像を表示するかの設定（既定値：無効）
 * @default false
 * 
 * @param StatesJobImageForeground
 * @type boolean
 * @desc ステータス画面で決定キーを押した場合に画像を手前に表示するか（既定値：無効）
 * @default false
 * 
 * @param UseImageZoom
 * @type boolean
 * @desc 画像のズーム機能を使うか（既定値：無効）
 * @default false
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
 * @param ClassCangeBackground
 * @type boolean
 * @desc クラスチェンジ画面の背景に画像を表示するかの設定（既定値：無効）
 * @default false
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

// ESLint向けグローバル変数宣言
/*global Scene_Class*/

"use strict";

var Imported = Imported || {};
Imported.MenuJobBackground = true;

(function (_global) {
    function toBoolean(str) {
        if (str == "true") return true;
        return false;
    }

    var params = PluginManager.parameters('MenuJobBackground');
    var flag = {};
    flag.Menu = toBoolean(params["MenuBackground"]);
    flag.Status = toBoolean(params["StatesBackground"]);
    flag.ClassCange = toBoolean(params["ClassCangeBackground"]);
    flag.ImageForeground = toBoolean(params["StatesJobImageForeground"]);
    flag.ImageZoom = toBoolean(params["UseImageZoom"]);

    var zoomScale = Number(params["ImageZoomScale"]);
    var movePixel = Number(params["ImageMovePixel"]);

    // バックグラウンド画像用の処理を追加
    var Scene_MenuBase_creageBackground = Scene_MenuBase.prototype.createBackground;
    Scene_MenuBase.prototype.createBackground = function () {
        Scene_MenuBase_creageBackground.call(this);

        // バックグラウンド用レイヤーを準備
        this._jobBackgroundSprite = new Sprite();
        this.addChild(this._jobBackgroundSprite);
    };

    // ジョブが変わった時の呼ばれる関数
    Scene_MenuBase.prototype.updateJobpic = function () {
        var actor = this.actor();
        var dataClass = $dataClasses[actor._classId];
        if (dataClass.meta.JobPic) {
            this._jobBackgroundSprite.bitmap = ImageManager.loadJobPic(String(dataClass.meta.JobPic));
        } else {
            this._jobBackgroundSprite.bitmap = null;
        }
    };

    // メニューが開かれるときに背景を変更する処理を追加
    var Scene_MenuBase_updateActor = Scene_MenuBase.prototype.updateActor;
    Scene_MenuBase.prototype.updateActor = function () {
        Scene_MenuBase_updateActor.call(this);
        if (this._classPicture) {
            this.updateJobpic();
            this._classPicture = false;
        }
    };

    // メニュー画面に入った時に背景を描画するための処理を追加
    var Scene_Menu_initialize = Scene_Menu.prototype.initialize;
    Scene_Menu.prototype.initialize = function () {
        Scene_Menu_initialize.call(this);
        if (flag.Menu) {
            this._classPicture = true;
        }
    };

    // ステータス画面に入った時に背景を描画するための処理を追加
    var Scene_Status_Initialize = Scene_Status.prototype.initialize;
    Scene_Status.prototype.initialize = function () {
        Scene_Status_Initialize.call(this);
        if (flag.Status) {
            this._classPicture = true;
        }
    };

    // ステータス画面で手前に画像を描画するための処理を追加
    Scene_Status.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this._statusWindow = new Window_Status();
        this._statusWindow.setHandler('cancel', this.popScene.bind(this));
        if (flag.Status && flag.ImageForeground) {
            this._statusWindow.setHandler("ok", this.showForegroundImage.bind(this));
            this._ImageWindow = new Window_Selectable(0, 0, Graphics.boxWidth, Graphics.boxHeight);
            this._ImageWindow.setHandler('cancel', this.hideForegroundImage.bind(this));
            if (flag.ImageZoom) this._ImageWindow.setHandler("ok", this.ImageZoom.bind(this));
            this._ImageWindow.opacity = 0;
            this._ImageWindow.hide();
            this._jobImage = new Sprite();
            this._zoom = false;
        }
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
        if (flag.Status && flag.ImageForeground) {
            this.addWindow(this._ImageWindow);
            this.addChild(this._jobImage);
        }

    };

    // 描画するときに実行される処理
    Scene_Status.prototype.showForegroundImage = function () {
        if (flag.Status && flag.ImageForeground) {
            this._jobImage.bitmap = this._jobBackgroundSprite.bitmap;
            this._jobBackgroundSprite.visible = false;
            this._statusWindow.hide();
            this._ImageWindow.activate();
        }
    };
    // 非表示にするときに実行される処理
    Scene_Status.prototype.hideForegroundImage = function () {
        if (flag.Status && flag.ImageForeground) {
            this._jobImage.bitmap = null;
            this._jobBackgroundSprite.visible = true;
            this._statusWindow.show();
            this._statusWindow.activate();
            var image = this._jobImage;
            image.scale.x = 1;
            image.scale.y = 1;
            image.x = 0;
            image.y = 0;
            this._zoom = false;
        }
    };
    // ズームされるときに実行される処理
    Scene_Status.prototype.ImageZoom = function () {
        if (flag.Status && flag.ImageForeground) {
            this._ImageWindow.activate();
            var image = this._jobImage;
            if (!this._zoom && !isNaN(zoomScale)) {
                image.scale.x = zoomScale;
                image.scale.y = zoomScale;
                // 2021/09/22 中央を起点にズームするように変更
                var zoomWidth, zoomHeight;
                zoomWidth = image.width * zoomScale;
                zoomHeight = image.height * zoomScale;
                image.x = (image.width - zoomWidth) / 2;
                image.y = (image.height - zoomHeight) / 2;
                // ここまで
                this._zoom = true;
            } else {
                image.scale.x = 1;
                image.scale.y = 1;
                image.x = 0;
                image.y = 0;
                this._zoom = false;
            }
        }
    };

    // ズーム時カーソルキーで画像を移動させる処理
    var Scene_Status_update = Scene_Status.prototype.update;
    var repeatCount = 0;
    Scene_Status.prototype.update = function () {
        Scene_Status_update.call(this);
        if (flag.Status && flag.ImageForeground && this._ImageWindow.active &&
            flag.ImageZoom && this._zoom && !isNaN(movePixel)) {
            var image = this._jobImage;
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
                        image.y -= tmp;
                        break;
                    case 2:
                        image.y += tmp;
                        break;
                    case 4:
                        image.x -= tmp;
                        break;
                    case 6:
                        image.x += tmp;
                        break;
                    case 7:
                        image.y -= tmp;
                        image.x -= tmp;
                        break;
                    case 9:
                        image.y -= tmp;
                        image.x += tmp;
                        break;
                    case 1:
                        image.y += tmp;
                        image.x -= tmp;
                        break;
                    case 3:
                        image.y += tmp;
                        image.x += tmp;
                        break;
                }
            }
            if (Input.dir8 === 0) {
                repeatCount = 0;
            }
        }
    };

    // YEP_ClassChangeCoreが読み込まれている場合の処理
    if (Imported.YEP_ClassChangeCore) {
        // ジョブチェンジ画面に入った時に背景を描画するための処理を追加
        var Scene_Class_initialize = Scene_Class.prototype.initialize;
        Scene_Class.prototype.initialize = function () {
            Scene_Class_initialize.call(this);
            if (flag.ClassCange) {
                this._classPicture = true;
            }
        };

        // ジョブが変更された場合背景を変更する処理を追加
        var Scene_Class_onItemOk = Scene_Class.prototype.onItemOk;
        Scene_Class.prototype.onItemOk = function () {
            Scene_Class_onItemOk.call(this);
            this.updateJobpic();
            this._classPicture = false;
        };
    }

})(this);

// ジョブ背景を読み込むための関数を用意
ImageManager.loadJobPic = function (filename, hue) {
    return this.loadBitmap('img/jobpicture/', filename, hue, true);
};
