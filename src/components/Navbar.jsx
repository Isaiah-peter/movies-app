import React from 'react'
import  logo  from '../img/film.png'
import  user  from '../img/user.jpg'
import  search  from '../img/search.png'

export class Navbar extends React.Component {
 
render(){
    return(
        <div className='navbar'>
          <div className='navbar__app-detail'>
            <div className='app-name-icon'>
              <img src={ logo } className='navbar-logo' alt="logo" />
              <h1 className='app-name'>MoviesApp</h1>
            </div>
            <div className='navbar-list'>
              <nav>
                  <ul className='navbar-items'>
                      <li className='navbar-item'><a href="#">Movies</a></li>
                      <li className='navbar-item'><a href="#">TV Shows</a></li>
                      <li className='navbar-item'><a href="#">Actors</a></li>
                  </ul>
              </nav>
            </div>
          </div>
          <div className='navbar__search'>
           <form  className='navbar__form'>
               <img className='search-icon' alt='search' src={search}/>
               <input className='navbar__input' type="text" placeholder='search...' />
           </form>
           <img className='user' src={user}/>
          </div>
        </div>
      )
}

}