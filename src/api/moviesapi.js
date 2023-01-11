/*
the base url for fetch data from themoviedb 
*/

import axios from 'axios';
const KEY = '01ce0249e6d58cea5cd631a0b47bb6ab'



export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
     api_key:KEY
    },
})