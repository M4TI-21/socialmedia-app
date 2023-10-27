import {Navbar, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../images/sigmaLogo.png";   
import './mainNavStyle.css';

export default function MainNavComp(props) {
    return(
        <Navbar expand="sm" className="mainNavbar" sticky="top" collapseOnSelect>
            <Navbar.Brand className="d-flex flex-column align-items-center">
                <Link className="d-flex flex-column align-items-center mainLink" to="/main">
                    <img alt="logo" src={logo} width="50"/>
                    <p><b>Sigma</b></p>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle className="mainNavBurger" aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
            <Navbar.Collapse className="mainNavBtns" id="navbarScroll">
                <Nav className="navBtnsList">
                    <Nav.Link className="mainNavLink op1" as={Link}>ADD NOTE</Nav.Link>
                    <Nav.Link className="mainNavLink op2" as={Link} to="/" onClick={() => props.logOut()}>LOG OUT</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}