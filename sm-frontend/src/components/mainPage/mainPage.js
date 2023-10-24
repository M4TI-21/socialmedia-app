import { useLocation } from "react-router-dom";
import MainNavComp from "./elements/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./mainPageStyle.css";

export default function MainPage() {
  const location = useLocation();

  return (
    <div className="mainPageContent d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp />
      </div>
      <h1>Witaj, {location.state.id}</h1>
    </div>
  );
}
