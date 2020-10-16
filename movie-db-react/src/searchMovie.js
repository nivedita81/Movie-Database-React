import React, {useState} from "react"
import './index.css'
import MovieCard from "./movieCard"

export default function SearchMovies() {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchmovies = async(e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a32b679e949925d2da0da41dbad570e6&language=en-US&query=${query}&page=1&include_adult=false`;
        try{
            const res = await fetch(url);
            const data = await res.json()
            console.log(data.results);
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <>
            <form className="form" onSubmit={searchmovies}>
                <label className="label" htmlFor="query">Movie name</label>
                <input type="text" placeholder="i.e. Jurassic Park" className="input" name="query" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit" className="button">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </>
    )
}