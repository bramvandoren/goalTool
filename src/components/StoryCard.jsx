const StoryCard = ({
  player,
  minute,
  score,
  backgroundUrl,
  uploadedPlayerImage,
}) => {
  return (
    <div
      id="story-card"
      className="story-card"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Grote transparante GOAL tekst als achtergrond */}
      <div className="goal-bg-text">GOAL</div>

      {/* Content overlay */}
      <div className="content-overlay">
        <img src="/club_logo.png" alt="Club logo" className="logo" />

        {/* Spelerfoto/gif centraal, zonder ronde vorm */}
        <img
          src={uploadedPlayerImage || player.photo}
          alt={player.name}
          className="player-photo"
        />

        <div className="info-text">
          <h2>GOAL!</h2>
          <p>{player.name}</p>
          <p>
            {minute}' – Stand: {score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
