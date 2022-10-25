import "./App.css";
import YouTube from "react-youtube";
import { useState } from "react";

const videoId = "E7UlemBSoYw";
const nodes = [
  {
    start: "1:00",
    text: `my heart will go on 1
  my heart will go on 2
  `,
  },
  { start: "2:30", text: "my heart will go on 2" },
];
const conv = (s) => s.split(":").reduce((a, i) => 60 * a + +i, 0);

function App() {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // controls: 0,
    },
  };

  const [player, setPlayer] = useState();

  function _onReady(event) {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
    // event.target.pauseVideo();
    // event.target.playVideo();
  }

  function playVideo() {
    player.playVideo();
  }

  function pauseVideo() {
    player.pauseVideo();
  }

  // function seekTo(seconds) {
  //   player.seekTo(seconds);
  // }

  const [fontSize, setFontSize] = useState(16);

  function seek(e) {
    player.seekTo(conv(e.currentTarget.dataset.start));
  }

  return (
    <div className="App">
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
      <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
      <span>Font Size:</span>
      <input
        type="number"
        onChange={(e) => setFontSize(e.target.value)}
        value={fontSize}
      ></input>
      <div>
        {nodes.map((node) => (
          <div data-start={node.start} onClick={seek} className="Paragraph">
            <div className="Start">{node.start}</div>
            <div className="Text" style={{ fontSize: `${fontSize}px` }}>
              {node.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
