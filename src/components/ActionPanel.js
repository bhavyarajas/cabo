export default function ActionPanel({ onDraw, onCabo, canUseSpecial }) {
    return (
      <div className="actions">
        <button onClick={onDraw}>Draw</button>
        <button onClick={onCabo}>Call Cabo</button>
        {canUseSpecial && <button onClick={() => useSpecial()}>Use Special</button>}
      </div>
    );
  }