import React from 'react';
import { MoviesApp } from './components/Moveies'
import { Navbar } from './components/Navbar'
import { MoviesDetail } from './components/MoviesDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import moviedb from './api/moviesapi'
import { Actors} from './components/actors'


class App extends React.Component {

  state = {
    popularMovies : [],
    genres: [],
    movieDetailData:[]
  }

  
  componentDidMount = () => {
    const movieDataB = async() => {
      const response = await moviedb.get('/movie/popular')

      this.setState({popularMovies:response.data.results})
    }
    const movieDataGenre = async() => {
      const response = await moviedb.get('/genre/movie/list')

      this.setState({genres:response.data.genres})
    }
    
    movieDataB()
    movieDataGenre()
    
  }

 

  render(){
      console.log(this.state.movieDetailData)
    return (
      <Router>
        <Navbar />
        <Switch>
        <Route exact path='/' >
         <MoviesApp movies={this.state.popularMovies}  genres={this.state.genres} />
        </Route>
        <Route exact path='/moviedetail/:id' component={MoviesDetail}  genres={this.state.genres} />
        <Route exact path='/actors' component={Actors} />
        </Switch>
  
      </Router>
    );
  }
}

export default App;
