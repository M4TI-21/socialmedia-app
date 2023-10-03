import {Navbar, Container, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import logo from "../../images/sigmaLogo.png";
import './welcomePageStyle.css';

export default function WelcomePage() {

  return (
    <div className="page">
        <Container className="">
            <Navbar expand="lg" className="navbar" sticky="top" inverse collapseOnSelect>
                <Container>
                    <Navbar.Brand>
                        <img alt="logo" src={logo} width="50"/>
                        <p>Sigma</p>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className="nav d-flex flex-row justify-content-evenly">
                            <Nav.Link className="navLink" href="https://github.com/">GIT</Nav.Link>
                            <Nav.Link className="navLink"><Link className="navLink" to="/">SIGN IN</Link></Nav.Link>
                            <Nav.Link className="navLink register"><Link className="navLink register" to="/register">REGISTER ACCOUNT</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    </div>
  );
}
