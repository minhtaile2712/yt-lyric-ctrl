import "./App.css";
import YouTube from "react-youtube";
import { useState } from "react";

const conv = (s) => s.split(":").reduce((a, i) => 60 * a + +i, 0);

function App() {
  const opts = {
    height: "270",
    width: "480",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // controls: 0,
      // autoplay: 1,
    },
  };

  const [videoIdInput, setVideoIdInput] = useState("E7UlemBSoYw");
  const [videoId, setVideoId] = useState("");
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

  function handleOkVideo() {
    setVideoId(videoIdInput);
  }

  const [transcriptsInput, setTranscriptsInput] = useState("");
  const [transcripts, setTranscripts] = useState("");

  function handleOkTranscripts() {
    setTranscripts(transcriptsInput);
  }

  const nodes = transcripts.split("\n\n").map((item) => ({
    start: item.slice(0, item.indexOf("\n")),
    text: item.slice(item.indexOf("\n") + 1),
  }));

  return (
    <div className="App">
      <div className="Side">
        <div>
          <input
            type="text"
            value={videoIdInput}
            onChange={(e) => setVideoIdInput(e.target.value)}
          />
          <button onClick={handleOkVideo}>Ok Video</button>
        </div>

        <textarea
          value={transcriptsInput}
          onChange={(e) => setTranscriptsInput(e.target.value)}
          // className="TranscriptInput"
          cols={33}
          rows={60}
        />
        <button onClick={handleOkTranscripts}>Ok Transcripts</button>
      </div>
      <div className="Main">
        <div>
          {videoId ? (
            <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
          ) : null}

          <button onClick={playVideo}>Play</button>
          <button onClick={pauseVideo}>Pause</button>
          <button data-start="0:00" onClick={seek}>
            Go to start
          </button>
        </div>
        <div>
          <span>Font Size:</span>
          <button onClick={() => setFontSize((font) => font - 5)}>-5</button>
          <button onClick={() => setFontSize((font) => font - 2)}>-2</button>
          <input
            type="number"
            onChange={(e) => setFontSize(+e.target.value)}
            value={fontSize}
          />
          <button onClick={() => setFontSize((font) => font + 2)}>+2</button>
          <button onClick={() => setFontSize((font) => font + 5)}>+5</button>
        </div>
        <div className="ScriptContainer">
          {nodes.map((node, index) => (
            <div
              data-start={node.start}
              onClick={seek}
              className="Paragraph"
              key={index}
            >
              <div className="Start">{node.start}</div>
              <div className="Text" style={{ fontSize: `${fontSize}px` }}>
                {node.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
