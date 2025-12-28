const express = require("express");
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect("/keiyo"); 
});

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});



// ▼▼▼ 修正箇所 1：URLを "/F1" から "/F1_add" に変える（重要！） ▼▼▼
app.get("/F1_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let image = req.query.image;
  let newdata = { id: id, code: code, name: name, image: image };
  team.push( newdata );
  
  // 処理が終わったら一覧画面(/F1)に戻る
  res.redirect("/F1");
});

let team = [
  { id:1, code:"833", name:"マクラーレン", image:"public/asimg_GkGexlZXEAAz18V_9367b501707bdfa.webp"},
  { id:2, code:"469", name:"メルセデス", image:"public/20250224-mercedes-w16.webp"},
  { id:3, code:"451", name:"レッドブル", image:"public/images.jpeg"},
  { id:4, code:"398", name:"フェラーリ", image:"public/FerrariSF25_250227-thumb-600xauto-352472.webp"},
  { id:5, code:"137", name:"ウィリアムズ", image:"public/williams-fw47.jpg"},
  { id:6, code:"92", name:"RB", image:"public/asimg_Bet-you-didnt-see-this-one-coming-F1-VCARB-F175LIVE_3167b4f2df1c065.webp"},
  { id:7, code:"89", name:"アストンマーティン", image:"public/asimg_868314f0-6f43-14a9-d149-e0d6de0e4f93_f067bb54efc657f.webp"},
  { id:8, code:"79", name:"ハース", image:"public/haas-vf-25.jpg"},
  { id:9, code:"70", name:"キック・ザウバー", image:"public/asimg_f175live_sau04_sau_bc67b4ecc92289f.webp"},
  { id:10, code:"22", name:"アルピーヌ", image:"public/asimg_f175live_alp_03_2967b4f61450aaf.webp"},
];

app.get("/F1", (req, res) => {
  // ▼▼▼ 修正箇所 2：データを "station" ではなく "team" を渡す ▼▼▼
  // ▼▼▼ 修正箇所 3：ファイル名を "db1" ではなく "F1" (作成したEJSファイル名) にする ▼▼▼
  res.render('F1', { data: team });
});

app.get("/GT_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let image = req.query.image;
  let newdata = { id: id, code: code, name: name, image: image };
  car.push( newdata );
  
  // 処理が終わったら一覧画面(/F1)に戻る
  res.redirect("/GT");
});

let car = [
  { id:1, code:"ハコスカ", name:"初代スカイライン2000GT-R(PGC10型)", image:"public/DSC2173-.jpg"},
  { id:2, code:"ケンメリ", name:"2代目2000GT-R(KPGC110型)", image:"public/4295fc9c3f436b6a4bb9dd611214b9c5952c43d5_xlarge.jpg"},
  { id:3, code:"R32", name:"R33型スカイラインGT-R(BNR32型)", image:"public/img_294b2f971ee8848001d28e8d2431faf5119058.jpg"},
  { id:4, code:"R33", name:"R33型スカイラインGT-R(BCNR33型)", image:"public/Nissan_Skyline_R33_GT-R_001.jpg"},
  { id:5, code:"R34", name:"R34型スカイラインGT-R(BNR34型)", image:"public/c8334692477ab561.jpg"},
  { id:6, code:"R35", name:"R35型GT-R", image:"public/Used-2021-Nissan-GT-R-Premium-T-SPEC-in-Millenium-Jade-w-Delivery-Miles-1701298714.jpg"},
  { id:7, code:"イタル", name:"GT-R50 by Italdesign", image:"public/file.jpeg"},
];

app.get("/GT", (req, res) => {
  // ▼▼▼ 修正箇所 2：データを "station" ではなく "team" を渡す ▼▼▼
  // ▼▼▼ 修正箇所 3：ファイル名を "db1" ではなく "F1" (作成したEJSファイル名) にする ▼▼▼
  res.render('GT', { data: car });
});


app.get("/TD_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let image = req.query.image;
  let newdata = { id: id, code: code, name: name, image: image };
  pare.push( newdata );
  
  // 処理が終わったら一覧画面(/F1)に戻る
  res.redirect("/TD");
});

let pare = [
  { id:1, code:"5周年", name:"ディズニー・クラシック・オン・パレード", image:"public/08-1-500x328.jpg"},
  { id:2, code:"10周年", name:"ディズニー・ファンタジー・オン・パレード", image:"public/159822561.webp"},
  { id:3, code:"15周年", name:"ディズニー・カーニバル", image:"public/a22.jpg"},
  { id:4, code:"20周年", name:"ディズニー・ドリームス・オン・パレード", image:"public/unnamed.jpg"},
  { id:5, code:"25周年", name:"ジュビレーション！", image:"public/42-332x500.jpg"},
  { id:6, code:"30周年", name:"ハピネス・イズ・ヒア", image:"public/img131009_pr_2.jpg"},
  { id:7, code:"35周年", name:"ドリーミング・アップ！", image:"public/img1_file5acc7e7d14823.jpg"},
  { id:8, code:"40周年", name:"ディズニー・ハーモニー・イン・カラー", image:"public/tokyo_disney_resort_1_line_tw_disney.jpg.webp"},
];

app.get("/TD", (req, res) => {
  // ▼▼▼ 修正箇所 2：データを "station" ではなく "team" を渡す ▼▼▼
  // ▼▼▼ 修正箇所 3：ファイル名を "db1" ではなく "F1" (作成したEJSファイル名) にする ▼▼▼
  res.render('TD', { data: pare });
});
app.listen(8080, () => console.log("Example app listening on port 8080!"));