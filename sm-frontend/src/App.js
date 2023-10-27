import './App.css';
import LoginForm from './components/loginPage/loginForm/LoginForm';
import RegisterForm from './components/loginPage/registerForm/RegisterForm';
import MainPage from './components/mainPage/MainPage';
import WelcomePage from './components/welcomePage/WelcomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <div className="main">
      <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
