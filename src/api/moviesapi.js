/*
the base url for fetch data from themoviedb 
*/

import axios from 'axios';
const KEY = process.env.REACT_APP_MOVIES_API_KEY;

console.log(KEY);


export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
     api_key:KEY
    },
})
  