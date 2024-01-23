import './App.css';
import LoginForm from './components/loginPage/loginForm/LoginForm';
import RegisterForm from './components/loginPage/registerForm/RegisterForm';
import MainPage from './components/mainPage/MainPage';
import WelcomePage from './components/welcomePage/welcomePage';
import Profile from './components/mainPage/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
  return (
    <div className="main">
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/main" element={<MainPage />}></Route>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}
