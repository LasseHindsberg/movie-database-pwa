import axios from "axios";
import AppBarNav from "../components/AppBarNav";
import { useEffect, useState } from 'react';
import { CardContent, Container, Typography, Button, Input, Box } from "@material-ui/core";
import { Rating } from '@material-ui/lab'

import '../styles/movie.css'
import { setRatingLampColor } from "../functions/RatingColorLamp";

export default function Movie({ id }) {

    // Fetch for movie info
    // c for content
    var [c, setInfoContent] = useState({})
    useEffect(function () {

        axios.get(`https://movie-database-imdb-alternative.p.rapidapi.com`, {

            params: {
                i: id,
                r: "json"
            },

            headers: {
                'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        })
            .then(response => setInfoContent(response.data));
    }, [id])

    // --------------------------------------------------------------------------------
    // Indexed DB shit
    /*
    For the love of god this whole mess, doesnt make any sense to me and I would not 
    even wish this kind of pain on my worst enemy.
    Never Again

    - Frost
    */


    var [rating, setRating] = useState([])

    function formSubmit(e) {
        e.preventDefault()

        var movieData = [
            { movieID: `${id}`, movie: `${c.Title}`, rating: `${e.target[0].value}` }
        ];
        setRating(movieData)

        setRatingLampColor()
        
        // console.log("New Rating Set")

    }

    function handleResult(number) {
        document.querySelector(".voteValue").value = number
        setValue(number);
    }




    var dbName = 'ratings'
    var request = indexedDB.open(dbName, 1)

    // Error Handler
    request.onerror = function (event) {
        console.error("Database error: " + event.target.errorCode);
    }


    request.onupgradeneeded = function (event) {
        var db = event.target.result;

        // create storage for our index
        var store = db.createObjectStore("ratings", { keyPath: 'movieID' });

        // create indexes to search for movies and ratings
        store.createIndex("movie", "movie", { unique: false });

        store.createIndex("rating", "rating", { unique: false });

        // console.log("created storages")
    };
    //  use transaction.oncomplete to make sure the storage is finished before adding data into it
    request.onsuccess = function (event) {
        var db = event.target.result;

        var ratingStore = db.transaction("ratings", "readwrite").objectStore("ratings");
        rating.forEach(function (movie) {
            ratingStore.add(movie);
            // console.log("Data Added.")
        });
        var getData = ratingStore.get(`${id}`);
        getData.onsuccess = function () {
            if (!getData.result) return
            // console.log("Handling results and setting rating")
            handleResult(getData.result.rating)
        };
    }

    // setting value state 
    var [value, setValue] = useState(0);


    // --------------------------------------------------------------
    // JSX
    return (
        <>
            <AppBarNav />
            <div className="info">
                <Container className="left">
                    <Typography
                        variant="h4"
                        component="h4"
                    >
                        {c?.Title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="p"
                    >
                        {c?.Year}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        color="textPrimary"
                    >
                        {c?.Plot}
                    </Typography>

                        <Typography variant="h5"
                            component="h5">
                            Your Rating:
                        </Typography>
                        <Rating
                            className="ratingStars"
                            name="read-only"
                            value={value}
                            readOnly />
                        <form className="ratingForm" onSubmit={formSubmit} action="">
                            <Box component="span" m={1}>
                                <Input variant="outlined" color="secondary" className="voteValue" min="1" max="5" type="number" id="voteValue" />
                                <Button variant="outlined" color="secondary" className="voteBtn" type="submit">Rate Movie</Button>
                                <Typography component="p" variant="subtitle2">
                                    enter your rating
                                </Typography>
                            </Box>
                        </form>

                        {/* Other ratings */}
                        <Typography component="h6" variant="h6">
                            Other Ratings:
                        </Typography>
                        {c?.Ratings?.map(result => {
                                return (
                                    <div key={result.Source} className="">
                                    <p key={result.Source}>{result.Source}</p>
                                    <p key={result.Value}>{result.Value}</p>
                                </div>
                            )
                        })}
                        {/* right side  */}
                </Container>
                <Container className="right">
                        <img
                            className="info__img"
                            src={c?.Poster}
                            alt={c?.Title} />
                    <CardContent>
                        <Typography className="info__info" variant="subtitle2" color="textPrimary" component="p">
                            Genre(s): {c?.Genre}
                        </Typography>
                        <Typography className="info__info" variant="subtitle2" color="textPrimary" component="p">
                            Actors: {c?.Actors}
                        </Typography>
                        <Typography className="info__info" variant="subtitle2" color="textPrimary" component="p">
                            Writer(s): {c?.Writer}
                        </Typography>
                        <Typography className="info__info" variant="subtitle2" color="textPrimary" component="p">
                            Awards: {c?.Awards}
                        </Typography>
                    </CardContent>
                </Container>
            </div>
        </>
    )
}
