import { Button, ButtonGroup, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { navigate } from "@reach/router";
import { useContext } from "react";
import searchContext from "./Searchcontext";



export default function SearchCard() {
    var [results] = useContext(searchContext);
    return (
        <>
            {results?.map((result) => (
                <Card
                    key={result.imbdID}
                    className="search__card">
                    <div className="search__content">
                        <CardContent>
                            <Typography
                                variant="h4"
                                component="h2"
                                className="search__title">
                                {result.Title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                className="search__year">
                                {result.Year}
                            </Typography>
                        </CardContent>
                        <ButtonGroup size="small">
                            <Button
                                variant="contained"
                                color="primary">
                                Buy Movie
                            </Button>
                            <Button onClick={() => navigate(`/movie/${result.imdbID}`)}
                                variant="contained"
                                color="primary">
                                Learn more
                            </Button>
                        </ButtonGroup>
                    </div>
                    <CardMedia>
                        <img
                            src={result.Poster}
                            className="search__media"
                            alt={result.Title} />
                    </CardMedia>
                </Card>
            ))}
        </>
    )
}