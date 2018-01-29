function cardFlip(e) {
  console.log(e.target.dataset.deckId);
  var deck = document.getElementById(e.target.dataset.deckId);
  deck.style.transform = 'rotateY(180deg)';
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


cardInit();
deckInit();

