import {Navbar, Container, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../images/sigmaLogo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './welcomePageStyle.css';

export default function NavbarComp() {
    return(
        <Navbar expand="sm" className="navbar" sticky="top" inverse collapseOnSelect>
            <Container>
                <Navbar.Brand className="d-flex flex-column align-items-center">
                    <img alt="logo" src={logo} width="50"/>
                    <p><b>Sigma</b></p>
                </Navbar.Brand>
                <Navbar.Toggle className="navBurger" aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
                <Navbar.Collapse className="navBtns" id="navbarScroll">
                    <Nav className="navBtnsList">
                        <Nav.Link className="navLink git" href="https://github.com/">GIT</Nav.Link>
                        <Nav.Link className="navLink login"><Link className="navLink login" to="/">SIGN IN</Link></Nav.Link>
                        <Nav.Link className="navLink register"><Link className="navLink register" to="/register">REGISTER ACCOUNT</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}