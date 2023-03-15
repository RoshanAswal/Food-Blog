import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import {Auth} from './pages/Auth';
import {Create_recipe} from './pages/Create-recipe';
import {Saved_recipe} from './pages/Saved-recipe';
import { Navbar } from './components/Navbar.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-recipe" element={<Create_recipe/>}/>
          <Route path="/saved-recipe" element={<Saved_recipe/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
