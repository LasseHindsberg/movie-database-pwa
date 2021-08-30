
import axios from "axios";
import { TextField, Button } from '@material-ui/core';
import { useContext } from "react";
import searchContext from "./Searchcontext";
import { navigate } from '@reach/router'

export default function Searchbar() {

    var setResults = useContext(searchContext)[1];

    function handleSubmit(event) {
        event.preventDefault();
        // fetch from database
        axios.get(`https://movie-database-imdb-alternative.p.rapidapi.com`, {
            // Results
            params: {
                s: event.target.Search.value,
                page: 1,
                r: "json"
            },
            // api key and host
            headers: {
                'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        })
            // getting response into a data array
            .then(response => setResults(response.data.Search))
            navigate("/")
    }

    return (
        <form onSubmit={handleSubmit}  className="search__searchBar">
            <TextField
                color="secondary"
                placeholder="keyword"
                name="Search"
                className="search__search"
            />
            <Button
                variant="contained"
                color="secondary"
                className="search__submit"
                type="submit"
            >
                Search
            </Button>
        </form>
    )
}