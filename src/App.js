import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './globalStyles';
import { Navbar, Footer } from './components';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUpForm from './pages/SignUp/SignUpForm';
import LoginForm from './pages/Log-in/LoginForm';
import Dashboard from './components/Dashboard/dashboard';
import { WalletProvider} from './components/Wallet/Wallet';

function App() {
  return (
    <Router>
      <WalletProvider>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} />
        <Route path='/log-in' element={<LoginForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* Catch-all route for 404 - Not Found */}
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer /> {/* Footer will now appear on all pages */}
      </WalletProvider>
    </Router>
    
  );
}

export default App;