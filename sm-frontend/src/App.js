import './App.css';
import LoginForm from './components/loginPage/LoginForm';
import RegisterForm from './components/loginPage/RegisterForm';
import MainPage from './components/mainPage/mainPage';
import WelcomePage from './components/welcomePage/welcomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <div className="main">
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainPage />}></Route>
        <Route path="/welcome" element={<WelcomePage />}></Route>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
