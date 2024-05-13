import './App.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProductUpload from './pages/ProductUpload';
import Orders from './pages/Orders';
import { AuthProvider } from './context/AuthContext';
import ThankYou from './pages/ThankYou';
import Search from './pages/Search';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/search/:id' element={<Search />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/checkout/:id' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/product-upload' element={<ProductUpload />} />
            <Route path='/orders/:id' element={<Orders />} />
            <Route path='/thank-you' element={<ThankYou />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
