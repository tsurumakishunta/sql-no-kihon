window.CourseChapters = [
  {
    "id": 2,
    "title": "はじめてのSQLを書こう",
    "shortTitle": "SELECT・FROM",
    "intro": "商品表から、見たい情報を取り出してみましょう。最初は「どの表から」「どの列を」の2つだけで大丈夫です。",
    "recap": [
      "FROM は取り出す元のテーブルを指定します。",
      "SELECT は結果に表示する列を指定します。",
      "複数の列はカンマで区切ります。* はすべての列です。"
    ],
    "lessons": [
      {
        "title": "表をまるごと見てみよう",
        "lead": "SELECT * は「すべての列を表示する」、FROM 商品 は「商品テーブルから取り出す」という意味です。最後の ; は、SQL文の区切りです。取り出しても元の表は変わりません。",
        "sql": "SELECT *\nFROM 商品;",
        "takeaway": "SELECT * FROM 商品; で、商品テーブルのすべての列を取り出せます。",
        "tryThis": "* を 商品名 に変えて、結果に残る列を予想してから実行しましょう。",
        "variations": [
          {
            "label": "商品名だけ",
            "sql": "SELECT 商品名\nFROM 商品;"
          },
          {
            "label": "価格だけ",
            "sql": "SELECT 価格\nFROM 商品;"
          }
        ],
        "visual": "projection",
        "focus": [
          "SELECT",
          "FROM",
          "*"
        ]
      },
      {
        "title": "見たい列を一つ選ぼう",
        "lead": "SELECT の後ろに列名を書くと、その列だけが結果に表示されます。商品名を取り出しても、価格や在庫のデータが消えるわけではありません。",
        "sql": "SELECT 商品名\nFROM 商品;",
        "takeaway": "列名を指定すると、必要な情報だけを結果に表示できます。",
        "tryThis": "商品名 を 在庫 に変え、1行の商品情報のどの部分を取り出すか確かめましょう。",
        "variations": [
          {
            "label": "在庫を見る",
            "sql": "SELECT 在庫\nFROM 商品;"
          },
          {
            "label": "カテゴリを見る",
            "sql": "SELECT カテゴリ\nFROM 商品;"
          }
        ],
        "visual": "projection",
        "focus": [
          "SELECT"
        ]
      },
      {
        "title": "複数の列を選ぼう",
        "lead": "列名をカンマで区切ると、複数の列を取り出せます。結果の列は、SELECT に書いた順に並びます。これは行の並び順とは別の話です。",
        "sql": "SELECT 商品名, 価格\nFROM 商品;",
        "takeaway": "列はカンマで追加でき、書いた順に左から表示されます。",
        "tryThis": "商品名, 価格 を 価格, 商品名 に変え、結果の列の順番を見比べましょう。",
        "variations": [
          {
            "label": "列を入れ替える",
            "sql": "SELECT 価格, 商品名\nFROM 商品;"
          },
          {
            "label": "在庫も追加",
            "sql": "SELECT 商品名, 価格, 在庫\nFROM 商品;"
          }
        ],
        "visual": "projection",
        "focus": [
          "SELECT"
        ]
      }
    ],
    "quiz": [
      {
        "question": "取り出す元のテーブルを指定するのは、どれですか？",
        "choices": [
          "SELECT",
          "FROM",
          "*"
        ],
        "answer": 1,
        "explanation": "FROM 商品 のように、FROM の後ろにテーブル名を書きます。",
        "hint": "「どこから取り出すか」を表す言葉です。"
      },
      {
        "question": "SELECT * FROM 商品; の * は何を意味しますか？",
        "choices": [
          "最初の1列",
          "すべての列",
          "すべての商品を削除"
        ],
        "answer": 1,
        "explanation": "SELECT の * は、指定したテーブルのすべての列を取り出す指定です。",
        "hint": "列名を一つずつ書かずに表の情報を確認したい場面です。"
      },
      {
        "question": "商品名と価格を、この順で表示する書き方はどれですか？",
        "choices": [
          "SELECT 商品名 AND 価格 FROM 商品;",
          "SELECT 価格, 商品名 FROM 商品;",
          "SELECT 商品名, 価格 FROM 商品;"
        ],
        "answer": 2,
        "explanation": "列名はカンマで区切ります。SELECT に商品名、価格の順で書くと、その順に列が並びます。",
        "hint": "列を区切る記号と、列を書く順番に注目しましょう。"
      }
    ]
  },
  {
    "id": 3,
    "title": "条件に合う行を探そう",
    "shortTitle": "WHERE・比較",
    "intro": "今度は列ではなく、行を選びます。「500円以上」「文房具だけ」のような条件をSQLで伝えましょう。",
    "recap": [
      "WHERE は、条件に合う行だけを結果に残します。",
      "= は等しい、<> は等しくない、>= は以上、<= は以下を表します。",
      "日本語の文字列は N'文房具' のように書きます。数値は引用符で囲みません。"
    ],
    "lessons": [
      {
        "title": "500円以上の商品を探そう",
        "lead": "FROM の後ろに WHERE を書き、行を選ぶ条件を指定します。価格 >= 500 は「価格が500円以上」です。結果に含まれない行も、元の表には残っています。",
        "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 >= 500;",
        "takeaway": "WHERE 価格 >= 500 で、条件を満たす商品の行だけを取り出せます。",
        "tryThis": "500 を 900 に変えて、900円の商品が含まれるか確かめましょう。",
        "variations": [
          {
            "label": "900円以上",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 >= 900;"
          },
          {
            "label": "250円以下",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 <= 250;"
          }
        ],
        "visual": "filter",
        "focus": [
          "WHERE",
          ">="
        ]
      },
      {
        "title": "文字で条件を指定しよう",
        "lead": "= は「等しい」を表します。カテゴリ = N'文房具' なら、カテゴリが文房具の行を選べます。SQL Serverで日本語の値を扱うこの教材では、N と半角のシングルクォートを付けます。",
        "sql": "SELECT 商品名, カテゴリ\nFROM 商品\nWHERE カテゴリ = N'文房具';",
        "takeaway": "文字列の値は N'文房具' のように囲み、列名と区別します。",
        "tryThis": "N'文房具' を N'生活雑貨' に変え、選ばれる商品を見比べましょう。",
        "variations": [
          {
            "label": "生活雑貨だけ",
            "sql": "SELECT 商品名, カテゴリ\nFROM 商品\nWHERE カテゴリ = N'生活雑貨';"
          },
          {
            "label": "ノートを探す",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 商品名 = N'ノート';"
          }
        ],
        "visual": "filter",
        "focus": [
          "WHERE",
          "=",
          "N'"
        ]
      },
      {
        "title": "比較の記号を使い分けよう",
        "lead": "<> は「等しくない」、> は「より大きい」、< は「より小さい」です。>= や <= と違い、> と < は境目と同じ値を含みません。",
        "sql": "SELECT 商品名, 在庫\nFROM 商品\nWHERE 在庫 <> 10;",
        "takeaway": "比較記号を変えると、境目の値を含めるかどうかも変わります。",
        "tryThis": "条件を 在庫 > 10 と 在庫 >= 10 に切り替えて、在庫10個ちょうどのタオルが加わるか確かめましょう。",
        "variations": [
          {
            "label": "在庫10個より多い",
            "sql": "SELECT 商品名, 在庫\nFROM 商品\nWHERE 在庫 > 10;"
          },
          {
            "label": "在庫10個以上",
            "sql": "SELECT 商品名, 在庫\nFROM 商品\nWHERE 在庫 >= 10;"
          }
        ],
        "visual": "filter",
        "focus": [
          "WHERE",
          "<>",
          ">",
          ">="
        ]
      }
    ],
    "quiz": [
      {
        "question": "WHERE 価格 >= 900 に、900円のマグカップは含まれますか？",
        "choices": [
          "含まれる",
          "含まれない",
          "商品名によって決まる"
        ],
        "answer": 0,
        "explanation": ">= は「以上」なので、900円ちょうどの商品も含まれます。",
        "hint": "> の横の = に注目しましょう。"
      },
      {
        "question": "カテゴリが文房具の行を探す条件はどれですか？",
        "choices": [
          "WHERE カテゴリ = N'文房具'",
          "WHERE カテゴリ = 文房具",
          "WHERE N'カテゴリ' = N'文房具'"
        ],
        "answer": 0,
        "explanation": "カテゴリは列名、N'文房具' は文字列の値です。文字列の値をシングルクォートで囲みます。",
        "hint": "「列の名前」と「探す値」の書き方を区別します。"
      },
      {
        "question": "WHERE で条件に合わなかった行はどうなりますか？",
        "choices": [
          "元のテーブルから削除される",
          "元のテーブルに残り、今回の結果には含まれない",
          "すべての値が0になる"
        ],
        "answer": 1,
        "explanation": "SELECT と WHERE は結果として取り出す行を選びます。元のテーブルの行は変更されません。",
        "hint": "データを取り出す操作と、データを変更する操作は別です。"
      }
    ]
  },
  {
    "id": 4,
    "title": "条件を組み合わせよう",
    "shortTitle": "AND・OR・括弧",
    "intro": "「文房具で、200円以上」「安い商品、または在庫が少ない商品」。複数の条件を組み合わせて探せるようになりましょう。",
    "recap": [
      "AND は、つないだ条件を両方満たす行を選びます。",
      "OR は、つないだ条件の少なくとも一方を満たす行を選びます。",
      "AND は OR より優先されます。括弧で条件のまとまりを明示できます。"
    ],
    "lessons": [
      {
        "title": "両方の条件を満たす行を選ぼう",
        "lead": "AND は「かつ」です。カテゴリが文房具であることと、価格が200円以上であることの両方を満たす行が結果に残ります。",
        "sql": "SELECT 商品名, カテゴリ, 価格\nFROM 商品\nWHERE カテゴリ = N'文房具' AND 価格 >= 200;",
        "takeaway": "AND でつなぐと、両方の条件に合う行を選べます。",
        "tryThis": "200 を 100 に変えて、文房具の中からどの商品が追加されるか予想しましょう。",
        "variations": [
          {
            "label": "文房具で100円以上",
            "sql": "SELECT 商品名, カテゴリ, 価格\nFROM 商品\nWHERE カテゴリ = N'文房具' AND 価格 >= 100;"
          },
          {
            "label": "生活雑貨で1000円以下",
            "sql": "SELECT 商品名, カテゴリ, 価格\nFROM 商品\nWHERE カテゴリ = N'生活雑貨' AND 価格 <= 1000;"
          }
        ],
        "visual": "logic",
        "focus": [
          "WHERE",
          "AND"
        ]
      },
      {
        "title": "どちらかに合う行を選ぼう",
        "lead": "OR は「または」です。価格が200円以下、または在庫が8個以下なら選ばれます。両方に当てはまる行も選ばれますが、同じ元の行がORのために2回出ることはありません。",
        "sql": "SELECT 商品名, 価格, 在庫\nFROM 商品\nWHERE 価格 <= 200 OR 在庫 <= 8;",
        "takeaway": "OR でつなぐと、少なくとも一つの条件に合う行を選べます。",
        "tryThis": "OR を AND に変え、両方の条件を満たす商品があるか確かめましょう。",
        "variations": [
          {
            "label": "両方に合う商品",
            "sql": "SELECT 商品名, 価格, 在庫\nFROM 商品\nWHERE 価格 <= 200 AND 在庫 <= 8;"
          },
          {
            "label": "ノートかタオル",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 商品名 = N'ノート' OR 商品名 = N'タオル';"
          }
        ],
        "visual": "logic",
        "focus": [
          "WHERE",
          "OR"
        ]
      },
      {
        "title": "括弧で条件をまとめよう",
        "lead": "AND と OR を一緒に使うと、AND が先に結び付きます。この例では、括弧で「文房具か、在庫8個以下」を一つの条件にまとめ、そのうえで価格が200円以上の行を選びます。これは条件の意味を決める規則で、実際の処理の実行順を指定するものではありません。",
        "sql": "SELECT 商品名, カテゴリ, 価格, 在庫\nFROM 商品\nWHERE (カテゴリ = N'文房具' OR 在庫 <= 8) AND 価格 >= 200;",
        "takeaway": "AND と OR を混ぜるときは、括弧で意図した条件のまとまりを明示しましょう。",
        "tryThis": "括弧の ( と ) だけを取り除き、えんぴつとふせんが結果に入る理由を考えましょう。",
        "variations": [
          {
            "label": "括弧を外す",
            "sql": "SELECT 商品名, カテゴリ, 価格, 在庫\nFROM 商品\nWHERE カテゴリ = N'文房具' OR 在庫 <= 8 AND 価格 >= 200;"
          },
          {
            "label": "価格を600円以上に",
            "sql": "SELECT 商品名, カテゴリ, 価格, 在庫\nFROM 商品\nWHERE (カテゴリ = N'文房具' OR 在庫 <= 8) AND 価格 >= 600;"
          }
        ],
        "visual": "logic",
        "focus": [
          "AND",
          "OR",
          "(",
          ")"
        ]
      }
    ],
    "quiz": [
      {
        "question": "「文房具で、価格が200円以上」の両方を満たす行を選ぶには？",
        "choices": [
          "2つの条件を OR でつなぐ",
          "2つの条件を AND でつなぐ",
          "2つの条件をカンマでつなぐ"
        ],
        "answer": 1,
        "explanation": "AND は、つないだ条件の両方を満たす行を選びます。",
        "hint": "「かつ」に当たる言葉を選びましょう。"
      },
      {
        "question": "A OR B で、A と B の両方を満たす行はどうなりますか？",
        "choices": [
          "選ばれない",
          "同じ元の行が必ず2回表示される",
          "その行も選ばれる"
        ],
        "answer": 2,
        "explanation": "OR は少なくとも一方を満たせばよく、両方を満たす場合も含みます。OR自体が元の行を複製するわけではありません。",
        "hint": "「どちらか片方だけ」という条件ではありません。"
      },
      {
        "question": "括弧のない A OR B AND C と同じ条件のまとまりは？",
        "choices": [
          "(A OR B) AND C",
          "A OR (B AND C)",
          "(A AND B) OR C"
        ],
        "answer": 1,
        "explanation": "AND は OR より優先されるため、B AND C が一つのまとまりになります。",
        "hint": "AND と OR では、AND のほうが先に結び付きます。"
      }
    ]
  },
  {
    "id": 5,
    "title": "いろいろな探し方を覚えよう",
    "shortTitle": "IN・BETWEEN・LIKE",
    "intro": "候補から選ぶ、範囲で探す、名前の一部分で探す。よく使う3つの条件指定を、別々の小さな例で体験しましょう。",
    "recap": [
      "IN は、リスト内のいずれかの値と一致する行を選びます。",
      "BETWEEN は、指定した下限と上限の両方を含みます。",
      "LIKE の % は0文字以上、_ は任意の1文字に一致します。"
    ],
    "lessons": [
      {
        "title": "候補リストから探そう",
        "lead": "IN の後ろの括弧に、探したい値をカンマで並べます。商品名がノート、またはタオルである行を、短く書けます。",
        "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 商品名 IN (N'ノート', N'タオル');",
        "takeaway": "IN を使うと、同じ列について複数の候補をまとめて指定できます。",
        "tryThis": "括弧の中に , N'水筒' を追加し、候補を一つ増やしましょう。",
        "variations": [
          {
            "label": "候補を3つに",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 商品名 IN (N'ノート', N'タオル', N'水筒');"
          },
          {
            "label": "商品IDで探す",
            "sql": "SELECT 商品ID, 商品名\nFROM 商品\nWHERE 商品ID IN (1, 3, 6);"
          }
        ],
        "visual": "range",
        "focus": [
          "WHERE",
          "IN"
        ]
      },
      {
        "title": "価格の範囲で探そう",
        "lead": "価格 BETWEEN 250 AND 900 は「250円以上、900円以下」です。下限の250と上限の900のどちらも含みます。このANDは範囲の両端を区切る書き方です。",
        "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 BETWEEN 250 AND 900;",
        "takeaway": "BETWEEN 下限 AND 上限 は、両端を含む範囲を指定します。",
        "tryThis": "下限を180、上限を600に変え、180円と600円の商品も選ばれるか確かめましょう。",
        "variations": [
          {
            "label": "180〜600円",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 BETWEEN 180 AND 600;"
          },
          {
            "label": "在庫8〜15個",
            "sql": "SELECT 商品名, 在庫\nFROM 商品\nWHERE 在庫 BETWEEN 8 AND 15;"
          }
        ],
        "visual": "range",
        "focus": [
          "WHERE",
          "BETWEEN",
          "AND"
        ]
      },
      {
        "title": "名前の一部分で探そう",
        "lead": "LIKE は文字のパターンで探す条件です。N'%カップ%' は、前後に何文字あってもよい「カップを含む名前」を表します。% は0文字以上、_ は任意の1文字です。",
        "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 商品名 LIKE N'%カップ%';",
        "takeaway": "LIKE と % を使うと、文字列の一部分に一致する名前を探せます。",
        "tryThis": "N'%カップ%' を N'ノ%' に変えて、「ノで始まる名前」を探しましょう。",
        "variations": [
          {
            "label": "ノで始まる",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 商品名 LIKE N'ノ%';"
          },
          {
            "label": "ちょうど3文字",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 商品名 LIKE N'___';"
          }
        ],
        "visual": "range",
        "focus": [
          "WHERE",
          "LIKE",
          "%",
          "_"
        ]
      }
    ],
    "quiz": [
      {
        "question": "商品IDが1・3・6のどれかに当たる条件は？",
        "choices": [
          "WHERE 商品ID IN (1, 3, 6)",
          "WHERE 商品ID = 1 AND 商品ID = 3 AND 商品ID = 6",
          "WHERE 商品ID BETWEEN 1 AND 6"
        ],
        "answer": 0,
        "explanation": "IN はリスト内のいずれかと一致する行を選びます。BETWEEN だと2・4・5も範囲に入ります。",
        "hint": "連続した範囲ではなく、指定した候補だけを選びます。"
      },
      {
        "question": "価格 BETWEEN 250 AND 900 に、250円と900円は含まれますか？",
        "choices": [
          "どちらも含まれない",
          "250円だけ含まれる",
          "どちらも含まれる"
        ],
        "answer": 2,
        "explanation": "BETWEEN は下限と上限を両方含みます。",
        "hint": "「250円以上、900円以下」と同じ範囲です。"
      },
      {
        "question": "商品名 LIKE N'ノ%' は、どんな名前を探しますか？",
        "choices": [
          "ノで終わる名前",
          "ノで始まる名前",
          "ノが中央にある名前だけ"
        ],
        "answer": 1,
        "explanation": "最初のノを指定し、その後ろの % で0文字以上の任意の文字列を表しています。",
        "hint": "% がノの前と後ろのどちらにあるかに注目しましょう。"
      }
    ]
  },
  {
    "id": 6,
    "title": "並べ替えと上位表示をしよう",
    "shortTitle": "ORDER BY・TOP",
    "intro": "検索結果を安い順に並べたり、高い商品を3件だけ表示したりしてみましょう。「どの順で」「何件」を別々に指定します。",
    "recap": [
      "ORDER BY で結果の行を並べ替えます。指定しない場合、行の順番は保証されません。",
      "ASC は小さい順、DESC は大きい順です。同じ値なら次の並べ替え列を使います。",
      "SQL Serverでは TOP (件数) を使います。上位を決める ORDER BY も指定します。"
    ],
    "lessons": [
      {
        "title": "価格の安い順に並べよう",
        "lead": "ORDER BY 価格 ASC は、価格の小さい順です。ORDER BY は WHERE がある場合はその後ろに書きます。この例では商品IDも指定し、同じ価格の商品がある場合の順番まで決めています。",
        "sql": "SELECT 商品名, 価格\nFROM 商品\nORDER BY 価格 ASC, 商品ID ASC;",
        "takeaway": "ORDER BY 列名 ASC で小さい順に並び、次の列は同じ値のときの順番を決めます。",
        "tryThis": "最初の ASC だけを DESC に変え、先頭に来る商品を予想しましょう。",
        "variations": [
          {
            "label": "高い順",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nORDER BY 価格 DESC, 商品ID ASC;"
          },
          {
            "label": "在庫の少ない順",
            "sql": "SELECT 商品名, 在庫\nFROM 商品\nORDER BY 在庫 ASC, 商品ID ASC;"
          }
        ],
        "visual": "sort",
        "focus": [
          "ORDER BY",
          "ASC"
        ]
      },
      {
        "title": "条件で選んでから並べよう",
        "lead": "WHERE と ORDER BY は一緒に使えます。まず価格500円以上の行を結果の対象にし、その行を価格の高い順に並べます。DESC は大きい順を意味します。",
        "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 >= 500\nORDER BY 価格 DESC, 商品ID ASC;",
        "takeaway": "WHERE で対象の行を選び、ORDER BY で結果の並び方を指定できます。",
        "tryThis": "500 を 900 に変え、対象が減っても高い順に並ぶことを確かめましょう。",
        "variations": [
          {
            "label": "900円以上を高い順",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 >= 900\nORDER BY 価格 DESC, 商品ID ASC;"
          },
          {
            "label": "500円以上を安い順",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 >= 500\nORDER BY 価格 ASC, 商品ID ASC;"
          }
        ],
        "visual": "sort",
        "focus": [
          "WHERE",
          "ORDER BY",
          "DESC"
        ]
      },
      {
        "title": "高い商品を3件だけ見よう",
        "lead": "SELECT の直後に TOP (3) と書くと、最大3件を取り出します。「高い順の先頭3件」にするため、ORDER BY を一緒に指定します。件数だけ指定しても、どの商品が上位なのかは決まりません。",
        "sql": "SELECT TOP (3) 商品名, 価格\nFROM 商品\nORDER BY 価格 DESC, 商品ID ASC;",
        "takeaway": "TOP (3) は最大3件。ORDER BY で、その3件を選ぶ順番を決めます。",
        "tryThis": "TOP (3) を TOP (2) に変えて、高い順の先頭2件になることを確かめましょう。",
        "variations": [
          {
            "label": "高い商品を2件",
            "sql": "SELECT TOP (2) 商品名, 価格\nFROM 商品\nORDER BY 価格 DESC, 商品ID ASC;"
          },
          {
            "label": "安い商品を3件",
            "sql": "SELECT TOP (3) 商品名, 価格\nFROM 商品\nORDER BY 価格 ASC, 商品ID ASC;"
          }
        ],
        "visual": "sort",
        "focus": [
          "TOP",
          "ORDER BY",
          "DESC"
        ]
      }
    ],
    "quiz": [
      {
        "question": "価格の安い順に並べる指定はどれですか？",
        "choices": [
          "ORDER BY 価格 DESC",
          "ORDER BY 価格 ASC",
          "WHERE 価格 ASC"
        ],
        "answer": 1,
        "explanation": "ASC は小さい順、DESC は大きい順です。並べ替えには ORDER BY を使います。",
        "hint": "昇順は、数が小さいところから大きいところへ進む順番です。"
      },
      {
        "question": "TOP (3) で「高い商品を3件」選ぶために必要な指定は？",
        "choices": [
          "ORDER BY 価格 DESC, 商品ID ASC",
          "ORDER BY 価格 ASC, 商品ID ASC",
          "WHERE 商品ID = 3"
        ],
        "answer": 0,
        "explanation": "価格を大きい順に並べ、その先頭から最大3件を取り出します。商品IDは価格が同じ場合の順番を決めます。",
        "hint": "TOP は件数を、ORDER BY はどの順から選ぶかを担当します。"
      },
      {
        "question": "ORDER BY を書かなかった検索結果の行順について、正しい説明は？",
        "choices": [
          "必ず商品IDの小さい順になる",
          "前回と同じ順番が必ず保たれる",
          "順番は保証されない"
        ],
        "answer": 2,
        "explanation": "SQL Serverでは、ORDER BY を指定しない結果の順序は保証されません。必要な順番を明示しましょう。",
        "hint": "元の表が画面で整列して見えていても、検索結果の順番の保証とは別です。"
      }
    ]
  },
  {
    "id": 7,
    "title": "取り出す結果を整えよう",
    "shortTitle": "AS・計算・DISTINCT",
    "intro": "見出しを読みやすくし、計算した列を作り、重複した結果をまとめます。どれも元のデータを変えず、表示する結果を整える操作です。",
    "recap": [
      "AS は、検索結果の列に別名を付けます。元のテーブルの列名は変わりません。",
      "SELECT の中で +・-・*・/ を使うと、計算した値を列として表示できます。",
      "DISTINCT は、選択したすべての列の値が同じ結果行を一つにまとめます。"
    ],
    "lessons": [
      {
        "title": "結果の見出しを変えよう",
        "lead": "列名の後ろに AS と別名を書くと、結果の見出しを変えられます。商品名 AS 名前 は、商品名の値を「名前」という見出しで表示する指定です。元のテーブルの列名は商品名のままです。",
        "sql": "SELECT 商品名 AS 名前, 価格 AS 販売価格\nFROM 商品;",
        "takeaway": "AS で付ける別名は、その検索結果の見出しとして使われます。",
        "tryThis": "販売価格 を 金額 に変え、変わる部分が見出しだけであることを確かめましょう。",
        "variations": [
          {
            "label": "見出しを金額に",
            "sql": "SELECT 商品名 AS 名前, 価格 AS 金額\nFROM 商品;"
          },
          {
            "label": "在庫にも別名",
            "sql": "SELECT 商品名 AS 名前, 在庫 AS 残り個数\nFROM 商品;"
          }
        ],
        "visual": "projection",
        "focus": [
          "SELECT",
          "AS"
        ]
      },
      {
        "title": "計算した列を作ろう",
        "lead": "SELECT の中に 価格 * 3 と書くと、商品ごとに価格を3倍した値を表示できます。計算した列にも AS で名前を付けられます。元の価格は書き換わりません。/ は割り算ですが、この教材の整数同士の割り算では小数部分が切り捨てられます。",
        "sql": "SELECT 商品名, 価格, 価格 * 3 AS 合計金額\nFROM 商品;",
        "takeaway": "SELECT の計算は、各行の値から新しい結果の列を作ります。",
        "tryThis": "* 3 を * 2 に変え、ノートの合計金額が500になることを確かめましょう。",
        "variations": [
          {
            "label": "2個分の金額",
            "sql": "SELECT 商品名, 価格, 価格 * 2 AS 合計金額\nFROM 商品;"
          },
          {
            "label": "50円引き",
            "sql": "SELECT 商品名, 価格, 価格 - 50 AS 割引後価格\nFROM 商品;"
          }
        ],
        "visual": "calculate",
        "focus": [
          "SELECT",
          "*",
          "AS"
        ]
      },
      {
        "title": "重複した結果をまとめよう",
        "lead": "SELECT DISTINCT カテゴリ と書くと、文房具と生活雑貨がそれぞれ1行ずつ表示されます。複数の列を選ぶときは、その列すべての値の組み合わせが同じ結果行だけをまとめます。",
        "sql": "SELECT DISTINCT カテゴリ\nFROM 商品;",
        "takeaway": "DISTINCT が比べるのは、SELECT で選んだ列の組み合わせです。",
        "tryThis": "カテゴリ の後ろに , 価格 を追加し、価格が違う商品は別の結果行として残ることを確かめましょう。",
        "variations": [
          {
            "label": "価格も選ぶ",
            "sql": "SELECT DISTINCT カテゴリ, 価格\nFROM 商品;"
          },
          {
            "label": "DISTINCTを外す",
            "sql": "SELECT カテゴリ\nFROM 商品;"
          }
        ],
        "visual": "projection",
        "focus": [
          "SELECT",
          "DISTINCT"
        ]
      }
    ],
    "quiz": [
      {
        "question": "SELECT 価格 AS 金額 FROM 商品; を実行すると、何が変わりますか？",
        "choices": [
          "商品テーブルの列名そのもの",
          "結果の見出し",
          "商品の価格の値"
        ],
        "answer": 1,
        "explanation": "AS は検索結果の列に別名を付けます。元のテーブルの列名や値は変更しません。",
        "hint": "AS は今回表示する結果を読みやすくする指定です。"
      },
      {
        "question": "ノートの価格は250です。価格 * 3 AS 合計金額 の値はいくつですか？",
        "choices": [
          "253",
          "750",
          "2503"
        ],
        "answer": 1,
        "explanation": "数値の * は掛け算です。250 × 3 なので750になります。",
        "hint": "価格に3を足すのではなく、3倍します。"
      },
      {
        "question": "SELECT DISTINCT カテゴリ, 価格 FROM 商品; で一つにまとまるのは？",
        "choices": [
          "カテゴリだけが同じ行",
          "価格だけが同じ行",
          "カテゴリと価格の両方が同じ結果行"
        ],
        "answer": 2,
        "explanation": "DISTINCT は選択したすべての列の組み合わせを比べます。この商品表では価格がすべて異なるため、6行のままです。",
        "hint": "SELECT に書かれた列をすべて見比べます。"
      }
    ]
  },
  {
    "id": 8,
    "title": "値が入っていないときは？",
    "shortTitle": "NULL・空文字",
    "intro": "空欄に見えるものも、中身が同じとは限りません。値が不明なNULLと、文字数0の文字列を区別して探しましょう。",
    "recap": [
      "NULL は値が不明・存在しない状態を表し、数値の0や空文字 N'' とは違います。",
      "NULLかどうかは = NULL ではなく IS NULL で調べます。",
      "IS NOT NULL はNULL以外を選びます。空文字もNULL以外に含まれます。"
    ],
    "lessons": [
      {
        "title": "NULLと空文字を見比べよう",
        "lead": "この章から、商品テーブルに「メモ」列を追加します。メモの NULL は、値が不明・存在しない状態です。タオルのメモは N'' という空文字で、文字数0の文字列が入っています。NULL、空文字、数値の0は別物です。画面では区別できるように表示しています。",
        "sql": "SELECT 商品名, メモ\nFROM 商品;",
        "takeaway": "見た目が空欄でも、NULLと空文字は違う状態です。",
        "tryThis": "FROM 商品 の後ろに WHERE メモ = N'' を追加し、空文字のタオルだけを取り出しましょう。",
        "variations": [
          {
            "label": "空文字だけ",
            "sql": "SELECT 商品名, メモ\nFROM 商品\nWHERE メモ = N'';"
          },
          {
            "label": "価格とメモを見る",
            "sql": "SELECT 商品名, 価格, メモ\nFROM 商品;"
          }
        ],
        "visual": "null",
        "focus": [
          "NULL",
          "N''"
        ]
      },
      {
        "title": "NULLの行を探そう",
        "lead": "NULLかどうかは IS NULL で調べます。メモ IS NULL なら、メモがNULLのノート・マグカップ・水筒を選べます。= NULL と書いてもNULLの行を探す条件にはなりません。 = NULLも<> NULLも条件に合うとは判定されず、この表では0行になります。NULL以外を探すときはIS NOT NULLを使います。",
        "sql": "SELECT 商品名, メモ\nFROM 商品\nWHERE メモ IS NULL;",
        "takeaway": "NULLを探すときは、専用の条件 IS NULL を使います。",
        "tryThis": "条件の後ろに AND 価格 >= 500 を追加し、メモがNULLで500円以上の商品を探しましょう。",
        "variations": [
          {
            "label": "NULLで500円以上",
            "sql": "SELECT 商品名, 価格, メモ\nFROM 商品\nWHERE メモ IS NULL AND 価格 >= 500;"
          },
          {
            "label": "NULLで500円未満",
            "sql": "SELECT 商品名, 価格, メモ\nFROM 商品\nWHERE メモ IS NULL AND 価格 < 500;"
          }
        ],
        "visual": "null",
        "focus": [
          "WHERE",
          "IS NULL"
        ]
      },
      {
        "title": "NULL以外の行を探そう",
        "lead": "IS NOT NULL は、値がNULLではない行を選びます。文字が入っているえんぴつ・ふせんだけでなく、メモが空文字のタオルも含みます。空文字も除くなら、メモ <> N'' という条件を追加します。",
        "sql": "SELECT 商品名, メモ\nFROM 商品\nWHERE メモ IS NOT NULL;",
        "takeaway": "IS NOT NULL は「文字が見える」ではなく「NULLではない」という条件です。",
        "tryThis": "条件の後ろに AND メモ <> N'' を追加し、空文字のタオルが結果から外れることを確かめましょう。",
        "variations": [
          {
            "label": "空文字も除く",
            "sql": "SELECT 商品名, メモ\nFROM 商品\nWHERE メモ IS NOT NULL AND メモ <> N'';"
          },
          {
            "label": "空文字だけを確認",
            "sql": "SELECT 商品名, メモ\nFROM 商品\nWHERE メモ = N'';"
          }
        ],
        "visual": "null",
        "focus": [
          "WHERE",
          "IS NOT NULL"
        ]
      }
    ],
    "quiz": [
      {
        "question": "NULLについて正しい説明はどれですか？",
        "choices": [
          "数値の0と同じ",
          "空文字 N'' と同じ",
          "値が不明・存在しない状態で、0や空文字とは違う"
        ],
        "answer": 2,
        "explanation": "0は数値、空文字は文字数0の文字列です。NULLはそれらの値とは別の状態を表します。",
        "hint": "「値があるが0・0文字」と「値が不明」を分けて考えましょう。"
      },
      {
        "question": "メモがNULLの行を探す条件はどれですか？",
        "choices": [
          "WHERE メモ = NULL",
          "WHERE メモ IS NULL",
          "WHERE メモ = N'NULL'"
        ],
        "answer": 1,
        "explanation": "NULLの判定には IS NULL を使います。N'NULL' はNULLという4文字の文字列で、NULLとは別です。",
        "hint": "NULLの判定には専用の書き方があります。"
      },
      {
        "question": "WHERE メモ IS NOT NULL に、空文字のメモを持つタオルは含まれますか？",
        "choices": [
          "含まれる",
          "含まれない",
          "価格によって決まる"
        ],
        "answer": 0,
        "explanation": "空文字はNULLではありません。そのため IS NOT NULL の結果に含まれます。",
        "hint": "文字が見えるかどうかではなく、NULLかどうかを調べています。"
      }
    ]
  },
  {
    "id": 9,
    "title": "件数や合計を求めよう",
    "shortTitle": "件数と合計",
    "intro": "一覧を眺めるだけでなく、「何種類ある？」「在庫は全部でいくつ？」にもSQLで答えられます。複数の行を、一つの集計結果へまとめてみましょう。",
    "recap": [
      "COUNT(*)は行数、COUNT(列名)はその列がNULLではない行数を数える。",
      "SUMは合計、AVGは平均を求める。この教材の整数列のAVGは整数を返す。",
      "MINは最小値、MAXは最大値。集計前にWHEREで対象の行を絞れる。"
    ],
    "lessons": [
      {
        "title": "行を数える・値を数える",
        "lead": "COUNT(*)は商品表の6行すべてを数えます。COUNT(メモ)はメモがNULLではない行だけを数えるので3件です。タオルの空文字はNULLではなく、数える対象に入ります。",
        "sql": "SELECT COUNT(*) AS 商品数,\n       COUNT(メモ) AS メモがある数\nFROM 商品;",
        "takeaway": "COUNTのかっこの中で、何を数えるかが変わります。",
        "tryThis": "COUNT(メモ)をCOUNT(商品名)に変えて、商品数と同じになるか確かめましょう。",
        "variations": [
          {
            "label": "在庫10以上を数える",
            "sql": "SELECT COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 10;"
          },
          {
            "label": "メモありを一覧で確認",
            "sql": "SELECT 商品名, メモ\nFROM 商品\nWHERE メモ IS NOT NULL\nORDER BY 商品ID;"
          }
        ],
        "visual": "aggregate",
        "focus": [
          "COUNT"
        ]
      },
      {
        "title": "合計と平均を求める",
        "lead": "SUM(在庫)は在庫を足して80個に、AVG(在庫)は平均を求めて13になります。SQL Serverではint型（整数を扱うデータ型）の列のAVGもint型なので、小数部分は切り捨てられます。80÷6の小数まで出す方法は、この入門編の先で学びます。",
        "sql": "SELECT SUM(在庫) AS 在庫の合計,\n       AVG(在庫) AS 在庫の平均\nFROM 商品;",
        "takeaway": "SUMは全部を足した値、AVGはNULLではない値の平均です。",
        "tryThis": "在庫を2か所とも価格へ変えて、価格の合計と平均を見てみましょう。",
        "variations": [
          {
            "label": "価格を集計する",
            "sql": "SELECT SUM(価格) AS 価格の合計,\n       AVG(価格) AS 価格の平均\nFROM 商品;"
          },
          {
            "label": "文房具だけを集計",
            "sql": "SELECT SUM(在庫) AS 在庫の合計,\n       AVG(在庫) AS 在庫の平均\nFROM 商品\nWHERE カテゴリ = N'文房具';"
          }
        ],
        "visual": "aggregate",
        "focus": [
          "SUM",
          "AVG"
        ]
      },
      {
        "title": "一番小さい値・大きい値を探す",
        "lead": "MIN(価格)は最も安い価格の80、MAX(価格)は最も高い価格の1500を返します。この結果は価格だけなので、商品名まで一緒に出るわけではありません。",
        "sql": "SELECT MIN(価格) AS 最低価格,\n       MAX(価格) AS 最高価格\nFROM 商品;",
        "takeaway": "最小・最大の値がほしいときはMIN・MAX。対応する行がほしいときは並べ替えも使えます。",
        "tryThis": "価格を2か所とも在庫へ変えて、在庫の最小値と最大値を調べましょう。",
        "variations": [
          {
            "label": "文房具の価格の幅",
            "sql": "SELECT MIN(価格) AS 最低価格,\n       MAX(価格) AS 最高価格\nFROM 商品\nWHERE カテゴリ = N'文房具';"
          },
          {
            "label": "一番高い商品を見る",
            "sql": "SELECT TOP (1) 商品名, 価格\nFROM 商品\nORDER BY 価格 DESC, 商品ID ASC;"
          }
        ],
        "visual": "aggregate",
        "focus": [
          "MIN",
          "MAX"
        ]
      }
    ],
    "quiz": [
      {
        "question": "商品表には6行あり、メモがNULLの行は3行です。COUNT(メモ)の結果は？",
        "choices": [
          "6",
          "3",
          "0"
        ],
        "answer": 1,
        "explanation": "COUNT(列名)は、その列がNULLではない行を数えます。空文字のメモも1件に数えます。",
        "hint": "COUNT(*)とCOUNT(列名)の違いを思い出しましょう。"
      },
      {
        "question": "在庫を全部足した数を求める式は？",
        "choices": [
          "COUNT(在庫)",
          "MAX(在庫)",
          "SUM(在庫)"
        ],
        "answer": 2,
        "explanation": "SUMは値の合計です。COUNT(在庫)は在庫がNULLでない行数、MAXは最も大きい値を求めます。",
        "hint": "足し算を担当する集計関数を選びましょう。"
      },
      {
        "question": "SQL Serverでint型の在庫にAVGを使うと、80÷6の結果はどうなる？",
        "choices": [
          "整数の13になる",
          "必ず13.333…になる",
          "平均は計算できない"
        ],
        "answer": 0,
        "explanation": "int型の列をAVGに渡すと結果もint型です。この例では小数部分が切り捨てられ、13になります。",
        "hint": "入力のデータ型が、結果のデータ型にも関係します。"
      }
    ]
  },
  {
    "id": 10,
    "title": "種類ごとに集計しよう",
    "shortTitle": "グループで集計",
    "intro": "お店全体の合計が出せたら、次は文房具と生活雑貨を分けて集計します。GROUP BYは、同じ値を持つ行をひとまとまりとして扱うための句です。",
    "recap": [
      "GROUP BYで同じカテゴリの行をまとめ、グループごとに集計する。",
      "SELECTに出す通常の列はGROUP BYにも指定する。集計関数でまとめる値とは役割が違う。",
      "GROUP BYだけでは並び順は決まらない。順番が必要ならORDER BYを付ける。"
    ],
    "lessons": [
      {
        "title": "カテゴリごとの箱に分ける",
        "lead": "GROUP BY カテゴリで商品を2つの箱に分けます。各箱にCOUNT(*)を使うので、文房具が3種類、生活雑貨が3種類という2行の結果になります。",
        "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nGROUP BY カテゴリ\nORDER BY カテゴリ;",
        "takeaway": "グループが2つなら、集計結果も2行になります。",
        "tryThis": "COUNT(*)をSUM(在庫)へ、AS 商品数をAS 在庫合計へ変えて、カテゴリごとの在庫数を調べましょう。",
        "variations": [
          {
            "label": "カテゴリごとの在庫",
            "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nGROUP BY カテゴリ\nORDER BY カテゴリ;"
          },
          {
            "label": "価格の平均を比べる",
            "sql": "SELECT カテゴリ, AVG(価格) AS 平均価格\nFROM 商品\nGROUP BY カテゴリ\nORDER BY 平均価格 DESC;"
          }
        ],
        "visual": "group",
        "focus": [
          "GROUP BY",
          "COUNT"
        ]
      },
      {
        "title": "一つの箱から複数の集計を作る",
        "lead": "同じグループから商品数と在庫の合計を同時に求められます。カテゴリは箱の名前です。一方、商品名は箱の中に複数あるので、そのままSELECTに足すと「どの商品名を出すのか」が決まりません。",
        "sql": "SELECT カテゴリ,\n       COUNT(*) AS 商品数,\n       SUM(在庫) AS 在庫合計\nFROM 商品\nGROUP BY カテゴリ\nORDER BY 在庫合計 DESC;",
        "takeaway": "通常の列を表示するならGROUP BYにも指定する、という基本ルールを覚えましょう。",
        "tryThis": "SUM(在庫)をMAX(価格)へ変え、別名も最高価格に直してみましょう。ORDER BYの名前も合わせます。",
        "variations": [
          {
            "label": "カテゴリごとの価格帯",
            "sql": "SELECT カテゴリ,\n       MIN(価格) AS 最低価格,\n       MAX(価格) AS 最高価格\nFROM 商品\nGROUP BY カテゴリ\nORDER BY 最高価格 DESC;"
          },
          {
            "label": "商品数と平均価格",
            "sql": "SELECT カテゴリ,\n       COUNT(*) AS 商品数,\n       AVG(価格) AS 平均価格\nFROM 商品\nGROUP BY カテゴリ\nORDER BY 平均価格 DESC;"
          }
        ],
        "visual": "group",
        "focus": [
          "GROUP BY",
          "COUNT",
          "SUM"
        ]
      },
      {
        "title": "先に絞ってから、箱に分ける",
        "lead": "WHERE 在庫 >= 10で対象の商品を4行に絞ってから、カテゴリごとに集計します。文房具は3種類、生活雑貨はタオルの1種類です。WHEREを変えると、箱に入る行が変わります。",
        "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 10\nGROUP BY カテゴリ\nORDER BY カテゴリ;",
        "takeaway": "WHEREは、グループを作る前の一行ずつに働きます。",
        "tryThis": "在庫 >= 10を価格 >= 500へ変えて、どのカテゴリが残るか予想しましょう。",
        "variations": [
          {
            "label": "500円以上を数える",
            "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 価格 >= 500\nGROUP BY カテゴリ\nORDER BY カテゴリ;"
          },
          {
            "label": "条件なしと比べる",
            "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nGROUP BY カテゴリ\nORDER BY カテゴリ;"
          }
        ],
        "visual": "group",
        "focus": [
          "WHERE",
          "GROUP BY"
        ]
      }
    ],
    "quiz": [
      {
        "question": "カテゴリが文房具と生活雑貨の2種類なら、カテゴリごとの集計結果は何行？",
        "choices": [
          "商品が6個なので6行",
          "2行",
          "必ず1行"
        ],
        "answer": 1,
        "explanation": "GROUP BY カテゴリは、同じカテゴリの行をまとめます。この商品表では2グループなので2行です。",
        "hint": "箱をカテゴリごとに一つずつ作るイメージです。"
      },
      {
        "question": "SELECT カテゴリ, SUM(在庫) に続く、基本的な集計の指定は？",
        "choices": [
          "GROUP BY カテゴリ",
          "GROUP BY 在庫",
          "ORDER BY カテゴリだけ"
        ],
        "answer": 0,
        "explanation": "カテゴリごとに在庫を足すので、GROUP BYにカテゴリを指定します。",
        "hint": "何ごとにまとめたいかを考えましょう。"
      },
      {
        "question": "GROUP BYを指定すれば、集計結果の並び順も保証される？",
        "choices": [
          "カテゴリ名の昇順になる",
          "合計の大きい順になる",
          "保証されないのでORDER BYを使う"
        ],
        "answer": 2,
        "explanation": "グループに分ける操作と、結果を並べる操作は別です。順番が必要ならORDER BYを明示します。",
        "hint": "グループ分けと並べ替えは、別の役割です。"
      }
    ]
  },
  {
    "id": 11,
    "title": "集計した結果を絞ろう",
    "shortTitle": "集計後の条件",
    "intro": "「在庫が10個以上の商品」と「在庫の合計が30個以上のカテゴリ」は、調べたい対象が違います。WHEREとHAVINGを、条件を確かめるタイミングで使い分けましょう。",
    "recap": [
      "WHEREは集計前の行を絞る。HAVINGは集計後のグループを絞る。",
      "SUMなどの集計結果への条件はHAVINGに書く。",
      "WHEREとHAVINGは同じSQLに書ける。先に行を絞り、その結果を集計してからグループを絞る。"
    ],
    "lessons": [
      {
        "title": "合計に条件を付ける",
        "lead": "カテゴリごとの在庫合計は、文房具が57、生活雑貨が23です。HAVING SUM(在庫) >= 30で、集計後の値が30以上の文房具だけを残します。",
        "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nGROUP BY カテゴリ\nHAVING SUM(在庫) >= 30\nORDER BY 在庫合計 DESC;",
        "takeaway": "HAVINGは、できあがったグループの集計値を見て判断します。",
        "tryThis": "30を20へ変えて、残るカテゴリが増えるか確かめましょう。",
        "variations": [
          {
            "label": "合計20以上",
            "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nGROUP BY カテゴリ\nHAVING SUM(在庫) >= 20\nORDER BY 在庫合計 DESC;"
          },
          {
            "label": "平均価格500以上",
            "sql": "SELECT カテゴリ, AVG(価格) AS 平均価格\nFROM 商品\nGROUP BY カテゴリ\nHAVING AVG(価格) >= 500\nORDER BY 平均価格 DESC;"
          }
        ],
        "visual": "having",
        "focus": [
          "GROUP BY",
          "HAVING"
        ]
      },
      {
        "title": "行の条件と、グループの条件を比べる",
        "lead": "WHERE 在庫 >= 10は、在庫が10個未満の商品を集計前に除きます。そのため生活雑貨の合計はタオルの10個だけです。例のボタンでHAVINGへ切り替えると、全商品の在庫を集計した合計57・23に条件を付けます。",
        "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nWHERE 在庫 >= 10\nGROUP BY カテゴリ\nORDER BY 在庫合計 DESC;",
        "takeaway": "同じ10という数でも、WHEREは各行、HAVINGはグループの合計を見ます。",
        "tryThis": "「合計10以上」の例へ切り替えて、生活雑貨の合計が10から23になる理由を考えましょう。",
        "variations": [
          {
            "label": "合計10以上",
            "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nGROUP BY カテゴリ\nHAVING SUM(在庫) >= 10\nORDER BY 在庫合計 DESC;"
          },
          {
            "label": "集計前の行を見る",
            "sql": "SELECT 商品名, カテゴリ, 在庫\nFROM 商品\nWHERE 在庫 >= 10\nORDER BY 商品ID;"
          }
        ],
        "visual": "having",
        "focus": [
          "WHERE",
          "HAVING"
        ]
      },
      {
        "title": "WHEREとHAVINGを一緒に使う",
        "lead": "まずWHEREで在庫10個以上の商品を選びます。その4行をカテゴリごとに数え、HAVINGで商品数が2以上のカテゴリを残します。結果は、対象商品が3種類ある文房具です。",
        "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 10\nGROUP BY カテゴリ\nHAVING COUNT(*) >= 2\nORDER BY 商品数 DESC, カテゴリ ASC;",
        "takeaway": "行を絞る→まとめる→グループを絞る、の順に追うと読みやすくなります。",
        "tryThis": "HAVINGの2を1へ変えて、生活雑貨も残ることを確かめましょう。",
        "variations": [
          {
            "label": "1種類以上のカテゴリ",
            "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 10\nGROUP BY カテゴリ\nHAVING COUNT(*) >= 1\nORDER BY 商品数 DESC, カテゴリ ASC;"
          },
          {
            "label": "200円以上を集計",
            "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 価格 >= 200\nGROUP BY カテゴリ\nHAVING COUNT(*) >= 2\nORDER BY 商品数 DESC, カテゴリ ASC;"
          }
        ],
        "visual": "having",
        "focus": [
          "WHERE",
          "GROUP BY",
          "HAVING"
        ]
      }
    ],
    "quiz": [
      {
        "question": "カテゴリごとの在庫合計が30以上、という条件を書く場所は？",
        "choices": [
          "SELECT",
          "WHERE",
          "HAVING"
        ],
        "answer": 2,
        "explanation": "合計は集計してから分かる値なので、HAVING SUM(在庫) >= 30と書きます。",
        "hint": "商品一つの在庫ではなく、グループの合計への条件です。"
      },
      {
        "question": "WHERE 在庫 >= 10 は、どのタイミングで対象を絞る？",
        "choices": [
          "グループを作る前",
          "グループの合計を計算した後",
          "結果を並べ替えた後"
        ],
        "answer": 0,
        "explanation": "WHEREは元の行に条件を付けます。残った行からGROUP BYのグループを作ります。",
        "hint": "箱へ入れる前に、一行ずつ条件を確かめます。"
      },
      {
        "question": "WHEREとHAVINGを同じSQLで使える？",
        "choices": [
          "必ずどちらか一つにする",
          "使える。行とグループに別々の条件を付けられる",
          "HAVINGを先に書く場合だけ使える"
        ],
        "answer": 1,
        "explanation": "WHEREで行を絞り、GROUP BYで集計し、HAVINGでグループを絞れます。",
        "hint": "それぞれの条件が、どの段階に働くかを考えましょう。"
      }
    ]
  },
  {
    "id": 12,
    "title": "2つの表をつなごう",
    "shortTitle": "表をつなぐ",
    "intro": "注文表には商品IDがありますが、商品名はありません。商品IDが一致する行を商品表から探すことで、商品名と注文の個数を一緒に表示できます。",
    "recap": [
      "INNER JOINはONの条件に一致する組み合わせを結果に出す。",
      "ASで表にpやoなどの別名を付けると、列の出どころを短く書ける。",
      "一つの商品に複数の注文があれば、結果にも商品が複数行現れる。JOINは一対一とは限らない。"
    ],
    "lessons": [
      {
        "title": "同じ商品IDを線でつなぐ",
        "lead": "商品表と注文表の「商品IDが等しい」という条件をONに書きます。INNER JOINでは、一致する相手がある行の組み合わせだけが結果に出ます。注文のないふせんと水筒は、この結果には現れません。 商品.商品名のような「表名.列名」は、どの表の列かを指定する書き方です。",
        "sql": "SELECT 商品.商品名, 注文.注文ID, 注文.個数\nFROM 商品\nINNER JOIN 注文\n    ON 商品.商品ID = 注文.商品ID\nORDER BY 注文.注文ID;",
        "takeaway": "ONは、左右の表のどの行を組み合わせるかを決める条件です。",
        "tryThis": "SELECTに商品.価格を追加して、商品の情報と注文の情報を一緒に出してみましょう。",
        "variations": [
          {
            "label": "商品価格も表示",
            "sql": "SELECT 商品.商品名, 商品.価格,\n       注文.注文ID, 注文.個数\nFROM 商品\nINNER JOIN 注文\n    ON 商品.商品ID = 注文.商品ID\nORDER BY 注文.注文ID;"
          },
          {
            "label": "注文表を先に書く",
            "sql": "SELECT 注文.注文ID, 商品.商品名, 注文.個数\nFROM 注文\nINNER JOIN 商品\n    ON 注文.商品ID = 商品.商品ID\nORDER BY 注文.注文ID;"
          }
        ],
        "visual": "join",
        "focus": [
          "INNER JOIN",
          "ON"
        ]
      },
      {
        "title": "表に短い名前を付ける",
        "lead": "商品 AS p、注文 AS oで、SQLの中だけで使う短い別名を付けます。p.商品名は商品表の商品名、o.個数は注文表の個数です。両方にある商品IDのような列も、どちらの表の列かを明確にできます。",
        "sql": "SELECT p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nINNER JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nORDER BY o.注文ID;",
        "takeaway": "表の別名はSQLを読みやすくするための名前です。元の表の名前は変わりません。",
        "tryThis": "p.価格 * o.個数 AS 金額をSELECTに加え、単価と個数を掛けてみましょう。",
        "variations": [
          {
            "label": "注文ごとの金額",
            "sql": "SELECT o.注文ID, p.商品名,\n       p.価格 * o.個数 AS 金額\nFROM 商品 AS p\nINNER JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nORDER BY o.注文ID;"
          },
          {
            "label": "3個以上の注文",
            "sql": "SELECT p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nINNER JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nWHERE o.個数 >= 3\nORDER BY o.注文ID;"
          }
        ],
        "visual": "join",
        "focus": [
          "AS",
          "ON"
        ]
      },
      {
        "title": "一つの商品が複数行になる理由",
        "lead": "ノートは商品表では1行ですが、注文表には1001と1003の2件があります。それぞれに商品行を組み合わせるので、JOIN後のノートは2行です。商品が増えたのではなく、注文との組み合わせを一行ずつ表示しています。",
        "sql": "SELECT p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nINNER JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nWHERE p.商品ID = 1\nORDER BY o.注文ID;",
        "takeaway": "JOIN後の行数は、一致する組み合わせの数です。元の表と同じとは限りません。",
        "tryThis": "p.商品ID = 1をp.商品ID = 3へ変え、マグカップの注文も2行になるか確かめましょう。",
        "variations": [
          {
            "label": "マグカップの注文",
            "sql": "SELECT p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nINNER JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nWHERE p.商品ID = 3\nORDER BY o.注文ID;"
          },
          {
            "label": "商品ごとの注文件数",
            "sql": "SELECT p.商品ID, p.商品名,\n       COUNT(*) AS 注文件数\nFROM 商品 AS p\nINNER JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nGROUP BY p.商品ID, p.商品名\nORDER BY p.商品ID;"
          }
        ],
        "visual": "join",
        "focus": [
          "INNER JOIN",
          "ON",
          "WHERE"
        ]
      }
    ],
    "quiz": [
      {
        "question": "INNER JOINのONには何を書く？",
        "choices": [
          "結果の見出し",
          "表どうしの行を組み合わせる条件",
          "結果を並べる順番"
        ],
        "answer": 1,
        "explanation": "ON 商品.商品ID = 注文.商品IDのように、一致させる条件を書きます。",
        "hint": "左右の表を結ぶ線のルールを考えましょう。"
      },
      {
        "question": "商品 AS pと書いたとき、p.商品名は何を表す？",
        "choices": [
          "商品表の商品名",
          "pという新しい表を作る命令",
          "商品名の値をpに変更する命令"
        ],
        "answer": 0,
        "explanation": "pはこのSQLの中で商品表を指す別名です。p.商品名で、列の所属を明確にできます。",
        "hint": "AS pは、表に短い呼び名を付けています。"
      },
      {
        "question": "商品表で1行のノートに注文が2件あるとき、JOIN後のノートは？",
        "choices": [
          "必ず1行",
          "エラーになる",
          "注文との組み合わせで2行"
        ],
        "answer": 2,
        "explanation": "注文が2件なら一致する組み合わせも2つあります。JOINによって一つの商品が複数行に現れることがあります。",
        "hint": "商品1行から、何本の線が注文へ伸びるかを数えましょう。"
      }
    ]
  },
  {
    "id": 13,
    "title": "相手がいない行も残そう",
    "shortTitle": "相手なしも残す",
    "intro": "注文された商品だけでなく、まだ注文されていない商品も一覧に出したい。そんなときは、左側の表を残すLEFT JOINを使います。",
    "recap": [
      "LEFT JOINは左側の表の行を残し、未一致なら右側の列をNULLにする。",
      "JOIN後のWHERE条件によっては、残した未一致行も結果から除かれる。",
      "未注文も含む注文件数にはCOUNT(右側の注文ID)を使う。COUNT(*)では未一致の行も1行と数える。"
    ],
    "lessons": [
      {
        "title": "左側の商品を全部残す",
        "lead": "FROM 商品の後にLEFT JOIN 注文と書くと、商品が左側です。注文がないふせんと水筒も残り、注文IDと個数はNULLになります。ノートとマグカップには注文が2件ずつあるので、結果は全部で8行です。",
        "sql": "SELECT p.商品ID, p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nORDER BY p.商品ID, o.注文ID;",
        "takeaway": "左の行を残すことと、左の行が一度だけ出ることは違います。複数の一致があれば複数行になります。",
        "tryThis": "LEFT JOINをINNER JOINに変えて、ふせんと水筒がどうなるか見てみましょう。",
        "variations": [
          {
            "label": "INNER JOINと比較",
            "sql": "SELECT p.商品ID, p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nINNER JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nORDER BY p.商品ID, o.注文ID;"
          },
          {
            "label": "商品名と注文IDだけ",
            "sql": "SELECT p.商品名, o.注文ID\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nORDER BY p.商品ID, o.注文ID;"
          }
        ],
        "visual": "leftjoin",
        "focus": [
          "LEFT JOIN",
          "ON"
        ]
      },
      {
        "title": "注文がない商品を見つける",
        "lead": "この注文表の注文IDには必ず値があります。LEFT JOIN後にo.注文ID IS NULLを付けると、注文に一致しなかったふせんと水筒を探せます。一方、WHERE o.個数 >= 3では未一致行のNULLは条件を満たさず、結果から外れます。",
        "sql": "SELECT p.商品ID, p.商品名\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nWHERE o.注文ID IS NULL\nORDER BY p.商品ID;",
        "takeaway": "LEFT JOINでも、その後のWHEREの条件次第で、未一致行は除かれます。",
        "tryThis": "「3個以上の注文」の例へ切り替え、注文がない商品が残るかを確かめましょう。",
        "variations": [
          {
            "label": "3個以上の注文",
            "sql": "SELECT p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nWHERE o.個数 >= 3\nORDER BY o.注文ID;"
          },
          {
            "label": "条件を外して比較",
            "sql": "SELECT p.商品ID, p.商品名, o.注文ID, o.個数\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nORDER BY p.商品ID, o.注文ID;"
          }
        ],
        "visual": "leftjoin",
        "focus": [
          "LEFT JOIN",
          "WHERE",
          "IS NULL"
        ]
      },
      {
        "title": "注文がない商品を0件と数える",
        "lead": "商品ごとに注文を数えるならCOUNT(o.注文ID)を使います。未一致行の注文IDはNULLなので、ふせんと水筒は0件です。COUNT(*)はJOIN後の行自体を数えるため、未一致でも1件と数えてしまいます。",
        "sql": "SELECT p.商品ID, p.商品名,\n       COUNT(o.注文ID) AS 注文件数\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nGROUP BY p.商品ID, p.商品名\nORDER BY p.商品ID;",
        "takeaway": "数えたいのが商品なのか、注文なのか、JOIN後の行なのかを意識しましょう。",
        "tryThis": "COUNT(o.注文ID)をCOUNT(*)へ変えて、未注文の商品が1件になる理由を確かめましょう。",
        "variations": [
          {
            "label": "二つのCOUNTを比較",
            "sql": "SELECT p.商品ID, p.商品名,\n       COUNT(*) AS 結果の行数,\n       COUNT(o.注文ID) AS 注文件数\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nGROUP BY p.商品ID, p.商品名\nORDER BY p.商品ID;"
          },
          {
            "label": "注文2件以上の商品",
            "sql": "SELECT p.商品ID, p.商品名,\n       COUNT(o.注文ID) AS 注文件数\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nGROUP BY p.商品ID, p.商品名\nHAVING COUNT(o.注文ID) >= 2\nORDER BY p.商品ID;"
          }
        ],
        "visual": "leftjoin",
        "focus": [
          "LEFT JOIN",
          "COUNT",
          "GROUP BY"
        ]
      }
    ],
    "quiz": [
      {
        "question": "商品を左にLEFT JOINしたとき、注文のない商品の注文IDは？",
        "choices": [
          "0になる",
          "商品IDと同じになる",
          "NULLになる"
        ],
        "answer": 2,
        "explanation": "右側に一致する注文がないため、注文IDなど右側の列がNULLになります。",
        "hint": "一致する相手がいないことを、右側の値で表します。"
      },
      {
        "question": "LEFT JOINの後にWHERE o.個数 >= 3を付けると、注文がない商品は？",
        "choices": [
          "個数がNULLで条件を満たさず、結果から外れる",
          "LEFT JOINなので必ず残る",
          "個数が3として扱われる"
        ],
        "answer": 0,
        "explanation": "LEFT JOINで残した行もWHEREの対象です。NULLとの大小比較は真にならないため、その行は残りません。",
        "hint": "WHEREはJOINで作った結果にも条件を付けます。"
      },
      {
        "question": "未注文の商品を0件と数えたいとき、適切なのは？",
        "choices": [
          "COUNT(*)",
          "COUNT(o.注文ID)",
          "SUM(p.商品ID)"
        ],
        "answer": 1,
        "explanation": "COUNT(o.注文ID)はNULLを数えません。未一致の商品は注文IDがNULLなので0件です。",
        "hint": "注文が存在する行だけを数える必要があります。"
      }
    ]
  },
  {
    "id": 14,
    "title": "SQLを書く順番と、結果ができる順番",
    "shortTitle": "処理の順序",
    "intro": "SQLはSELECTから書きますが、意味を読み解くときは「どの表を使うか」からたどれます。ここでは、結果の組み立てを理解するための論理的な処理順序を振り返ります。実際の内部処理の実行順序を表す図ではありません。",
    "recap": [
      "書く順番はSELECTから。論理的にはFROMで対象を決め、条件・集計・列の選択へ進む。",
      "WHEREは集計前、HAVINGは集計後。SELECTの列別名はWHEREでは使えない。",
      "DISTINCTで重複を除き、ORDER BYで並べ、TOPで件数を制限する。これは論理的な順序であり物理的な実行順序ではない。"
    ],
    "lessons": [
      {
        "title": "表を決める→行を選ぶ→列を選ぶ",
        "lead": "このSQLはSELECTから書いています。意味をたどると、FROMで商品表を使い、WHEREで500円以上の行を選び、SELECTで商品名と価格を取り出し、ORDER BYで並べます。表示する列の別名はSELECTで付くので、WHEREには元の列名を書きます。",
        "sql": "SELECT 商品名, 価格 AS 値段\nFROM 商品\nWHERE 価格 >= 500\nORDER BY 値段 DESC, 商品名 ASC;",
        "takeaway": "SQLの見た目の順番と、意味を理解するための順番を分けて考えましょう。",
        "tryThis": "500を800に変えて、WHEREの段階で残る行がどれかを予想しましょう。",
        "variations": [
          {
            "label": "800円以上でたどる",
            "sql": "SELECT 商品名, 価格 AS 値段\nFROM 商品\nWHERE 価格 >= 800\nORDER BY 値段 DESC, 商品名 ASC;"
          },
          {
            "label": "名前だけを取り出す",
            "sql": "SELECT 商品名\nFROM 商品\nWHERE 価格 >= 500\nORDER BY 商品名;"
          }
        ],
        "visual": "order",
        "focus": [
          "FROM",
          "WHERE",
          "SELECT",
          "ORDER BY"
        ]
      },
      {
        "title": "集計前と集計後の条件を追う",
        "lead": "FROMで商品表を選び、WHEREで価格200円以上の4行を残します。GROUP BYでカテゴリ別に分けると在庫合計は文房具12、生活雑貨23です。HAVINGで20以上の生活雑貨を残して、SELECTで結果の列を作ります。",
        "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nWHERE 価格 >= 200\nGROUP BY カテゴリ\nHAVING SUM(在庫) >= 20\nORDER BY 在庫合計 DESC;",
        "takeaway": "途中の表を見ると、WHEREとHAVINGが別の対象を絞っていることを確認できます。",
        "tryThis": "価格 >= 200を価格 >= 100へ変え、文房具の在庫合計がどう変わるかを追ってみましょう。",
        "variations": [
          {
            "label": "100円以上でたどる",
            "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nWHERE 価格 >= 100\nGROUP BY カテゴリ\nHAVING SUM(在庫) >= 20\nORDER BY 在庫合計 DESC;"
          },
          {
            "label": "HAVINGを外す",
            "sql": "SELECT カテゴリ, SUM(在庫) AS 在庫合計\nFROM 商品\nWHERE 価格 >= 200\nGROUP BY カテゴリ\nORDER BY 在庫合計 DESC;"
          }
        ],
        "visual": "order",
        "focus": [
          "WHERE",
          "GROUP BY",
          "HAVING",
          "SELECT"
        ]
      },
      {
        "title": "重複を除く→並べる→件数を絞る",
        "lead": "SELECTで注文の商品IDだけを取り出すと、同じIDが何行も現れます。DISTINCTで重複を除き、ORDER BYで数値の小さい順に並べ、TOP (1)で先頭1件を選びます。TOPはSELECTの近くに書きますが、論理的には並べ替えの後です。",
        "sql": "SELECT DISTINCT TOP (1) 商品ID\nFROM 注文\nORDER BY 商品ID ASC;",
        "takeaway": "上位を選ぶTOPは、何の順番で選ぶかをORDER BYで明示しましょう。この順序図は内部処理の速さを説明するものではありません。",
        "tryThis": "TOP (1)をTOP (2)へ変え、商品IDが1と2の2行になることを確かめましょう。",
        "variations": [
          {
            "label": "重複を除かない",
            "sql": "SELECT TOP (2) 商品ID\nFROM 注文\nORDER BY 商品ID ASC;"
          },
          {
            "label": "上位2種類のID",
            "sql": "SELECT DISTINCT TOP (2) 商品ID\nFROM 注文\nORDER BY 商品ID ASC;"
          }
        ],
        "visual": "order",
        "focus": [
          "SELECT",
          "DISTINCT",
          "ORDER BY",
          "TOP"
        ]
      }
    ],
    "quiz": [
      {
        "question": "この章で示す「論理的な処理順序」とは？",
        "choices": [
          "CPUが必ずその通りに動く順番",
          "SQLの意味と結果の組み立てを理解するための順序",
          "SQLを書くときの行の順番"
        ],
        "answer": 1,
        "explanation": "SQL Serverの内部では処理方法が選ばれます。ここではSQLの意味を追うための論理的な順序を学んでいます。",
        "hint": "この図は、内部の処理速度や実行計画を示すものではありません。"
      },
      {
        "question": "SELECT 価格 AS 値段 と書いたとき、WHEREで使う基本の列名は？",
        "choices": [
          "値段だけ",
          "どちらの名前も使えない",
          "元の列名の価格"
        ],
        "answer": 2,
        "explanation": "WHEREは論理的にはSELECTより前なので、SELECTで付ける列別名の値段は使えません。ORDER BYでは使えます。",
        "hint": "列別名を付けるのはSELECTの段階です。"
      },
      {
        "question": "価格が高い上位2件を選ぶとき、論理的にはどちらが先？",
        "choices": [
          "ORDER BYで並べてからTOPで2件を選ぶ",
          "TOPで適当な2件を取ってから並べる",
          "TOPとORDER BYは併用できない"
        ],
        "answer": 0,
        "explanation": "ORDER BY 価格 DESCで順番を決めた結果から、TOP (2)で2件を選ぶと考えます。",
        "hint": "上位の意味を先に決めてから、必要な件数を取り出します。"
      }
    ]
  },
  {
    "id": 15,
    "title": "自分でSQLを組み立てよう",
    "shortTitle": "総合演習",
    "intro": "最後は、お店の人からの小さな依頼にSQLで答えます。取り出す列、条件、並び順を確認してから書いてみましょう。ここまで学んだ句を、一つずつ組み合わせれば大丈夫です。",
    "recap": [
      "ほしい結果の列・対象の行・並び順を先に整理すると、SQLを組み立てやすい。",
      "行の条件はWHERE、グループの条件はHAVING。必要に応じてJOINで表をつなぐ。",
      "元の表、途中の結果、最終結果を見比べれば、自分でSQLを確かめられる。"
    ],
    "lessons": [
      {
        "title": "演習1：予算内の商品を探す",
        "lead": "在庫のある手頃な商品を、安い順に紹介したいという依頼です。WHEREで二つの条件を組み合わせ、ORDER BYで価格と商品IDの順番を指定しましょう。",
        "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 <= 600 AND 在庫 >= 10\nORDER BY 価格 ASC, 商品ID ASC;",
        "takeaway": "条件を一つずつ読むと、列を選ぶ・行を絞る・並べるという基本が見えてきます。",
        "tryThis": "600円以内の条件を300円以内へ変えて、タオルが対象から外れるか確かめましょう。",
        "variations": [
          {
            "label": "300円以内なら",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 <= 300 AND 在庫 >= 10\nORDER BY 価格 ASC, 商品ID ASC;"
          },
          {
            "label": "高い順なら",
            "sql": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 <= 600 AND 在庫 >= 10\nORDER BY 価格 DESC, 商品ID ASC;"
          }
        ],
        "visual": "challenge",
        "focus": [
          "SELECT",
          "WHERE",
          "AND",
          "ORDER BY"
        ],
        "challenge": {
          "prompt": "商品表から「価格が600円以下、かつ在庫が10個以上」の商品を探します。表示する列は商品名、価格の順。価格が安い順に並べ、同じ価格なら商品IDが小さい順にしましょう。",
          "starter": "SELECT 商品名, 価格\nFROM 商品;",
          "solution": "SELECT 商品名, 価格\nFROM 商品\nWHERE 価格 <= 600 AND 在庫 >= 10\nORDER BY 価格 ASC, 商品ID ASC;"
        }
      },
      {
        "title": "演習2：条件に合うカテゴリを調べる",
        "lead": "在庫が10個以上ある商品だけを対象に、品ぞろえを確認します。カテゴリごとに商品を数え、その対象商品が2種類以上あるカテゴリを探しましょう。",
        "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 10\nGROUP BY カテゴリ\nHAVING COUNT(*) >= 2\nORDER BY 商品数 DESC, カテゴリ ASC;",
        "takeaway": "WHEREで対象商品を選んでからCOUNTし、HAVINGでカテゴリを絞ります。",
        "tryThis": "HAVINGの2を1へ変えて、結果が1カテゴリから2カテゴリへ増えるか確かめましょう。",
        "variations": [
          {
            "label": "1種類以上を表示",
            "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 10\nGROUP BY カテゴリ\nHAVING COUNT(*) >= 1\nORDER BY 商品数 DESC, カテゴリ ASC;"
          },
          {
            "label": "在庫5以上を対象に",
            "sql": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 5\nGROUP BY カテゴリ\nHAVING COUNT(*) >= 2\nORDER BY 商品数 DESC, カテゴリ ASC;"
          }
        ],
        "visual": "challenge",
        "focus": [
          "WHERE",
          "GROUP BY",
          "HAVING",
          "COUNT"
        ],
        "challenge": {
          "prompt": "商品表で在庫が10個以上の行だけを対象に、カテゴリごとの商品数を数えます。その商品数が2以上のカテゴリだけを表示しましょう。列はカテゴリ、商品数の順。商品数が多い順、同数ならカテゴリの昇順に並べます。",
          "starter": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品;",
          "solution": "SELECT カテゴリ, COUNT(*) AS 商品数\nFROM 商品\nWHERE 在庫 >= 10\nGROUP BY カテゴリ\nHAVING COUNT(*) >= 2\nORDER BY 商品数 DESC, カテゴリ ASC;"
        }
      },
      {
        "title": "演習3：まだ注文されていない商品を探す",
        "lead": "次に紹介する商品を考えるため、注文が一件もない商品を見つけます。商品表を左側にしたLEFT JOINで全商品を残し、注文IDがNULLの行を探しましょう。",
        "sql": "SELECT p.商品名, p.価格\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nWHERE o.注文ID IS NULL\nORDER BY p.価格 ASC, p.商品ID ASC;",
        "takeaway": "表をつなぐ目的が決まれば、どちらを残すか、何を条件にするかも考えやすくなります。",
        "tryThis": "WHEREの条件を外して、注文済みの商品も含む途中の結果を確かめましょう。",
        "variations": [
          {
            "label": "途中の結果を見る",
            "sql": "SELECT p.商品ID, p.商品名, o.注文ID\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nORDER BY p.商品ID, o.注文ID;"
          },
          {
            "label": "全商品の注文件数",
            "sql": "SELECT p.商品ID, p.商品名,\n       COUNT(o.注文ID) AS 注文件数\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nGROUP BY p.商品ID, p.商品名\nORDER BY p.商品ID;"
          }
        ],
        "visual": "challenge",
        "focus": [
          "LEFT JOIN",
          "ON",
          "WHERE",
          "IS NULL"
        ],
        "challenge": {
          "prompt": "商品表と注文表を使い、一件も注文されていない商品を探します。商品IDが一致する行をつなぎ、表示する列は商品名、価格の順。価格が安い順、同じ価格なら商品IDが小さい順に並べましょう。",
          "starter": "SELECT p.商品名, p.価格\nFROM 商品 AS p;",
          "solution": "SELECT p.商品名, p.価格\nFROM 商品 AS p\nLEFT JOIN 注文 AS o\n    ON p.商品ID = o.商品ID\nWHERE o.注文ID IS NULL\nORDER BY p.価格 ASC, p.商品ID ASC;"
        }
      }
    ],
    "quiz": [
      {
        "question": "「600円以下、かつ在庫10個以上」を表す条件は？",
        "choices": [
          "WHERE 価格 <= 600 AND 在庫 >= 10",
          "WHERE 価格 <= 600 OR 在庫 >= 10",
          "HAVING 価格 <= 600 AND 在庫 >= 10"
        ],
        "answer": 0,
        "explanation": "両方を満たす行なのでANDを使います。一行ずつの条件はWHEREに書きます。",
        "hint": "「かつ」は、二つの条件が同時に成立するという意味です。"
      },
      {
        "question": "カテゴリごとの商品数が2以上、という条件は？",
        "choices": [
          "WHERE COUNT(*) >= 2",
          "HAVING COUNT(*) >= 2",
          "ORDER BY COUNT(*) >= 2"
        ],
        "answer": 1,
        "explanation": "商品数はグループを集計して得られるため、HAVINGで条件を付けます。",
        "hint": "数え終わったグループを絞る句を選びましょう。"
      },
      {
        "question": "この商品表と注文表で、一度も注文されていない商品は？",
        "choices": [
          "ノートとマグカップ",
          "えんぴつとタオル",
          "ふせんと水筒"
        ],
        "answer": 2,
        "explanation": "商品IDが4のふせん、6の水筒に一致する注文はありません。LEFT JOINとIS NULLで確認できます。",
        "hint": "最後の演習の結果を思い出してみましょう。"
      }
    ]
  }
];
