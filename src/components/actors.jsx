import React, { useState, useEffect } from 'react'
import moviedb from '../api/moviesapi'

export const Actors = () => {
  const [result, setResult] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPageNumber, setTotalPageNumber] = useState(0)


  const getActor = async () => {
    const res = await moviedb.get(`/person/popular`, {
      params: {
        page: pageNumber
      }
    })
    setResult(res.data.results)
    setTotalPageNumber(res.data.total_pages)
  }

  const nextPage = () => {
    setPageNumber(pageNumber + 1)
    if (pageNumber >= totalPageNumber) {
      setPageNumber(1)
    }
  }

  const priviousPage = () => {
    setPageNumber(pageNumber - 1)
    if (pageNumber > 0) {
      setPageNumber(1)
    }
  }



  useEffect(() => {
    getActor()
  }, [pageNumber])

  const renderActor = result.map((res) => {
    return (
      <div key={res.id === undefined ? res.profile_path : res.id} className='play-cast__box'>
        <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${res.profile_path})`}} className='play-cast__image' ></div>
        <div className='boxhover'>
          <h2 className='play-cast__nameR'>{res.name}</h2>
          <h4 className='play-cast__name'>{res.known_for_department}</h4>
             <li className='list-title'>{res.known_for[0].title}</li>
        </div>
      </div>
    )
  })

  return (
    <div className='container'>
      <div className='popular-movies'>
        <h2>Popular Actors</h2>
      </div>
      <div className='card__container mt-3'>
        {renderActor}
      </div>
      <div className='paginationBtn'>
        <a onClick={priviousPage}>Previous</a>
        <a onClick={nextPage}>Next</a>
      </div>
    </div>
  )
}