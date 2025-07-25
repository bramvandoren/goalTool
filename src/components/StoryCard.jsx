const StoryCard = ({
  player,
  minute,
  score,
  backgroundUrl,
  uploadedPlayerImage,
  jerseyNumber,
}) => {
  return (
    <div
      id="story-card"
      className="story-card"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Grote transparante rugnummer-achtergrondtekst */}
      <div className="goal-bg-text">{jerseyNumber}</div>

      {/* Content overlay */}
      <div className="content-overlay">
        <img src="/club_logo.png" alt="Club logo" className="logo" />

        <img
          src={uploadedPlayerImage || player.photo}
          alt={player.name}
          className="player-photo"
        />

        <div className="info-text">
          <h2>GOAL!</h2>
          <p>{player.name}</p>
          <p>
            {minute}' | {score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
