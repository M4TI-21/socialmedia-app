import {Navbar, Container, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function WelcomePage() {

  return (
    <div className="page">
        <div className="navbar">
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <img alt="" src="../../images/sigmaLogo.png" width="30" className="d-inline-block align-top"/>
                    <p>Sigma</p>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link><Link to="/">Sign in</Link></Nav.Link>
                        <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                        <Nav.Link href="https://github.com/">Git</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    </div>
  );
}
