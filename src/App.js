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


class App extends React.Component {

  state = {
    popularMovies : [],
    genres: [],
    movieDetailData:[]
  }

   movieDetail = async(movie_id) => {
    const response = await moviedb.get(`/movie/${movie_id}`)
    this.setState({movieDetailData:response.data.genres})
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
    

      
    
    this.movieDetail()
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
         <MoviesApp movies={this.state.popularMovies} onGetImageId={this.movieDetail}  genres={this.state.genres} />
        </Route>
        <Route exact path='/moviedetail' >
         <MoviesDetail  />
        </Route>
        </Switch>
  
      </Router>
    );
  }
}

export default App;
