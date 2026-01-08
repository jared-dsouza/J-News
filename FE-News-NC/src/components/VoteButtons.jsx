import { useState } from "react";

function VoteButtons({ votes, onVote }) {
  const [voteError, setVoteError] = useState(null);
  const [hasVoted, setHasVoted] = useState(0);

  const handleVote = (voteChange) => {
    if (
      (voteChange === 1 && hasVoted === 1) ||
      (voteChange === -1 && hasVoted === -1)
    ) {
      setVoteError("Already voted!");
      setTimeout(() => setVoteError(null), 3000);
    }
    return;
  };
  setVoteError(null);

  const previousVote = hasVoted;
  const newVoteState = previousVote === voteChange ? 0 : voteChange;
  const actualChange = newVoteState - previousVote;

  setHasVoted(newVoteState);

  onVote(actualChange).catch((err) => {
    setHasVoted(previousVote);
    setVoteError("Failed to vote. Please try again");
    setTimeout(() => setVoteError(null), 4000);
  });

  return (
    <div className="vote-buttons">
      {/* Up Arrow functionality */}
      <button
        onClick={() => handleVote(1)}
        className={`vote-btn vote-
up ${hasVoted === 1 ? "voted" : ""}`}
        disabled={voteError !== null}
      >
        ⬆
      </button>
      <span className="separator">{votes + hasVoted}</span>

      {/* Down Arrow functionality */}
      <button
        onClick={() => handleVote(-1)}
        className={`vote-btn vote-
up ${hasVoted === -1 ? "voted" : ""}`}
        disabled={voteError !== null}
      >
        ⬇
      </button>
      {voteError && (
        <div
          className="vote-
error"
          role="alert"
        >
          {" "}
          {voteError}
        </div>
      )}
    </div>
  );
}
export default VoteButtons;
