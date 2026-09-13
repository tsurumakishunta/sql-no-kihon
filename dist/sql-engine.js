/* A deliberately bounded, read-only T-SQL teaching interpreter. No eval or network. */
(function(root){
  'use strict';
  const base = {
    '商品':{columns:['商品ID','商品名','カテゴリ','価格','在庫','メモ'],types:['int','string','string','int','int','string'],rows:[[1,'ノート','文房具',250,12,null],[2,'えんぴつ','文房具',80,30,'定番'],[3,'マグカップ','生活雑貨',900,8,null],[4,'ふせん','文房具',180,15,'新商品'],[5,'タオル','生活雑貨',600,10,''],[6,'水筒','生活雑貨',1500,5,null]]},
    '注文':{columns:['注文ID','商品ID','個数','顧客ID'],types:['int','int','int','int'],rows:[[1001,1,2,101],[1002,3,1,102],[1003,1,3,103],[1004,2,5,101],[1005,5,2,102],[1006,3,2,103]]},
    'お客さま':{columns:['顧客ID','名前'],types:['int','string'],rows:[[101,'田中さん'],[102,'佐藤さん'],[103,'鈴木さん']]}
  };
  const RESERVED=new Set('SELECT DISTINCT TOP FROM AS INNER LEFT OUTER JOIN ON WHERE GROUP BY HAVING ORDER ASC DESC AND OR NOT IS NULL IN BETWEEN LIKE LIMIT UNION WITH INSERT UPDATE DELETE DROP CREATE OFFSET FETCH CASE END'.split(' '));
  const aggregates=new Set(['COUNT','SUM','AVG','MIN','MAX']);
  const same=(a,b)=>String(a).toLowerCase()===String(b).toLowerCase();
  function fail(message){throw new Error(message);}
  function tokenize(sql){
    if(typeof sql!=='string'||sql.length>12000)fail('SQLは12,000文字以内で入力しましょう。');
    const out=[];let i=0;
    while(i<sql.length){
      const rest=sql.slice(i),c=sql[i];
      if(/\s/u.test(c)){i++;continue;}
      if(rest.startsWith('--')){const n=sql.indexOf('\n',i);i=n<0?sql.length:n+1;continue;}
      if(rest.startsWith('/*')){const n=sql.indexOf('*/',i+2);if(n<0)fail('コメントの最後に */ を付けましょう。');i=n+2;continue;}
      if(c==="'"||((c==='N'||c==='n')&&sql[i+1]==="'")){
        if(c!=="'")i++;i++;let value='',closed=false;
        while(i<sql.length){if(sql[i]==="'"){if(sql[i+1]==="'"){value+="'";i+=2;}else{i++;closed=true;break;}}else value+=sql[i++];}
        if(!closed)fail("文字列の最後に ' を付けましょう。");out.push({kind:'string',value});continue;
      }
      if(c==='['){i++;let value='',closed=false;while(i<sql.length){if(sql[i]===']'){if(sql[i+1]===']'){value+=']';i+=2;}else{i++;closed=true;break;}}else value+=sql[i++];}if(!closed)fail('列名の最後に ] を付けましょう。');out.push({kind:'id',value,quoted:true});continue;}
      const num=rest.match(/^\d+(?:\.\d+)?/);if(num){out.push({kind:'number',value:Number(num[0]),decimal:num[0].includes('.')});i+=num[0].length;continue;}
      const name=rest.match(/^[\p{L}_][\p{L}\p{N}_]*/u);if(name){out.push({kind:'id',value:name[0]});i+=name[0].length;continue;}
      const op=rest.match(/^(?:<>|!=|<=|>=|[=<>+*/%(),.;-])/);if(op){out.push({kind:'symbol',value:op[0]});i+=op[0].length;continue;}
      fail(`「${c}」を読み取れません。記号や引用符を確認しましょう。`);
    }
    out.push({kind:'end',value:'入力の終わり'});return out;
  }
  class Parser{
    constructor(sql){this.tokens=tokenize(sql);this.i=0;}
    peek(v){const t=this.tokens[this.i];return !t.quoted&&(t.kind==='id'||t.kind==='symbol')&&same(t.value,v);}
    eat(v){if(this.peek(v)){this.i++;return true;}return false;}
    expect(v){if(!this.eat(v))fail(`「${v}」が必要です。「${this.tokens[this.i].value}」の前後を確認しましょう。`);}
    identifier(){const t=this.tokens[this.i++];if(t.kind!=='id'||(!t.quoted&&RESERVED.has(String(t.value).toUpperCase())))fail(`「${t.value}」の位置には、表や列の名前を書きましょう。`);return t.value;}
    table(){const name=this.identifier();let alias=name;if(this.eat('AS'))alias=this.identifier();else if(this.tokens[this.i].kind==='id'&&!RESERVED.has(this.tokens[this.i].value.toUpperCase()))alias=this.identifier();return{name,alias};}
    list(fn){const items=[fn.call(this)];while(this.eat(','))items.push(fn.call(this));return items;}
    query(){
      this.expect('SELECT');const q={distinct:this.eat('DISTINCT'),top:null};
      if(this.eat('TOP')){const paren=this.eat('('),t=this.tokens[this.i++];if(t.kind!=='number'||!Number.isInteger(t.value)||t.value<0||t.value>1000)fail('この教材のTOPには、0〜1000の整数を指定します。');q.top=t.value;if(paren)this.expect(')');}
      q.select=this.list(function(){const expr=this.expression();let alias=null;if(this.eat('AS'))alias=this.identifier();else if(this.tokens[this.i].kind==='id'&&!RESERVED.has(this.tokens[this.i].value.toUpperCase()))alias=this.identifier();return{expr,alias};});
      this.expect('FROM');q.from=this.table();q.joins=[];
      while(this.peek('JOIN')||this.peek('INNER')||this.peek('LEFT')){
        let kind='INNER';if(this.eat('LEFT')){kind='LEFT';this.eat('OUTER');}else this.eat('INNER');this.expect('JOIN');const table=this.table();this.expect('ON');const on=this.expression();q.joins.push({kind,table,on});
        if(q.joins.length>2)fail('この教材では、一度に結合する表は3つまでです。');
      }
      if(this.eat('WHERE'))q.where=this.expression();
      if(this.eat('GROUP')){this.expect('BY');q.group=this.list(this.expression);}
      if(this.eat('HAVING'))q.having=this.expression();
      if(this.eat('ORDER')){this.expect('BY');q.order=this.list(function(){const expr=this.expression();const desc=this.eat('DESC');if(!desc)this.eat('ASC');return{expr,desc};});}
      this.eat(';');if(this.tokens[this.i].kind!=='end'){if(this.peek('LIMIT'))fail('SQL ServerではLIMITの代わりに SELECT TOP (件数) を使います。');fail(`「${this.tokens[this.i].value}」以降を読み取れません。句の順番を確認しましょう。この教材ではSELECT文を1つずつ動かします。`);}
      return q;
    }
    expression(){return this.or();}
    or(){let x=this.and();while(this.eat('OR'))x={kind:'binary',op:'OR',left:x,right:this.and()};return x;}
    and(){let x=this.not();while(this.eat('AND'))x={kind:'binary',op:'AND',left:x,right:this.not()};return x;}
    not(){return this.eat('NOT')?{kind:'unary',op:'NOT',value:this.not()}:this.compare();}
    compare(){
      let x=this.add();
      if(this.eat('IS')){const not=this.eat('NOT');this.expect('NULL');return{kind:'isnull',value:x,not};}
      let negated=false;if(this.peek('NOT')&&['IN','BETWEEN','LIKE'].some(w=>same(this.tokens[this.i+1].value,w))){this.i++;negated=true;}
      if(this.eat('BETWEEN')){const lower=this.add();this.expect('AND');const upper=this.add();return{kind:'between',value:x,lower,upper,not:negated};}
      if(this.eat('IN')){this.expect('(');const values=this.list(this.add);this.expect(')');return{kind:'in',value:x,values,not:negated};}
      if(this.eat('LIKE'))return{kind:'like',value:x,pattern:this.add(),not:negated};
      if(['=','!=','<>','<','>','<=','>='].includes(this.tokens[this.i].value)){const op=this.tokens[this.i++].value;return{kind:'binary',op,left:x,right:this.add()};}
      return x;
    }
    add(){let x=this.multiply();while(this.peek('+')||this.peek('-')){const op=this.tokens[this.i++].value;x={kind:'binary',op,left:x,right:this.multiply()};}return x;}
    multiply(){let x=this.unary();while(['*','/','%'].includes(this.tokens[this.i].value)){const op=this.tokens[this.i++].value;x={kind:'binary',op,left:x,right:this.unary()};}return x;}
    unary(){if(this.eat('-'))return{kind:'unary',op:'-',value:this.unary()};if(this.eat('+'))return this.unary();return this.primary();}
    primary(){
      if(this.eat('(')){const x=this.expression();this.expect(')');return x;}
      const t=this.tokens[this.i++];
      if(t.kind==='number'||t.kind==='string')return{kind:'literal',value:t.value,type:t.kind==='string'?'string':t.decimal?'decimal':'int'};
      if(!t.quoted&&t.kind==='id'&&same(t.value,'NULL'))return{kind:'literal',value:null,type:'null'};
      if(t.value==='*')return{kind:'star'};
      if(t.kind==='id'){
        if(this.eat('(')){const name=t.value.toUpperCase();if(!aggregates.has(name))fail(`関数「${t.value}」は、この入門教材の対象外です。COUNT・SUM・AVG・MIN・MAXを試しましょう。`);const arg=this.expression();this.expect(')');return{kind:'aggregate',name,arg};}
        if(!t.quoted&&RESERVED.has(t.value.toUpperCase()))fail(`「${t.value}」の前に列名や式が足りないようです。`);
        if(this.eat('.')){if(this.eat('*'))return{kind:'star',table:t.value};return{kind:'column',table:t.value,name:this.identifier()};}
        return{kind:'column',name:t.value};
      }
      fail(`「${t.value}」の位置に列名・値・式を書きましょう。`);
    }
  }
  function database(chapter=15){const db=JSON.parse(JSON.stringify(base));if(chapter<8){db['商品'].columns.pop();db['商品'].types.pop();db['商品'].rows.forEach(r=>r.pop());}return db;}
  function bind(table,db){const name=Object.keys(db).find(n=>same(n,table.name));if(!name)fail(`「${table.name}」という表はありません。商品・注文・お客さまを使えます。`);const data=db[name];return{schema:data.columns.map((n,i)=>({name:n,table:table.alias,type:data.types[i]})),rows:data.rows.map((values,i)=>({values:[...values],origins:[{table:name,index:i,id:values[0]}]})),name,alias:table.alias};}
  function columnIndex(expr,schema){const found=schema.map((c,i)=>({c,i})).filter(({c})=>same(c.name,expr.name)&&(!expr.table||same(c.table,expr.table)));if(!found.length)fail(`列「${expr.table?expr.table+'.':''}${expr.name}」が見つかりません。列名を確認しましょう。SELECTの別名はWHERE・GROUP BY・HAVINGでは使えません。`);if(found.length>1)fail(`列「${expr.name}」が複数の表にあります。商品.商品ID のように、表名や別名を付けましょう。`);return found[0].i;}
  function children(e){if(!e)return[];return['left','right','value','lower','upper','pattern','arg'].filter(k=>e[k]&&typeof e[k]==='object').map(k=>e[k]).concat(e.values||[]);}
  function hasAggregate(e){return e?.kind==='aggregate'||children(e).some(hasAggregate);}
  function validate(e,schema,allowAggregate=false,inAggregate=false){
    if(e.kind==='column')columnIndex(e,schema);
    if(e.kind==='aggregate'){
      if(!allowAggregate)fail('この場所では集計関数を使えません。集計した結果の条件はHAVINGに書きましょう。');
      if(inAggregate)fail('集計関数の中に、さらに集計関数は書けません。');
      if(e.arg.kind==='star'&&e.name!=='COUNT')fail('* を使える集計関数は COUNT(*) です。');
      if(e.arg.kind==='star'&&e.arg.table)fail('COUNT(*) と書きましょう。COUNT(表名.*) は使えません。');
      if(e.arg.kind!=='star'){validate(e.arg,schema,false,true);scalar(e.arg,schema);if(['SUM','AVG'].includes(e.name)&&!['int','decimal'].includes(typeOf(e.arg,schema)))fail(`${e.name}には数値の列や式を使いましょう。`);}return;
    }
    if(e.kind==='star')fail('* はSELECTの列一覧、またはCOUNT(*)で使います。');
    children(e).forEach(x=>validate(x,schema,allowAggregate,inAggregate));
    if(e.kind==='binary'&&['AND','OR'].includes(e.op)){predicate(e.left,schema);predicate(e.right,schema);}
    else if(e.kind==='unary'&&e.op==='NOT')predicate(e.value,schema);
    else if(!['column','literal'].includes(e.kind))children(e).forEach(x=>scalar(x,schema));
  }
  function scalar(e,schema){if(typeOf(e,schema)==='boolean')fail('ここには条件ではなく、列・値・計算式を書きましょう。比較の条件はWHERE・ON・HAVINGに書きます。');}
  function predicate(e,schema){if(typeOf(e,schema)!=='boolean')fail('条件には「価格 >= 500」や「メモ IS NULL」のような比較を書きましょう。');}
  function hasColumn(e){return e.kind==='column'||children(e).some(hasColumn);}
  function exprKey(e,schema){if(e.kind==='column')return'col:'+columnIndex(e,schema);return JSON.stringify({...e,...Object.fromEntries(['left','right','value','lower','upper','pattern','arg'].filter(k=>e[k]&&typeof e[k]==='object').map(k=>[k,exprKey(e[k],schema)]))});}
  function validateGrouped(e,group,schema){
    if(e.kind==='aggregate'||e.kind==='literal')return;
    if(group.some(g=>exprKey(g,schema)===exprKey(e,schema)))return;
    if(e.kind==='column')fail(`集計するときの「${e.name}」は、GROUP BYに指定するか、集計関数の中に書きましょう。`);
    children(e).forEach(x=>validateGrouped(x,group,schema));
  }
  function typeOf(e,schema){
    if(e.kind==='literal')return e.type;if(e.kind==='column')return schema[columnIndex(e,schema)].type;
    if(e.kind==='aggregate')return e.name==='COUNT'?'int':typeOf(e.arg,schema);
    if(e.kind==='unary')return e.op==='NOT'?'boolean':typeOf(e.value,schema);
    if(e.kind==='binary'&&['+','-','*','/','%'].includes(e.op)){const a=typeOf(e.left,schema),b=typeOf(e.right,schema);return a==='decimal'||b==='decimal'?'decimal':a==='string'&&b==='string'?'string':'int';}
    return'boolean';
  }
  const not=v=>v===null?null:!v;
  function bool(v){if(v!==true&&v!==false&&v!==null)fail('条件には「価格 >= 500」のような比較を書きましょう。');return v;}
  const and=(a,b)=>a===false||b===false?false:a===null||b===null?null:true;
  const or=(a,b)=>a===true||b===true?true:a===null||b===null?null:false;
  function compare(a,b,op){if(a===null||b===null)return null;if(typeof a!==typeof b)fail('この教材では、数値は数値、文字列は文字列と比較します。数値を引用符で囲んでいないか確認しましょう。');if(typeof a==='string'){a=a.replace(/ +$/,'');b=b.replace(/ +$/,'');}if(op==='=')return a===b;if(op==='!='||op==='<>')return a!==b;if(op==='<')return a<b;if(op==='>')return a>b;if(op==='<=')return a<=b;return a>=b;}
  function numeric(value,type){if(!Number.isFinite(value))fail('計算結果が大きすぎます。小さな数値で試しましょう。');if(type==='int'&&(value>2147483647||value<-2147483648))fail('int型の範囲を超えています。この教材では小さな整数で計算しましょう。');return type==='decimal'?Number(value.toPrecision(14)):value;}
  function evaluate(e,row,schema,group){
    if(e.kind==='literal')return e.value;
    if(e.kind==='column')return row.values[columnIndex(e,schema)];
    if(e.kind==='aggregate'){
      const rows=group||[];if(e.name==='COUNT'&&e.arg.kind==='star')return rows.length;
      const vals=rows.map(r=>evaluate(e.arg,r,schema)).filter(v=>v!==null);
      if(e.name==='COUNT')return vals.length;if(!vals.length)return null;
      if(e.name==='MIN')return vals.reduce((a,b)=>a<b?a:b);if(e.name==='MAX')return vals.reduce((a,b)=>a>b?a:b);
      if(vals.some(v=>typeof v!=='number'))fail(`${e.name}は数値の列に使いましょう。`);
      const type=typeOf(e.arg,schema),sum=numeric(vals.reduce((a,b)=>a+b,0),type);if(e.name==='SUM')return sum;
      const avg=sum/vals.length;return type==='int'?Math.trunc(avg):numeric(avg,'decimal');
    }
    if(e.kind==='unary'){const v=evaluate(e.value,row,schema,group);if(e.op==='NOT')return not(bool(v));if(v===null)return null;if(typeof v!=='number')fail('符号は数値に付けましょう。');return-v;}
    if(e.kind==='isnull')return e.not?evaluate(e.value,row,schema,group)!==null:evaluate(e.value,row,schema,group)===null;
    if(e.kind==='between'){const v=evaluate(e.value,row,schema,group);const answer=and(compare(v,evaluate(e.lower,row,schema,group),'>='),compare(v,evaluate(e.upper,row,schema,group),'<='));return e.not?not(answer):answer;}
    if(e.kind==='in'){const v=evaluate(e.value,row,schema,group);const answer=e.values.reduce((acc,x)=>or(acc,compare(v,evaluate(x,row,schema,group),'=')),false);return e.not?not(answer):answer;}
    if(e.kind==='like'){
      const value=evaluate(e.value,row,schema,group),pattern=evaluate(e.pattern,row,schema,group);if(value===null||pattern===null)return null;
      if(typeof value!=='string'||typeof pattern!=='string')fail('LIKEには文字列を使いましょう。');
      if(pattern.includes('['))fail('この教材のLIKEは % と _ に対応しています。[...] のパターンは対象外です。');
      const regex='^'+pattern.split('').map(c=>c==='%'?'[\\s\\S]*':c==='_'?'[\\s\\S]':c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('')+'$';
      const answer=new RegExp(regex,'u').test(value);return e.not?!answer:answer;
    }
    if(e.kind==='binary'){
      const a=evaluate(e.left,row,schema,group),b=evaluate(e.right,row,schema,group);
      if(e.op==='AND')return and(bool(a),bool(b));if(e.op==='OR')return or(bool(a),bool(b));
      if(['=','!=','<>','<','>','<=','>='].includes(e.op))return compare(a,b,e.op);
      if(a===null||b===null)return null;
      if(e.op==='+'&&typeof a==='string'&&typeof b==='string')return a+b;
      if(typeof a!=='number'||typeof b!=='number')fail('計算には数値の列や値を使いましょう。型変換はこの教材の対象外です。');
      if((e.op==='/'||e.op==='%')&&b===0)fail('0で割ることはできません。');
      const type=typeOf(e,schema);if(e.op==='+')return numeric(a+b,type);if(e.op==='-')return numeric(a-b,type);if(e.op==='*')return numeric(a*b,type);if(e.op==='%')return numeric(a%b,type);
      return type==='int'?numeric(Math.trunc(a/b),type):numeric(a/b,type);
    }
    fail('この式は入門教材の対象外です。');
  }
  function exprName(e){if(e.kind==='column')return e.name;if(e.kind==='aggregate')return`${e.name}(${e.arg.kind==='star'?'*':exprName(e.arg)})`;if(e.kind==='literal')return String(e.value);if(e.kind==='binary')return`${exprName(e.left)} ${e.op} ${exprName(e.right)}`;return'計算結果';}
  function uniqueNames(schema){return schema.map(c=>schema.filter(o=>same(c.name,o.name)).length>1?`${c.table}.${c.name}`:c.name);}
  function snapshot(key,label,schema,rows,extra={}){return{key,label,columns:uniqueNames(schema),rows:rows.map(r=>[...r.values]),origins:rows.map(r=>r.origins||[]),...extra};}
  function execute(sql,db=database()){
    const q=new Parser(sql).query(),source=bind(q.from,db),stages=[];
    let schema=source.schema,rows=source.rows;
    stages.push(snapshot('FROM','表を用意する',schema,rows,{detail:`${source.name}テーブルの${rows.length}行から始めます。`}));
    for(const join of q.joins){
      const right=bind(join.table,db);if(schema.some(c=>same(c.table,join.table.alias)))fail('結合する表には、それぞれ違う別名を付けましょう。');
      const combined=[...schema,...right.schema];validate(join.on,combined);predicate(join.on,combined);const joined=[];
      for(const left of rows){let match=false;for(const rr of right.rows){const pair={values:[...left.values,...rr.values],origins:[...left.origins,...rr.origins]};if(bool(evaluate(join.on,pair,combined))===true){joined.push(pair);match=true;}}if(!match&&join.kind==='LEFT')joined.push({values:[...left.values,...right.schema.map(()=>null)],origins:[...left.origins]});}
      rows=joined;schema=combined;
      stages.push(snapshot('JOIN',`${join.kind} JOINでつなぐ`,schema,rows,{detail:join.kind==='LEFT'?'ONで一致する行を組み合わせます。相手がいない左の行も残し、右の列をNULLで補います。':'ONで一致する行の組み合わせを作ります。相手が複数あれば、結果の行も増えます。'}));
    }
    if(q.where){validate(q.where,schema);predicate(q.where,schema);const before=rows.length;rows=rows.filter(r=>bool(evaluate(q.where,r,schema))===true);stages.push(snapshot('WHERE','行を絞る',schema,rows,{detail:`条件に合う行を残します。${before}行 → ${rows.length}行。条件に合わない行や、NULLのため判定できない行は残りません。`}));}
    const selected=[];
    for(const item of q.select){if(item.expr.kind==='star'){if(item.alias)fail('* にASの別名は付けられません。');const indices=schema.map((c,i)=>i).filter(i=>!item.expr.table||same(schema[i].table,item.expr.table));if(!indices.length)fail('表名や別名を確認しましょう。');indices.forEach(i=>selected.push({expr:{kind:'column',table:schema[i].table,name:schema[i].name},alias:null}));}else selected.push(item);}
    for(const item of selected){validate(item.expr,schema,true);if(typeOf(item.expr,schema)==='boolean')fail('SELECTには列や計算式を書きましょう。比較の条件はWHEREなどに書きます。');}
    const grouped=!!q.group||selected.some(x=>hasAggregate(x.expr))||!!q.having||!!q.order?.some(x=>hasAggregate(x.expr));
    for(const e of q.group||[]){validate(e,schema);scalar(e,schema);if(!hasColumn(e))fail('GROUP BYには、この表の列を含む式を書きましょう。ORDER BYの列番号とは異なります。');}
    if(q.having){validate(q.having,schema,true);predicate(q.having,schema);}
    if(grouped){selected.forEach(x=>validateGrouped(x.expr,q.group||[],schema));if(q.having)validateGrouped(q.having,q.group||[],schema);}
    let units;
    if(grouped){
      const buckets=new Map();if(!q.group)buckets.set('all',[]);
      for(const r of rows){const key=q.group?JSON.stringify(q.group.map(e=>evaluate(e,r,schema))):'all';if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(r);}
      units=[...buckets.values()].map(group=>({row:group[0]||{values:schema.map(()=>null),origins:[]},group}));
      const groups=units.map(u=>({label:q.group?q.group.map(e=>String(evaluate(e,u.row,schema))).join(' / '):'全体',count:u.group.length,members:u.group.map(r=>({values:r.values,origins:r.origins})),origins:u.group.flatMap(r=>r.origins)}));
      const groupCols=[...(q.group||[]).map(exprName),'まとめた行数'];
      stages.push({key:q.group?'GROUP BY':'集計',label:q.group?'グループにまとめる':'全体をひとまとまりにする',columns:groupCols,rows:units.map(u=>[...(q.group||[]).map(e=>evaluate(e,u.row,schema)),u.group.length]),groups,origins:groups.map(g=>g.origins),detail:q.group?'同じ値を持つ行を1つのグループにします。この段階の「まとめた行数」は図のための表示です。':'全体の行を集計対象にします。GROUP BYを書かない集計です。'});
    }else units=rows.map(row=>({row,group:null}));
    if(q.having){const before=units.length;units=units.filter(u=>bool(evaluate(q.having,u.row,schema,u.group))===true);const names=[...(q.group||[]).map(exprName),'まとめた行数'];stages.push({key:'HAVING',label:'グループを絞る',columns:names,rows:units.map(u=>[...(q.group||[]).map(e=>evaluate(e,u.row,schema)),u.group.length]),origins:units.map(u=>u.group.flatMap(r=>r.origins)),detail:`集計したグループに条件をかけます。${before}グループ → ${units.length}グループ。`});}
    const headers=selected.map(x=>x.alias||exprName(x.expr));
    let output=units.map(u=>({values:selected.map(x=>evaluate(x.expr,u.row,schema,u.group)),unit:u,origins:u.group?u.group.flatMap(r=>r.origins):u.row.origins}));
    const outSchema=headers.map(name=>({name,table:''}));
    stages.push(snapshot('SELECT','列・計算結果を取り出す',outSchema,output,{detail:'表示する列や式を選びます。ASの別名もここで付きます。元のテーブルは書き換えません。'}));
    if(q.distinct){const seen=new Set();output=output.filter(o=>{const k=JSON.stringify(o.values);if(seen.has(k))return false;seen.add(k);return true;});stages.push(snapshot('DISTINCT','重複をまとめる',outSchema,output,{detail:'選んだ列の組み合わせが同じ行を、1行にまとめます。'}));}
    if(q.order){
      const specs=q.order.map(s=>{
        let index=-1;if(s.expr.kind==='literal'&&s.expr.type==='int'){index=s.expr.value-1;if(index<0||index>=headers.length)fail('ORDER BYの列番号が、SELECTの列数を超えています。');}
        else if(s.expr.kind==='column'&&!s.expr.table){const matches=headers.map((h,i)=>same(h,s.expr.name)?i:-1).filter(i=>i>=0);if(matches.length>1)fail('ORDER BYで使う列名が重複しています。ASで別々の名前を付けましょう。');if(matches.length===1)index=matches[0];}
        if(index<0){validate(s.expr,schema,true);scalar(s.expr,schema);if(grouped)validateGrouped(s.expr,q.group||[],schema);index=selected.findIndex(x=>exprKey(x.expr,schema)===exprKey(s.expr,schema));if(q.distinct&&index<0)fail('DISTINCTを使うとき、ORDER BYの式もSELECTの列一覧に含めましょう。');}
        return{...s,index};
      });
      output.sort((a,b)=>{for(const s of specs){const av=s.index>=0?a.values[s.index]:evaluate(s.expr,a.unit.row,schema,a.unit.group),bv=s.index>=0?b.values[s.index]:evaluate(s.expr,b.unit.row,schema,b.unit.group);let c=av===bv?0:av===null?-1:bv===null?1:av<bv?-1:1;if(c)return s.desc?-c:c;}return 0;});
      stages.push(snapshot('ORDER BY','順番を並べ替える',outSchema,output,{detail:'ASCは昇順、DESCは降順です。同じ値の行の順番も決めるときは、商品IDなどを追加します。'}));
    }
    if(q.top!==null){output=output.slice(0,q.top);stages.push(snapshot('TOP','上位の行を取り出す',outSchema,output,{detail:`${q.order?'並べ替えた結果から':'現在の結果から'}先頭${q.top}行を取り出します。`}));}
    const warnings=[];if(!q.order)warnings.push('ORDER BYがないSQLでは、結果の行順は保証されません。');if(q.top!==null&&!q.order)warnings.push('どの行をTOPで取り出すか決めるには、ORDER BYを付けましょう。');
    if(selected.some(x=>hasAggregate(x.expr)&&typeOf(x.expr,schema)==='int'&&JSON.stringify(x.expr).includes('AVG')))warnings.push('SQL ServerのAVG(int)は整数を返します。小数部分は切り捨てられます。');
    return{columns:headers,rows:output.map(o=>o.values),stages,query:q,warnings,sourceTables:[q.from.name,...q.joins.map(j=>j.table.name)]};
  }
  const api={execute,parse:sql=>new Parser(sql).query(),database};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SQLTrainer=api;
})(typeof window!=='undefined'?window:globalThis);
