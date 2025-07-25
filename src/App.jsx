import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import StoryCard from './components/StoryCard';
import './style.css';

const players = [
  { name: 'Jan Peeters'},
  { name: 'Kobe Maes'},
  { name: 'Mehdi Azizi'},
];

const backgrounds = [
  { name: 'Donkerblauw', url: '/club_bg_darkblue.png' },
  { name: 'Geel', url: '/club_bg_yellow.png' },
];

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [minute, setMinute] = useState('1');
  const [score, setScore] = useState('1–0');
  const [background, setBackground] = useState(backgrounds[0]);
  const [uploadedPlayerImage, setUploadedPlayerImage] = useState(null);
  const [jerseyNumber, setJerseyNumber] = useState('10'); // rugnummer
  const [opponent, setOpponent] = useState('Tegenstander');
  const [isHomeTeam, setIsHomeTeam] = useState(true);

  const fileInputRef = useRef();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedPlayerImage(url);
  };

  const exportImage = () => {
  const element = document.getElementById('story-card');

  // Preview afbeelding verbergen
  const previewImg = element.querySelector('.player-photo');
  previewImg.style.visibility = 'hidden';

  // Full quality afbeelding toevoegen in dezelfde container als previewImg
  const contentOverlay = element.querySelector('.content-overlay');

  const fullQualityImg = document.createElement('img');
  fullQualityImg.src = uploadedPlayerImage || selectedPlayer.photo;
  fullQualityImg.style.position = 'absolute';
  fullQualityImg.style.top = previewImg.offsetTop + 'px';
  fullQualityImg.style.left = previewImg.offsetLeft + 'px';
  fullQualityImg.style.width = previewImg.offsetWidth + 'px';
  fullQualityImg.style.height = previewImg.offsetHeight + 'px';
  fullQualityImg.style.objectFit = 'contain';
  fullQualityImg.style.zIndex = '10';  // zorg dat die boven preview zit, maar onder rugnummer als dat moet
  contentOverlay.appendChild(fullQualityImg);

  html2canvas(element, { useCORS: true }).then((canvas) => {
    const link = document.createElement('a');
    link.download = 'goal.png';
    link.href = canvas.toDataURL();
    link.click();

    // Herstel preview
    previewImg.style.visibility = 'visible';
    contentOverlay.removeChild(fullQualityImg);
  });
};

  return (
    <div className="app" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h1>Goal tool</h1>

      <div className="form">

        <div className="form-row">
          <label>Tegenstander:</label>
          <input
            type="text"
            value={opponent}
            onChange={e => setOpponent(e.target.value)}
            placeholder="Naam tegenstander"
            style={{ minWidth: 100 }}
          />
          <select
            value={isHomeTeam ? "home" : "away"}
            onChange={e => setIsHomeTeam(e.target.value === "home")}
            className="short-select"
            style={{ width: 70, marginLeft: 8 }}
          >
            <option value="home">Thuis</option>
            <option value="away">Uit</option>
          </select>
        </div>
        <div className="form-row">
          <label>Speler:</label>
          <select
            value={selectedPlayer.name}
            onChange={e =>
              setSelectedPlayer(players.find(p => p.name === e.target.value))
            }
            style={{ minWidth: 120 }}
          >
            {players.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            max="99"
            value={jerseyNumber}
            onChange={e => setJerseyNumber(e.target.value)}
            className="short-input"
            placeholder="Nr"
            style={{ width: 50, marginLeft: 8 }}
          />
        </div>

        <div className="form-row">
          <label>Minuut:</label>
          <input
            type="number"
            min="1"
            max="120"
            value={minute}
            onChange={e => setMinute(e.target.value)}
            className="short-input"
            style={{ width: 60 }}
          />
          <label style={{ marginLeft: 8 }}>Score:</label>
          <input
            type="text"
            value={score}
            onChange={e => setScore(e.target.value)}
            className="short-input"
            style={{ width: 60 }}
          />
        </div>

        <label>Of upload eigen foto/GIF van speler:</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={onFileChange}
        />

        <label>Achtergrond:</label>
        <select
          onChange={(e) => setBackground(backgrounds[e.target.value])}
          value={backgrounds.indexOf(background)}
        >
          {backgrounds.map((bg, i) => (
            <option key={i} value={i}>
              {bg.name}
            </option>
          ))}
        </select>

        <button onClick={exportImage}>📸 Exporteer als afbeelding</button>
      </div>

      <StoryCard
        player={selectedPlayer}
        minute={minute}
        score={score}
        backgroundUrl={background.url}
        uploadedPlayerImage={uploadedPlayerImage}
        jerseyNumber={jerseyNumber}
        opponent={opponent}
        isHomeTeam={isHomeTeam}
      />
    </div>
  );
}

export default App;
