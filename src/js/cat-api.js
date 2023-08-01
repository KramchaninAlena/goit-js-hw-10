import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_4e1lFX4pyhOeIuHiankqCvZmObslmsyyxV5vlfqkgilB41LqjWT5YoX6yEHLbDBQ";

const BASE_URL = ' https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
};

export function fetchCatByBreed(breedId){
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
};