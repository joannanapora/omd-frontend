import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Taking care of your plants is EVERYTHING!
        </p>
        <a
          className="App-link"
          href="https://www.crocus.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy your first plant!
        </a>
      </header>
    </div>
  );
}

export default App;
