import { useState } from "react";

function VoteButtons({ votes, onVote }) {
  const [voteError, setVoteError] = useState(null);
  const [hasVoted, setHasVoted] = useState(null);

  const handleVote = (voteType) => {
    if (hasVoted !== null) {
      setVoteError("Already voted!");
      setTimeout(() => setVoteError(null), 3000);
      return;
    }
    setVoteError(null);
    const voteChange = voteType === "up" ? 1 : -1;
    setHasVoted(voteType);

    onVote(voteChange).catch((err) => {
      setHasVoted(null);
      setVoteError("Failed to vote. Please try again");
      setTimeout(() => setVoteError(null), 4000);
    });
  };

  return (
    <div className="vote-buttons">
      {/* Up Arrow functionality */}
      <button
        onClick={() => handleVote("up")}
        className={`vote-btn vote-up ${hasVoted === "up" ? "voted" : ""}`}
        disabled={hasVoted !== null}
      >
        ⬆
      </button>
      <span className="vote-count">{votes}</span>
      {/* Down Arrow functionality */}
      <button
        onClick={() => handleVote("down")}
        className={`vote-btn vote-down ${hasVoted === "down" ? "voted" : ""}`}
        disabled={hasVoted !== null}
      >
        ⬇
      </button>
      {voteError && (
        <div className="vote-error" role="alert">
          {voteError}
        </div>
      )}
    </div>
  );
}
export default VoteButtons;
