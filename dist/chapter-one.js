window.ChapterOne=(()=>{
'use strict';
const products = [
  {id:1,name:'ノート',category:'文房具',price:250,stock:12},
  {id:2,name:'えんぴつ',category:'文房具',price:80,stock:30},
  {id:3,name:'マグカップ',category:'生活雑貨',price:900,stock:8},
  {id:4,name:'ふせん',category:'文房具',price:180,stock:15},
  {id:5,name:'タオル',category:'生活雑貨',price:600,stock:10},
  {id:6,name:'水筒',category:'生活雑貨',price:1500,stock:5},
];
const columns = [{key:'id',label:'商品ID'},{key:'name',label:'商品名'},{key:'category',label:'カテゴリ'},{key:'price',label:'価格（円）'},{key:'stock',label:'在庫（個）'}];
const state = {step:0,completed:new Set(),table:'products',mode:'row',row:0,column:'price',sqlRan:false,quizIndex:0,answers:new Set(),wrong:null};
const content = document.getElementById('lesson-content');
const dbIcon = '<svg class="db-icon" viewBox="0 0 24 29" fill="none" aria-hidden="true"><ellipse cx="12" cy="5" rx="10" ry="4" stroke="currentColor" stroke-width="1.5"/><path d="M2 5v18c0 2.2 4.5 4 10 4s10-1.8 10-4V5M2 14c0 2.2 4.5 4 10 4s10-1.8 10-4" stroke="currentColor" stroke-width="1.5"/></svg>';
const tables = {
  products:{name:'商品',english:'Products',headers:['商品名','価格'],rows:[['ノート','250'],['えんぴつ','80'],['マグカップ','900']],description:'何を、いくらで売っている？',detail:'商品名・価格・在庫など、商品の情報をまとめます。'},
  orders:{name:'注文',english:'Orders',headers:['注文ID','商品ID'],rows:[['1001','1'],['1002','3'],['1003','1']],description:'どの商品が注文された？',detail:'注文ID・商品ID・個数など、注文の情報をまとめます。'},
  customers:{name:'お客さま',english:'Customers',headers:['顧客ID','名前'],rows:[['101','田中さん'],['102','佐藤さん'],['103','鈴木さん']],description:'どんなお客さまがいる？',detail:'顧客ID・名前など、お客さまの情報をまとめます。'},
};
function miniTable(data){return `<span class="mini-table" aria-hidden="true"><span class="mini-head">${data.headers.map(h=>`<span>${h}</span>`).join('')}</span>${data.rows.map(row=>`<span class="mini-row">${row.map(v=>`<span>${v}</span>`).join('')}</span>`).join('')}</span>`;}
function heading(title,intro){return `<h1 class="lesson-title">${title}</h1>`+CourseGuide.say(intro,{html:true});}
function takeaway(text){return CourseGuide.say(text,{speaker:"cornalina",label:"ここだけ覚えよう",html:true});}
function renderDatabase(){
  const selected=tables[state.table];
  return heading('データを、整理してしまう場所。','お店には、商品・注文・お客さまなど、いろいろな情報があります。<br>関連する情報を整理して保存し、取り出せるようにするのが<strong>データベース</strong>です。')+
  `<section class="paper-board" aria-label="お店のデータベースの図"><div class="board-header"><span class="board-label">小さなお店のデータをのぞいてみよう</span><span class="tiny-label">DATABASE</span></div><div class="database-body"><div class="database-box"><div class="database-caption">${dbIcon}お店のデータベース</div><div class="table-cards">${Object.entries(tables).map(([key,t])=>`<button type="button" class="table-card" data-table="${key}" aria-pressed="${key===state.table}" aria-label="${t.name}テーブルを見る"><span class="table-card-top">${t.name}<span class="table-card-tag">${t.english}</span></span>${miniTable(t)}<span class="card-footer">この表を見てみる ↗</span></button>`).join('')}</div><p class="board-instruction">表を選んで、中に入る情報を見てみよう。</p></div><div class="selection-note" aria-live="polite"><span class="note-icon" aria-hidden="true">↳</span><p><strong>「${selected.name}」の表：${selected.description}</strong>${selected.detail}</p></div></div></section>`+
  takeaway('データベースの中では、情報を<strong>「テーブル（表）」</strong>に分けて保存できます。');
}
function productTable({interactive=false,compact=false,limit=6,highlight=null,caption='商品テーブル'}={}){
  const active=highlight||(interactive?{mode:state.mode,row:state.row,column:state.column}:null);
  return `<div class="table-scroll"><table class="data-table ${interactive?'interactive':''} ${compact?'compact-table':''}"><caption>${caption}<span class="tiny-label"> · ${limit}行 / 5列</span></caption><thead><tr>${columns.map(col=>`<th scope="col" class="${active&&active.mode!=='row'&&active.column===col.key?'selected-col':''}">${interactive?`<button type="button" data-column="${col.key}" aria-label="${col.label}の列を選ぶ">${col.label}</button>`:col.label}</th>`).join('')}</tr></thead><tbody>${products.slice(0,limit).map((p,r)=>`<tr>${columns.map(col=>{
    let style=['id','price','stock'].includes(col.key)?'number ':'';
    if(active){if(active.mode==='row'&&active.row===r)style+='selected-row ';if(active.mode==='column'&&active.column===col.key)style+='selected-col ';if(active.mode==='cell'&&active.row===r&&active.column===col.key)style+='selected-cell ';}
    const value=typeof p[col.key]==='number'?p[col.key].toLocaleString('ja-JP'):p[col.key];
    return `<td class="${style}">${interactive?`<button type="button" data-cell="${r}:${col.key}" aria-label="${p.name}の${col.label}：${value}">${value}</button>`:value}</td>`;
  }).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function renderTable(){
  return heading('テーブルは、情報を並べた「表」。','ここからは<strong>商品テーブル</strong>を見てみましょう。<br>この表では、1つの商品の情報を横に並べ、同じ種類の情報を縦にそろえています。')+
  `<section class="paper-board" aria-label="商品テーブルのしくみ"><div class="board-header"><span class="board-label">お店にある6つの商品</span><span class="tiny-label">TABLE</span></div><div class="work-area">${productTable({highlight:{mode:'row',row:0}})}<div class="table-facts"><div class="fact"><strong class="fact-emphasis">横のまとまり ＝ 行</strong><p>色のついた1行には、ノート1つ分の情報が並んでいます。</p></div><div class="fact"><strong class="fact-column">縦のまとまり ＝ 列</strong><p>「価格」の列には、それぞれの商品の価格が並んでいます。</p></div></div></div></section>`+
  takeaway('テーブルは、<strong>行と列でできた表</strong>。一番上の見出しには、列の名前を書きます。');
}
function inspector(){
  const p=products[state.row];const col=columns.find(c=>c.key===state.column);
  if(state.mode==='row')return `<div class="inspector" aria-live="polite"><h3>1行 ＝ この表では、1つの商品の情報</h3><p>「${p.name}」の行には、商品ID・商品名・カテゴリ・価格・在庫がまとまっています。</p></div>`;
  if(state.mode==='column')return `<div class="inspector column" aria-live="polite"><h3>1列 ＝ 同じ種類の情報</h3><p>「${col.label}」の列を選びました。6つの商品の<strong>${col.label}</strong>が縦に並んでいます。</p></div>`;
  return `<div class="inspector cell" aria-live="polite"><h3>行と列が交わるところに、1つの値</h3><p>「${p.name}」の行 × 「${col.label}」の列。その場所に入っている値は<strong>「${typeof p[col.key]==='number'?p[col.key].toLocaleString('ja-JP'):p[col.key]}」</strong>です。</p></div>`;
}
function renderExplorer(){
  const hints={row:'商品を選ぶと、その商品の情報が横に色づきます。',column:'列の見出しや、その下の値を選んでみましょう。',cell:'表の中の値を選び、どの行・どの列にあるか見てみましょう。'};
  return heading('さわってみよう。行、列、ひとつの値。','まずは見たいものを選び、表をクリックしてみましょう。<br>同じ表でも、<strong>横に見るか、縦に見るか</strong>で、情報のまとまり方が変わります。')+
  `<section class="paper-board" aria-label="行・列・値の体験"><div class="board-header"><span class="board-label">表をさわって、違いを見つけよう</span><span class="tiny-label">TRY IT</span></div><div class="work-area"><div class="mode-switch" role="group" aria-label="表の見方">${[['row','行を見る'],['column','列を見る'],['cell','値を見る']].map(([key,label])=>`<button type="button" class="mode-button" data-mode="${key}" aria-pressed="${state.mode===key}">${label}</button>`).join('')}</div><p class="explorer-hint">${hints[state.mode]}</p>${productTable({interactive:true})}${inspector()}</div></section>`+
  takeaway('<strong>行は横、列は縦。</strong> その交わる場所にあるのが、ひとつの値です。');
}
const questions=[
  {title:'この商品テーブルの「1行」に入っているのは？',choices:['1つの商品の情報','すべての商品の価格だけ','データベースの名前'],answer:0,explanation:'そのとおり。ノートの行には、ノートの商品ID・名前・カテゴリ・価格・在庫が横に並んでいます。',hint:'色のついた部分を横に見てみましょう。何についての情報が集まっていますか？',highlight:{mode:'row',row:0}},
  {title:'すべての商品の「価格」を縦に集めた部分は？',choices:['行','列','データベース'],answer:1,explanation:'正解です。「価格」のように、同じ種類の情報を縦に並べたものが列です。',hint:'価格だけが縦に色づいています。「行は横、列は縦」を思い出してみましょう。',highlight:{mode:'column',column:'price'}},
  {title:'商品名と価格だけをSELECTで表示すると、元の表の在庫列は？',choices:['消える','すべて0になる','そのまま残る'],answer:2,explanation:'そのとおり。SELECTは必要な情報を取り出す操作です。元の表の在庫列も、値も、そのまま残ります。',hint:'「元の表」と「取り出した結果」は別のものです。SELECTは、元の表を書き換える操作でしょうか？',highlight:null},
];

return {
render(index){return [renderDatabase,renderTable,renderExplorer][index]();},
quiz:questions.map(q=>({...q,question:q.title})),
quizTable(index){return productTable({compact:true,limit:3,highlight:questions[index].highlight,caption:'商品テーブルの一部'});},
handle(event){
 const target=event.target;
 const table=target.closest('[data-table]');if(table){state.table=table.dataset.table;return '[data-table="'+state.table+'"]';}
 const mode=target.closest('[data-mode]');if(mode){state.mode=mode.dataset.mode;return '[data-mode="'+state.mode+'"]';}
 const column=target.closest('[data-column]');if(column){state.column=column.dataset.column;state.mode='column';return '[data-column="'+state.column+'"]';}
 const cell=target.closest('[data-cell]');if(cell){const [row,key]=cell.dataset.cell.split(':');state.row=Number(row);state.column=key;return '[data-cell="'+row+':'+key+'"]';}
 return null;
}
};})();
