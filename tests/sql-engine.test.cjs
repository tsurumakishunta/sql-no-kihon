const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const engine=require('../dist/sql-engine.js');
const rows=sql=>engine.execute(sql).rows;
test('NULL, empty strings and three-valued logic remain distinct',()=>{
 assert.deepEqual(rows('SELECT 商品ID FROM 商品 WHERE メモ IS NULL ORDER BY 商品ID'),[[1],[3],[6]]);
 assert.deepEqual(rows("SELECT 商品ID FROM 商品 WHERE メモ = N''"),[[5]]);
 assert.deepEqual(rows('SELECT 商品ID FROM 商品 WHERE メモ = NULL'),[]);
 assert.deepEqual(rows('SELECT 商品ID FROM 商品 WHERE メモ <> NULL'),[]);
 assert.deepEqual(rows("SELECT 商品ID FROM 商品 WHERE NOT (メモ = N'定番') ORDER BY 商品ID"),[[4],[5]]);
 assert.deepEqual(rows("SELECT 商品ID FROM 商品 WHERE メモ = N'定番' OR 商品ID = 1 ORDER BY 商品ID"),[[1],[2]]);
 assert.deepEqual(rows('SELECT 商品ID FROM 商品 WHERE 商品ID NOT IN (1, NULL)'),[]);
});
test('aggregation: empty input, nullable count, integer AVG and grouping',()=>{
 assert.deepEqual(rows('SELECT COUNT(*), COUNT(メモ) FROM 商品'),[[6,3]]);
 assert.deepEqual(rows('SELECT COUNT(*), SUM(価格), AVG(価格) FROM 商品 WHERE 商品ID=999'),[[0,null,null]]);
 assert.deepEqual(rows('SELECT AVG(価格) FROM 商品 WHERE 商品ID IN (1,3,4)'),[[443]]);
 assert.deepEqual(rows('SELECT メモ,COUNT(*) FROM 商品 GROUP BY メモ HAVING COUNT(*) > 1'),[[null,3]]);
 assert.deepEqual(rows('SELECT カテゴリ, COUNT(*), SUM(価格) FROM 商品 WHERE 価格 >= 200 GROUP BY カテゴリ HAVING COUNT(*) >= 2'),[['生活雑貨',3,3000]]);
 assert.deepEqual(rows('SELECT COUNT(*) FROM 商品 WHERE 商品ID = 999 GROUP BY カテゴリ'),[]);
});
test('TOP follows ORDER BY and DISTINCT',()=>{
 assert.deepEqual(rows('SELECT TOP (2) 商品ID,価格 AS 値段 FROM 商品 ORDER BY 値段 DESC,商品ID'),[[6,1500],[3,900]]);
 assert.deepEqual(rows('SELECT DISTINCT TOP (2) 商品ID FROM 注文 ORDER BY 商品ID'),[[1],[2]]);
 assert.deepEqual(rows('SELECT TOP (2) 商品ID FROM 商品 ORDER BY メモ,商品ID'),[[1],[3]]);
 assert.deepEqual(rows('SELECT TOP (0) 商品ID FROM 商品 ORDER BY 商品ID'),[]);
});
test('JOIN preserves multiplicity, and ON differs from WHERE',()=>{
 const from='FROM 商品 AS p LEFT JOIN 注文 AS o ON p.商品ID=o.商品ID';
 assert.equal(rows('SELECT p.商品名,o.注文ID '+from).length,8);
 assert.deepEqual(rows('SELECT p.商品ID,o.注文ID '+from+' WHERE o.個数>=2 ORDER BY p.商品ID,o.注文ID'),[[1,1001],[1,1003],[2,1004],[3,1006],[5,1005]]);
 assert.deepEqual(rows('SELECT p.商品ID,o.注文ID '+from+' AND o.個数>=2 ORDER BY p.商品ID,o.注文ID'),[[1,1001],[1,1003],[2,1004],[3,1006],[4,null],[5,1005],[6,null]]);
 assert.deepEqual(rows('SELECT p.商品ID,COUNT(o.注文ID) '+from+' GROUP BY p.商品ID ORDER BY p.商品ID'),[[1,2],[2,1],[3,2],[4,0],[5,1],[6,0]]);
});
test('aliases and non-grouped columns fail clearly',()=>{
 for(const sql of ['SELECT 価格 AS 値段 FROM 商品 WHERE 値段>500','SELECT カテゴリ,COUNT(*) AS 件数 FROM 商品 GROUP BY カテゴリ HAVING 件数>2','SELECT 商品名,SUM(価格) FROM 商品 GROUP BY カテゴリ','SELECT 商品ID FROM 商品 AS p JOIN 注文 AS o ON p.商品ID=o.商品ID'])assert.throws(()=>rows(sql));
});
test('predicates cannot appear in scalar positions',()=>{
 for(const sql of ['SELECT COUNT(価格 > 500) FROM 商品','SELECT COUNT(*) FROM 商品 GROUP BY メモ IS NULL','SELECT 商品ID FROM 商品 ORDER BY 価格 > 500','SELECT 商品ID FROM 商品 WHERE NULL','SELECT SUM(メモ) FROM 商品 WHERE 商品ID=999','SELECT COUNT(*) FROM 商品 GROUP BY 1'])assert.throws(()=>rows(sql));
});
test('decimal classroom arithmetic and integer overflow',()=>{
 assert.deepEqual(rows('SELECT 商品ID FROM 商品 WHERE 価格 * 1.1 = 990'),[[3]]);
 assert.deepEqual(rows('SELECT 価格 / 100 FROM 商品 WHERE 商品ID=1'),[[2]]);
 assert.deepEqual(rows('SELECT 価格 / 100.0 FROM 商品 WHERE 商品ID=1'),[[2.5]]);
 assert.throws(()=>rows('SELECT SUM(価格 * 1000000) FROM 商品'));
 assert.throws(()=>rows('SELECT 価格 / 0 FROM 商品'));
});
test('quoted text, escaped quotes and LIKE wildcards',()=>{
 assert.deepEqual(rows("SELECT N'NOT',N'(',N'NULL',N'It''s' FROM 商品 WHERE 商品ID=1"),[['NOT','(','NULL',"It's"]]);
 assert.throws(()=>rows('SELECT [NULL] FROM 商品'));
 assert.deepEqual(rows("SELECT 商品ID FROM 商品 WHERE 商品名 LIKE N'%ノート%'"),[[1]]);
 assert.deepEqual(rows("SELECT 商品ID FROM 商品 WHERE メモ = N'定番 '"),[[2]]);
 assert.deepEqual(rows('SELECT [商品名] AS [ORDER] FROM [商品] WHERE [商品ID]=1'),[['ノート']]);
});
test('read-only boundaries and binding before empty results',()=>{
 for(const sql of ['DELETE FROM 商品','SELECT * FROM 商品; DROP TABLE 商品;','SELECT 商品名 FROM 商品 LIMIT 2','SELECT 未知 FROM 商品 WHERE 商品ID=999'])assert.throws(()=>rows(sql));
 const db=engine.database(),copy=JSON.stringify(db);engine.execute('SELECT * FROM 商品 WHERE 価格>1000',db);assert.equal(JSON.stringify(db),copy);
});
test('every teaching example executes for its chapter dataset',()=>{
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../dist/course-data.js'),'utf8'),ctx);
 let count=0;for(const chapter of ctx.window.CourseChapters){assert.equal(chapter.lessons.length,3);assert.equal(chapter.quiz.length,3);for(const lesson of chapter.lessons){for(const sql of [lesson.sql,...lesson.variations.map(v=>v.sql)]){engine.execute(sql,engine.database(chapter.id));count++;}if(lesson.challenge)assert.deepEqual(engine.execute(lesson.challenge.solution).rows,engine.execute(lesson.sql).rows);}}
 assert.equal(count,126);
});
