import './App.css';
import {BrowserRouter as Router ,Route} from 'react-router-dom'
import Jion from './components/Jion/Index'
import Chat from './components/Chat/Index'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Jion}/>
      <Route path="/Chat" component={Chat}/>
    </Router>
  );
}

export default App;
