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
import { TvShow } from './components/tvshow'
import { TvShowDetail } from './components/tvshowDetail';


class App extends React.Component {

  state = {
    popularMovies : [],
    genres: [],
    movieDetailData:[],
    popularTvshow : []
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

    const tvShowDataB = async() => {
      const res = await moviedb.get("/tv/popular")

      this.setState({popularTvshow:res.data.results})
    }
    
    movieDataB()
    movieDataGenre()
    tvShowDataB()
    
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
        <Route exact path='/tvshow'>
         <TvShow movies={this.state.popularTvshow}  genres={this.state.genres}/>
        </Route>
        <Route exact path='/tvshowdetail/:id' component={TvShowDetail}  genres={this.state.genres} />
        </Switch>
  
      </Router>
    );
  }
}

export default App;
