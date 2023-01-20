## reference

- [AudioWorkletの導入 - Qiita](https://qiita.com/ryoyakawai/items/1160586653330ccbf4a4)
- [[Web Audio API] AudioWorklet を 1 ファイルで書く方法 | g200kg Music & Software](https://www.g200kg.com/archives/2019/01/audioworklet-1.html)

## doc

ワーカー
- 専用ワーカー (dedicated worker)
- 共有ワーカー (shared worker)
- サービスワーカー

// Module Service Worker になる
navigator.serviceWorker.register('/sw.js', {type: 'module'})
// Classic Service Worker になる
navigator.serviceWorker.register('/sw.js')

制限
- DOM操作
- window オブジェクトの既定のメソッドやプロパティに一部制限
- Dynamic Import は使えない

通信
- メッセージのシステム（postMessage）を使う
