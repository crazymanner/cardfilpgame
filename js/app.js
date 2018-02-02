var lastCardIndex = 0;
var lastDeck = undefined;
var openCards = [];
var isAnimation = false;

function cardFlip(e) {
  if (e.target !== undefined && e.target.dataset.deckId !== undefined && !isAnimation) {
    // 선택 카드 뒤집기
    var nowDeckId = e.target.dataset.deckId;
    var nowDeck = document.getElementById(nowDeckId);
    if (openCards.includes(nowDeckId)) {
      return ;
    }
    document.getElementById("sound_click").play();
    nowDeck.style.transform = 'rotateY(180deg)';
    openCards.push(nowDeckId);
    // 선택한 카드 인덱스 얻기
    var img = nowDeck.getElementsByClassName('front')[0];
    var nowCardIndex = img.dataset.cardIndex;
    // 매칭 처리
    if (lastCardIndex === nowCardIndex) {
      document.getElementById("sound_ok").play();
      lastDeck = undefined;
      lastCardIndex = 0;
      if(openCards.length === 16) {
        var win = document.getElementById('win');
        win.style.display = 'block';
        document.getElementById("sound_win").play();
      }
    } else {
      // 뒤집어 주기
      if (lastDeck !== undefined) {
        isAnimation = true;
        setTimeout(function() {
          document.getElementById("sound_beep").play();          
          nowDeck.style.transform = 'rotateY(0deg)';
          lastDeck.style.transform = 'rotateY(0deg)';
          openCards.pop();
          openCards.pop();
          lastDeck = undefined;
          lastCardIndex = 0;
          isAnimation = false;
        }, 1000);
      } else {
        // 최종 카드 저장
        lastDeck = nowDeck;
        lastCardIndex = nowCardIndex;        
      }
    }
  }
}

function deckInit() {
  var decks = document.getElementsByClassName('deck');
  for (var i = 0; i < decks.length; i++) {
    var deck = decks[i];
    deck.id = 'card' + i;
    var imgs = deck.getElementsByTagName('img');
    imgs[0].dataset.deckId = deck.id;
    imgs[1].dataset.deckId = deck.id;
  }
}

function cardInit() {
  var cards = document.getElementsByClassName('card');
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.onclick = cardFlip;
  }
}

function shuffle() {
  // 배열에 쌍으로 랜덤값 넣기
  var ar = [];
  for (var i = 0; i < 8; i++) {
    var r;
    do {
      r = Math.floor(Math.random() * 20) + 1;
    } while(ar.includes(r))

    ar.push(r);
    ar.push(r);
  }
  // 배열을 섞기
  ar.sort(function(a,b) { return 0.5 - Math.random(); });

  // 이미지 소스 적용
  var imgs = document.getElementsByClassName('front');
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    img.src = 'img/' + ar[i] + '.jpg';
    img.dataset.cardIndex = ar[i];
  }
}

function showCards() {
  var decks = document.getElementsByClassName('deck');
  for (var i = 0; i < decks.length; i++) {
    var deck = decks[i];
    deck.style.transform = 'rotateY(180deg)';
  }
  setTimeout(function () {
    for (var i = 0; i < decks.length; i++) {
      var deck = decks[i];
      deck.style.transform = 'rotateY(0deg)';
    }
  }, 800);
}

function replay() {
  var win = document.getElementById('win');
  win.style.display = 'none';
  lastCardIndex = 0;
  lastDeck = undefined;
  openCards = [];
  isAnimation = false;
  shuffle();
  showCards();
}

cardInit();
deckInit();
shuffle();
showCards();

