import { Link } from '@reach/router';
import logo from '../error.jpg';

export default function PageNotFound() {
    return(
        <>
        <h1>Page Wasn't Found</h1>
        <img width="100%" src={logo} alt="error" />
        <Link to="/">
        <p>go Back to home page</p>
        </Link>
        </>
    )
}