import React from 'react'
import  box  from '../img/box4.jpg'


export const MoviesApp = () => {
    return(
        <div className='container'>
            <div className='popular-movies'>
               <h2>Popular Movies</h2>
            </div>
            <div className='card__container'>
                <div className='card__content'>
                   <a href='/moviedetail'>
                     <img className='card__image' src={box} alt='text image'/>
                   </a>
                   <div className="card__discription">
                       <a href="/moviedetail" className='card__link'>Position</a>
                       <div className='data mt-1'>
                         <span>⭐ </span>
                         <span className='mr-2'>85%</span>
                         <span>|</span>
                         <span className='ml-2'>June 5 2021</span>
                       </div>
                       <div className='data__discription'>
                        Action, Thriller, Comedy
                       </div>
                     </div>
                </div>
            </div>
        </div>
    )
}

