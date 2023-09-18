import axios from "axios";


// const BASE_URL = "http://localhost:3000"; // localhost
const BASE_URL = "https://dnc-books-api.vercel.app"; // production
const TOKEN_QUERY = import.meta.env.VITE_TOKEN_QUERY;

export class LivrosService{
    static getLivros(){
        return axios.get(`${BASE_URL}/books?${TOKEN_QUERY}`);
    }

    static getLivro(id){
        return axios.get(`${BASE_URL}/books/${id}?${TOKEN_QUERY}`);
    }

    static createLivro(body){
        return axios.post(`${BASE_URL}/books?${TOKEN_QUERY}`, body);
    }

    static updateLivro(id,body){
        return axios.put(`${BASE_URL}/books/${id}?${TOKEN_QUERY}`,body);
    }

    static deleteLivro(id){
        return axios.delete(`${BASE_URL}/books/${id}?${TOKEN_QUERY}`);
    }
    
}