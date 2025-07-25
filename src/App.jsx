import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import StoryCard from './components/StoryCard';
import './style.css';

const players = [
  { name: 'Jan Peeters', photo: '/players/jan.jpg' },
  { name: 'Kobe Maes', photo: '/players/kobe.jpg' },
  { name: 'Mehdi Azizi', photo: '/players/mehdi.gif' },
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
        <label>Speler:</label>
        <select
          onChange={(e) => {
            setSelectedPlayer(players[e.target.value]);
            setUploadedPlayerImage(null);
            fileInputRef.current.value = '';
          }}
          value={players.indexOf(selectedPlayer)}
        >
          {players.map((p, i) => (
            <option key={i} value={i}>
              {p.name}
            </option>
          ))}
        </select>

        <label>Of upload eigen foto/GIF van speler:</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={onFileChange}
        />

        <label>Rugnummer:</label>
        <input
          type="number"
          min="1"
          value={jerseyNumber}
          onChange={(e) => setJerseyNumber(e.target.value)}
        />

        <label>Minuut:</label>
        <input
          type="number"
          value={minute}
          min="1"
          onChange={(e) => setMinute(e.target.value)}
        />

        <label>Score:</label>
        <input
          type="text"
          value={score}
          onChange={(e) => setScore(e.target.value)}
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
      />
    </div>
  );
}

export default App;
