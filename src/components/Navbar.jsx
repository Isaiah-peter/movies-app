import React, { useState, useEffect } from 'react'
import moviedb from '../api/moviesapi'
import logo from '../img/film.png'
import user from '../img/user.jpg'
import menu from '../img/menu.png'
import close from '../img/close.png'
import search from '../img/search.png'



export const Navbar = () => {
  const [searchInput, setSearchIput] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    if (searchInput && !result.length) {
      searchMovies()
    } else {
      const timeOutId = setTimeout(() => {
        if (searchInput) {
          searchMovies()
        }
      }, 1000)

      return () => {
        clearTimeout(timeOutId)
      }
    }
  }, [searchInput])

  const searchMovies = async () => {
    const { data } = await moviedb.get('/search/movie', {
      params: {
        query: searchInput,
      }
    })

    setResult(data.results)
    console.log(data.results)
  }



  const hide = () => {
    const ul = document.getElementById('side-bar')

    ul.classList.remove('show')

  }
  const show = () => {
    const ul = document.getElementById('side-bar')
    const close = document.getElementById('close')

    ul.classList.add('show')
    close.classList.add('cancel')
  }

  const con = () => {
    console.log('rtt')
  }

  const searchBar = (e) => {
    setSearchIput(e.target.value)
  }

  const renderList = result.map((res) => {
    
    return (
      <li className='navbar__search-output-list'>
        <a href={`/moviedetail/${res.id}`} className='navbar__search-output-link'>
          {res.title}
        </a>
      </li>
    )
  })


  return (
    <div className='navbar'>
      <div className='navbar__app-detail'>
        <div className='app-name-icon'>
          <img src={logo} className='navbar-logo' alt="logo" />
          <h1 className='app-name'><a style={{ textDecoration: 'none', color: '#fff' }} href='/'>MoviesApp</a></h1>
        </div>

        <div id='side-bar' className='navbar__search-list'>
          <img id='close' className='navbar-logo' onClick={hide} src={close} alt='close' />
          <div className='navbar-list'>
            <nav>
              <ul className='navbar-items'>
                <li className='navbar-item'><a onClick={hide} href="/">Movies</a></li>
                <li className='navbar-item'><a onClick={hide} href="/tvshow">TV Shows</a></li>
                <li className='navbar-item'><a onClick={hide} href="/actors">Actors</a></li>
              </ul>
            </nav>
          </div>
          <div className='navbar__search'>
            <form onSubmit={hide, con} className='navbar__form'>
              <img className='search-icon' alt='search' src={search} />
              <input className='navbar__input' onChange={searchBar} value={searchInput} type="text" placeholder='search...' />
            </form>
            <img className='user' src={user} />
          </div>
          {searchInput !== "" ? <div className='navbar__search-output'>
            <ul>
              {renderList}
            </ul>
          </div> : null}
        </div>
        <img onClick={show} src={menu} alt='menu' className='navbar-logo menu' />
      </div>
    </div>
  )
}

