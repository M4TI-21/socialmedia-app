import React from "react";
import NavbarComp from "../elements/Navbar";
import './welcomePageStyle.css';

export default function WelcomePage() {
  return (
    <div className="page">
        <NavbarComp />
        <div className="contentArea">
            <div className="quoteArea">
                <p className="quote">Imagination <br /> rules <br />the World.</p>
                <p className="signature">Napoleon Bonaparte</p>
            </div>

        </div>
    </div>
  );
}
