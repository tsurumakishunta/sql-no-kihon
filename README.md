# SQLのきほん — 図で学ぶSQL Server入門・全15章

HTML・CSS・JavaScriptだけで動く、SQLの書き方を初めて学ぶ人のための教材です。第1章の表を触る体験から、SELECT・条件・集計・JOIN・論理的な処理順序・総合演習まで学べます。

[教材をブラウザーで開く](https://tsurumakishunta.github.io/sql-no-kihon/) · [公開状況を確認する](https://github.com/tsurumakishunta/sql-no-kihon/actions/workflows/pages.yml)

**English:** A visual, beginner-friendly SQL Server tutorial built with HTML, CSS, and JavaScript. Explore 15 chapters with interactive tables, diagrams, quizzes, and a browser-based SQL simulator. No installation or database server is required. The lessons are written in Japanese.

リポジトリ名：`sql-no-kihon`（SQLのきほん / SQL First Steps）

- **日本語の説明：** 図とキャラクターで学ぶ、SQL Server向けの超入門教材。HTML・CSS・JavaScriptだけで動作。
- **English description:** A visual, beginner-friendly SQL Server tutorial built with HTML, CSS, and JavaScript.

## 開き方

`dist/index.html` をブラウザーで開くと、インターネット接続・インストールなしで学習できます。キャラクター画像の `assets` を含む `dist` フォルダー全体を一緒に配布します。外部フォント・CDN・ライブラリに依存しません。

ローカルプレビューを使う場合は、プロジェクトで `node preview.cjs` を実行し、表示されたローカルURLを開きます。

## GitHub Pagesへの自動公開

`main` に変更をpushすると、[GitHub Actions](https://github.com/tsurumakishunta/sql-no-kihon/actions/workflows/pages.yml)がJavaScriptの構文とSQLエンジン・教材例を確認し、成功したときだけ `dist` をGitHub Pagesへ公開します。手動で再公開する場合は、同じActions画面の「Run workflow」を使います。

公開設定は「Settings → Pages → Build and deployment → Source: GitHub Actions」です。追加のAPIキーやnpmパッケージのインストールは不要です。教材の編集対象は `dist` 内にあります。画像を含めた相対パスとハッシュ形式の画面移動を使用しているため、GitHub Pagesのリポジトリ配下でも動作します。

**English:** Push changes to `main` to validate and deploy the static `dist` directory with GitHub Actions. Deployment runs only after the checks pass. The workflow can also be started manually. No additional deployment secrets or build dependencies are required.

## 章の構成

1. データベースって何？
2. はじめてのSQLを書こう（SELECT・FROM）
3. 条件に合う行を探そう（WHERE）
4. 条件を組み合わせよう（AND・OR・括弧）
5. いろいろな探し方を覚えよう（IN・BETWEEN・LIKE）
6. 並べ替えと上位表示をしよう（ORDER BY・TOP）
7. 取り出す結果を整えよう（AS・計算・DISTINCT）
8. 値が入っていないときは？（NULL）
9. 件数や合計を求めよう（COUNT・SUM・AVG・MIN・MAX）
10. 種類ごとに集計しよう（GROUP BY）
11. 集計した結果を絞ろう（HAVING）
12. 2つの表をつなごう（INNER JOIN）
13. 相手がいない行も残そう（LEFT JOIN）
14. SQLを書く順番と、結果ができる順番
15. 自分でSQLを組み立てよう（3つの総合演習）

46レッスンと45問の復習クイズを収録。SQLを編集すると結果が変わり、処理のボタンを選ぶと途中の表を見られます。集計はグループの箱、JOINは商品IDの対応で図示します。第15章は結果の列名・列順・値・行数・指定された並び順を比較して採点します。意味の等しいSQLすべての厳密な証明をする採点器ではありません。

## 画面と案内役

- 起動時はゲームのスタート画面を表示します。コルナリーナがカルメロを抱っこした全身の一枚絵に、タイトルと「はじめる」「つづきから」を配置しています。PCでは左に開始メニュー、スマートフォンではタイトル→全身イラスト→開始メニューの順です。キャラクターの名前ラベルは表示しません。「はじめる」は章一覧へ、「つづきから」は保存済みの学習位置へ進みます。
- 章一覧はPCの十分な表示領域（幅1100px以上・高さ720px以上）では3列×5段で全15章を表示します。小さな画面では3〜6章ずつ「前へ・次へ」で切り替えます。章名と学ぶSQLを一緒に表示します。
- 左上の「SQLのきほん」からタイトルメニューへ、レッスン内の「章一覧」から章の選択へ戻ります。レッスンの目次は開閉でき、開閉状態も保存します。
- 学習内容は1列で上から下に並びます。第1章のSQL体験を含む43画面で、SQL入力 → 実行・初期値に戻す → 実行結果 → 補足の順に表示します。
- 初期表示とリセット後は実行待ちです。「初期値に戻す」はそのレッスンのSQLと結果を初期化し、学習済みの記録を保持します。
- 実行結果と途中経過の表は別の領域です。処理の段階を選んでも、上に表示した最終結果は変わりません。
- 白いはちまきのひよこ「カルメロ」が説明を担当し、おっとりした先生「コルナリーナ」がポイントをまとめます。タイトルと章一覧の最後に開閉できる紹介を置き、ブランドアイコンとfaviconにもカルメロを使います。コルナリーナの紹介は性格と役割に絞っています。

キャラクター画像はこの教材用に生成したオリジナルイラストです。公開ファイルには教材で使用する画像のみを含めています。

## 動作範囲

- SQL Server本体への接続はありません。読み取り専用の教育用T-SQLサブセットをJavaScriptで解析・評価します。`eval`や外部サービスは使いません。
- 上記のSELECT構文、表と列の別名、N'文字列'、角括弧の識別子、行・ブロックコメントに対応します。商品・注文・お客さまの固定データを使用し、第8章から商品にメモ列を加えます。
- NULLの3値論理、COUNT(*)とCOUNT(列)、整数AVG、WHERE→GROUP BY→HAVING、LEFT JOINの未一致、DISTINCT→ORDER BY→TOPを再現します。
- 全T-SQL互換ではありません。複数文、サブクエリ、CTE、CASE、ウィンドウ関数、日付関数、型変換、追加・更新・削除、運用管理は対象外です。
- 照合順序を再現しません。文字比較は大小文字を区別し、通常の比較では末尾の半角空白を無視します。文字列の並び順やLIKEの細部はSQL Server環境により異なります。LIKEは%と_に対応し、角括弧パターンは対象外です。
- 数値は小さなintと小数の学習例を対象にします。小数演算は14有効桁で計算誤差を整えます。SQL Serverのdecimalの精度・スケール・型伝播を完全には再現しません。int演算・集計の範囲超過と0除算はエラーにします。
- 進捗とSQLの下書きはlocalStorageに保存します。保存できない環境でも画面操作は動きますが、再読み込み後には残せません。保存先はブラウザーとURLのオリジンごとに異なります。
- キーボード操作、Ctrl/⌘+Enterでの実行、狭い画面、動きを減らす設定に対応しています。
- WebMCP対応ブラウザーには `read_sql_course` / `navigate_sql_course` / `run_training_select` を公開します。未対応ブラウザーでは通常のUIで動作します。

## ファイル

- `dist/index.html`：画面の枠組み
- `dist/styles.css`：方眼紙をイメージしたデザインとレスポンシブ表示
- `dist/course.css`：全章ナビゲーションとSQL練習画面のデザイン
- `dist/learning.css`：メインメニュー、縦並びのレイアウト、開閉する目次とキャラクター表示
- `dist/start-screen.css`：ゲーム風のスタート画面と全身イラストの表示
- `dist/characters.js`：キャラクターの説明パネル
- `dist/assets/`：カルメロ・コルナリーナの基本カットとトップ専用PNG
- `dist/chapter-one.js`：第1章の図と操作
- `dist/course-data.js`：第2〜15章の原稿、SQL例、クイズと演習
- `dist/sql-engine.js`：教材用のSQLパーサーと評価器
- `dist/course-app.js`：章移動、編集、図、クイズ、採点、進捗保存
- `preview.cjs`：ローカル確認用サーバー（教材自体には不要）

## 検証

`node --test tests/sql-engine.test.cjs`

NULL、集計、結合、別名、TOP、数値、無効な構文、元データ保持と、全126個の原稿内SQL例を検証します。実際のSQL Serverとの自動比較テストではありません。

教材の例はSQL ServerのSELECT構文を前提にしています。
参考：[Microsoft Learn — SELECT (Transact-SQL)](https://learn.microsoft.com/ja-jp/sql/t-sql/queries/select-transact-sql)
