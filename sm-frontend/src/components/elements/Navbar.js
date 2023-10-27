import {Navbar, Container, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/sigmaLogo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbarStyle.css';

export default function NavbarComp() {
    return(
        <Navbar expand="sm" className="navbar" sticky="top" collapseOnSelect>
            <Container>
                <Navbar.Brand className="d-flex flex-column align-items-center">
                    <Link className="d-flex flex-column align-items-center mainLink" to="/">
                        <img alt="logo" src={logo} width="50"/>
                        <p><b>Sigma</b></p>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle className="navBurger" aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
                <Navbar.Collapse className="navBtns" id="navbarScroll">
                    <Nav className="navBtnsList">
                        <Nav.Link className="navLink git" href="https://github.com/">GIT</Nav.Link>
                        <Nav.Link className="navLink signin signinBtn" as={Link} to="/login">SIGN IN</Nav.Link>
                        <Nav.Link className="navLink register registerBtn" as={Link} to="/register">REGISTER</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}