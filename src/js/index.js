import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css'
import axios from "axios";
import Notiflix from "notiflix";
import 'notiflix/src/notiflix.css'
import { refs } from "./refs";

refs.breedSelectEl.addEventListener('change', handleChangeOptions);
refs.loaderEl.classList.remove('is-hidden');
refs.breedSelectEl.classList.add('is-hidden');
refs.errorEl.classList.add('is-hidden')

fetchBreeds().then(resp => {
    refs.loaderEl.classList.remove('is-hidden');
    
    resp.data.map(breed => {
        const option = document.createElement('option')
        option.value = breed.id;
        option.textContent = breed.name;
        refs.breedSelectEl.appendChild(option);
    });
    refs.loaderEl.classList.add('is-hidden');
    new SlimSelect({
    select: '.breed-select',
});
}).catch(err => {
    console.log(err.message);
    refs.loaderEl.classList.add('is-hidden');
    refs.errorEl.classList.remove('is-hidden');
    Notiflix.Notify.failure(err.message)
});

function handleChangeOptions(evt) {
    refs.catInfoEl.classList.add('is-hidden');
    refs.loaderEl.classList.remove('is-hidden');
    
    const breedID = evt.target.value
    fetchCatByBreed(breedID).then(resp => {
        if(!resp.data.length){
        Notiflix.Notify.failure('Sorry, we did not find the information')
        }
        createMarkupCat(resp.data)
        refs.loaderEl.classList.add('is-hidden');
        refs.catInfoEl.classList.remove('is-hidden');
}).catch(err => {
    refs.loaderEl.classList.add('is-hidden');
    refs.errorEl.classList.remove('is-hidden');
    Notiflix.Notify.failure('Cat not found!')
});
};

function createMarkupCat(arrCats){
    const murkup = arrCats.map(({url, breeds}) => `<img class="js-cat-img" src="${url}" alt="${breeds[0].name}">
    <h2>${breeds[0].name}</h2>
    <p class="js-cat-text">${breeds[0].description}</p>
    <p class="js-cat-text">Temperament: ${breeds[0].temperament}</p>`
    )
    refs.catInfoEl.innerHTML = murkup;
};
















// fetchBreeds().then(breeds => {
//     //         selectOptions(breeds);
//     });
    
// function selectOptions(breeds){
//     breeds.forEach(breed => {
//         const option = document.createElement('option')
//         option.value = breed.id;
//         option.textContent = breed.name;
//         refs.breedSelectEl.appendChild(option);
//     });
//     new SlimSelect({
//         select: '.breed-select',
//       })
//       refs.loaderEl.classList.add('is-hidden')
//       refs.breedSelectEl.classList.remove('is-hidden')
//     };

//     function handleChangeOptions(evt) {
//         refs.catInfoEl.classList.add('is-hidden')
//         refs.loaderEl.classList.add('is-hidden')
        
//         const selectedValue = evt.target.value
        
//         refs.catInfoEl.classList.remove('is-hidden')
//         fetchCatByBreed(selectedValue).then(createMarkupCat).then(renderCat)
       
//     }

