import './App.css';
import Download from './components/Download';
import Play from './components/Play';
import Upload from './components/Upload';


function App() {
  return (
    <div className="App">
      <h1>Echo</h1>
      <h2>The best <br />
      transcriber</h2>
      <div className="App-components">
      <Play />
      </div>
      <Upload />
      <Download />
    </div>
  );
}

export default App;
