import './styles.scss';
import './js-files/apiService.js';
import  {renderCardMarkup} from './js-files/card-render.js';
import { error, alert } from '@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import { debounce } from "debounce";
import { fetchGetCards } from './js-files/apiService';
import ApiService from './js-files/apiService';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';



const apiService = new ApiService();
// console.log(screen.height)

const refs = {
 loadBtn: document.querySelector('[data-action="load-more"]'),
 search: document.querySelector('#search-form'),
 gallery: document.querySelector('.gallery'),
} ;

refs.search.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoadMore);
// refs.loadBtn.disabled = true;
refs.loadBtn.hidden = true;
refs.gallery.addEventListener('click',onImgClick);

// debounce ((onSubmit),900)

// console.dir(refs.loadBtn);

function onImgClick(evt) {
    
   const src = evt.target.dataset.src; 
   if (src) {
    console.log(src);
    const instance = basicLightbox.create(`
    <img class = “imgModal” src=${src} width=“800” height=“600">`);
    //  console.dir(instance);
     instance.show();
   };
   

}

function resetMarkup () {
    refs.gallery.innerHTML = '';  
    
}

function onSubmit (event) {
   
    event.preventDefault();
    apiService.resetPage();
    resetMarkup ();
    apiService.value = event.currentTarget.elements.query.value;
    fetchValue();
    
};
 
async function fetchValue () {
    try {
      await apiService.fetchGetCards().then(hits => {
            if (hits.length > 0) {
        
        renderCardMarkup(hits,(refs.gallery));
        // console.log(hits);
        refs.loadBtn.disabled = false;
        refs.loadBtn.hidden = false;
        // scrollTo();
        
            } else {
                refs.loadBtn.hidden = true;
                errorMessage('По вашему запросу ничего не найдено')
            }
      });
      scrollTo();
    //   refs.loadBtn.disabled = false;
    } catch  {
        refs.loadBtn.hidden = true;
        errorMessage("Все сломалось в Fetch запрсе! Попробуйте позже или обратитесь к администратору!");
    }
};

function errorMessage (message) {
    const myError = error({
    text: message,
    hide: false,
    delay:1500,
    });
    setTimeout(() => {
        myError.hide = true;
    }, 200);

};


function onLoadMore(evt) {
    // scrollTo();
    fetchValue();
};

function scrollTo () {
    const height = window.screen.height;
    const scrollHeight = window.pageYOffset;
    scroll = height + scrollHeight;
    window.scrollTo({
        top: scroll,
        behavior: "smooth",
    });
}

