import React from 'react'
import  user  from '../img/user.jpg'
import  play  from '../img/play-button.png'

export const MoviesDetail = () => {
    return(
        <div className='p5'>
        <div className='movie-info'>
            <img src={user} className='movie-info__image' alt='movie detail image'/>
            <div className='movie-info__details'>
              <div className='movie-info__header'>
                <h1 className='movie-info__header-name'>Star Wars: The Risk of Skywalker</h1>
                <h4 className='movie-info__header-name-detail'>⭐ 85% 
                <span className='mr-2 ml-2'>|</span>
                June 5 2021 
                <span className='mr-2 ml-2'>|</span>
                Action, Thriller, Comedy
                </h4>
              </div>
              <div className='movie-info__detail'>
               But I must explain to you how all this mistaken idea of denouncing
               pleasure and praising pain was born and I will give you a complete
               account of the system, and expound the actual teachings.
               </div>  
                <div className='feature'>
                    <div className='feature__header'>Feature Cast</div>
                    <div className='feature__info'>
                      <div>
                        <div className='feature__info-header'>George Lucas</div>
                        Character
                      </div>
                      <div>
                        <div className='feature__info-header'>John Willams</div>
                        Original Movie Character
                      </div>
                    </div>
                </div>
                <div className='play-btn'>
                <img src={play} alt='play' className='play-btn-icon'/>
                <a href='#' className='thriller'>Play Trailer</a>
                </div>
            </div>
        </div>
         <div className="p5">
         
         <h2 className='play-cast__header'>Cast</h2>
        <div className='play-cast'>
           <div className='play-cast__box'>
            <img src={user} alt='cast' className='play-cast__image'/>
            <div className='play-cast__detail'>
                <h2 className='play-cast__nameR'>your name</h2>
                <h4 className='play-cast__name'>Jerry</h4>
            </div>
           </div>
         </div>
        </div>

        <div className='border-buttom'>
           </div>

        <div className="p5">
         <h2 className='play-cast__header'>Cast</h2>
        <div className='image-cast'>
           <div className='image-cast__box'>
            <img src={user} alt='cast' className='image-cast__image'/>
           </div>

        </div>
        </div>
        </div>
    )
}