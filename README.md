# AudioWorklet test

- [シンプルなビープ音](https://code4fukui.github.io/audioworklet-test/beep.html)
- [シンプルな複数のビープ音](https://code4fukui.github.io/audioworklet-test/beeps.html)
- [シンプルなノイズ音](https://code4fukui.github.io/audioworklet-test/noise.html)
- [PAPU音源テスト](https://code4fukui.github.io/audioworklet-test/papu.html) with [PAPU.js](https://github.com/taisukef/jsnes/blob/master/src/papu.js) from [JSNES](https://github.com/taisukef/jsnes)
- [IchigoJam MML](https://code4fukui.github.io/audioworklet-test/mml.html)
- [サイン波](https://code4fukui.github.io/audioworklet-test/sine.html)
- [風の音](https://code4fukui.github.io/audioworklet-test/wind.html) with [Wind Outside | Sound Ambient | ロイヤリティフリーの音楽 - Pixabay](https://pixabay.com/ja/sound-effects/wind-outside-sound-ambient-141989/)

## reference

- [AudioWorkletの導入 - Qiita](https://qiita.com/ryoyakawai/items/1160586653330ccbf4a4)
- [[Web Audio API] AudioWorklet を 1 ファイルで書く方法 | g200kg Music & Software](https://www.g200kg.com/archives/2019/01/audioworklet-1.html)

## doc

Worker ワーカー
- 専用ワーカー (Dedicated Worker)
- 共有ワーカー (Shared Worker)
- サービスワーカー (Service Worker)
- オーディオワーカー (Audio Worker)

Module or Classic
- navigator.serviceWorker.register('/sw.js', { type: 'module' }) // module
- navigator.serviceWorker.register('/sw.js') // classic

制限
- DOM操作不可
- window オブジェクトの既定のメソッドやプロパティに一部制限
- Dynamic Import不可

通信
- メッセージのシステム（postMessage）を使う
