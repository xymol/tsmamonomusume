//=============================================================================
// KMS_WaterMapEffect.js
//  last update: 2017/01/01
//=============================================================================

/*
 * This plugin can be used in the environment which supports WebGL.
 */

/*:
 * @plugindesc
 * [v1.1.0] Applies water effect.
 * 
 * @author TOMY (Kamesoft)
 * 
 * @param Flicker image
 * @default KMS_cloud
 * @require 1
 * @dir img/system/
 * @type file
 * @desc The image which is used for flicker effect.
 *
 * @param Wave image
 * @default KMS_wave
 * @require 1
 * @dir img/system/
 * @type file
 * @desc The image which is used for wave.
 *
 * @param Wave opacity
 * @default 64
 * @desc Opacity for wave. Range is from 0 to 255.
 *
 * @param Speed X
 * @default -1.0
 * @desc The offset value for the X coordinate.
 * 
 * @param Speed Y
 * @default 0.5
 * @desc The offset value for the Y coordinate.
 * 
 * @param Auto tone change
 * @default 1
 * @desc
 * Color filter is applied automatically.
 * 0: Disable, 1: Enable
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc
 * [v1.1.0] マップに水中エフェクトを適用します。
 *  
 * @author TOMY (Kamesoft)
 * 
 * @param Flicker image
 * @default KMS_cloud
 * @require 1
 * @dir img/system/
 * @type file
 * @desc 水の揺らぎを表現するための画像です。
 *
 * @param Wave image
 * @default KMS_wave
 * @require 1
 * @dir img/system/
 * @type file
 * @desc 水面の波を表現するための画像です。
 *
 * @param Wave opacity
 * @default 64
 * @desc 波の不透明度です。0 ～ 255 で指定します。
 *
 * @param Speed X
 * @default -1.0
 * @desc 水の横方向への移動速度です。
 *
 * @param Speed Y
 * @default 0.5
 * @desc 水の縦方向への移動速度です。
 * 
 * @param Auto tone change
 * @default 1
 * @desc
 * 水中エフェクト時、画面の色調を自動的に変更します。
 * 0: オフ, 1: オン
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

var KMS = KMS || {};

(function()
{

if (!Graphics.hasWebGL())
{
    console.error("WebGL をサポートしていないため、フィルターを使用できません。");
    return;
}

KMS.imported = KMS.imported || {};
KMS.imported['WaterMapEffect'] = true;

var PixiVersion = PIXI.DisplacementFilter ? 2 : 4;

var pluginParams = PluginManager.parameters('KMS_WaterMapEffect');
var Param = {};
Param.imageDir  = 'img/system/';
Param.dispImage = pluginParams['Flicker image'] || 'KMS_cloud';
Param.waveImage = pluginParams['Wave image'] || 'KMS_wave';
Param.waveOpacity = Number(pluginParams['Wave opacity'] || 176);
Param.speed = {
    x: Number(pluginParams['Speed X'] || -1.0),
    y: Number(pluginParams['Speed Y'] ||  0.5)
};
Param.autoTone = Boolean(Number(pluginParams['Auto tone change'] || 1));
Param.filterMode = 0;

//-----------------------------------------------------------------------------
// KMS_WaterEffect

KMS_WaterEffect = function()
{
    this._speed = { x: Param.speed.x, y: Param.speed.y };
    this._colorFilter = (PixiVersion == 2) ?
        new PIXI.ColorMatrixFilter() :
        new PIXI.filters.ColorMatrixFilter();
    if (Param.autoTone)
    {
        if (PixiVersion == 2)
        {
            this._colorFilter.matrix = [
                0.9, 0, 0, 0,
                0, 0.9, 0, 0,
                0.2, 0.2, 1, 0,
                0, 0, 0, 1
            ];
        }
        else
        {
            // For Pixi v4
            this._colorFilter.matrix = [
                0.9, 0, 0, 0, 0,
                0, 0.9, 0, 0, 0,
                0.2, 0.2, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
        }
    }

    if (PixiVersion == 4)
    {
        this._dispSprite = new Sprite();
    }

    this._waveSprite = new TilingSprite();
    this._waveSprite.blendMode = Graphics.BLEND_ADD;
    this._waveSprite.opacity = Param.waveOpacity;
    this._waveSprite.scale.x = 1.0;
    this._waveSprite.scale.y = 1.0;

    var margin = 24;
    this._waveSprite.move(-margin, -margin, Graphics.width + margin, Graphics.height + margin);
};

/*
 * 画像のロード
 */
KMS_WaterEffect.prototype.loadImage = function()
{
    this._dispBitmap = ImageManager.loadBitmap(Param.imageDir, Param.dispImage, 0);
    this._waveBitmap = ImageManager.loadBitmap(Param.imageDir, Param.waveImage, 0);
};

/*
 * ロード完了判定
 */
KMS_WaterEffect.prototype.isReady = function()
{
    return this._dispBitmap.isReady() && this._waveBitmap.isReady();
};

/*
 * エフェクトの生成
 * 
 * ※ 必ず画像のロードが完了した後に呼ぶこと
 */
