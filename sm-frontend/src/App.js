import './App.css';
import LoginForm from './components/loginPage/LoginForm';
import RegisterForm from './components/loginPage/RegisterForm';
import MainPage from './components/mainPage/mainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <div className="main">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}
