//=============================================================================
// Yanfly Engine Plugins - Event Chase Player
// YEP_EventChasePlayer.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventChasePlayer = true;

var Yanfly = Yanfly || {};
Yanfly.ECP = Yanfly.ECP || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 When a player is in the proximity of a certain event,
 * the event will start chasing or fleeing from the player.
 * @author Yanfly Engine Plugins
 *
 * @param Sight Lock
 * @desc This is the number of frames for how long an event chases
 * the player if 'this._seePlayer = true' is used.
 * @default 300
 *
 * @param See Player
 * @desc Does the event have to be able to see the player by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Alert Timer
 * @desc This is the number of frames that must occur before the
 * alert balloon will show up on the same event.
 * @default 120
 *
 * @param Alert Balloon
 * @desc This is the default balloon used when the player is seen.
 * Refer to balloon ID's.
 * @default 1
 *
 * @param Alert Sound
 * @desc This is the default sound played when the player is seen.
 * @default Attack1
 *
 * @param Alert Common Event
 * @desc The default common event played when the player is seen.
 * Use 0 if you do not wish to use a Common Event.
 * @default 0
 *
 * @param Return After
 * @desc After chasing/fleeing from a player, the event returns
 * to its original spot. NO - false   YES - true
 * @default true
 *
 * @param Return Wait
 * @desc The frames to wait after finishing a chase/flee.
 * @default 180
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to make events that will chase the player or flee
 * from the player when the player enters within range of the event or when the
 * event sees the player.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Insert these lines into the script call window within the Movement Route
 * event to give an event the chase or flee flag.
 *
 * Note: This doesn't work with players.
 *
 * Script Call lines
 *  this._chaseRange = x       Event will chase player if reaching x range.
 *  this._fleeRange = x        Event will flee from player if reaching x range.
 *  this._chaseSpeed = x       Event's movement speed when chasing.
 *  this._fleeSpeed = x        Event's movement speed when fleeing.
 *  this._sightLock = x        Event will flee/chase player for x frames.
 *  this._seePlayer = true     Requires the event to be able to see player.
 *  this._seePlayer = false    Doesn't require event to be able to see player.
 *  this._alertBalloon = x     This balloon will play when player is seen.
 *  this._alertSound = x       This sound will play when player is seen.
 *  this._alertSoundVol = x    The volume used by the alert sound.
 *  this._alertSoundPitch = x  The pitch used by the alert sound.
 *  this._alertSoundPan = x    The pan used by the alert sound.
 *  this._alertCommonEvent = x This event will play when player is seen.
 *  this._returnAfter = true   Returns the event back to its original spot.
 *  this._returnAfter = false  Event stays where it is when finished chasing.
 *  this._returnWait = x       How long event waits after finishing chase/flee.
 *
 * It is best to play this inside of a custom move route for the event at a
 * high frequency rate. Keep in mind these effects only occur after the setting
 * is made and ran, which means upon loading a map, if the event with a low
 * frequency hasn't loaded up 'this._chaseRange = x' in its movement queue yet,
 * the event will not chase the player just yet.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Added 'Return After' parameter where events will return to their original
 * spot after chasing/fleeing from a player.
 * - Added 'Return Wait' parameter to determine how long an event will wait in
 * place before returning after a finished chase/flee.
 * - Added 'this._returnAfter' and 'this._returnWait' to the list of available
 * movement route script calls.
 *
 * Version 1.01:
 * - Added 'this._alertSoundPitch' 'this._alertSoundVol' 'this._alertSoundPan'
 * to the settings you can alter to adjust the alert sound.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
 /*:ja
 * @plugindesc v1.02 プレイヤーが特定のイベントに近づくと、イベントがプレイヤーを追いかけたりプレイヤーから逃げます
 * @author Yanfly Engine Plugins
 *
 * @param Sight Lock
 * @desc 'SeePlayer'がtrueの時、イベントがプレイヤーを追いかける
 * 時間を設定します(フレーム単位)
 * @default 300
 *
 * @param See Player
 * @desc イベントがプレイヤーを認識する必要があるかを設定します
 * 不要 - false     必要 - true
 * @default true
 *
 * @param Alert Timer
 * @desc 同じイベント上でフキダシが表示されるまでにかかるフレーム数を指定します
 * @default 120
 *
 * @param Alert Balloon
 * @desc プレイヤーが認識された際に表示される、フキダシを指定します
 * (フキダシのIDで指定します)
 * @default 1
 *
 * @param Alert Sound
 * @desc プレイヤーが認識された際に表示される、サウンドを指定します
 * @default Attack1
 *
 * @param Alert Common Event
 * @desc 認識された際に再生されるコモンイベントを指定します
 * 利用しない場合は、0のままにしてください
 * @default 0
 *
 * @param Return After
 * @desc 追跡または逃走した後に、イベントがもとの位置に戻ります
 * いいえ - false   はい - true
 * @default true
 *
 * @param Return Wait
 * @desc 追跡または逃走したあとに、待機するフレーム数を指定します
 * @default 180
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * このプラグインでは、プレイヤーを追いかけるイベント、もしくは
 * プレイヤーから逃げるイベントを作成することができます。
 * プレイヤーがイベントから一定の距離範囲内に入った時や
 * イベントがプレイヤーを認識した際に発動させることができます。
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * 下記のコードをスクリプトコールウィンドウ内の、
 * Movement Routeイベント内に挿入することで、そのイベントに
 * 追跡もしくは逃走のフラグを付与することができます。
 *
 * 注＊プレイヤーに対しては無効です。
 *
 * Script Call lines
 *  this._chaseRange = x
 *              →x の距離内に入った時、イベントがプレイヤーを追いかけます
 *  this._fleeRange = x
 *              →x の距離内に入った時、イベントはプレイヤーから逃げます
 *  this._chaseSpeed = x
 *              →追いかける時のイベントの速度 x を決定します
 *  this._fleeSpeed = x
 *              →逃げる時のイベントの速度 x を決定します
 *  this._sightLock = x
 *              →イベントは、フレーム数 x だけ追跡/逃走を行います
 *  this._seePlayer = true
 *              →イベントはプレイヤーを認識する必要があります
 *  this._seePlayer = false
 *              →イベントはプレイヤーを認識する必要がありません
 *  this._alertBalloon = x
 *              →プレイヤーが認識されると、x というフキダシを表示します
 *  this._alertSound = x
 *              →プレイヤーが認識されると、x というサウンドを再生します
 *  this._alertSoundVol = x
 *              →プレイヤーが認識されたときに再生される音の音量を指定します
 *  this._alertSoundPitch = x
 *              →プレイヤーが認識されたときに再生される音のピッチを指定します
 *  this._alertSoundPan = x
 *              →プレイヤーが認識されたときに再生される音のパンを指定します
 *  this._alertCommonEvent = x
 *              →プレイヤーが認識されると、x というイベントを再生します
 *  this._returnAfter = true
 *              →イベントを元の位置に戻します
 *  this._returnAfter = false
 *              →追跡/逃走が終わってもイベントはそこにとどまります
 *  this._returnWait = x
 *              →追跡/逃走が終わったあと x の間待機します
 *
 * カスタムした移動ルート内でイベントを再生させる際は、
 * 移動頻度はなるべく高く設定するようにしてください。
 * 設定が完了し有効になるまでは、これらのエフェクトは発動しません。
 * 移動頻度の低いイベントですと、マップロード中に'this._chaseRange = x'の
 * 読み込みを完了できず、プレイヤーを追いかけなくなってしまう可能性があります。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Added 'Return After' parameter where events will return to their original
 * spot after chasing/fleeing from a player.
 * - Added 'Return Wait' parameter to determine how long an event will wait in
 * place before returning after a finished chase/flee.
 * - Added 'this._returnAfter' and 'this._returnWait' to the list of available
 * movement route script calls.
 *
 * Version 1.01:
 * - Added 'this._alertSoundPitch' 'this._alertSoundVol' 'this._alertSoundPan'
 * to the settings you can alter to adjust the alert sound.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventChasePlayer');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ECPSightLock = Number(Yanfly.Parameters['Sight Lock']);
Yanfly.Param.ECPSeePlayer = String(Yanfly.Parameters['See Player']);
Yanfly.Param.ECPAlertTimer = Number(Yanfly.Parameters['Alert Timer']);
Yanfly.Param.ECPAlertBalloon = Number(Yanfly.Parameters['Alert Balloon']);
Yanfly.Param.ECPAlertSound = String(Yanfly.Parameters['Alert Sound']);
Yanfly.Param.ECPAlertEvent = Number(Yanfly.Parameters['Alert Common Event']);
Yanfly.Param.ECPReturn = eval(String(Yanfly.Parameters['Return After']));
Yanfly.Param.ECPReturnWait = Number(Yanfly.Parameters['Return Wait']);

//=============================================================================
// Main Code
//=============================================================================

Yanfly.ECP.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    Yanfly.ECP.Game_Event_setupPage.call(this);
    this.clearChaseSettings();
};

Game_Event.prototype.clearChaseSettings = function() {
  this._alertBalloon = Yanfly.Param.ECPAlertBalloon;
  this._alertCommonEvent = Yanfly.Param.ECPAlertEvent;
  this._alertLock = 0;
  this._alertPlayer = false;
  this._alertSound = Yanfly.Param.ECPAlertSound;
  this._alertSoundVol = 100;
  this._alertSoundPitch = 100;
  this._alertSoundPan = 0;
  this._alertTimer = 0;
  this._chasePlayer = false;
  this._chaseRange = 0;
  this._chaseSpeed = this._moveSpeed;
  this._defaultSpeed = this._moveSpeed;
  this._fleePlayer = false;
  this._fleeRange = 0;
  this._fleeSpeed = this._moveSpeed;
  this._seePlayer = eval(Yanfly.Param.ECPSeePlayer);
  this._sightLock = eval(Yanfly.Param.ECPSightLock);
  this._returnAfter = Yanfly.Param.ECPReturn;
  this._returnWait = Yanfly.Param.ECPReturnWait;
  this._returnPhase = false;
  this._returnFrames = 0;
  this._startLocationX = this.x;
  this._startLocationY = this.y;
  this._startLocationDir = this._direction;
};

Yanfly.ECP.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (Imported.YEP_StopAllMove && $gameSystem.isEventMoveStopped()) return;
    this.updateChaseDistance();
    this.updateFleeDistance();
    this.updateChaseMovement();
};

Yanfly.ECP.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    Yanfly.ECP.Game_Event_update.call(this);
    this.updateAlert();
    this.updateReturnPhase();
};

Game_Event.prototype.canSeePlayer = function() {
    if (!this._seePlayer) return false;
    var sx = this.deltaXFrom($gamePlayer.x);
    var sy = this.deltaYFrom($gamePlayer.y);
    if (Math.abs(sx) > Math.abs(sy)) {
      var direction = (sx > 0) ? 4 : 6;
    } else {
      var direction = (sy > 0) ? 8 : 2;
    }
    if (direction === this.direction()) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.updateChaseDistance = function() {
    if (this._erased) return;
    if (this._chaseRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.chaseConditions(dis)) {
      this.startEventChase();
    } else if (this._chasePlayer) {
      this.endEventChase();
    }
};

Game_Event.prototype.chaseConditions = function(dis) {
    if (this._alertLock > 0) return true;
    if (dis <= this._chaseRange && this.canSeePlayer()) return true;
    if (dis <= this._chaseRange && !this._seePlayer) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.startEventChase = function() {
    this._chasePlayer = true;
    this.setMoveSpeed(this._chaseSpeed);
};

Game_Event.prototype.endEventChase = function() {
    this._chasePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateFleeDistance = function() {
    if (this._erased) return;
    if (this._fleeRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.fleeConditions(dis)) {
      this.startEventFlee();
    } else if (this._fleePlayer) {
      this.endEventFlee();
    }
};

Game_Event.prototype.fleeConditions = function(dis) {
    if (this._alertLock > 0) return true;
    if (dis <= this._fleeRange && this.canSeePlayer()) return true;
    if (dis <= this._fleeRange && !this._seePlayer) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.startEventFlee = function() {
    this._fleePlayer = true;
    this.setMoveSpeed(this._fleeSpeed);
};

Game_Event.prototype.endEventFlee = function() {
    this._fleePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateChaseMovement = function() {
    if (this._stopCount > 0 && this._chasePlayer) {
      this.moveTowardPlayer();
    } else if (this._stopCount > 0 && this._fleePlayer) {
      this.moveAwayFromPlayer();
    } else if (this._returnPhase) {
      this.updateMoveReturnAfter();
    } else {
      Yanfly.ECP.Game_Event_updateSelfMovement.call(this);
    }
};

Game_Event.prototype.updateAlert = function() {
    if (this._erased) return;
    this._alertLock--;
    if (this.alertConditions()) this.activateAlert();
    if (this._alertPlayer) this._alertTimer--;
};

Game_Event.prototype.alertConditions = function() {
    return (this._chasePlayer || this._fleePlayer) && !this._alertPlayer;
};

Game_Event.prototype.activateAlert = function() {
    if (this._alertBalloon >= 0) this.requestBalloon(this._alertBalloon);
    this._alertPlayer = true;
    this._alertTimer = Yanfly.Param.ECPAlertTimer;
    this.playAlertSound();
    this.playAlertCommonEvent();
};

Game_Event.prototype.playAlertSound = function() {
    if (this._alertSound === '') return;
    var sound = {
      name:   this._alertSound,
      volume: this._alertSoundVol,
      pitch:  this._alertSoundPitch,
      pan:    this._alertSoundPan
    };
    AudioManager.playSe(sound);
};

Game_Event.prototype.playAlertCommonEvent = function() {
    if (this._alertCommonEvent <= 0) return;
    $gameTemp.reserveCommonEvent(this._alertCommonEvent);
};

Game_Event.prototype.startReturnPhase = function() {
    if (!this._returnAfter) return;
    this._returnPhase = true;
    this._returnFrames = this._returnWait;
};

Game_Event.prototype.updateReturnPhase = function() {
    if (this._returnPhase) this._returnFrames--;
};

Game_Event.prototype.updateMoveReturnAfter = function() {
    if (this._returnFrames > 0) return;
    var sx = this.deltaXFrom(this._startLocationX);
    var sy = this.deltaYFrom(this._startLocationY);
    if (Math.abs(sx) > Math.abs(sy)) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
          this.moveStraight(sy > 0 ? 8 : 2);
        }
      } else {
        this.moveRandom();
      }
    } else if (sy !== 0) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
          this.moveStraight(sx > 0 ? 4 : 6);
        }
      } else {
        this.moveRandom();
      }
    }
    if (sx === 0 && sy === 0) {
      this._returnPhase = false;
      this._returnFrames = 0;
      this._direction = this._startLocationDir;
    }
};

//=============================================================================
// End of File
//=============================================================================