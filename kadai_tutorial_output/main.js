
// テキスト配列
const textLists = [
  `Hello`,
  `Water`,
  `TIOVITA`,
  `Wassyoi`,
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

let untyped = ``;
let typed = ``;
let score = 0;

// 定義
const untypefield = document.getElementById(`untyped`);
const typedfield = document.getElementById(`typed`);
const wrap = document.getElementById(`wrap`);
const start = document.getElementById(`start`);
const count = document.getElementById(`count`);

// 初期の文字を設定
untypefield.textContent =`スタートボタンで開始`;

// スタートボタンの処理
start.addEventListener(`click`, ()=>{

  timer();

  // 文字列を表示
  createText();
  // 画面でキーを押すと関数が呼び出される
  document.addEventListener(`keypress`, keyPress);
  // ボタンの非表示
  start.style.display = `none`;
});

// 文字列をランダムで表示
const createText = () =>{

  // typed の部分を空にする
  typed = ``;
  typedfield.textContent = typed;

// ランダムな整数　ランダムな少数に4（配列の長さ）を掛けて切り捨てをして整数を得ている
  let random = Math.floor(Math.random()*textLists.length);

  untyped = textLists[random];
  untypefield.textContent = untyped;
};

// キー入力の判定 ここのeについて　(イベントオブジェクト)
const keyPress = e =>{

  // 誤タイプの場合終了（return）
  if (e.key !== untyped.substring(0,1)) {
    wrap.classList.add(`mistyped`);
    // 赤くしてその一定時間後に戻す
    setTimeout(() => {
      wrap.classList.remove(`mistyped`);
    }, 100);
    return;
  }

  // typed に　untyped　の一文字目を付け加えている(正タイプ時の処理)
  score++;
  typed += untyped.substring(0,1);
  typedfield.textContent = typed;
  // 選ばれた文字列の２文字目以降全部
  untyped = untyped.substring(1);
  untypefield.textContent = untyped;

  // 文字列が空になったら起動
  if (untyped === ``) {
    createText();
  }
};

// ランクを判定
const rankCheck = score =>{
  let text =``;
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100-score}文字です。`;
  }else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200-score}文字です。`;
  }else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300-score}文字です。`;
  }else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`;
  }

  return `${score}文字打てました！\n${text}\n【OK】リトライ【キャンセル】終了`;

};

// ゲームを終了
const gameOver = id =>{
  clearInterval(id);
  const result = confirm(rankCheck(score));

  // OKの場合リロード
  if (result == true) {
    window.location.reload();
  }
};

// タイマー
const timer =()=>{
  // 変数で定義しないと--が使えない？
  let time =count.textContent;

  const id = setInterval(() => {
    // カウントダウン　１減らしてそれを代入
    time--;
    count.textContent = time;

    // これでもよかった
    // count.textContent--;
    
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};