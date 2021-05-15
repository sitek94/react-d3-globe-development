import { Globe } from './Globe/Globe';
import './App.css' 

function App() {
  return (
    <div>
      <Globe size={500} />
      <Globe className="orange" size={450} />
      <Globe className="violet" size={375} />
      <Globe className="blue" size={300} />
    </div>
  );
}

export default App;
