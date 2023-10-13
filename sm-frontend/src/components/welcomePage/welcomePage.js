import React from "react";
import NavbarComp from "../elements/Navbar";
import './welcomePageStyle.css';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="page">
        <NavbarComp />
        <div className="contentArea">
            <div className="quoteArea">
                <p className="quote">Imagination <br /> rules <br /> the World.</p>
                <p className="signature">Napoleon Bonaparte</p>
            </div>
            <div className="sloganArea">
                <p className="slogan">Be part of something <br /> special today! Register <br /> right now.</p>
                <Link className="getstartedLink" to="/register"><Button className="getstartedBtn">GET STARTED!</Button></Link>
            </div>
        </div>
    </div>
  );
}
