import React from 'react'



export const TvShow = ({ movies, genres}) => {
 const getGenres = (ids) => {
    let result = [];
    if(ids === ''){
      return <div>loading</div>
    }
    genres.forEach((item) => {
      if (ids.includes(item.id)) {
        result.push(item.name)
      }
    })
    
    return result.join(',')
  }

  const renderMovise = movies.map((movie) => {
   
    return (
      <div  key={movie.id} className='card__content'>
        <a href={`/tvshowdetail/${movie.id}`}>
          <img className='card__image' src={movie.poster_path === null ? `https://ui-avatars.com/api/?size=340&name=${movie.original_title}`:  `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='text' />
        </a>
        <div className="card__discription">
          <a href={`/tvshowdetail/${movie.id}`} className='card__link'>{movie.original_name}</a>
          <div className='data mt-1'>
            <span>⭐</span>
            <span className='mr-2'>{Math.floor(movie.popularity * 100 / 10000)}%</span>
            <span>|</span>
            <span className='ml-2'>{movie.first_air_date}</span>
          </div>
            <div className='data__discription'>
              {getGenres(movie.genre_ids)}
            </div>
        </div>
      </div>


    )
  })

  
  return (
    
    <div className='container'>
      <div className='popular-movies'>
        <h2>Popular Tv Show</h2>
      </div>
      <div className='card__container'>
        {renderMovise}
       
      </div>
    </div>
  )

}