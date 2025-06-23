export default function Card({ card, isFaceUp, onClick }) {
    return (
      <div className="card" onClick={onClick}>
        {isFaceUp ? card.label : "?"}
      </div>
    );
  }


