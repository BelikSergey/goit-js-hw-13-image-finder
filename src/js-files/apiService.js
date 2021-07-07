const KEY = '19207459-7123426cd96bb4a7307e45de7';
const URL = 'https://pixabay.com/api/?image_typr=photo&orientation=horizontal&q=';

export default class ApiService {
    constructor () {
        this.searchValue = '';
        this.page = 1;

    }
    async fetchGetCards () {
        return fetch(`${URL}${this.searchValue}&page=${this.page}&per_page=12&key=${KEY}`)
        .then(response =>response.json())
        .then(({hits}) =>{
            this.page+=1;
            return hits;
        });
    
        
    }
    get value () {
        return this.searchValue;

    }
    set value (newValue) {
        this.searchValue = newValue;
    }
    resetPage(){
        this.page =1;
    }
}



 


