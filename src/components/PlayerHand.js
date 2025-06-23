import Card from "./Card";

export default function PlayerHand({ cards, visibleIndices, onCardClick }) {
  return (
    <div className="player-hand">
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          card={card}
          isFaceUp={visibleIndices.includes(idx)}
          onClick={() => onCardClick(idx)}
        />
      ))}
    </div>
  );
}