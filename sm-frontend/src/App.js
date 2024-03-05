import './App.css';
import LoginForm from './components/loginPage/loginForm/LoginForm';
import RegisterForm from './components/loginPage/registerForm/RegisterForm';
import MainPage from './components/mainPage/mainPage';
import WelcomePage from './components/welcomePage/welcomePage';
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
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}
