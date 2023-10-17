import { useLocation } from "react-router-dom";

export default function MainPage() {

  const location = useLocation();

  return ( 
    <h1>Witaj, {location.state.id}</h1>
  );

}
