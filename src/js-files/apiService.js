const KEY = '19207459-7123426cd96bb4a7307e45de7';
//   https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
// const search = 'cat'

const URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
let page = 1;

export const fetchGetCards = async (search) => {
    try {
        const card = await fetch(`${URL}${search}&page=${page}&per_page=12&key=${KEY}`);
        const fotos = card.json();
        // console.log(fotos);
        return fotos;
    } catch (error) {
        error('Опаньки что-то пошло не так!!')
        
    };
    
}
 

// function fetch (url,searh,key) {
//     fetch(`${URL}${search}&page=${page}&per_page=12&key=${KEY}`).then(res => res.json).then(console.log);
// }
// 

 


