import axios from "axios";
import AppBarNav from "../components/AppBarNav";
import { useEffect, useState } from 'react';
import { CardContent, CardMedia, Container, Typography } from "@material-ui/core";


import '../styles/movie.css'

export default function Movie({ id }) {
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

    return (
        <>
            <AppBarNav />
            <div className="info">
                <Container className="left">
                    <Typography
                        variant="h4"
                        component="h2"
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
                </Container>
                <Container className="right">
                    <CardMedia>
                        <img
                            className="info__img"
                            src={c?.Poster}
                            alt={c?.Title} />
                    </CardMedia>
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
