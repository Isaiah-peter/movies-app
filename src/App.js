
import { MoviesApp } from './components/Moveies'
import { Navbar } from './components/Navbar'
import { MoviesDetail } from './components/MoviesDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
      <Route exact path='/' >
       <MoviesApp  />
      </Route>
      <Route exact path='/moviedetail' >
       <MoviesDetail  />
      </Route>
      </Switch>

    </Router>
  );
}

export default App;
