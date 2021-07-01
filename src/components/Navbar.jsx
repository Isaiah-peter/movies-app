import React from 'react'
import logo from '../img/film.png'
import user from '../img/user.jpg'
import menu from '../img/menu.png'
import close from '../img/close.png'
import search from '../img/search.png'


export class Navbar extends React.Component {

  hide = () => {
    const ul = document.getElementById('side-bar')

    ul.classList.remove('show')

  }
  show = () => {
    const ul = document.getElementById('side-bar')
    const close = document.getElementById('close')

    ul.classList.add('show')
    close.classList.add('cancel')


  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar__app-detail'>
          <div className='app-name-icon'>
            <img  src={logo} className='navbar-logo' alt="logo" />
            <h1 className='app-name'>MoviesApp</h1>
          </div>
           
          <div id='side-bar' className='navbar__search-list'>
            <img id='close' className='navbar-logo' onClick={this.hide} src={close} alt='close' />
            <div className='navbar-list'>
              <nav>
                <ul className='navbar-items'>
                  <li className='navbar-item'><a  onClick={this.hide} href="#">Movies</a></li>
                  <li className='navbar-item'><a  onClick={this.hide} href="#">TV Shows</a></li>
                  <li className='navbar-item'><a  onClick={this.hide} href="#">Actors</a></li>
                </ul>
              </nav>
            </div>
            <div className='navbar__search'>
              <form onSubmit={this.hide} className='navbar__form'>
                <img className='search-icon' alt='search' src={search} />
                <input className='navbar__input' type="text" placeholder='search...' />
              </form>
              <img className='user' src={user} />
            </div>
          </div>
          <img onClick={this.show} src={menu} alt='menu' className='navbar-logo menu'/>
        </div>
      </div>
    )
  }

}