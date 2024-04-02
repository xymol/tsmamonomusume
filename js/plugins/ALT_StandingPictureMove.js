//=============================================================================
// ALT_StandingPictureMove.js
// by Altered (Machina Suzuhara)
// Version: 1.01
//=============================================================================

/*:
 * @plugindesc パラメータに"立ち絵"として予め設定したピクチャを、プラグインコマンドで動かします。立ち絵は16枚まで登録可能。
 * @author Altered (Machina Suzuhara)
 *
 * @param default_position_y
 * @desc 立ち絵を表示する際、この値の分だけ位置（高さ）が調整されます
 * この値は、このプラグインで表示する全ての立ち絵に適用されます
 * @default 0
 *
 * @param Stand_1_PictureNumber
 * @desc "立ち絵01"のピクチャ番号を指定
 *
 * @param Stand_1_CharacterName
 * @desc "立ち絵01"のキャラ名を設定
 *
 * @param Stand_1_FileName
 * @desc プラグインコマンドで"立ち絵01"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_2_PictureNumber
 * @desc "立ち絵02"のピクチャ番号を指定
 *
 * @param Stand_2_CharacterName
 * @desc "立ち絵02"のキャラ名を設定
 *
 * @param Stand_2_FileName
 * @desc プラグインコマンドで"立ち絵02"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_3_PictureNumber
 * @desc "立ち絵03"のピクチャ番号を指定
 *
 * @param Stand_3_CharacterName
 * @desc "立ち絵03"のキャラ名を設定
 *
 * @param Stand_3_FileName
 * @desc プラグインコマンドで"立ち絵03"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_4_PictureNumber
 * @desc "立ち絵04"のピクチャ番号を指定
 *
 * @param Stand_4_CharacterName
 * @desc "立ち絵04"のキャラ名を設定
 *
 * @param Stand_4_FileName
 * @desc プラグインコマンドで"立ち絵04"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_5_PictureNumber
 * @desc "立ち絵05"のピクチャ番号を指定
 *
 * @param Stand_5_CharacterName
 * @desc "立ち絵05"のキャラ名を設定
 *
 * @param Stand_5_FileName
 * @desc プラグインコマンドで"立ち絵05"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_6_PictureNumber
 * @desc "立ち絵06"のピクチャ番号を指定
 *
 * @param Stand_6_CharacterName
 * @desc "立ち絵06"のキャラ名を設定
 *
 * @param Stand_6_FileName
 * @desc プラグインコマンドで"立ち絵06"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_7_PictureNumber
 * @desc "立ち絵07"のピクチャ番号を指定
 *
 * @param Stand_7_CharacterName
 * @desc "立ち絵07"のキャラ名を設定
 *
 * @param Stand_7_FileName
 * @desc プラグインコマンドで"立ち絵07"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_8_PictureNumber
 * @desc "立ち絵08"のピクチャ番号を指定
 *
 * @param Stand_8_CharacterName
 * @desc "立ち絵08"のキャラ名を設定
 *
 * @param Stand_8_FileName
 * @desc プラグインコマンドで"立ち絵08"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_9_PictureNumber
 * @desc "立ち絵09"のピクチャ番号を指定
 *
 * @param Stand_9_CharacterName
 * @desc "立ち絵09"のキャラ名を設定
 *
 * @param Stand_9_FileName
 * @desc プラグインコマンドで"立ち絵09"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_10_PictureNumber
 * @desc "立ち絵10"のピクチャ番号を指定
 *
 * @param Stand_10_CharacterName
 * @desc "立ち絵10"のキャラ名を設定
 *
 * @param Stand_10_FileName
 * @desc プラグインコマンドで"立ち絵10"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_11_PictureNumber
 * @desc "立ち絵10"のピクチャ番号を指定
 *
 * @param Stand_11_CharacterName
 * @desc "立ち絵10"のキャラ名を設定
 *
 * @param Stand_11_FileName
 * @desc プラグインコマンドで"立ち絵10"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_12_PictureNumber
 * @desc "立ち絵10"のピクチャ番号を指定
 *
 * @param Stand_12_CharacterName
 * @desc "立ち絵10"のキャラ名を設定
 *
 * @param Stand_12_FileName
 * @desc プラグインコマンドで"立ち絵10"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_13_PictureNumber
 * @desc "立ち絵10"のピクチャ番号を指定
 *
 * @param Stand_13_CharacterName
 * @desc "立ち絵10"のキャラ名を設定
 *
 * @param Stand_13_FileName
 * @desc プラグインコマンドで"立ち絵10"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_14_PictureNumber
 * @desc "立ち絵10"のピクチャ番号を指定
 *
 * @param Stand_14_CharacterName
 * @desc "立ち絵10"のキャラ名を設定
 *
 * @param Stand_14_FileName
 * @desc プラグインコマンドで"立ち絵10"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_15_PictureNumber
 * @desc "立ち絵10"のピクチャ番号を指定
 *
 * @param Stand_15_CharacterName
 * @desc "立ち絵10"のキャラ名を設定
 *
 * @param Stand_15_FileName
 * @desc プラグインコマンドで"立ち絵10"を指定した際に呼び出す画像ファイル名
 *
 * @param Stand_16_PictureNumber
 * @desc "立ち絵10"のピクチャ番号を指定
 *
 * @param Stand_16_CharacterName
 * @desc "立ち絵10"のキャラ名を設定
 *
 * @param Stand_16_FileName
 * @desc プラグインコマンドで"立ち絵10"を指定した際に呼び出す画像ファイル名
 *
 * @help イベントコマンドの「プラグインコマンド」を使って立ち絵を表示・非表示させたり、
 *立ち絵に簡単なスライドアニメをさせます。
 *
 *--------------------------------------------------------------------------------------------------------------------------
 *
 * 【利用規約】
 * 1.利用上の注意
 * ・本スクリプトを使用してゲームなどを配布する際、
 *   添付ドキュメント内に本素材を使用して制作した旨を表記し、その際に次の権利表記を行なうこと。
 *
 *  (C)Altered  http://altered.sblo.jp
 *
 *   ※但し、「http://altered.sblo.jp」はR-18サイトのため、表記は配布者の任意としますが、
 *    本素材を使用した配布物が内容を問わずR-18指定の場合、表記は必須とします。
 *
 * ・有償、無償、年齢制限コンテンツでの利用に、特に制限はありません。
 *
 * ・利用に関しては全て自己責任で行ってください。
 *   本スクリプトを使用すること及びゲームなどを制作・配布・販売することにより、
 *   第三者との間で生じたトラブル等に関しては、本素材作成者は一切責任を負わないものとします。
 *
 * ・素材制作者に許可無く改変可。改変物の配布時には、
 *   添付ドキュメント内に本素材を使用して制作した旨を表記し、その際に次の権利表記を行なうこと。
 *
 *  (C)Altered  http://altered.sblo.jp
 *
 *   ※但し、「http://altered.sblo.jp」はR-18サイトのため、表記は配布者の任意としますが、
 *    本素材を使用した配布物が内容を問わずR-18指定の場合、表記は必須とします。
 *
 * 2.利用報告
 * ・特に必要ありません。
 *
 * 3.禁止事項
 * ・素材単体での二次配布。
 * ・素材への直リンク。
 *
 *  4.サポート
 * ・競合などの対処は致しかねますので、予めご了承下さい。
 *
 *--------------------------------------------------------------------------------------------------------------------------
 *
 * 【注意事項】
 * ・立ち絵画像の解像度の、縦横どちらか一方、もしくが両方が奇数の場合、
 *   拡大率100％でも表示した立ち絵画像がぼやけてしまう事がありますのでご注意下さい。
 *
 * ・画面解像度が、「816*624」「1024*768」「1280*960」以外の場合、
 *   スライドアニメが綺麗に表示されない場合があります。
 *
 * ・一度表示した立ち絵は、イベントコマンドの「ピクチャの移動」で対応するピクチャ番号を入力すれば動かせます。
 *   同様に、「ピクチャの消去」「ピクチャの回転」「ピクチャの色調変更」「ピクチャの消去」も使えます。
 *
 *
 * 【プラグインコマンド記述の仕方】
 * <記述1>
 * SPM キャラ名 立ち位置 スライド 時間 x y x％ y％ ウェイトありorなし
 *
 * <記述2>
 * SPM キャラ名 消去 時間 ウェイトありorなし
 *
 * ※1 それぞれの項目は半角スペースで区切って下さい。
 * ※2 キャラ名、ピクチャ番号、画像ファイル名の登録は、
 * 　　プラグイン管理画面のパラメータで予め設定しておいて下さい。
 * ※3 記述1で立ち絵が非表示になっても、ピクチャの透明度が0になっただけで画面上には存在しています。
 * 　　ピクチャを画面上から消去する場合は、任意のタイミングでイベントコマンド「ピクチャの消去」を実行して下さい。
 *
 *
 *
 * 【記述項目の説明】
 * <SPM>
 * このプラグインを呼び出すための記述です。必ず先頭に記述し、変更しないで下さい。
 *
 * <キャラ名>
 * 立ち絵を表示させたいキャラの名前をここに記述すると、
 * プラグイン管理画面のパラメータで設定した立ち絵画像が表示されます。
 *
 * <立ち位置>
 * 立ち絵を表示させたい位置を記述。
 * 　　　左…………立ち絵を画面の左側に表示させます。
 * 　　　右…………立ち絵を画面の左側に表示させます。
 * 　　　中央………立ち絵を画面の中央に表示させます。
 * 　　　前回………最後に表示した立ち位置に表示させます。
 * 　　　　　　　　※ゲームを再起動すると、"前回"の位置情報は消去されます。
 * 　　　　　　　　　ゲーム起動後、初めて表示させる際に"前回"を記述すると何も表示されません。
 *
 * <スライド>
 * 立ち絵が表示される際のスライドアニメの種類を記述。
 * 　　　なし………スライドせずに表示されます。
 * 　　　イン………中央に向かってスライドしながら、フェードインします。
 * 　　　　　　　　立ち位置によって右にスライドするか左にスライドするか、自動で判定します。
 * 　　　アウト……画面外に向かってスライドしながら、フェードアウトします。
 * 　　　　　　　　立ち位置によって右にスライドするか左にスライドするか、自動で判定します。
 *
 * <時間>
 * "スライド"の項目で設定したスライドアニメの処理時間（≒スライド＆フェード速度）を記述。
 * 値を"時間"と記述すると、各スライドパターン毎にオーソドックスな処理時間が自動で代入されます。
 *
 * <x>
 * 立ち位置で設定した位置に加え、ここに記述した値の分、さらに横方向に移動します。
 * 画面左に移動させる場合はマイナスの値を記述して下さい。
 *
 * <y>
 * プラグイン管理画面のパラメータ「default_position_y」で設定した画像の高さに加え、
 * ここに記述した値の分、さらに縦方向に移動します。
 * 画面上に移動させる場合はマイナスの値を記述して下さい。
 *
 * <x％>
 * 立ち絵画像の横の拡大率を指定します。
 * 画像を左右反転させる場合は<x％>に-100と記述して下さい。
 * 反転させる場合は画像の位置が線対称になるので、"x"項目で位置を調整して下さい。
 *
 * <y％>
 * 立ち絵画像の縦の拡大率を指定します。
 * 画像を上下逆さにする場合は<y％>に-100と記述して下さい。
 * 上下逆さにする場合は画像の位置が線対称になるので、"y"項目で位置を調整して下さい。
 *
 * <消去>
 * プラグインコマンドで指定したキャラ名の立ち絵画像を、非表示にする。
 *
 * <ウェイトありorなし>
 * スライドアニメやフェード処理をしている間、他の処理をウェイトするかどうかを指定します。
 * 　　　ウェイトあり……立ち絵のスライドアニメやフェード処理が終わるまで他の処理は待機します。
 * 　　　ウェイトなし……立ち絵のスライドアニメやフェード処理と他の処理が並列処理されます。
 *
 * ※プラグインコマンド記述の際、
 * 　"立ち位置" "スライド" "時間" "x" "y" "x％" "y％"の項目は、
 * 　その項目名のまま記述すると、デフォルト値として下記の値が各項目に代入されます。
 *
 * <デフォルト値>
 * 立ち位置 = 前回
 * スライド = なし
 * 時間 = スライドの種類に合わせてデフォルトで設定している値
 * 　　　　　　例）スライドの項目を"イン"と記述した場合、値は"10"が自動で代入される。
 * x = 0
 * y = 0
 * x％ = 100
 * y％ = 100
 *
 *
 *
 * 【使用例】
 * ▼例1▼
 * SPM アルド 左 イン 30 -25 y x％ y％ ウェイトなし
 *
 * 処理内容 :
 * プラグイン管理画面で設定したアルドに対応する画像ファイルが、同じくアルドに対応するピクチャ番号で、
 * 画面左側から30フーレムかけて中央に向かって少しスライドしながらフェードインし、
 * 最終立ち位置がプリセットの左側の立ち位置よりさらに左に25ドット寄っている。
 * （表示開始位置も左に25ドット寄った状態で開始される）
 * 以上の処理は、次の処理と並列に実行される。
 *
 * ▼例2▼
 * SPM アルド 消去 60 ウェイトなし
 * SPM ニナ 消去 60 ウェイトあり
 *
 * 処理内容 :
 * プラグイン管理画面で設定したアルドとニナそれぞれに対応するピクチャ番号の画像が、
 * 画面上から60フレームかけて同時にフェードアウトする。
 *
 *
 */

