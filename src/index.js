import './styles.css';
import './js-files/apiService.js';
import  {renderCardMarkup} from './js-files/card-render.js';
import { error, alert } from '@pnotify/core';
import { debounce } from "debounce";
import { fetchGetCards } from './js-files/apiService';

let searchValue = '';

const refs = {
//  markup: document.querySelector('.card-markup'),
 search: document.querySelector('#search-form'),
 gallery: document.querySelector('.gallery'),



} ;

refs.search.addEventListener('input',debounce ((inputValue),800));


function inputValue (event) {
    event.preventDefault();
    searchValue = event.target.value;
    // console.log(searchValue);
    fetchOnInput(searchValue);
};

function fetchOnInput (searchValue) {
    fetchGetCards(searchValue).then(data => {
        console.log(data.hits);
        renderCardMarkup(data.hits,(refs.gallery));
    });
//    console.log(renderCardMarkup);
    
};


// renderSearchForm();


// const KEY = '19207459-7123426cd96bb4a7307e45de7';
// //   https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
// const search = 'cat'

// fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=12&key=${KEY}`)
// .then(res => res.json).then(console.log);