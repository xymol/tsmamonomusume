// Generated by Translator++.
// Do not edit this file directly.
var $plugins =
[
  {
    "name": "HS_PluginEnableCheckAPI",
    "status": true,
    "description": "PluginManagerを拡張してプラグインが有効になっているか\r\n確認するためのAPIを提供します。",
    "parameters": {}
  },
  {
    "name": "Community_Basic",
    "status": true,
    "description": "基本的なパラメーターを設定するプラグインです。",
    "parameters": {
      "cacheLimit": "20",
      "screenWidth": "816",
      "screenHeight": "624",
      "changeWindowWidthTo": "",
      "changeWindowHeightTo": "",
      "renderingMode": "auto",
      "alwaysDash": "off"
    }
  },
  {
    "name": "MadeWithMvPlus",
    "status": true,
    "description": "メイン画面へ進む前に、\"Made with MV\"のスプラッシュ画面もしくはカスタマイズされたスプラッシュ画面を表示します。",
    "parameters": {
      "Show Made With MV": "true",
      "Made with MV Image": "logo2",
      "Fade Out Time MV": "120",
      "Fade In Time MV": "90",
      "Wait Time MV": "140",
      "Skip MV": "true",
      "Show Custom Splash": "false",
      "Custom Image": "",
      "Fade Out Time": "120",
      "Fade In Time": "120",
      "Wait Time": "160",
      "Skip": "true"
    }
  },
  {
    "name": "AltMenuScreen2",
    "status": false,
    "description": "レイアウトの異なるメニュー画面",
    "parameters": {
      "backGroundBitmap": "menu",
      "maxColsMenu": "1",
      "commandRows": "2",
      "isDisplayStatus": "1"
    }
  },
  {
    "name": "AltMenuScreen",
    "status": false,
    "description": "メニュー画面のレイアウトを変更します。",
    "parameters": {}
  },
  {
    "name": "DevToolsManage",
    "status": true,
    "description": "総合開発支援プラグイン",
    "parameters": {
      "開始時に起動": "OFF",
      "リロードキー": "F5",
      "最前面に表示キー": "none",
      "高速化切替キー": "F11",
      "強制戦闘勝利キー": "",
      "スクリプト実行キー": "",
      "フリーズキー": "",
      "Ctrl同時押し": "false",
      "Alt同時押し": "false",
      "FPS表示": "OFF",
      "タイトルカット": "OFF",
      "高速開始": "OFF",
      "高速スピード": "2",
      "モバイル偽装": "OFF",
      "メニューバー表示": "ON",
      "クリックメニュー": "2",
      "JSON形式セーブ": "false",
      "起動時情報出力": "true",
      "最前面で起動": "false",
      "リロード機能を使う": "true",
      "右寄せ座標": "640"
    }
  },
  {
    "name": "SaveVariableCore",
    "status": true,
    "description": "プラグイン内の変数を簡単にセーブに対応させる前提プラグイン",
    "parameters": {}
  },
  {
    "name": "K_OriginalGauge",
    "status": true,
    "description": "HP、MP、TPゲージをオリジナル画像で描画します。",
    "parameters": {
      "FileName": "Gauge"
    }
  },
  {
    "name": "MenuJobBackground",
    "status": true,
    "description": "ジョブごとにメニュー背景の画像を変更します。\r\n※シングルアクター環境専用プラグイン",
    "parameters": {
      "MenuBackground": "true",
      "StatesBackground": "true",
      "StatesJobImageForeground": "true",
      "UseImageZoom": "true",
      "ImageZoomScale": "1.3",
      "ImageMovePixel": "10",
      "ClassCangeBackground": "false\r"
    }
  },
  {
    "name": "InfoWindow",
    "status": true,
    "description": "情報表示ウィンドウをメニュー画面に追加するプラグイン",
    "parameters": {}
  },
  {
    "name": "StepCountCallCommonEvent",
    "status": true,
    "description": "指定歩数後にコモンイベントを実行するプラグイン\n※要SaveVariableCore（今プラグインより先に読み込んでください）",
    "parameters": {}
  },
  {
    "name": "GlobalVariable",
    "status": true,
    "description": "セーブに関係なく利用できる変数を使えるようにするプラグインです。",
    "parameters": {}
  },
  {
    "name": "TitleMenuExpantion",
    "status": true,
    "description": "タイトルメニューにシーン・CG観賞を追加するカスタムプラグイン",
    "parameters": {
      "MenuText": "CG室"
    }
  },
  {
    "name": "BattleActorFaceVisibility",
    "status": true,
    "description": "戦闘中顔グラフィック表示プラグイン\r\n顔グラフィック未設定時ウィンドウ非表示改造済み",
    "parameters": {}
  },
  {
    "name": "TYA_BattleCommandCustom",
    "status": true,
    "description": "パーティ・アクターコマンドを横長にします。\r\nそれに合わせてバトルステータスの表示も変更します。",
    "parameters": {
      "partyCommandWindowSet": "2, 1",
      "actorCommandWindowSet": "4, 1",
      "statusWindowRows": "1",
      "stateIconWidth": "1",
      "statusWindowCustom": "1",
      "coverColor1": "0, 0, 0, 0.5",
      "coverColor2": "255, 255, 255, 0.5"
    }
  },
  {
    "name": "BigEnemy",
    "status": true,
    "description": "巨大モンスタープラグイン",
    "parameters": {}
  },
  {
    "name": "CustomStepPattern",
    "status": true,
    "description": "ファイル名を使用して歩行アニメーションのパターンを設定できます。",
    "parameters": {}
  },
  {
    "name": "RandomBranch",
    "status": true,
    "description": "指定した確率で条件分岐を分岐させるプラグイン",
    "parameters": {}
  },
  {
    "name": "MKR_PlayerSensor",
    "status": true,
    "description": "(v2.5.1) プレイヤー探索プラグイン",
    "parameters": {
      "探索設定": "====================================",
      "Sensor_Switch": "D",
      "Lost_Sensor_Switch": "",
      "Both_Sensor": "OFF",
      "Terrain_Decision": "ON",
      "Auto_Sensor": "false",
      "Event_Decision": "ON",
      "Region_Decision": "[]",
      "Real_Range_X": "0.000",
      "Real_Range_Y": "0.000",
      "視界設定": "====================================",
      "Range_Visible": "ON",
      "Range_Color": "white",
      "Range_Opacity": "80",
      "Range_Position": "1",
      "Player_Found": "{\"Ballon\":\"1\",\"Se\":\"{\\\"Name\\\":\\\"Attack1\\\",\\\"Volume\\\":\\\"90\\\",\\\"Pitch\\\":\\\"100\\\",\\\"Pan\\\":\\\"0\\\"}\",\"Common_Event\":\"0\",\"Delay\":\"0\"}",
      "Player_Lost": "{\"Ballon\":\"2\",\"Se\":\"{\\\"Name\\\":\\\"Miss\\\",\\\"Volume\\\":\\\"90\\\",\\\"Pitch\\\":\\\"100\\\",\\\"Pan\\\":\\\"0\\\"}\",\"Common_Event\":\"0\",\"Delay\":\"0\"}",
      "マップ設定": "====================================",
      "Tracking_Priority": "false",
      "Follower_Through": "false",
      "Location_Reset": "true"
    }
  },
  {
    "name": "SealActorCommand",
    "status": true,
    "description": "アクターコマンド封印プラグイン",
    "parameters": {}
  },
  {
    "name": "BackUpDatabase",
    "status": true,
    "description": "データバックアッププラグイン",
    "parameters": {
      "backUpPath": "/backup",
      "includeSave": "true"
    }
  },
  {
    "name": "ItemUseRestriction",
    "status": true,
    "description": "スイッチ操作でパーティー全体のアイテム使用を制限するプラグイン",
    "parameters": {
      "RestrictionSwitch": "152",
      "ExceptionItems": "[\"18\"]"
    }
  },
  {
    "name": "MapSymbolAutoFreeze",
    "status": true,
    "description": "マップ上でフェードが行われていたりメッセージが表示されている時に\n自動的にイベントシンボルをフリーズさせるプラグイン。",
    "parameters": {
      "enableSwitch": "280"
    }
  },
  {
    "name": "YEP_EventChasePlayer",
    "status": true,
    "description": "v1.02 プレイヤーが特定のイベントに近づくと、イベントがプレイヤーを追いかけたりプレイヤーから逃げます",
    "parameters": {
      "Sight Lock": "99999",
      "See Player": "false",
      "Alert Timer": "60",
      "Alert Balloon": "1",
      "Alert Sound": "Attack1",
      "Alert Common Event": "0",
      "Return After": "true",
      "Return Wait": "300"
    }
  },
  {
    "name": "VE_Single_Actor",
    "status": true,
    "description": "One-Actor's menu. This plugin is made for one playable actor only.",
    "parameters": {
      "Level Number x Distance": "50",
      "Class text x Distance": "160",
      "ExptoLvl text x Distance": "160",
      "Status Window Width": "325"
    }
  },
  {
    "name": "VE_Single_Actor_override",
    "status": true,
    "description": "シングルアクター改造プラグイン",
    "parameters": {}
  },
  {
    "name": "YEP_MoveRouteCore",
    "status": true,
    "description": "v1.01 このプラグインを使用してルート移動イベントの移動オプションの数を拡張します。",
    "parameters": {
      "Move Skip": "false"
    }
  },
  {
    "name": "LoadComSim",
    "status": true,
    "description": "ver1.00 メニューコマンドにロードを追加します。",
    "parameters": {
      "loadtext": "读档"
    }
  },
  {
    "name": "MapSymbolAutoFreeze",
    "status": true,
    "description": "マップ上でフェードが行われていたりメッセージが表示されている時に\n自動的にイベントシンボルをフリーズさせるプラグイン。",
    "parameters": {
      "enableSwitch": "280"
    }
  },
  {
    "name": "KMS_WaterMapEffect",
    "status": false,
    "description": "[v1.1.0] マップに水中エフェクトを適用します。",
    "parameters": {
      "Flicker image": "KMS_cloud",
      "Wave image": "KMS_wave",
      "Wave opacity": "10",
      "Speed X": "0.1",
      "Speed Y": "-0.1",
      "Auto tone change": "1"
    }
  },
  {
    "name": "HS_TSmonIslandTitle",
    "status": true,
    "description": "タイトル画面のメニュー表示を変更します。\r\n※タイトル画面に選択肢を追加する系のプラグインより後に読み込んでください。",
    "parameters": {
      "manualMode": "false",
      "menuX": "56",
      "menuY": "56",
      "textSlideX": "22",
      "space": "10",
      "backColor": "000000",
      "backOpacity": "130"
    }
  },
  {
    "name": "dashBan",
    "status": false,
    "description": "ダッシュを禁止するプラグインです",
    "parameters": {}
  },
  {
    "name": "HS_RelativeDirection",
    "status": true,
    "description": "NPC(イベント)やプレイヤーから見たそれぞれの\n相対方向を使ってイベント分岐ができます。",
    "parameters": {}
  },
  {
    "name": "MPP_ChoiceEX",
    "status": true,
    "description": "選択肢の機能を拡張します。",
    "parameters": {
      "Max Page Row": "10",
      "Disabled Position": "none"
    }
  },
  {
    "name": "HS_PictureZoom",
    "status": true,
    "description": "ピクチャズームプラグイン\r\n指定したピクチャ1枚を半固定値でズームして舐め回すように見ることができます。",
    "parameters": {
      "ImageZoomScale": "1.3",
      "ImageMovePixel": "10\r"
    }
  }
];
{
  "name":"UCHU_MobileOperation",
    "status":true,
    "description":"スマホ操作用プラグイン。横持ち/縦持ちに対応した仮想ボタン、\r\nタッチ操作の方法を追加拡張し、スマホプレイを快適にします。",
    "parameters": {
        "---PC Option---":"",
        "PC BtnDisplay":"false",
        "PC TouchExtend":"true",
        "---File Path---":"",
        "DPad Image":"./img/system/DirPad.png",
        "ActionBtn Image":"./img/system/ActionButton.png",
        "CancelBtn Image":"./img/system/CancelButton.png",
        "---Button Customize---":"",
        "Button Opacity":"0.7",
        "Vertical BtnZoom":"0.8",
        "Tablet BtnZoom":"0.8",
        "TabVertical BtnZoom":"1.1",
        "HideButton OnMessage":"false",
        "DPad Visible":"true",
        "DPad Size":"200",
        "DPad Margin":"10; 10",
        "DPad Orientation":"left; bottom",
        "DPad OpelationRange":"1.3",
        "DPad DiagonalRange":"0.3",
        "ActionBtn Visible":"true",
        "ActionBtn Size":"100",
        "ActionBtn Margin":"10; 90",
        "ActionBtn Orientation":"right; bottom",
        "CancelBtn Visible":"true",
        "CancelBtn Size":"100",
        "CancelBtn Margin":"110; 10",
        "CancelBtn Orientation":"right; bottom",
        "---TouchInput Extend---":"",
        "Flick PageUp-PageDown":"true",
        "HoldCanvas ActionBtn":"true",
        "OutCanvas CancelBtn":"false",
        "OutCanvas ActionBtn":"false",
        "--!need AnalogMove.js!--":"",
        "Analog Move":"false",
        "Analog Sensitivity":"1.8"
  }
},