KMS_WaterEffect.prototype.createEffect = function()
{
    if (this._dispFilter)
    {
        return;
    }

    console.assert(this.isReady());

    if (PixiVersion == 2)
    {
        this._dispFilter = new PIXI.DisplacementFilter(this._dispBitmap);
    }
    else
    {
        // For Pixi v4
        // Pixi v4 の DisplacementFilter では自動でリピートされないので、WRAP_MODE 指定が必要。
        this._dispBitmap.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this._dispSprite.bitmap = this._dispBitmap;
        this._dispSprite.scale.x = Graphics.width / this._dispBitmap.width;
        this._dispSprite.scale.y = Graphics.height / this._dispBitmap.height;
        this._dispFilter = new PIXI.filters.DisplacementFilter(this._dispSprite);
    }

    this._waveSprite.bitmap = this._waveBitmap;
    this._waveSprite.filters = [this._dispFilter];
};

KMS_WaterEffect.prototype.update = function()
{
    if (PixiVersion == 2)
    {
        this._dispFilter.offset.x += this._speed.x;
        this._dispFilter.offset.y += this._speed.y;
    }
    else
    {
        // For Pixi v4
        this._dispSprite.x += this._speed.x;
        this._dispSprite.y += this._speed.y;
    }
    this._waveSprite.origin.x += this._speed.x / 2.0;
    this._waveSprite.origin.y += this._speed.y / 2.0;
};

Object.defineProperty(KMS_WaterEffect.prototype, 'filters', {
    get: function()
    {
        return Param.autoTone ?
            [this._dispFilter, this._colorFilter] :
            [this._dispFilter];
    }
});

Object.defineProperty(KMS_WaterEffect.prototype, 'dispSprite', {
    get: function()
    {
        return this._dispSprite;
    }
});

Object.defineProperty(KMS_WaterEffect.prototype, 'waveSprite', {
    get: function()
    {
        return this._waveSprite;
    }
});

//-----------------------------------------------------------------------------
// Spriteset_Base

/*
 * 水中エフェクトの作成。
 * 水中マップでなければ何もしない。
 */
Spriteset_Base.prototype.createWaterMapEffect = function()
{
    if (!Graphics.isWebGL())
    {
        //console.warn("WebGL で動作していないため、エフェクトをスキップします。");
        return;
    }

    if ($dataMap && $dataMap.meta.WaterEffect)
    {
        this._waterEffect = new KMS_WaterEffect();
        this._waterEffect.loadImage();
    }
};

/*
 * ロード完了後のエフェクト適用処理本体
 */
Spriteset_Base.prototype.applyWaterMapEffectBody = function(target, waveContainer)
{
    if (!this._waterEffect)
    {
        return;
    }

    this._waterEffect.createEffect();

    if (target instanceof Array)
    {
        for (var i = 0; i < target.length; ++i) {
            target[i].filters = this._waterEffect.filters;

            // フィルタの適用範囲 (指定しないとキャプチャできなくなる)
            var margin = 48;
            var width  = Graphics.width + margin;
            var height = Graphics.height + margin;
            target[i].filterArea = new Rectangle(-margin, -margin, width, height);
        }
    }

    if (waveContainer)
    {
        if (PixiVersion == 4)
        {
            waveContainer.addChild(this._waterEffect.dispSprite);
        }
        waveContainer.addChild(this._waterEffect.waveSprite);
    }
};

Spriteset_Base.prototype.updateWaterMapEffect = function()
{
    if (this._waterEffect)
    {
        this._waterEffect.update();
    }
};

var _KMS_WaterMapEffect_Spriteset_Base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function()
{
    _KMS_WaterMapEffect_Spriteset_Base_update.call(this);
    this.updateWaterMapEffect();
};

//-----------------------------------------------------------------------------
// Spriteset_Map

var _KMS_WaterMapEffect_Spriteset_Map_initialize =
        Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function()
{
    _KMS_WaterMapEffect_Spriteset_Map_initialize.call(this);
    this.createWaterMapEffect();
};

/*
 * ロード完了後に呼ばれるエフェクト適用処理
 */
Spriteset_Map.prototype.applyWaterMapEffect = function()
{
    this.applyWaterMapEffectBody([this], this._baseSprite);
};

//-----------------------------------------------------------------------------
// Spriteset_Battle

var _KMS_WaterMapEffect_Spriteset_Battle_initialize =
        Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function()
{
    _KMS_WaterMapEffect_Spriteset_Battle_initialize.call(this);
    this.createWaterMapEffect();
};

/*
 * ロード完了後に呼ばれるエフェクト適用処理
 */
Spriteset_Battle.prototype.applyWaterMapEffect = function()
{
    this.applyWaterMapEffectBody(
        [this._backgroundSprite, this._back1Sprite, this._back2Sprite],
        this._battleField);
};

//-----------------------------------------------------------------------------
// Scene_Map

var _KMS_WaterMapEffect_Scene_Map_start =
        Scene_Map.prototype.start;
Scene_Map.prototype.start = function()
{
    _KMS_WaterMapEffect_Scene_Map_start.call(this);
    this._spriteset.applyWaterMapEffect();
};

//-----------------------------------------------------------------------------
// Scene_Battle

var _KMS_WaterMapEffect_Scene_Battle_start =
        Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function()
{
    _KMS_WaterMapEffect_Scene_Battle_start.call(this);
    this._spriteset.applyWaterMapEffect();
};

})();
