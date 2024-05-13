import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import Store from './pages/Store';
import Order from './pages/Order';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/store" element={<Store />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
