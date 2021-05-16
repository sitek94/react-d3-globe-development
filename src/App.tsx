import { Globe } from './Globe/Globe';

import * as schemes from './styles/schemes'

function App() {
  return (
    <div>
      <Globe size={500} />
      <Globe colors={schemes.orange} size={450} />
      <Globe colors={schemes.purple} size={375} />
      <Globe colors={schemes.dark} size={450} />
      <Globe colors={schemes.blue} size={400} />
      <Globe colors={schemes.light} size={300} />
    </div>
  );
}

export default App;
