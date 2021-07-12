import React, { useState, useEffect } from 'react'
import moviedb from '../api/moviesapi'
import user from '../img/user.jpg'
import Paginate from "react-paginate";

export const Actors = () => {
  const [result, setResult] = useState([])


  const getActor = async () => {
    const res = await moviedb.get(`/person/popular`)
    setResult(res.data.results)
  }
 
 

  useEffect(() => {
    getActor()
  }, [])

  const renderActor = result.map((res) => {
    return (
      <div key={res.id === undefined ? Math.random() : res.id} className='play-cast__box'>
        <img src={res.profile_path === null ? user : `https://image.tmdb.org/t/p/w500/${res.profile_path}`} alt='cast' className='play-cast__image' />
        <div className='play-cast__detail'>
          <h2 className='play-cast__nameR'>{res.name}</h2>
          <h4 className='play-cast__name'>{res.known_for_department}</h4>
        </div>
      </div>
    )
  })

  return (
    <div className='container'>
      <div className='popular-movies'>
        <h2>Popular Actors</h2>
      </div>
      <div className='card__container'>
        {renderActor}
      </div>
    </div>
  )
}