(function() {

    var parameters = PluginManager.parameters('ALT_StandingPictureMove');

//パラメータをオブジェクトに格納

    var _default_position_y = String(parameters['default_position_y'] || 0);
    var default_position_y = _default_position_y - 0

    $Stand_Character_FileName_obj = {};
    $Stand_Character_PictureNumber_obj = {};
    $SPM_Pic_x_obj = {};
    $SPM_Pic_y_obj = {};
    $SPM_Pic_Scale_x_obj = {};
    $SPM_Pic_Scale_y_obj = {};
    $SPM_Pic_Opacity_obj = {};
    $SPM_Pic_Position_obj = {};


      var SPM_NameNumber = 0;
      for (var i = 0; i < 16; i++){
        SPM_NameNumber++;
        var _Stand_CharacterName = 'Stand_' + SPM_NameNumber + '_CharacterName';
        var _Stand_FileName = 'Stand_' + SPM_NameNumber + '_FileName';
        var _Stand_PictureNumber = 'Stand_' + SPM_NameNumber + '_PictureNumber';
        var Stand_CharacterName = String(parameters[_Stand_CharacterName]);
        var Stand_FileName = String(parameters[_Stand_FileName]);
        var Stand_PictureNumber = String(parameters[_Stand_PictureNumber]);
        $Stand_Character_FileName_obj[Stand_CharacterName] = Stand_FileName;
        $Stand_Character_PictureNumber_obj[Stand_CharacterName] = Stand_PictureNumber;
      }



    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'SPM') {


        //初期設定
        var SPM_Id = $Stand_Character_PictureNumber_obj[args[0]];
        var SPM_FileName = $Stand_Character_FileName_obj[args[0]];
        var SPM_Position = args[1];
        var _SPM_Position;


        var SPM_x = 0;
        var SPM_y = 0;


        //消去以外の処理
        if (SPM_Position !== '消去') {
            if (args[4] === 'x') {
              args[4] = 0;
            }
            args[4] = args[4] - 0;

            switch (SPM_Position) {
                case '立ち位置':
                SPM_x = Graphics.width / 2 - Graphics.width / 3 + args[4];
                break;
                case '右':
                SPM_x = Graphics.width / 2 + Graphics.width / 3 + args[4];
                break;
                case '左':
                SPM_x = Graphics.width / 2 - Graphics.width / 3 + args[4];
                break;
                case '中央':
                SPM_x = Graphics.width / 2 + args[4];
                break;
                case '前回':
                SPM_x = $SPM_Pic_x_obj[SPM_Id] + args[4];
                break;
            }
            SPM_x = Math.round(SPM_x);

            if (args[5] === 'y') {
              args[5] = 0;
            }
            args[5] = args[5] - 0;
            SPM_y = args[5] + default_position_y;

            if (args[6] === 'x％') {
              args[6] = 100;
            }
            args[6] = args[6] - 0;
            SPM_Scale_x = args[6];

            if (args[7] === 'y％') {
              args[7] = 100;
            }
            args[7] = args[7] - 0;
            SPM_Scale_y = args[7];


            //スライドアニメの初期設定
            var SPM_GraphicsWidth = Graphics.width;
            var SPM_GraphicCoefficient = 0
            switch (SPM_GraphicsWidth) {
              case 816:
              SPM_GraphicCoefficient = 1;
              break;
              case 1024:
              SPM_GraphicCoefficient = 1.25;
              break;
              case 1280:
              SPM_GraphicCoefficient = 1.5;
              break;
            }

            var SPM_x_move = SPM_x;
            var SPM_y_move = SPM_y;
            var SPM_Scale_x_move = SPM_Scale_x;
            var SPM_Scale_y_move = SPM_Scale_y;
            var SPM_Opacity;
            var SPM_Duration;
            var SPM_SlidePattern = args[2];

            //スライドアニメの設定
            switch (SPM_SlidePattern) {
            case 'スライド':
                  switch (SPM_Position) {
                      case '前回':
                        _SPM_Position = $SPM_Pic_Position_obj[SPM_Id]
                      break;
                  }
                  SPM_Opacity = 0;
                  SPM_Opacity_move = 255;
                  if (args[3] === '時間') {
                    SPM_Duration = 10;
                  }else if (args[3] !== '時間') {
                    SPM_Duration = args[3];
                  }
                  break;

            case 'なし':
                  switch (SPM_Position) {
                      case '前回':
                        _SPM_Position = $SPM_Pic_Position_obj[SPM_Id]
                      break;
                  }
                  SPM_Opacity = 0;
                  SPM_Opacity_move = 255;
                  if (args[3] === '時間') {
                    SPM_Duration = 10;
                  }else if (args[3] !== '時間') {
                    SPM_Duration = args[3];
                  }
                  break;


            case 'イン':
                  switch (SPM_Position) {
                      case '立ち位置':
                      SPM_x += -10 * SPM_GraphicCoefficient;
                      break;
                      case '右':
                      SPM_x += +10 * SPM_GraphicCoefficient;
                      break;
                      case '左':
                      SPM_x += -10 * SPM_GraphicCoefficient;
                      break;
                      case '中央':
                      alert("定位置以外でスライドさせたい場合は、立ち位置を'右'（or'左'）にして、プラグインコマンドの'x'に値を入れて調整して下さい")
                      break;
                      case '前回':
                        _SPM_Position = $SPM_Pic_Position_obj[SPM_Id]
                        switch (_SPM_Position) {
                          case '立ち位置':
                          SPM_x_move += +10 * SPM_GraphicCoefficient;
                          break;
                          case '右':
                          SPM_x_move += -10 * SPM_GraphicCoefficient;
                          break;
                          case '左':
                          SPM_x_move += +10 * SPM_GraphicCoefficient;
                          break;
                          case '中央':
                          alert("定位置以外でスライドさせたい場合は、立ち位置を'右'（or'左'）にして、プラグインコマンドの'x'に値を入れて調整して下さい")
                          break;
                        }
                      break;
                  }
                  SPM_x_move = Math.round(SPM_x_move);

                  SPM_Opacity = 0;
                  SPM_Opacity_move = 255;
                  if (args[3] === '時間') {
                    SPM_Duration = 10;
                  }else if (args[3] !== '時間') {
                    SPM_Duration = args[3];
                  }
                  break;

            case 'アウト':
                  switch (SPM_Position) {
                      case '立ち位置':
                      SPM_x_move += -10 * SPM_GraphicCoefficient;
                      break;
                      case '右':
                      SPM_x_move += +10 * SPM_GraphicCoefficient;
                      break;
                      case '左':
                      SPM_x_move += -10 * SPM_GraphicCoefficient;
                      break;
                      case '中央':
                      alert("定位置以外でスライドさせたい場合は、立ち位置を'右'（or'左'）にして、プラグインコマンドの'x'に値を入れて調整して下さい")
                      break;
                      case '前回':
                        _SPM_Position = $SPM_Pic_Position_obj[SPM_Id]
                        switch (_SPM_Position) {
                          case '立ち位置':
                          SPM_x_move += -10 * SPM_GraphicCoefficient;
                          break;
                          case '右':
                          SPM_x_move += +10 * SPM_GraphicCoefficient;
                          break;
                          case '左':
                          SPM_x_move += -10 * SPM_GraphicCoefficient;
                          break;
                          case '中央':
                          alert("定位置以外でスライドさせたい場合は、立ち位置を'右'（or'左'）にして、プラグインコマンドの'x'に値を入れて調整して下さい")
                          break;
                        }
                      break;
                  }
                  SPM_x_move = Math.round(SPM_x_move);

                  SPM_Opacity = 255;
                  SPM_Opacity_move = 0;
                  if (args[3] === '時間') {
                    SPM_Duration = 10;
                  }else if (args[3] !== '時間') {
                    SPM_Duration = args[3];
                  }
                  break;

            }


            //ピクチャの移動 開始時の位置
            $gameScreen.showPicture(SPM_Id, SPM_FileName, 1, SPM_x, SPM_y, SPM_Scale_x, SPM_Scale_y, SPM_Opacity, 0);

            //ピクチャの移動 終了時の位置
            $gameScreen.movePicture(SPM_Id, 1, SPM_x_move, SPM_y_move, SPM_Scale_x_move, SPM_Scale_y_move, SPM_Opacity_move, 0, SPM_Duration);
            if (args[8] === 'ウェイトあり') {
              this.wait(SPM_Duration);
            }

            //ピクチャの移動 終了時の位置の保存
            $SPM_Pic_x_obj[SPM_Id] = SPM_x_move;
            $SPM_Pic_y_obj[SPM_Id] = SPM_y_move;
            $SPM_Pic_Scale_x_obj[SPM_Id] = SPM_Scale_x_move;
            $SPM_Pic_Scale_y_obj[SPM_Id] = SPM_Scale_y_move;
            $SPM_Pic_Opacity_obj[SPM_Id] = SPM_Opacity_move;
            if (SPM_Position === '前回') {
              SPM_Position = _SPM_Position;
            }
            $SPM_Pic_Position_obj[SPM_Id] = SPM_Position;

          }//消去以外の処理 終了

          //消去処理
          if (SPM_Position === '消去') {
              var SPM_Id = $Stand_Character_PictureNumber_obj[args[0]];
              var SPM_Erase_x = $SPM_Pic_x_obj[SPM_Id];
              var SPM_Erase_y = $SPM_Pic_y_obj[SPM_Id];
              var SPM_Erase_Scale_x = $SPM_Pic_Scale_x_obj[SPM_Id];
              var SPM_Erase_Scale_y = $SPM_Pic_Scale_y_obj[SPM_Id];
              _SPM_Position = $SPM_Pic_Position_obj[SPM_Id]

              if (args[2] === '時間'){
                args[2] = 10;
              }
              var _SPM_Erase_Duration = args[2];
              var SPM_Erase_Duration = _SPM_Erase_Duration - 0;

              $gameScreen.movePicture(SPM_Id, 1, SPM_Erase_x, SPM_Erase_y, SPM_Erase_Scale_x, SPM_Erase_Scale_y, 0, 0, SPM_Erase_Duration);

              if (args[3] === 'ウェイトあり') {
                this.wait(SPM_Erase_Duration);
              }


              //処理終了時の位置の保存
              $SPM_Pic_x_obj[SPM_Id] = SPM_Erase_x;
              $SPM_Pic_y_obj[SPM_Id] = SPM_Erase_y;
              $SPM_Pic_Scale_x_obj[SPM_Id] = SPM_Erase_Scale_x;
              $SPM_Pic_Scale_y_obj[SPM_Id] = SPM_Erase_Scale_y;
              $SPM_Pic_Opacity_obj[SPM_Id] = 0;

              if (SPM_Position === '前回') {
                SPM_Position = _SPM_Position;
              }
            }     // 消去処理  終了

          }     // if (command === 'SPM')  終了
        }     // Game_Interpreter.prototype.pluginCommand  終了

})();
