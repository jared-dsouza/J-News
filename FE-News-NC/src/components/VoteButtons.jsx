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
  });
}
