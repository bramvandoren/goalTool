const StoryCard = ({
  player,
  minute,
  score,
  backgroundUrl,
  uploadedPlayerImage,
  jerseyNumber,
  opponent,
  isHomeTeam,
}) => {
  // Check of er een afbeelding is
  const hasImage =
    !!uploadedPlayerImage || (player.photo && player.photo.trim() !== "");

  // Check of de achtergrond geel is
  const isYellowBg = backgroundUrl && backgroundUrl.includes("yellow");

  return (
    <div
      id="story-card"
      className={`story-card${!hasImage ? " no-player-image" : ""}${isYellowBg ? " yellow-bg" : ""}`}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Grote transparante rugnummer-achtergrondtekst */}
      <div className="goal-bg-text">{jerseyNumber}</div>

      {/* Logo met transparante achtergrond */}
      <div className="logo-bar">
        <img src="/club_logo.png" alt="Club logo" className="logo" />
      </div>

      {/* Content overlay */}
      <div className="content-overlay">
        {hasImage && (
          <img
            src={uploadedPlayerImage || player.photo}
            alt={player.name}
            className="player-photo"
          />
        )}

        <div className="info-text">
          <h2>GOAL!</h2>
          <div className="player-row">
            <span className="player-name">{player.name}</span>
            {/* <span className="jersey-inline">#{jerseyNumber}</span> */}
          </div>
          <div className="teams-vs">
            {isHomeTeam ? (
              <>
                <span className="team-home">VCDB</span>
                <span className="vs">vs</span>
                <span className="team-away">{opponent}</span>
              </>
            ) : (
              <>
                <span className="team-away">{opponent}</span>
                <span className="vs">vs</span>
                <span className="team-home">VCDB</span>
              </>
            )}
          </div>
          <div className="goal-details">
            <span className="goal-minute">{minute}'</span>
            <span className="goal-score">{score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;