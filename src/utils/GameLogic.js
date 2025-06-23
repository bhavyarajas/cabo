// Card suits and values for deck generation
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Fisher–Yates shuffle algorithm
export function shuffle(deck) {
  let newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

// Create a standard deck (or multiple decks) and shuffle it
export function generateDeck(numDecks = 1) {
  let deck = [];
  for (let d = 0; d < numDecks; d++) {
    for (const suit of suits) {
      for (const value of values) {
        deck.push({ suit, value, label: `${value} of ${suit}` });
      }
    }
  }
  return shuffle(deck);
}

// Handle spy action - reveal a card from target player
export function handleSpy(targetPlayer, cardIndex) {
  const card = targetPlayer[cardIndex];
  alert(`You saw a ${card.label}`);
  return card;
}

// Handle peek action - temporarily flip card face-up
export function handlePeek(playerHand, cardIndex) {
  // Temporarily flip card face-up
  const card = playerHand[cardIndex];
  return card;
}

// Handle swap action - swap cards between two players
export function handleSwap(player1, idx1, player2, idx2) {
  const temp = player1[idx1];
  player1[idx1] = player2[idx2];
  player2[idx2] = temp;
}