# SQLのきほん

**図を見て、SQLを書いて、結果を確かめる。**

SQL Serverで使うSQLの書き方を、基礎から少しずつ学べる初心者向け教材です。表の「行」と「列」を知るところから始めて、条件で絞る、並べ替える、集計する、複数の表をつなぐところまで、全15章で学びます。

ひよこの「カルメロ」と、お姉さん役の「コルナリーナ」が、図や身近なデータを使って学習を案内します。

![SQLのきほんのメインイラスト](dist/assets/start-scene.png)

## こんな方へ

- SQLやデータベースに初めて触れる方
- SQLを見ても、どのような結果になるのかイメージしにくい方
- 説明を読みながら、実際にSQLを書いて覚えたい方
- SELECTの基本を、自分のペースで練習したい方

## この教材の特徴

- **表の変化を図で確かめる** — 選んだ列や条件に合う行、集計のまとまり、表同士のつながりを見ながら学べます。
- **SQLを変えて試す** — 商品・注文・お客さまのサンプルデータを使い、SQLを書き換えて実行すると結果が変わります。
- **何度でもやり直せる** — 「初期値に戻す」でSQLと実行結果をリセットできるので、気軽に試せます。
- **クイズと演習で振り返る** — 全46レッスンと45問の復習クイズを収録。最後は3つの総合演習で、目的に合うSQLを組み立てます。
- **続きから学べる** — 学習の進み具合とSQLの下書きをブラウザーに保存し、「つづきから」で再開できます。

## 学べる内容

| 章 | テーマ | 学ぶこと |
| --- | --- | --- |
| 1 | データベースって何？ | テーブル・行・列を知り、表から情報を取り出す感覚をつかむ |
| 2 | はじめてのSQLを書こう | `SELECT`・`FROM`で、見たい列を選ぶ |
| 3 | 条件に合う行を探そう | `WHERE`で、必要な行を絞り込む |
| 4 | 条件を組み合わせよう | `AND`・`OR`・括弧で、複数の条件を表す |
| 5 | いろいろな探し方を覚えよう | `IN`・`BETWEEN`・`LIKE`で、候補・範囲・文字のパターンを指定する |
| 6 | 並べ替えと上位表示をしよう | `ORDER BY`・`TOP`で、表示する順番と件数を決める |
| 7 | 取り出す結果を整えよう | `AS`・計算・`DISTINCT`で、別名を付けたり重複を除いたりする |
| 8 | 値が入っていないときは？ | `NULL`の意味と、値が入っていない行の探し方を知る |
| 9 | 件数や合計を求めよう | `COUNT`・`SUM`・`AVG`・`MIN`・`MAX`で、データを集計する |
| 10 | 種類ごとに集計しよう | `GROUP BY`で、グループごとに件数や合計を求める |
| 11 | 集計した結果を絞ろう | `HAVING`で、集計後のグループに条件を付ける |
| 12 | 2つの表をつなごう | `INNER JOIN`で、対応するデータを組み合わせる |
| 13 | 相手がいない行も残そう | `LEFT JOIN`で、対応するデータがない行も取り出す |
| 14 | SQLを書く順番と、結果ができる順番 | SQLの論理的な処理順序を、途中の表を見ながら理解する |
| 15 | 自分でSQLを組み立てよう | 3つの総合演習で、条件・集計・結合を組み合わせる |

## 学び方

1. タイトル画面の「はじめる」から、学びたい章を選びます。初めての方は第1章から進めると、順番に理解を深められます。
2. キャラクターの説明を読み、表やSQLの考え方をつかみます。
3. SQLを書いたら「実行」を押し、その下に表示される結果を見ます。列名や条件を変え、結果を予想してから実行してみましょう。
4. 結果の下にある図や補足で、なぜその結果になったのかを振り返ります。迷ったときは「初期値に戻す」で例からやり直せます。
5. 章の終わりのクイズで理解を確認し、最後の総合演習に挑戦します。

## 学習を案内するキャラクター

**カルメロ**

白いはちまきを巻いた、やさしくておとなしいひよこ。この教材のメインの案内役です。初めて出会う言葉やSQLの考え方を、一歩ずつ説明してくれます。

**コルナリーナ**

おっとりした、お姉さんのような案内役。覚えておきたいポイントや、つまずきやすいところで登場し、理解をそっと手伝ってくれます。

## 利用について

HTML・CSS・JavaScriptで動作し、SQL Serverのインストールは不要です。保存した`dist`フォルダー内の`index.html`をブラウザーで開くと学習を始められます。画像なども使うため、`dist`フォルダーは中身をまとめて保存します。

教材内のSQLは、サンプルデータを使う学習用シミュレーターで動作します。学習の中心は、`SELECT`によるデータの取り出し方です。SQL Serverのすべての構文や動作を再現するものではなく、データの追加・更新・削除や、サーバーの設定・運用は扱いません。

学習の記録は、利用しているブラウザー内に保存されます。別のブラウザーや端末には引き継がれず、ブラウザーの保存データを削除すると記録も消えます。

## English

**SQL First Steps** is a visual, beginner-friendly introduction to writing SQL for SQL Server. Across 15 chapters, learners explore tables, SELECT queries, filtering, sorting, aggregation, joins, and logical query processing through diagrams and hands-on practice.

The course includes 46 lessons, 45 review questions, and three final exercises. Carmelo, a gentle chick, guides learners through the basics, while Cornalina offers helpful tips. Lessons are written in Japanese.

Built with HTML, CSS, and JavaScript, the course runs in a browser without installing SQL Server. Its educational simulator supports the read-only SQL features used in the lessons; it does not reproduce every SQL Server feature. Learning progress and SQL drafts are saved in the current browser.
