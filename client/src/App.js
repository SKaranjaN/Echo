import './App.css';
import Download from './components/Download';
import Upload from './components/Upload';
import ViewText from './components/ViewText';


function App() {
  return (
    <div className="App">
      <h1>Echo</h1>
      <h2>The best <br />
      transcriber</h2>
      <div className="App-components">
      </div>
      <ViewText />
      <Upload />
      <Download />
    </div>
  );
}

export default App;