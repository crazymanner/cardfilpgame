var lastCardIndex = 0;
var lastDeck = undefined;
var changing = false;

function cardFlip(e) {
  if (changing) { return ; }

  if (e.target !== undefined && e.target.dataset.deckId !== undefined) {
    var deck = document.getElementById(e.target.dataset.deckId);
    deck.style.transform = 'rotateY(180deg)';
    // 매칭 처리
    var imgs = deck.getElementsByClassName('front');
    var img = imgs[0];
    var nowCardIndex = img.dataset.cardIndex;
    if (lastCardIndex === nowCardIndex) {
      lastCardIndex = 0;
      lastDeck = undefined;
    } else {
      if (lastDeck !== undefined) {
        changing = true;
        setTimeout(function() {
          deck.style.transform = 'rotateY(0deg)';
          lastDeck.style.transform = 'rotateY(0deg)';
          lastCardIndex = 0;
          lastDeck = undefined;
          changing = false;
        }, 1000);
      } else {
        lastCardIndex = nowCardIndex;
        lastDeck = deck;
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

cardInit();
deckInit();
shuffle();

