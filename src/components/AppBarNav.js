import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "@reach/router";
import Searchbar from "./Searchbar";

import '../styles/nav.css'
export default function AppBarNav() {
    return (
        <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                        <Typography className="nav__title" variant="h6" noWrap>
                            InfoFlix
                        </Typography>
                        </Link>
                        <Searchbar />
                    </Toolbar>
                </AppBar>
    )
}